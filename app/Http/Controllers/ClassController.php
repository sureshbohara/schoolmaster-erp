<?php

namespace App\Http\Controllers;

use App\Http\Requests\Academic\ClassStoreRequest;
use App\Http\Requests\Academic\ClassUpdateRequest;
use App\Http\Resources\ClassResource;
use App\Models\ClassModel;
use App\Services\ClassService;
use App\Services\AcademicYearService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ClassController extends Controller
{
    public function __construct(
        protected ClassService $service,
        protected AcademicYearService $yearService
    ) {}

    public function index(): Response
    {
        return Inertia::render('Academic/Classes/Index', [
            'classes' => ClassResource::collection($this->service->getAll()),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Academic/Classes/Form', [
            'dropdownData' => [
                'academicYears' => $this->yearService->getAllActive(),
            ],
        ]);
    }

    public function store(ClassStoreRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());
        return redirect()->route('academic.classes.index')->with('success', 'Class created successfully.');
    }

    public function edit(ClassModel $class): Response
    {
        $class->load('academicYear');
        
        return Inertia::render('Academic/Classes/Form', [
            'class' => new ClassResource($class),
            'dropdownData' => [
                'academicYears' => $this->yearService->getAllActive(),
            ],
        ]);
    }

    public function update(ClassUpdateRequest $request, ClassModel $class): RedirectResponse
    {
        $this->service->update($class, $request->validated());
        return redirect()->route('academic.classes.index')->with('success', 'Class updated successfully.');
    }

    public function destroy(ClassModel $class): RedirectResponse
    {
        $this->service->delete($class);
        return redirect()->route('academic.classes.index')->with('success', 'Class deleted successfully.');
    }
}