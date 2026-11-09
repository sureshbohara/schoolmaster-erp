<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use App\Models\AcademicYear;
use App\Models\ClassModel;
use App\Models\Exam;
use App\Models\ExamSchedule;
use App\Models\ExamType;
use App\Models\Mark;
use App\Models\ReportCard;
use App\Models\Section;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExaminationReportController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Reports/Examinations/Index');
    }

    public function reportCard(Request $request): Response
    {
        $classes = ClassModel::where('status', 'active')->with('sections')->get(['id', 'name']);
        $exams = Exam::with('examType:id,name')->orderBy('id', 'desc')->get(['id', 'name', 'exam_type_id', 'class_id']);

        $reportCards = collect();
        
        if ($request->filled('exam_id') && $request->filled('student_id')) {
            $reportCards = ReportCard::with([
                'student:id,admission_no,first_name,last_name,class_id,section_id',
                'exam:id,name,exam_type_id,class_id',
                'exam.examType:id,name'
            ])->where('exam_id', $request->exam_id)
              ->whereHas('student', function ($q) use ($request) {
                  $q->where('admission_no', 'like', '%' . $request->student_id . '%')
                    ->orWhere('id', $request->student_id);
              })
              ->get();
              
        } elseif ($request->filled('exam_id')) {
            $reportCards = ReportCard::with([
                'student:id,admission_no,first_name,last_name,class_id,section_id',
                'exam:id,name,exam_type_id,class_id',
                'exam.examType:id,name'
            ])->where('exam_id', $request->exam_id)
              ->orderBy('rank_in_class', 'asc')
              ->get();
        }

        $classIds = $reportCards->pluck('student.class_id')->unique()->filter();
        $sectionIds = $reportCards->pluck('student.section_id')->unique()->filter();
        $classesMap = ClassModel::whereIn('id', $classIds)->pluck('name', 'id');
        $sectionsMap = Section::whereIn('id', $sectionIds)->pluck('name', 'id');

        foreach ($reportCards as $rc) {
            $rc->class_name = $classesMap[$rc->student->class_id] ?? 'N/A';
            $rc->section_name = $sectionsMap[$rc->student->section_id] ?? 'N/A';
        }

        return Inertia::render('Reports/Examinations/ReportCard', [
            'classes' => $classes,
            'exams' => $exams,
            'reportCards' => $reportCards,
            'totalCards' => $reportCards->count(),
            'filters' => $request->only(['exam_id', 'student_id']),
        ]);
    }

  
    public function resultAnalysis(Request $request): Response
    {
        $classes = ClassModel::where('status', 'active')->with('sections')->get(['id', 'name']);
        $exams = Exam::with('examType:id,name')->orderBy('id', 'desc')->get(['id', 'name', 'exam_type_id', 'class_id']);

        $analysis = [];
        if ($request->filled('exam_id')) {
            $cards = ReportCard::with('student:id,class_id,section_id')
                ->where('exam_id', $request->exam_id)
                ->get();

            $grouped = $cards->groupBy('student.class_id');
            foreach ($grouped as $classId => $classCards) {
                $total = $classCards->count();
                $passed = $classCards->where('grade', '!=', 'F')->where('grade', '!=', 'Fail')->count();
                $failed = $total - $passed;
                $avgPercentage = $total > 0 ? $classCards->avg('percentage') : 0;

                $analysis[] = [
                    'class_id' => $classId,
                    'class_name' => ClassModel::find($classId)?->name ?? 'N/A',
                    'total_students' => $total,
                    'passed' => $passed,
                    'failed' => $failed,
                    'pass_percentage' => $total > 0 ? round(($passed / $total) * 100, 2) : 0,
                    'avg_percentage' => round($avgPercentage, 2),
                ];
            }
        }

        return Inertia::render('Reports/Examinations/ResultAnalysis', [
            'classes' => $classes,
            'exams' => $exams,
            'analysis' => $analysis,
            'filters' => $request->only(['exam_id']),
        ]);
    }

  
    public function gradeDistribution(Request $request): Response
    {
        $exams = Exam::with('examType:id,name')->orderBy('id', 'desc')->get(['id', 'name', 'exam_type_id', 'class_id']);

        $distribution = [];
        if ($request->filled('exam_id')) {
            $cards = ReportCard::where('exam_id', $request->exam_id)->get();
            $grouped = $cards->groupBy('grade');
            foreach ($grouped as $grade => $gradeCards) {
                $distribution[] = [
                    'grade' => $grade ?: 'N/A',
                    'count' => $gradeCards->count(),
                    'percentage' => $cards->count() > 0 ? round(($gradeCards->count() / $cards->count()) * 100, 2) : 0,
                ];
            }
            usort($distribution, fn($a, $b) => strcmp($a['grade'], $b['grade']));
        }

        return Inertia::render('Reports/Examinations/GradeDistribution', [
            'exams' => $exams,
            'distribution' => $distribution,
            'totalStudents' => $request->filled('exam_id') ? ReportCard::where('exam_id', $request->exam_id)->count() : 0,
            'filters' => $request->only(['exam_id']),
        ]);
    }

 
    public function meritList(Request $request): Response
    {
        $classes = ClassModel::where('status', 'active')->with('sections')->get(['id', 'name']);
        $exams = Exam::with('examType:id,name')->orderBy('id', 'desc')->get(['id', 'name', 'exam_type_id', 'class_id']);

        $topStudents = collect();
        if ($request->filled('exam_id')) {
            $query = ReportCard::with([
                'student:id,admission_no,first_name,last_name,class_id,section_id',
                'exam:id,name,class_id'
            ])->where('exam_id', $request->exam_id);

            if ($request->filled('class_id')) {
                $query->whereHas('student', fn($q) => $q->where('class_id', $request->class_id));
            }

            $topStudents = $query->orderBy('percentage', 'desc')
                ->limit($request->input('limit', 10))
                ->get();

            $classIds = $topStudents->pluck('student.class_id')->unique()->filter();
            $sectionIds = $topStudents->pluck('student.section_id')->unique()->filter();
            $classesMap = ClassModel::whereIn('id', $classIds)->pluck('name', 'id');
            $sectionsMap = Section::whereIn('id', $sectionIds)->pluck('name', 'id');

            foreach ($topStudents as $index => $rc) {
                $rc->class_name = $classesMap[$rc->student->class_id] ?? 'N/A';
                $rc->section_name = $sectionsMap[$rc->student->section_id] ?? 'N/A';
                $rc->position = $index + 1;
            }
        }

        return Inertia::render('Reports/Examinations/MeritList', [
            'classes' => $classes,
            'exams' => $exams,
            'topStudents' => $topStudents,
            'filters' => $request->only(['exam_id', 'class_id', 'limit']),
        ]);
    }

 
    public function markSheet(Request $request): Response
    {
        $classes = ClassModel::where('status', 'active')->with('sections')->get(['id', 'name']);
        $exams = Exam::with('examType:id,name')->orderBy('id', 'desc')->get(['id', 'name', 'exam_type_id', 'class_id']);

        $marksData = collect();

        if ($request->filled('exam_id')) {
            $query = Mark::with([
                'student:id,admission_no,first_name,last_name,class_id,section_id',
                'subject:id,name,code'
            ])->where('exam_id', $request->exam_id);

            if ($request->filled('student_id')) {
                $query->whereHas('student', function ($q) use ($request) {
                    $q->where('admission_no', 'like', '%' . $request->student_id . '%')
                      ->orWhere('id', $request->student_id);
                });
            } elseif ($request->filled('class_id')) {
                $query->whereHas('student', fn($q) => $q->where('class_id', $request->class_id));
            }

            $marks = $query->orderBy('student_id')->get();

  
            $schedules = ExamSchedule::where('exam_id', $request->exam_id)
                ->get()
                ->keyBy('subject_id');

            $marksData = $marks->map(function ($mark) use ($schedules) {
                $schedule = $schedules[$mark->subject_id] ?? null;
                
                $mark->full_marks = $schedule->full_mark ?? 0;
                $mark->pass_marks = $schedule->pass_mark ?? 0;
                $mark->marks_obtained = $mark->obtained_mark ?? 0; 
                
                return $mark;
            });
        }

        return Inertia::render('Reports/Examinations/MarkSheet', [
            'classes' => $classes,
            'exams' => $exams,
            'marks' => $marksData,
            'filters' => $request->only(['exam_id', 'student_id', 'class_id']),
        ]);
    }
}