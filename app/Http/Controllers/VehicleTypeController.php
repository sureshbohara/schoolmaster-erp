<?php

namespace App\Http\Controllers;

use App\Http\Requests\Transport\VehicleTypeStoreRequest;
use App\Http\Requests\Transport\VehicleTypeUpdateRequest;
use App\Http\Resources\VehicleTypeResource;
use App\Models\VehicleType;
use App\Services\VehicleTypeService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class VehicleTypeController extends Controller
{
    public function __construct(protected VehicleTypeService $service) {}

    public function index(): Response
    {
        return Inertia::render('Transport/VehicleTypes/Index', [
            'types' => VehicleTypeResource::collection($this->service->getAll()),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Transport/VehicleTypes/Index', [
            'types' => VehicleTypeResource::collection($this->service->getAll()),
        ]);
    }

    public function store(VehicleTypeStoreRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());
        return redirect()->route('transport.vehicle-types.index')->with('success', 'Vehicle type created successfully.');
    }

    public function edit(VehicleType $type): Response
    {
        return Inertia::render('Transport/VehicleTypes/Index', [
            'types' => VehicleTypeResource::collection($this->service->getAll()),
        ]);
    }

    public function update(VehicleTypeUpdateRequest $request, VehicleType $type): RedirectResponse
    {
        $this->service->update($type, $request->validated());
        return redirect()->route('transport.vehicle-types.index')->with('success', 'Vehicle type updated successfully.');
    }

    public function destroy(VehicleType $type): RedirectResponse
    {
        $this->service->delete($type);
        return redirect()->route('transport.vehicle-types.index')->with('success', 'Vehicle type deleted successfully.');
    }
}