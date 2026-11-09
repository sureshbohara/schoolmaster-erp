<?php

namespace App\Http\Controllers;

use App\Http\Requests\Academic\AcademicYearStoreRequest;
use App\Http\Requests\Academic\AcademicYearUpdateRequest;
use App\Http\Resources\AcademicYearResource;
use App\Models\AcademicYear;
use App\Services\AcademicYearService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AcademicYearController extends Controller
{
    public function __construct(protected AcademicYearService $service) {}

    public function index(): Response
    {
        return Inertia::render('Academic/Years/Index', [
            'years' => AcademicYearResource::collection($this->service->getAll()),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Academic/Years/Form');
    }

    public function store(AcademicYearStoreRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());
        return redirect()->route('academic.years.index')->with('success', 'Academic year created successfully.');
    }

    public function edit(AcademicYear $year): Response
    {
        return Inertia::render('Academic/Years/Form', [
            'year' => new AcademicYearResource($year),
        ]);
    }

    public function update(AcademicYearUpdateRequest $request, AcademicYear $year): RedirectResponse
    {
        $this->service->update($year, $request->validated());
        return redirect()->route('academic.years.index')->with('success', 'Academic year updated successfully.');
    }

    public function destroy(AcademicYear $year): RedirectResponse
    {
        $this->service->delete($year);
        return redirect()->route('academic.years.index')->with('success', 'Academic year deleted successfully.');
    }
}