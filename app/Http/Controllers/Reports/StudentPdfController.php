<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use App\Models\AcademicYear;
use App\Models\Exam;
use App\Models\ExamSchedule;
use App\Models\Mark;
use App\Models\Setting;
use App\Models\Student;
use Barryvdh\DomPDF\Facade\Pdf;

class StudentPdfController extends Controller
{
   
    public function downloadIdCard(Student $student)
    {
        $settings = [
            'school_name' => Setting::get('school_name', 'Sunrise Secondary School'),
            'system_address' => Setting::get('system_address', 'Kathmandu, Nepal'),
            'system_phone' => Setting::get('system_phone', '+977-1-4XXXXXX'),
            'website' => Setting::get('website', 'www.school.com'),
            'system_logo' => Setting::get('system_logo', null),
        ];

        $logoPath = $settings['system_logo'] ? public_path('storage/' . $settings['system_logo']) : null;
        $studentPhoto = $student->photo ? public_path('storage/' . $student->photo) : null;

        $pdf = Pdf::loadView('pdf.student-id-card', compact('student', 'settings', 'logoPath', 'studentPhoto'))
            ->setPaper([0, 0, 250, 400], 'portrait');
            
        return $pdf->download('ID-Card-' . $student->admission_no . '.pdf');
    }

   
    public function downloadMarksheet(Exam $exam, Student $student)
    {
        $settings = [
            'school_name' => Setting::get('school_name', 'Sunrise Secondary School'),
            'system_address' => Setting::get('system_address', 'Kathmandu, Nepal'),
            'system_phone' => Setting::get('system_phone', '+977-1-4XXXXXX'),
            'system_logo' => Setting::get('system_logo', null),
        ];

        $logoPath = $settings['system_logo'] ? public_path('storage/' . $settings['system_logo']) : null;
        $studentPhoto = $student->photo ? public_path('storage/' . $student->photo) : null;

   
        $academicSession = '20__ - 20__'; 
        

        $defaultYearId = Setting::get('default_academic_year_id');
        $year = $defaultYearId ? AcademicYear::find($defaultYearId) : null;
        

        if (!$year) {
            $year = AcademicYear::where('is_active', true)
                ->orWhere('status', 'active')
                ->first();
        }
        

        if ($year) {
            $academicSession = $year->title;
        }


        $schedules = ExamSchedule::where('exam_id', $exam->id)
            ->get()
            ->keyBy('subject_id');

        // Marks ल्याएर full_marks र pass_marks map गर्ने
        $marks = Mark::where('exam_id', $exam->id)
            ->where('student_id', $student->id)
            ->with('subject:id,name,code')
            ->get()
            ->map(function($mark) use ($schedules) {
                $schedule = $schedules[$mark->subject_id] ?? null;
                $mark->full_marks = $schedule ? $schedule->full_mark : 100; 
                $mark->pass_marks = $schedule ? $schedule->pass_mark : 40; 
                return $mark;
            });

        $totalFullMarks = $marks->sum('full_marks');
        $totalPassMarks = $marks->sum('pass_marks');
        $totalObtained = $marks->sum('obtained_mark');
        
        $percentage = $totalFullMarks > 0 ? round(($totalObtained / $totalFullMarks) * 100, 2) : 0;
        
        $grade = 'F';
        $remark = 'Fail';
        if ($percentage >= 80) { $grade = 'A+'; $remark = 'Excellent'; }
        elseif ($percentage >= 70) { $grade = 'A'; $remark = 'Very Good'; }
        elseif ($percentage >= 60) { $grade = 'B+'; $remark = 'Good'; }
        elseif ($percentage >= 50) { $grade = 'B'; $remark = 'Satisfactory'; }
        elseif ($percentage >= 40) { $grade = 'C'; $remark = 'Pass'; }

        $hasFailed = $marks->firstWhere(function($mark) {
            return $mark->obtained_mark < $mark->pass_marks;
        });
        
        if ($hasFailed) {
            $grade = 'F';
            $remark = 'Fail';
        }

        $pdf = Pdf::loadView('pdf.student-marksheet', compact(
            'student', 'exam', 'marks', 'settings', 'logoPath', 'studentPhoto',
            'totalFullMarks', 'totalPassMarks', 'totalObtained', 'percentage', 'grade', 'remark', 'academicSession'
        ))->setPaper('A4', 'portrait');

        return $pdf->download('Marksheet-' . $student->admission_no . '-' . str_replace(' ', '-', $exam->name) . '.pdf');
    }

}