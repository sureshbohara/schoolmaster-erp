<?php

namespace App\Http\Controllers;

use App\Http\Requests\Academic\SubjectStoreRequest;
use App\Http\Requests\Academic\SubjectUpdateRequest;
use App\Http\Resources\SubjectResource;
use App\Models\Subject;
use App\Services\SubjectService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SubjectController extends Controller
{
    public function __construct(protected SubjectService $service) {}

    public function index(): Response
    {
        return Inertia::render('Academic/Subjects/Index', [
            'subjects' => SubjectResource::collection($this->service->getAll()),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Academic/Subjects/Form');
    }

    public function store(SubjectStoreRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());
        return redirect()->route('academic.subjects.index')->with('success', 'Subject created successfully.');
    }

    public function edit(Subject $subject): Response
    {
        return Inertia::render('Academic/Subjects/Form', [
            'subject' => new SubjectResource($subject),
        ]);
    }

    public function update(SubjectUpdateRequest $request, Subject $subject): RedirectResponse
    {
        $this->service->update($subject, $request->validated());
        return redirect()->route('academic.subjects.index')->with('success', 'Subject updated successfully.');
    }

    public function destroy(Subject $subject): RedirectResponse
    {
        $this->service->delete($subject);
        return redirect()->route('academic.subjects.index')->with('success', 'Subject deleted successfully.');
    }
}