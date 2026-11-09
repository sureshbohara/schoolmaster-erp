<?php

namespace App\Http\Controllers;

use App\Http\Requests\Exam\ExamStoreRequest;
use App\Http\Requests\Exam\ExamUpdateRequest;
use App\Http\Resources\ExamResource;
use App\Models\AcademicYear;
use App\Models\ClassModel;
use App\Models\Exam;
use App\Models\ExamType;
use App\Models\Subject;
use App\Services\ExamService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExamController extends Controller
{
    public function __construct(protected ExamService $examService) {}

    private function getDropdownData()
    {
        return [
            'examTypes' => ExamType::where('status', 'active')->orderBy('name')->get(['id', 'name']),
            'classes' => ClassModel::where('status', 'active')->orderBy('order')->get(['id', 'name']),
            'academicYears' => AcademicYear::where('status', 'active')->orderBy('title', 'desc')->get(['id', 'title']),
            'subjects' => Subject::where('status', 'active')->orderBy('name')->get(['id', 'name']),
        ];
    }

    public function index(Request $request): Response
    {
        return Inertia::render('Exams/Index', [
            'exams' => ExamResource::collection(
                $this->examService->getAll(15, $request->only(['class_id', 'academic_year_id', 'status']))
            ),
            'filters' => $request->only(['class_id', 'academic_year_id', 'status']),
            'dropdownData' => $this->getDropdownData(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Exams/Form', [
            'dropdownData' => $this->getDropdownData(),
        ]);
    }

    public function store(ExamStoreRequest $request): RedirectResponse
    {
        $this->examService->create($request->validated());
        return redirect()->route('exams.index')->with('success', 'Exam created successfully.');
    }

    public function edit(Exam $exam): Response
    {
        $exam->load(['examType', 'classModel', 'academicYear', 'schedules.subject']);
        
        return Inertia::render('Exams/Form', [
            'exam' => new ExamResource($exam),
            'dropdownData' => $this->getDropdownData(),
        ]);
    }

    public function update(ExamUpdateRequest $request, Exam $exam): RedirectResponse
    {
        $this->examService->update($exam, $request->validated());
        return redirect()->route('exams.index')->with('success', 'Exam updated successfully.');
    }

    public function destroy(Exam $exam): RedirectResponse
    {
        $this->examService->delete($exam);
        return redirect()->route('exams.index')->with('success', 'Exam deleted successfully.');
    }

    public function updateStatus(Request $request, Exam $exam): RedirectResponse
    {
        $validated = $request->validate(['status' => ['required', 'in:scheduled,ongoing,completed,published']]);
        $this->examService->updateStatus($exam, $validated['status']);
        return back()->with('success', 'Exam status updated successfully.');
    }
}