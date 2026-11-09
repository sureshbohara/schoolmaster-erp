<?php

namespace App\Http\Controllers;

use App\Http\Requests\Transport\TransportAssignmentStoreRequest;
use App\Http\Requests\Transport\TransportAssignmentUpdateRequest;
use App\Http\Resources\TransportAssignmentResource;
use App\Models\AcademicYear;
use App\Models\RouteModel;
use App\Models\Student;
use App\Models\TransportAssignment;
use App\Services\TransportAssignmentService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TransportAssignmentController extends Controller
{
    public function __construct(protected TransportAssignmentService $service) {}

    private function getDropdownData()
    {
        return [
            'students' => Student::where('status', 'active')
                ->orderBy('first_name')
                ->get(['id', 'first_name', 'last_name', 'admission_no']),
            'routes' => RouteModel::where('status', 'active')
                ->with('stops:id,route_id,stop_name,sequence')
                ->orderBy('name')
                ->get(['id', 'name']),
            'academicYears' => AcademicYear::where('status', 'active')
                ->orderBy('title', 'desc')
                ->get(['id', 'title']),
        ];
    }

    public function index(Request $request): Response
    {
        return Inertia::render('Transport/Assignments/Index', [
            'assignments' => TransportAssignmentResource::collection(
                $this->service->getAll(15, $request->only(['route_id', 'academic_year_id', 'status']))
            ),
            'filters' => $request->only(['route_id', 'academic_year_id', 'status']),
            ...$this->getDropdownData(),
        ]);
    }


    public function create(): Response
    {
        return Inertia::render('Transport/Assignments/Index', [
            'assignments' => TransportAssignmentResource::collection($this->service->getAll()),
            'filters' => [],
            ...$this->getDropdownData(),
        ]);
    }

    public function store(TransportAssignmentStoreRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());
        return redirect()->route('transport.assignments.index')->with('success', 'Transport assignment created successfully.');
    }


    public function edit(TransportAssignment $assignment): Response
    {
        $assignment->load(['student', 'route.stops:id,route_id,stop_name,sequence', 'academicYear']);

        return Inertia::render('Transport/Assignments/Index', [
            'assignments' => TransportAssignmentResource::collection($this->service->getAll()),
            'filters' => [],
            ...$this->getDropdownData(),
        ]);
    }

    public function update(TransportAssignmentUpdateRequest $request, TransportAssignment $assignment): RedirectResponse
    {
        $this->service->update($assignment, $request->validated());
        return redirect()->route('transport.assignments.index')->with('success', 'Transport assignment updated successfully.');
    }

    public function destroy(TransportAssignment $assignment): RedirectResponse
    {
        $this->service->delete($assignment);
        return redirect()->route('transport.assignments.index')->with('success', 'Transport assignment deleted successfully.');
    }
}