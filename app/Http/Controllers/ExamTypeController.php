<?php

namespace App\Http\Controllers;

use App\Http\Requests\Exam\ExamTypeStoreRequest;
use App\Http\Requests\Exam\ExamTypeUpdateRequest;
use App\Http\Resources\ExamTypeResource;
use App\Models\ExamType;
use App\Services\ExamTypeService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ExamTypeController extends Controller
{
    public function __construct(protected ExamTypeService $service) {}

    public function index(): Response
    {
        return Inertia::render('Exams/Types/Index', [
            'types' => ExamTypeResource::collection($this->service->getAll()),
        ]);
    }

 

    public function store(ExamTypeStoreRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());
        return redirect()->route('exams.types.index')->with('success', 'Exam type created successfully.');
    }

 

    public function update(ExamTypeUpdateRequest $request, ExamType $type): RedirectResponse
    {
        $this->service->update($type, $request->validated());
        return redirect()->route('exams.types.index')->with('success', 'Exam type updated successfully.');
    }

    public function destroy(ExamType $type): RedirectResponse
    {
        $this->service->delete($type);
        return redirect()->route('exams.types.index')->with('success', 'Exam type deleted successfully.');
    }
}