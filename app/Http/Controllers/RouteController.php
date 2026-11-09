<?php

namespace App\Http\Controllers;

use App\Http\Requests\Transport\RouteStoreRequest; 
use App\Http\Requests\Transport\RouteUpdateRequest;
use App\Http\Resources\RouteResource;
use App\Models\RouteModel; 
use App\Models\Vehicle;
use App\Services\RouteService; 
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class RouteController extends Controller
{
    public function __construct(protected RouteService $service) {}

    public function index(): Response
    {
        return Inertia::render('Transport/Routes/Index', [
            'routes' => RouteResource::collection($this->service->getAll()),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Transport/Routes/Form', [
            'vehicles' => Vehicle::where('status', 'active')->get(['id', 'vehicle_no', 'model']),
        ]);
    }

    public function store(RouteStoreRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());
        return redirect()->route('transport.routes.index')->with('success', 'Route created successfully.');
    }

    public function edit(RouteModel $route): Response
    {
        $route->load(['stops', 'vehicle']); 
        return Inertia::render('Transport/Routes/Form', [
            'routeData' => new RouteResource($route),
            'vehicles' => Vehicle::where('status', 'active')->get(['id', 'vehicle_no', 'model']),
        ]);
    }

    public function update(RouteUpdateRequest $request, RouteModel $route): RedirectResponse
    {
        $this->service->update($route, $request->validated());
        return redirect()->route('transport.routes.index')->with('success', 'Route updated successfully.');
    }

    public function destroy(RouteModel $route): RedirectResponse
    {
        $this->service->delete($route);
        return redirect()->route('transport.routes.index')->with('success', 'Route deleted successfully.');
    }
}