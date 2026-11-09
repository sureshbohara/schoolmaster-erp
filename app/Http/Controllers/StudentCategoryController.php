<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Academic\StudentCategoryStoreRequest;
use App\Http\Requests\Academic\StudentCategoryUpdateRequest;
use App\Http\Resources\StudentCategoryResource;
use App\Models\StudentCategory;
use App\Services\StudentCategoryService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class StudentCategoryController extends Controller
{
    public function __construct(protected StudentCategoryService $service) {}

    public function index(): Response
    {
        return Inertia::render('Academic/StudentCategories/Index', [
            'categories' => StudentCategoryResource::collection($this->service->getAll()),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Academic/StudentCategories/Form');
    }

    public function store(StudentCategoryStoreRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());
        return redirect()->route('academic.student-categories.index')->with('success', 'Category created successfully.');
    }

    public function edit(StudentCategory $studentCategory): Response
    {
        return Inertia::render('Academic/StudentCategories/Form', [
            'category' => new StudentCategoryResource($studentCategory),
        ]);
    }

    public function update(StudentCategoryUpdateRequest $request, StudentCategory $studentCategory): RedirectResponse
    {
        $this->service->update($studentCategory, $request->validated());
        return redirect()->route('academic.student-categories.index')->with('success', 'Category updated successfully.');
    }

    public function destroy(StudentCategory $studentCategory): RedirectResponse
    {
        $this->service->delete($studentCategory);
        return redirect()->route('academic.student-categories.index')->with('success', 'Category deleted successfully.');
    }
}