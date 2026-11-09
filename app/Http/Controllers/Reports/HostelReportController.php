<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use App\Models\Hostel;
use App\Models\HostelAllocation;
use App\Models\HostelRoom;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HostelReportController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Reports/Hostel/Index');
    }

    public function hostelSummary(): Response
    {
        $totalHostels = Hostel::count();
        $activeHostels = Hostel::where('status', 'active')->count();
        $totalRooms = HostelRoom::count();
        $totalBeds = HostelRoom::sum('no_of_beds');
        $occupiedBeds = HostelAllocation::where('status', 'active')->count();
        $vacantBeds = max(0, $totalBeds - $occupiedBeds);
        $occupancyRate = $totalBeds > 0 ? round(($occupiedBeds / $totalBeds) * 100, 2) : 0;
        $totalMonthlyRevenue = HostelAllocation::where('status', 'active')->sum('monthly_fee');

        $summary = [
            'total_hostels' => $totalHostels,
            'active_hostels' => $activeHostels,
            'total_rooms' => $totalRooms,
            'total_beds' => $totalBeds,
            'occupied_beds' => $occupiedBeds,
            'vacant_beds' => $vacantBeds,
            'occupancy_rate' => $occupancyRate,
            'total_monthly_revenue' => $totalMonthlyRevenue,
        ];

     
        $hostelSummary = Hostel::where('status', 'active')
            ->withCount(['rooms'])
            ->get(['id', 'name', 'type'])
            ->map(function ($hostel) {
                $totalBeds = HostelRoom::where('hostel_id', $hostel->id)->sum('no_of_beds');
                $occupiedBeds = HostelAllocation::where('status', 'active')
                    ->where('hostel_id', $hostel->id)
                    ->count();
                $totalFee = HostelAllocation::where('status', 'active')
                    ->where('hostel_id', $hostel->id)
                    ->sum('monthly_fee');

                return [
                    'hostel_name' => $hostel->name,
                    'hostel_type' => $hostel->type,
                    'total_rooms' => $hostel->rooms_count,
                    'total_beds' => $totalBeds,
                    'occupied_beds' => $occupiedBeds,
                    'vacant_beds' => max(0, $totalBeds - $occupiedBeds),
                    'total_monthly_fee' => $totalFee,
                ];
            });

        return Inertia::render('Reports/Hostel/HostelSummary', [
            'summary' => $summary,
            'hostelSummary' => $hostelSummary,
        ]);
    }


    public function roomOccupancy(Request $request): Response
    {
        $hostels = Hostel::where('status', 'active')->get(['id', 'name']);

        $query = HostelRoom::with(['hostel:id,name']);

        if ($request->filled('hostel_id')) {
            $query->where('hostel_id', $request->hostel_id);
        }

        $rooms = $query->orderBy('hostel_id')->orderBy('room_no')->get([
            'id', 'hostel_id', 'room_no', 'room_type', 'cost_per_bed', 'no_of_beds', 'status'
        ]);

        $data = $rooms->map(function ($room) {
            $occupiedBeds = HostelAllocation::where('status', 'active')
                ->where('room_id', $room->id)
                ->count();
            $vacantBeds = max(0, $room->no_of_beds - $occupiedBeds);
            $occupancyRate = $room->no_of_beds > 0 ? round(($occupiedBeds / $room->no_of_beds) * 100, 2) : 0;

            return [
                'hostel_name' => $room->hostel?->name ?? 'N/A',
                'room_no' => $room->room_no,
                'room_type' => $room->room_type,
                'total_beds' => $room->no_of_beds,
                'occupied_beds' => $occupiedBeds,
                'vacant_beds' => $vacantBeds,
                'occupancy_rate' => $occupancyRate,
                'cost_per_bed' => $room->cost_per_bed,
                'status' => $room->status,
            ];
        });

        return Inertia::render('Reports/Hostel/RoomOccupancy', [
            'hostels' => $hostels,
            'data' => $data,
            'totalRooms' => $data->count(),
            'filters' => $request->only(['hostel_id']),
        ]);
    }

 
    public function hostelFee(Request $request): Response
    {
        $hostels = Hostel::where('status', 'active')->get(['id', 'name']);

        $query = HostelAllocation::where('status', 'active')
            ->with([
                'student:id,admission_no,first_name,last_name,class_id,section_id',
                'hostel:id,name',
                'room:id,room_no'
            ]);

        if ($request->filled('hostel_id')) {
            $query->where('hostel_id', $request->hostel_id);
        }

        $allocations = $query->get([
            'id', 'student_id', 'hostel_id', 'room_id', 'bed_no', 'monthly_fee', 'allocation_date'
        ]);

        // Class/Section map
        $studentIds = $allocations->pluck('student_id')->unique();
        $studentsMap = \App\Models\Student::whereIn('id', $studentIds)
            ->with(['classModel:id,name', 'section:id,name'])
            ->get()
            ->keyBy('id');

        $data = $allocations->map(function ($a) use ($studentsMap) {
            $student = $studentsMap[$a->student_id] ?? null;
            return [
                'hostel_name' => $a->hostel?->name ?? 'N/A',
                'room_no' => $a->room?->room_no ?? 'N/A',
                'bed_no' => $a->bed_no,
                'admission_no' => $student->admission_no ?? 'N/A',
                'student_name' => $student ? "{$student->first_name} {$student->last_name}" : 'N/A',
                'class_name' => $student->classModel?->name ?? 'N/A',
                'section_name' => $student->section?->name ?? 'N/A',
                'monthly_fee' => $a->monthly_fee,
                'allocation_date' => $a->allocation_date?->format('Y-m-d'),
            ];
        });

        $totalMonthlyFee = $data->sum('monthly_fee');

        return Inertia::render('Reports/Hostel/HostelFee', [
            'hostels' => $hostels,
            'data' => $data,
            'totalStudents' => $data->count(),
            'totalMonthlyFee' => $totalMonthlyFee,
            'filters' => $request->only(['hostel_id']),
        ]);
    }

   
    public function vacantRooms(Request $request): Response
    {
        $hostels = Hostel::where('status', 'active')->get(['id', 'name']);

        $query = HostelRoom::with(['hostel:id,name']);

        if ($request->filled('hostel_id')) {
            $query->where('hostel_id', $request->hostel_id);
        }

        $rooms = $query->get(['id', 'hostel_id', 'room_no', 'room_type', 'cost_per_bed', 'no_of_beds', 'status']);

        $data = $rooms->map(function ($room) {
            $occupiedBeds = HostelAllocation::where('status', 'active')
                ->where('room_id', $room->id)
                ->count();
            $vacantBeds = max(0, $room->no_of_beds - $occupiedBeds);

            if ($vacantBeds > 0) {
                return [
                    'hostel_name' => $room->hostel?->name ?? 'N/A',
                    'room_no' => $room->room_no,
                    'room_type' => $room->room_type,
                    'total_beds' => $room->no_of_beds,
                    'vacant_beds' => $vacantBeds,
                    'cost_per_bed' => $room->cost_per_bed,
                    'status' => $room->status,
                ];
            }
            return null;
        })->filter()->values();

        return Inertia::render('Reports/Hostel/VacantRooms', [
            'hostels' => $hostels,
            'data' => $data,
            'totalVacantRooms' => $data->count(),
            'totalVacantBeds' => $data->sum('vacant_beds'),
            'filters' => $request->only(['hostel_id']),
        ]);
    }

   
    public function hostelWiseStudents(Request $request): Response
    {
        $hostels = Hostel::where('status', 'active')->get(['id', 'name']);

        $query = HostelAllocation::where('status', 'active')
            ->with([
                'student:id,admission_no,first_name,last_name,class_id,section_id,contact_number,father_name',
                'hostel:id,name',
                'room:id,room_no'
            ]);

        if ($request->filled('hostel_id')) {
            $query->where('hostel_id', $request->hostel_id);
        }

        $allocations = $query->orderBy('hostel_id')->orderBy('room_id')->get([
            'id', 'student_id', 'hostel_id', 'room_id', 'bed_no', 'monthly_fee', 'allocation_date'
        ]);

        // Class/Section map
        $studentIds = $allocations->pluck('student_id')->unique();
        $studentsMap = \App\Models\Student::whereIn('id', $studentIds)
            ->with(['classModel:id,name', 'section:id,name'])
            ->get()
            ->keyBy('id');

        $data = $allocations->map(function ($a) use ($studentsMap) {
            $student = $studentsMap[$a->student_id] ?? null;
            return [
                'hostel_name' => $a->hostel?->name ?? 'N/A',
                'room_no' => $a->room?->room_no ?? 'N/A',
                'bed_no' => $a->bed_no,
                'admission_no' => $student->admission_no ?? 'N/A',
                'student_name' => $student ? "{$student->first_name} {$student->last_name}" : 'N/A',
                'class_name' => $student->classModel?->name ?? 'N/A',
                'section_name' => $student->section?->name ?? 'N/A',
                'father_name' => $student->father_name ?? 'N/A',
                'contact' => $student->contact_number ?? 'N/A',
                'monthly_fee' => $a->monthly_fee,
                'allocation_date' => $a->allocation_date?->format('Y-m-d'),
            ];
        });

        return Inertia::render('Reports/Hostel/HostelWiseStudents', [
            'hostels' => $hostels,
            'data' => $data,
            'totalStudents' => $data->count(),
            'filters' => $request->only(['hostel_id']),
        ]);
    }
}