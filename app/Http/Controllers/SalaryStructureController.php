<?php

namespace App\Http\Controllers;

use App\Http\Requests\HR\SalaryStructureStoreRequest;
use App\Http\Requests\HR\SalaryStructureUpdateRequest;
use App\Http\Resources\SalaryStructureResource;
use App\Models\Designation;
use App\Models\SalaryStructure;
use App\Services\SalaryStructureService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SalaryStructureController extends Controller
{
    public function __construct(protected SalaryStructureService $service) {}


    private function getDropdownData(){
        return [
            'designations' => Designation::where('status', 'active')->orderBy('name')->get(['id', 'name', 'department_id']),
        ];
    }

    public function index(): Response
    {
        return Inertia::render('HR/SalaryStructures/Index', [
            'structures' => SalaryStructureResource::collection($this->service->getAll()),
        ]);
    }


    public function create(): Response
    {
        return Inertia::render('HR/SalaryStructures/Form', [
            'dropdownData' => $this->getDropdownData(),
        ]);
    }


    public function store(SalaryStructureStoreRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());
        return redirect()->route('hr.salary-structures.index')->with('success', 'Salary structure created successfully.');
    }


    public function edit(SalaryStructure $salaryStructure): Response
    {
        $salaryStructure->load('designation');
        return Inertia::render('HR/SalaryStructures/Form', [
            'structure' => new SalaryStructureResource($salaryStructure),
            'dropdownData' => $this->getDropdownData(),
        ]);
    }


    public function update(SalaryStructureUpdateRequest $request, SalaryStructure $salaryStructure): RedirectResponse
    {
        $this->service->update($salaryStructure, $request->validated());
        return redirect()->route('hr.salary-structures.index')->with('success', 'Salary structure updated successfully.');
    }


    public function destroy(SalaryStructure $salaryStructure): RedirectResponse
    {
        $this->service->delete($salaryStructure);
        return redirect()->route('hr.salary-structures.index')->with('success', 'Salary structure deleted successfully.');
    }

    
}