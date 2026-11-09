<?php

namespace App\Http\Controllers;

use App\Http\Requests\Exam\MarkStoreRequest;
use App\Models\Exam;
use App\Models\Mark;
use App\Models\Student;
use App\Services\MarkService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MarkController extends Controller
{
    public function __construct(protected MarkService $service) {}

    public function index(Request $request): Response
    {
        $examId    = $request->get('exam_id');
        $studentId = $request->get('student_id');

        $marks = [];
        $examInfo = null;
        
        if ($examId && $studentId) {
            $marks = $this->service->getMarksByExamAndStudent($examId, $studentId)->toArray();
            $examInfo = Exam::with([
                'schedules.subject:id,name', 
                'classModel:id,name', 
                'examType:id,name'
            ])->find($examId);
        }

        return Inertia::render('Exams/Marks/Index', [
            'marks'        => $marks,
            'examInfo'     => $examInfo,
            'filters'      => $request->only(['exam_id', 'student_id']),
            'exams'        => Exam::with(['classModel:id,name', 'examType:id,name'])
                ->orderBy('start_date', 'desc')
                ->get(['id', 'name', 'class_id', 'exam_type_id', 'start_date']),
            'students'     => Student::where('status', 'active')
                ->with(['classModel:id,name'])
                ->orderBy('first_name')
                ->get(['id', 'admission_no', 'first_name', 'last_name', 'class_id']),
        ]);
    }

    public function store(MarkStoreRequest $request): RedirectResponse
    {
        $this->service->saveMarks($request->validated('marks'));
        return back()->with('success', 'Marks saved and Report Card updated successfully!');
    }


    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'exam_id'    => 'required|exists:exams,id',
            'student_id' => 'required|exists:students,id',
            'subject_id' => 'required|exists:subjects,id',
        ]);
        Mark::where('exam_id', $request->exam_id)
            ->where('student_id', $request->student_id)
            ->where('subject_id', $request->subject_id)
            ->delete();
        $this->service->generateReportCard((int)$request->exam_id, (int)$request->student_id);

        return back()->with('success', 'Mark deleted successfully!');
    }
}