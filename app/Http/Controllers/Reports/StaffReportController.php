<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Designation;
use App\Models\Employee;
use App\Models\LeaveApplication;
use App\Models\Payroll;
use App\Models\StaffAttendance;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StaffReportController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Reports/Staff/Index');
    }

  
    public function contactList(Request $request): Response
    {
        $departments = Department::where('status', 'active')->get(['id', 'name']);
        
        $query = Employee::where('status', 'active')
            ->orderBy('department_id')
            ->orderBy('first_name');

        if ($request->filled('department_id')) {
            $query->where('department_id', $request->department_id);
        }
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('employee_id', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%"); 
            });
        }

        $employees = $query->get([
            'id', 'employee_id', 'first_name', 'last_name', 'phone', 
            'department_id', 'designation_id', 'address', 'emergency_contact'
        ]);

        $deptIds = $employees->pluck('department_id')->unique()->filter();
        $desigIds = $employees->pluck('designation_id')->unique()->filter();
        $deptsMap = Department::whereIn('id', $deptIds)->pluck('name', 'id');
        $desigsMap = Designation::whereIn('id', $desigIds)->pluck('name', 'id');

        foreach ($employees as $emp) {
            $emp->department_name = $deptsMap[$emp->department_id] ?? 'N/A';
            $emp->designation_name = $desigsMap[$emp->designation_id] ?? 'N/A';
        }

        return Inertia::render('Reports/Staff/ContactList', [
            'departments' => $departments,
            'employees' => $employees,
            'totalEmployees' => $employees->count(),
            'filters' => $request->only(['department_id', 'search']),
        ]);
    }

 
    public function staffAttendance(Request $request): Response
    {
        $departments = Department::where('status', 'active')->get(['id', 'name']);
        
        $query = StaffAttendance::with(['employee:id,employee_id,first_name,last_name,department_id,designation_id'])
            ->whereHas('employee', function ($q) use ($request) {
                $q->where('status', 'active');
                if ($request->filled('department_id')) $q->where('department_id', $request->department_id);
            });

        if ($request->filled('from_date')) $query->whereDate('date', '>=', $request->from_date);
        if ($request->filled('to_date')) $query->whereDate('date', '<=', $request->to_date);

        $records = $query->orderBy('date', 'desc')->orderBy('employee_id')->get([
            'id', 'employee_id', 'date', 'status'
        ]);

        $deptIds = $records->pluck('employee.department_id')->unique()->filter();
        $desigIds = $records->pluck('employee.designation_id')->unique()->filter();
        $deptsMap = Department::whereIn('id', $deptIds)->pluck('name', 'id');
        $desigsMap = Designation::whereIn('id', $desigIds)->pluck('name', 'id');

        foreach ($records as $record) {
            $record->department_name = $deptsMap[$record->employee->department_id] ?? 'N/A';
            $record->designation_name = $desigsMap[$record->employee->designation_id] ?? 'N/A';
        }

        return Inertia::render('Reports/Staff/Attendance', [
            'departments' => $departments,
            'records' => $records,
            'totalRecords' => $records->count(),
            'filters' => $request->only(['department_id', 'from_date', 'to_date']),
        ]);
    }


    public function leaveSummary(Request $request): Response
    {
        $departments = Department::where('status', 'active')->get(['id', 'name']);
        
        $query = LeaveApplication::with(['employee:id,employee_id,first_name,last_name,department_id,designation_id'])
            ->whereHas('employee', function ($q) use ($request) {
                $q->where('status', 'active');
                if ($request->filled('department_id')) $q->where('department_id', $request->department_id);
            });

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('from_date')) $query->whereDate('start_date', '>=', $request->from_date);
        if ($request->filled('to_date')) $query->whereDate('end_date', '<=', $request->to_date);

        $leaves = $query->orderBy('start_date', 'desc')->get([
            'id', 'employee_id', 'leave_type_id', 'start_date', 'end_date', 'reason', 'status'
        ]);

        $deptIds = $leaves->pluck('employee.department_id')->unique()->filter();
        $deptsMap = Department::whereIn('id', $deptIds)->pluck('name', 'id');
        
      
        $leaveTypeIds = $leaves->pluck('leave_type_id')->unique()->filter();
        $leaveTypesMap = \App\Models\LeaveType::whereIn('id', $leaveTypeIds)->pluck('name', 'id');

        foreach ($leaves as $leave) {
            $leave->department_name = $deptsMap[$leave->employee->department_id] ?? 'N/A';
            $leave->leave_type_name = $leaveTypesMap[$leave->leave_type_id] ?? 'N/A';
        }

        return Inertia::render('Reports/Staff/LeaveSummary', [
            'departments' => $departments,
            'leaves' => $leaves,
            'totalLeaves' => $leaves->count(),
            'filters' => $request->only(['department_id', 'status', 'from_date', 'to_date']),
        ]);
    }

  
    public function payrollSummary(Request $request): Response
    {
        $departments = Department::where('status', 'active')->get(['id', 'name']);
        
        $query = Payroll::with(['employee:id,employee_id,first_name,last_name,department_id,designation_id'])
            ->whereHas('employee', function ($q) use ($request) {
                if ($request->filled('department_id')) $q->where('department_id', $request->department_id);
            });

        if ($request->filled('month')) $query->where('month', $request->month);
        if ($request->filled('year')) $query->where('year', $request->year);
        if ($request->filled('status')) $query->where('status', $request->status);

        $payrolls = $query->orderBy('year', 'desc')->orderBy('month', 'desc')->get();

        $deptIds = $payrolls->pluck('employee.department_id')->unique()->filter();
        $deptsMap = Department::whereIn('id', $deptIds)->pluck('name', 'id');

        foreach ($payrolls as $payroll) {
            $payroll->department_name = $deptsMap[$payroll->employee->department_id] ?? 'N/A';
        }

        return Inertia::render('Reports/Staff/PayrollSummary', [
            'departments' => $departments,
            'payrolls' => $payrolls,
            'totalPayrolls' => $payrolls->count(),
            'filters' => $request->only(['department_id', 'month', 'year', 'status']),
        ]);
    }

    public function departmentWise(Request $request): Response
    {
        $departments = Department::where('status', 'active')->withCount([
            'employees' => function ($q) {
                $q->where('status', 'active');
            }
        ])->orderBy('name')->get(['id', 'name']);

        $employees = collect();
        
        if ($request->filled('department_id')) {
            $emps = Employee::where('status', 'active')
                ->where('department_id', $request->department_id)
                ->orderBy('first_name')
                ->get(['id', 'employee_id', 'first_name', 'last_name', 'phone', 'designation_id', 'joining_date']); 
            
            $desigIds = $emps->pluck('designation_id')->unique()->filter();
            $desigsMap = Designation::whereIn('id', $desigIds)->pluck('name', 'id');
            
            foreach ($emps as $emp) {
                $emp->designation_name = $desigsMap[$emp->designation_id] ?? 'N/A';
            }
            
            $employees = $emps;
        }

        return Inertia::render('Reports/Staff/DepartmentWise', [
            'departments' => $departments,
            'employees' => $employees,
            'totalEmployees' => $employees->count(),
            'filters' => $request->only(['department_id']),
        ]);
    }
}