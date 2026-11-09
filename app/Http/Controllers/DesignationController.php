<?php

namespace App\Http\Controllers;

use App\Http\Requests\HR\DesignationStoreRequest;
use App\Http\Requests\HR\DesignationUpdateRequest;
use App\Http\Resources\DesignationResource;
use App\Models\Department;
use App\Models\Designation;
use App\Services\DesignationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DesignationController extends Controller
{
    public function __construct(protected DesignationService $service) {}

    public function index(): Response
    {
        return Inertia::render('HR/Designations/Index', [
            'designations' => DesignationResource::collection($this->service->getAll()),
            'departments' => Department::where('status', 'active')->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('HR/Designations/Form', [
            'departments' => Department::where('status', 'active')->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(DesignationStoreRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());
        return redirect()->route('hr.designations.index')->with('success', 'Designation created successfully.');
    }

    public function edit(Designation $designation): Response
    {
        $designation->load('department');
        
        return Inertia::render('HR/Designations/Form', [
            'designation' => new DesignationResource($designation),
            'departments' => Department::where('status', 'active')->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(DesignationUpdateRequest $request, Designation $designation): RedirectResponse
    {
        $this->service->update($designation, $request->validated());
        return redirect()->route('hr.designations.index')->with('success', 'Designation updated successfully.');
    }

    public function destroy(Designation $designation): RedirectResponse
    {
        $this->service->delete($designation);
        return redirect()->route('hr.designations.index')->with('success', 'Designation deleted successfully.');
    }

    public function getByDepartment(Request $request): \Illuminate\Http\JsonResponse
    {
        $request->validate(['department_id' => ['required', 'exists:departments,id']]);
        return response()->json($this->service->getByDepartment($request->department_id));
    }
}