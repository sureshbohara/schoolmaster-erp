<?php

namespace App\Http\Controllers;

use App\Http\Requests\Attendance\MarkAttendanceRequest;
use App\Models\ClassModel;
use App\Models\Section;
use App\Services\StudentAttendanceService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StudentAttendanceController extends Controller
{
    public function __construct(protected StudentAttendanceService $attendanceService) {}

    public function index(Request $request): Response
    {
        $classId   = $request->get('class_id');
        $sectionId = $request->get('section_id');
        $date      = $request->get('date', now()->format('Y-m-d'));

        $attendances = [];
        if ($classId && $sectionId) {
            $attendances = $this->attendanceService->getAttendanceByClassAndDate($classId, $sectionId, $date);
        }

        return Inertia::render('Attendance/Students/Index', [
            'attendances' => $attendances,
            'filters'     => $request->only(['class_id', 'section_id', 'date']),
            'dropdownData' => [
                'classes'  => ClassModel::where('status', 'active')->orderBy('order')->get(['id', 'name']),
                'sections' => Section::where('status', 'active')->orderBy('name')->get(['id', 'name', 'class_id']),
            ],
        ]);
    }

    public function store(MarkAttendanceRequest $request): RedirectResponse
    {
        $this->attendanceService->markAttendance($request->validated('attendances'));
        return back()->with('success', 'Attendance marked successfully.');
    }


    public function report(Request $request, int $studentId): Response
    {
        $month = $request->get('month', now()->month);
        $year  = $request->get('year', now()->year);

        return Inertia::render('Attendance/Students/Report', [
            'student_id' => $studentId,
            'report'     => $this->attendanceService->getMonthlyReport($studentId, $month, $year),
            'month'      => $month,
            'year'       => $year,
        ]);
    }
}