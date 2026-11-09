<?php

namespace App\Http\Controllers;

use App\Http\Requests\Fee\FeeStructureStoreRequest;
use App\Http\Requests\Fee\FeeStructureUpdateRequest;
use App\Http\Resources\FeeStructureResource;
use App\Models\AcademicYear;
use App\Models\ClassModel;
use App\Models\FeeStructure;
use App\Models\FeeType;
use App\Services\FeeStructureService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FeeStructureController extends Controller
{
    public function __construct(protected FeeStructureService $service) {}

    private function getDropdownData()
    {
        return [
            'academicYears' => AcademicYear::where('status', 'active')->orderBy('title', 'desc')->get(['id', 'title']),
            'classes' => ClassModel::where('status', 'active')->orderBy('order')->get(['id', 'name']),
            'feeTypes' => FeeType::where('status', 'active')->orderBy('name')->get(['id', 'name']),
        ];
    }

    public function index(Request $request): Response
    {
        return Inertia::render('Fees/Structures/Index', [
            'structures' => FeeStructureResource::collection(
                $this->service->getAll(15, $request->only(['class_id', 'academic_year_id', 'status']))
            ),
            'filters' => $request->only(['class_id', 'academic_year_id', 'status']),
            'dropdownData' => $this->getDropdownData(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Fees/Structures/Form', [
            'dropdownData' => $this->getDropdownData(),
        ]);
    }

    public function store(FeeStructureStoreRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());
        return redirect()->route('fees.structures.index')->with('success', 'Fee structure created successfully.');
    }

    public function edit(FeeStructure $structure): Response
    {
        $structure->load(['academicYear', 'classModel', 'feeType']);
        
        return Inertia::render('Fees/Structures/Form', [
            'structure' => new FeeStructureResource($structure),
            'dropdownData' => $this->getDropdownData(),
        ]);
    }

    public function update(FeeStructureUpdateRequest $request, FeeStructure $structure): RedirectResponse
    {
        $this->service->update($structure, $request->validated());
        return redirect()->route('fees.structures.index')->with('success', 'Fee structure updated successfully.');
    }

    public function destroy(FeeStructure $structure): RedirectResponse
    {
        $this->service->delete($structure);
        return redirect()->route('fees.structures.index')->with('success', 'Fee structure deleted successfully.');
    }
}