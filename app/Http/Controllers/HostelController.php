<?php

namespace App\Http\Controllers;

use App\Http\Requests\Hostel\HostelStoreRequest;
use App\Http\Requests\Hostel\HostelUpdateRequest;
use App\Http\Resources\HostelResource;
use App\Models\Hostel;
use App\Services\HostelService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class HostelController extends Controller
{
    public function __construct(protected HostelService $hostelService) {}

    public function index(): Response
    {
        return Inertia::render('Hostels/Index', [
            'hostels' => HostelResource::collection($this->hostelService->getAll()),
        ]);
    }

    public function create(): Response {
        return Inertia::render('Hostels/Index', ['hostels' => HostelResource::collection($this->hostelService->getAll())]);
    }

    public function store(HostelStoreRequest $request): RedirectResponse
    {
        $this->hostelService->create($request->validated());
        return redirect()->route('hostels.index')->with('success', 'Hostel created successfully.');
    }

    public function edit(Hostel $hostel): Response {
        return Inertia::render('Hostels/Index', ['hostels' => HostelResource::collection($this->hostelService->getAll())]);
    }

    public function update(HostelUpdateRequest $request, Hostel $hostel): RedirectResponse
    {
        $this->hostelService->update($hostel, $request->validated());
        return redirect()->route('hostels.index')->with('success', 'Hostel updated successfully.');
    }

    public function destroy(Hostel $hostel): RedirectResponse
    {
        $this->hostelService->delete($hostel);
        return redirect()->route('hostels.index')->with('success', 'Hostel deleted successfully.');
    }
}