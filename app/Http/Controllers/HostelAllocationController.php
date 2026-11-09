<?php

namespace App\Http\Controllers;

use App\Http\Requests\Hostel\HostelAllocationStoreRequest;
use App\Http\Requests\Hostel\HostelAllocationUpdateRequest;
use App\Http\Resources\HostelAllocationResource;
use App\Models\HostelAllocation;
use App\Services\HostelAllocationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HostelAllocationController extends Controller
{
    public function __construct(protected HostelAllocationService $service) {}

    private function getDropdownData() 
    {
        return [
            'students' => \App\Models\Student::where('status', 'active')->orderBy('first_name')->get(['id', 'first_name', 'last_name', 'admission_no']),
            'hostels' => \App\Models\Hostel::where('status', 'active')->get(['id', 'name', 'type']),
            'rooms' => \App\Models\HostelRoom::where('status', '!=', 'full')->get(['id', 'hostel_id', 'room_no', 'room_type', 'cost_per_bed']),
        ];
    }

    public function index(Request $request): Response
    {
        return Inertia::render('Hostels/Allocations/Index', [
            'allocations' => HostelAllocationResource::collection(
                $this->service->getAll(15, $request->only(['hostel_id', 'status']))
            ),
            'filters' => $request->only(['hostel_id', 'status']),
            ...$this->getDropdownData(),
        ]);
    }

    public function create(): Response 
    {
        return Inertia::render('Hostels/Allocations/Index', [
            'allocations' => HostelAllocationResource::collection($this->service->getAll(15)), 
            ...$this->getDropdownData()
        ]);
    }

    public function store(HostelAllocationStoreRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());
        return redirect()->route('hostels.allocations.index')->with('success', 'Hostel allocation created successfully.');
    }

    public function edit(HostelAllocation $allocation): Response 
    {
        $allocation->load(['student', 'hostel', 'room']);
        return Inertia::render('Hostels/Allocations/Index', [
            'allocations' => HostelAllocationResource::collection($this->service->getAll(15)), 
            ...$this->getDropdownData()
        ]);
    }

    public function update(HostelAllocationUpdateRequest $request, HostelAllocation $allocation): RedirectResponse
    {
        $this->service->update($allocation, $request->validated());
        return redirect()->route('hostels.allocations.index')->with('success', 'Hostel allocation updated successfully.');
    }

    public function discharge(HostelAllocation $allocation): RedirectResponse
    {
        $this->service->discharge($allocation);
        return back()->with('success', 'Student discharged from hostel successfully.');
    }

    public function destroy(HostelAllocation $allocation): RedirectResponse
    {
        $this->service->delete($allocation);
        return redirect()->route('hostels.allocations.index')->with('success', 'Hostel allocation deleted successfully.');
    }
}