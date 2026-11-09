<?php

namespace App\Http\Controllers;

use App\Http\Requests\HR\PayrollGenerateRequest;
use App\Http\Resources\PayrollResource;
use App\Models\Employee;
use App\Models\Payroll;
use App\Services\PayrollService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PayrollController extends Controller
{
    public function __construct(protected PayrollService $service) {}


    private function getDropdownData(){
        return [
            'employees' => Employee::where('status', 'active')
                ->with('designation:id,name')
                ->orderBy('first_name')
                ->get(['id', 'employee_id', 'first_name', 'last_name', 'designation_id']),
        ];
    }


    public function index(Request $request): Response
    {
        return Inertia::render('HR/Payrolls/Index', [
            'payrolls' => PayrollResource::collection(
                $this->service->getAll(15, $request->only(['employee_id', 'month', 'year', 'status']))
            ),
            'filters' => $request->only(['employee_id', 'month', 'year', 'status']),
            'dropdownData' => $this->getDropdownData(),
        ]);
    }


    public function create(): Response
    {
        return Inertia::render('HR/Payrolls/Form', [
            'dropdownData' => $this->getDropdownData(),
        ]);
    }


    public function store(PayrollGenerateRequest $request): RedirectResponse
    {
        $this->service->generate($request->validated());
        return redirect()->route('hr.payrolls.index')->with('success', 'Payroll generated successfully.');
    }

    public function markAsPaid(Request $request, Payroll $payroll): RedirectResponse
    {
        $validated = $request->validate([
            'paid_date'      => ['required', 'date'],
            'payment_method' => ['nullable', 'string', 'max:50'],
        ]);
        $this->service->markAsPaid($payroll, $validated);
        return back()->with('success', 'Payroll marked as paid successfully.');
    }


    public function destroy(Payroll $payroll): RedirectResponse
    {
        $this->service->delete($payroll);
        return redirect()->route('hr.payrolls.index')->with('success', 'Payroll deleted successfully.');
    }

    public function getSalaryStructure(int $employeeId): JsonResponse
    {
        $employee = Employee::with('designation.salaryStructure')->find($employeeId);
        
        if (!$employee || !$employee->designation || !$employee->designation->salaryStructure) {
            return response()->json(null);
        }

        return response()->json($employee->designation->salaryStructure);
    }
}