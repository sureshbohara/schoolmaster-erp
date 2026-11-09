<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Academic\SectionStoreRequest;
use App\Http\Requests\Academic\SectionUpdateRequest;
use App\Http\Resources\SectionResource;
use App\Models\ClassModel;
use App\Models\Section;
use App\Services\SectionService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SectionController extends Controller
{
    public function __construct(protected SectionService $service) {}

    public function index(): Response
    {
        return Inertia::render('Academic/Sections/Index', [
            'sections' => SectionResource::collection($this->service->getAllPaginated()),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Academic/Sections/Form', [
            'dropdownData' => [
                'classes' => ClassModel::where('status', 'active')->orderBy('order')->get(['id', 'name', 'numeric_value']),
            ],
        ]);
    }

    public function store(SectionStoreRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());
        return redirect()->route('academic.sections.index')->with('success', 'Section created successfully.');
    }

    public function edit(Section $section): Response
    {
        $section->load('classModel');
        return Inertia::render('Academic/Sections/Form', [
            'section' => new SectionResource($section),
            'dropdownData' => [
                'classes' => ClassModel::where('status', 'active')->orderBy('order')->get(['id', 'name', 'numeric_value']),
            ],
        ]);
    }

    public function update(SectionUpdateRequest $request, Section $section): RedirectResponse
    {
        $this->service->update($section, $request->validated());
        return redirect()->route('academic.sections.index')->with('success', 'Section updated successfully.');
    }

    public function destroy(Section $section): RedirectResponse
    {
        $this->service->delete($section);
        return redirect()->route('academic.sections.index')->with('success', 'Section deleted successfully.');
    }
}