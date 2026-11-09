<?php

namespace App\Http\Controllers;

use App\Http\Requests\Exam\GradingSystemStoreRequest;
use App\Http\Requests\Exam\GradingSystemUpdateRequest;
use App\Http\Resources\GradingSystemResource;
use App\Models\GradingSystem;
use App\Services\GradingSystemService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class GradingSystemController extends Controller
{
    public function __construct(protected GradingSystemService $service) {}



    public function index(): Response
    {
        return Inertia::render('Exams/GradingSystems/Index', [
            'systems' => GradingSystemResource::collection($this->service->getAll()),
        ]);
    }


    public function store(GradingSystemStoreRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());
        return redirect()->route('exams.grading-systems.index')->with('success', 'Grading system created successfully.');
    }


    public function update(GradingSystemUpdateRequest $request, GradingSystem $system): RedirectResponse
    {
        $this->service->update($system, $request->validated());
        return redirect()->route('exams.grading-systems.index')->with('success', 'Grading system updated successfully.');
    }


    public function destroy(GradingSystem $system): RedirectResponse
    {
        $this->service->delete($system);
        return redirect()->route('exams.grading-systems.index')->with('success', 'Grading system deleted successfully.');
    }

    
}