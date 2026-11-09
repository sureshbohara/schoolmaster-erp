<?php

namespace App\Http\Controllers;

use App\Http\Requests\HR\DepartmentStoreRequest;
use App\Http\Requests\HR\DepartmentUpdateRequest;
use App\Http\Resources\DepartmentResource;
use App\Models\Department;
use App\Services\DepartmentService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class DepartmentController extends Controller
{
    public function __construct(protected DepartmentService $service) {}

    public function index(): Response
    {
        return Inertia::render('HR/Departments/Index', [
            'departments' => DepartmentResource::collection($this->service->getAll()),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('HR/Departments/Form');
    }

    public function store(DepartmentStoreRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());
        return redirect()->route('hr.departments.index')->with('success', 'Department created successfully.');
    }

    public function edit(Department $department): Response
    {
        return Inertia::render('HR/Departments/Form', [
            'department' => new DepartmentResource($department),
        ]);
    }

    public function update(DepartmentUpdateRequest $request, Department $department): RedirectResponse
    {
        $this->service->update($department, $request->validated());
        return redirect()->route('hr.departments.index')->with('success', 'Department updated successfully.');
    }

    public function destroy(Department $department): RedirectResponse
    {
        $this->service->delete($department);
        return redirect()->route('hr.departments.index')->with('success', 'Department deleted successfully.');
    }
}