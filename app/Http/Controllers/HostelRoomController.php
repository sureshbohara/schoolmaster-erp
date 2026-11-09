<?php

namespace App\Http\Controllers;

use App\Http\Requests\Hostel\HostelRoomStoreRequest;
use App\Http\Requests\Hostel\HostelRoomUpdateRequest;
use App\Http\Resources\HostelRoomResource;
use App\Models\HostelRoom;
use App\Services\HostelRoomService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HostelRoomController extends Controller
{
    public function __construct(protected HostelRoomService $service) {}

    public function index(Request $request): Response
    {
        return Inertia::render('Hostels/Rooms/Index', [
            'rooms' => HostelRoomResource::collection(
                $this->service->getAll(15, $request->only(['hostel_id', 'status']))
            ),
            'filters' => $request->only(['hostel_id', 'status']),
            'hostels' => \App\Models\Hostel::where('status', 'active')->get(['id', 'name']),
        ]);
    }

    public function create(): Response 
    {
        return Inertia::render('Hostels/Rooms/Index', [
            'rooms' => HostelRoomResource::collection($this->service->getAll(15)),
            'hostels' => \App\Models\Hostel::where('status', 'active')->get(['id', 'name']),
        ]);
    }

    public function store(HostelRoomStoreRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());
        return redirect()->route('hostels.rooms.index')->with('success', 'Hostel room created successfully.');
    }

    public function edit(HostelRoom $room): Response 
    {
        $room->load('hostel'); 
        return Inertia::render('Hostels/Rooms/Index', [
            'rooms' => HostelRoomResource::collection($this->service->getAll(15)),
            'hostels' => \App\Models\Hostel::where('status', 'active')->get(['id', 'name']),
        ]);
    }

    public function update(HostelRoomUpdateRequest $request, HostelRoom $room): RedirectResponse
    {
        $this->service->update($room, $request->validated());
        return redirect()->route('hostels.rooms.index')->with('success', 'Hostel room updated successfully.');
    }

    public function destroy(HostelRoom $room): RedirectResponse
    {
        $this->service->delete($room);
        return redirect()->route('hostels.rooms.index')->with('success', 'Hostel room deleted successfully.');
    }
}