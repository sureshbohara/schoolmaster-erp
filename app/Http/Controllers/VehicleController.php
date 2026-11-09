<?php

namespace App\Http\Controllers;

use App\Http\Requests\Transport\VehicleStoreRequest;
use App\Http\Requests\Transport\VehicleUpdateRequest;
use App\Http\Resources\VehicleResource;
use App\Models\Vehicle;
use App\Models\VehicleType;
use App\Services\VehicleService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class VehicleController extends Controller
{
    public function __construct(protected VehicleService $service) {}

    public function index(): Response
    {
        return Inertia::render('Transport/Vehicles/Index', [
            'vehicles' => VehicleResource::collection($this->service->getAll()),
            'vehicleTypes' => VehicleType::where('status', 'active')->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Transport/Vehicles/Index', [
            'vehicles' => VehicleResource::collection($this->service->getAll()),
            'vehicleTypes' => VehicleType::where('status', 'active')->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(VehicleStoreRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());
        return redirect()->route('transport.vehicles.index')->with('success', 'Vehicle created successfully.');
    }

    public function edit(Vehicle $vehicle): Response
    {
        $vehicle->load('vehicleType'); 
        
        return Inertia::render('Transport/Vehicles/Index', [
            'vehicles' => VehicleResource::collection($this->service->getAll()),
            'vehicleTypes' => VehicleType::where('status', 'active')->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(VehicleUpdateRequest $request, Vehicle $vehicle): RedirectResponse
    {
        $this->service->update($vehicle, $request->validated());
        return redirect()->route('transport.vehicles.index')->with('success', 'Vehicle updated successfully.');
    }

    public function destroy(Vehicle $vehicle): RedirectResponse
    {
        $this->service->delete($vehicle);
        return redirect()->route('transport.vehicles.index')->with('success', 'Vehicle deleted successfully.');
    }
}