<?php

namespace App\Http\Controllers;

use App\Http\Requests\Attendance\MarkStaffAttendanceRequest;
use App\Models\Department;
use App\Services\StaffAttendanceService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StaffAttendanceController extends Controller
{
    public function __construct(protected StaffAttendanceService $attendanceService) {}

    public function index(Request $request): Response
    {
        $departmentId = $request->get('department_id');
        $date = $request->get('date', now()->format('Y-m-d'));

        $attendances = [];
        if ($departmentId) {
            $attendances = $this->attendanceService->getAttendanceByDepartmentAndDate($departmentId, $date);
        }

        return Inertia::render('Attendance/Staff/Index', [
            'attendances' => $attendances,
            'filters' => $request->only(['department_id', 'date']),
            'departments' => Department::where('status', 'active')->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(MarkStaffAttendanceRequest $request): RedirectResponse
    {
        $this->attendanceService->markAttendance($request->validated('attendances'));
        return back()->with('success', 'Staff attendance marked successfully.');
    }

   
    public function report(Request $request, int $employeeId): Response
    {
        $month = $request->get('month', now()->month);
        $year  = $request->get('year', now()->year);

        return Inertia::render('Attendance/Staff/Report', [
            'employee_id' => $employeeId,
            'report'      => $this->attendanceService->getMonthlyReport($employeeId, $month, $year),
            'month'       => $month,
            'year'        => $year,
        ]);
    }
}