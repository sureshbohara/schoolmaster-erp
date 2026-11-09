<?php

namespace App\Http\Controllers;

use App\Http\Requests\HR\LeaveApplicationStoreRequest;
use App\Http\Resources\LeaveApplicationResource;
use App\Models\Employee;
use App\Models\LeaveApplication;
use App\Models\LeaveType;
use App\Services\LeaveApplicationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LeaveApplicationController extends Controller
{
    public function __construct(protected LeaveApplicationService $service) {}

    private function getDropdownData()
    {
        return [
            'employees' => Employee::where('status', 'active')->orderBy('first_name')->get(['id', 'employee_id', 'first_name', 'last_name']),
            'leaveTypes' => LeaveType::where('status', 'active')->orderBy('name')->get(['id', 'name', 'days_count']),
        ];
    }

    public function index(Request $request): Response
    {
        return Inertia::render('HR/Leaves/Index', [
            'applications' => LeaveApplicationResource::collection(
                $this->service->getAll(15, $request->only(['employee_id', 'status']))
            ),
            'filters' => $request->only(['employee_id', 'status']),
            'dropdownData' => $this->getDropdownData(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('HR/Leaves/Form', [
            'dropdownData' => $this->getDropdownData(),
        ]);
    }

    public function store(LeaveApplicationStoreRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());
        return redirect()->route('hr.leaves.index')->with('success', 'Leave application submitted successfully.');
    }

    public function approve(LeaveApplication $application): RedirectResponse
    {
        $this->service->approve($application);
        return back()->with('success', 'Leave application approved successfully.');
    }

    public function reject(LeaveApplication $application): RedirectResponse
    {
        $this->service->reject($application);
        return back()->with('success', 'Leave application rejected successfully.');
    }

    public function destroy(LeaveApplication $application): RedirectResponse
    {
        $this->service->delete($application);
        return redirect()->route('hr.leaves.index')->with('success', 'Leave application deleted successfully.');
    }
}