<?php

namespace App\Http\Controllers;

use App\Http\Requests\Employee\EmployeeStoreRequest;
use App\Http\Requests\Employee\EmployeeUpdateRequest;
use App\Http\Resources\EmployeeResource;
use App\Models\Employee;
use App\Models\Department;
use App\Models\Designation;
use App\Services\EmployeeService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmployeeController extends Controller
{
    public function __construct(protected EmployeeService $employeeService) {}


    private function getDropdownData(){
        return [
            'departments' => Department::where('status', 'active')->orderBy('name')->get(['id', 'name']),
            'designations' => Designation::where('status', 'active')->orderBy('name')->get(['id', 'name', 'department_id']),
        ];
    }


    public function index(Request $request): Response
    {
        return Inertia::render('HR/Employees/Index', [
            'employees' => EmployeeResource::collection(
                $this->employeeService->getAll(15, $request->only(['department_id', 'status', 'is_teaching_staff', 'search']))
            ),
            'filters' => $request->only(['department_id', 'status', 'is_teaching_staff', 'search']),
            'dropdownData' => $this->getDropdownData(),
        ]);
    }


    public function create(): Response
    {
        return Inertia::render('HR/Employees/Form', [
            'dropdownData' => $this->getDropdownData(),
        ]);
    }


    public function store(EmployeeStoreRequest $request): RedirectResponse
    {
        $this->employeeService->create($request->validated());
        return redirect()->route('hr.employees.index')->with('success', 'Employee created successfully.');
    }


    public function edit(Employee $employee): Response
    {
        $employee->load(['department', 'designation']);
        
        return Inertia::render('HR/Employees/Form', [
            'employee' => new EmployeeResource($employee),
            'dropdownData' => $this->getDropdownData(),
        ]);
    }


    public function update(EmployeeUpdateRequest $request, Employee $employee): RedirectResponse
    {
        $this->employeeService->update($employee, $request->validated());
        return redirect()->route('hr.employees.index')->with('success', 'Employee updated successfully.');
    }


    public function destroy(Employee $employee): RedirectResponse
    {
        $this->employeeService->delete($employee);
        return redirect()->route('hr.employees.index')->with('success', 'Employee deleted successfully.');
    }


    public function updateStatus(Request $request, Employee $employee): RedirectResponse
    {
        $validated = $request->validate(['status' => ['required', 'in:active,inactive,resigned,terminated']]);
        $this->employeeService->updateStatus($employee, $validated['status']);
        return back()->with('success', 'Employee status updated successfully.');
    }

    
}