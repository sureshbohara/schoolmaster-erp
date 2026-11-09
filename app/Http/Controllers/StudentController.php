<?php

namespace App\Http\Controllers;

use App\Http\Requests\Student\StudentStoreRequest;
use App\Http\Requests\Student\StudentUpdateRequest;
use App\Http\Resources\StudentResource;
use App\Models\Student;
use App\Models\AcademicYear;
use App\Models\ClassModel;
use App\Models\Section;
use App\Models\StudentCategory;
use App\Services\StudentService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


use Maatwebsite\Excel\Facades\Excel;
use App\Exports\StudentsExport;
use App\Imports\StudentsImport;

class StudentController extends Controller
{

    public function __construct(StudentService $studentService) {
        $this->studentService = $studentService;
        $this->middleware('can:view_students')->only('index');
        $this->middleware('can:create_students')->only(['create', 'store', 'import']);
        $this->middleware('can:edit_students')->only(['edit', 'update', 'updateStatus']);
        $this->middleware('can:delete_students')->only('destroy');
        $this->middleware('can:export_students')->only('export');
    }
    

    private function getDropdownData()
    {
        return [
            'academicYears' => AcademicYear::where('status', 'active')->orderBy('title', 'desc')->get(['id', 'title']),
            'classes' => ClassModel::where('status', 'active')->orderBy('order')->get(['id', 'name', 'numeric_value']),
            'sections' => Section::where('status', 'active')->orderBy('name')->get(['id', 'name', 'class_id']),
            'categories' => StudentCategory::where('status', 'active')->orderBy('name')->get(['id', 'name']),
        ];
    }

    public function index(Request $request): Response
    {
        
        return Inertia::render('Students/Index', [
            'students' => StudentResource::collection(
                $this->studentService->getAll(15, $request->only(['class_id', 'section_id', 'status', 'search']))
            ),
            'filters' => $request->only(['class_id', 'section_id', 'status', 'search']),
            'dropdownData' => $this->getDropdownData(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Students/Form', [
            'dropdownData' => $this->getDropdownData(),
        ]);
    }

    public function store(StudentStoreRequest $request): RedirectResponse
    {
        $this->studentService->create($request->validated());
        return redirect()->route('students.index')->with('success', 'Student created successfully.');
    }

    public function edit(Student $student): Response
    {
        $student->load(['academicYear', 'classModel', 'section', 'category', 'guardians', 'documents']);
        
        return Inertia::render('Students/Form', [
            'student' => new StudentResource($student),
            'dropdownData' => $this->getDropdownData(),
        ]);
    }

    public function update(StudentUpdateRequest $request, Student $student): RedirectResponse
    {
        $this->studentService->update($student, $request->validated());
        return redirect()->route('students.index')->with('success', 'Student updated successfully.');
    }


    public function destroy(Student $student): RedirectResponse
    {
        $this->studentService->delete($student);
        return redirect()->route('students.index')->with('success', 'Student deleted successfully.');
    }


    public function updateStatus(Request $request, Student $student): RedirectResponse
    {
        $validated = $request->validate(['status' => ['required', 'in:active,inactive,graduated,tc_issued']]);
        $this->studentService->updateStatus($student, $validated['status']);
        return back()->with('success', 'Student status updated successfully.');
    }



    public function export(){
        return Excel::download(new StudentsExport, 'students_list_' . date('Y-m-d') . '.xlsx');
    }

 
    public function import(Request $request): RedirectResponse
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv|max:2048',
        ]);
        $import = new StudentsImport();
        Excel::import($import, $request->file('file'));
        if ($import->failures()->isNotEmpty()) {
            $errors = [];
            foreach ($import->failures() as $failure) {
                $errors[] = "Row {$failure->row()}: " . implode(', ', $failure->errors());
            }
            return back()->withErrors(['import' => $errors])->withInput();
        }

        return back()->with('success', 'Students imported successfully!');
    }
    
}