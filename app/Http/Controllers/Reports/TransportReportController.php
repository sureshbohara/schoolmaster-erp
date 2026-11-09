<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use App\Models\RouteModel;
use App\Models\RouteStop;
use App\Models\TransportAssignment;
use App\Models\Vehicle;
use App\Models\VehicleType;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TransportReportController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Reports/Transport/Index');
    }

   
    public function routeWiseStudents(Request $request): Response
    {
        $routes = RouteModel::where('status', 'active')->with('vehicle:id,vehicle_no,model')->get(['id', 'name', 'vehicle_id']);

        $query = TransportAssignment::where('status', 'active')
            ->with([
                'student:id,admission_no,first_name,last_name,class_id,section_id',
                'route:id,name,vehicle_id',
                'stop:id,stop_name'
            ]);

        if ($request->filled('route_id')) {
            $query->where('route_id', $request->route_id);
        }

        $assignments = $query->orderBy('route_id')->orderBy('stop_id')->get([
            'id', 'student_id', 'route_id', 'stop_id', 'monthly_fee', 'pickup_point', 'drop_point'
        ]);

    
        $studentIds = $assignments->pluck('student_id')->unique();
        $studentsMap = \App\Models\Student::whereIn('id', $studentIds)
            ->with(['classModel:id,name', 'section:id,name'])
            ->get()
            ->keyBy('id');

        $data = $assignments->map(function ($a) use ($studentsMap) {
            $student = $studentsMap[$a->student_id] ?? null;
            return [
                'route_name' => $a->route?->name ?? 'N/A',
                'vehicle_no' => $a->route?->vehicle?->vehicle_no ?? 'N/A',
                'stop_name' => $a->stop?->stop_name ?? 'N/A',
                'admission_no' => $student->admission_no ?? 'N/A',
                'student_name' => $student ? "{$student->first_name} {$student->last_name}" : 'N/A',
                'class_name' => $student->classModel?->name ?? 'N/A',
                'section_name' => $student->section?->name ?? 'N/A',
                'monthly_fee' => $a->monthly_fee,
                'pickup_point' => $a->pickup_point,
                'drop_point' => $a->drop_point,
            ];
        });

        return Inertia::render('Reports/Transport/RouteWiseStudents', [
            'routes' => $routes,
            'data' => $data,
            'totalStudents' => $data->count(),
            'filters' => $request->only(['route_id']),
        ]);
    }

  
    public function vehicleAssignments(Request $request): Response
    {
        $vehicleTypes = VehicleType::where('status', 'active')->get(['id', 'name']);

        $query = Vehicle::with(['vehicleType:id,name', 'routes:id,name,vehicle_id,base_fare']);

        if ($request->filled('vehicle_type_id')) {
            $query->where('vehicle_type_id', $request->vehicle_type_id);
        }

        $vehicles = $query->get(['id', 'vehicle_type_id', 'vehicle_no', 'model', 'capacity', 'driver_name', 'driver_phone', 'status']);

        $data = $vehicles->map(function ($v) {
            $totalRoutes = $v->routes->count();
            $totalStudents = TransportAssignment::where('status', 'active')
                ->whereIn('route_id', $v->routes->pluck('id'))
                ->count();

            return [
                'vehicle_no' => $v->vehicle_no,
                'model' => $v->model,
                'vehicle_type' => $v->vehicleType?->name ?? 'N/A',
                'capacity' => $v->capacity,
                'driver_name' => $v->driver_name ?? 'N/A',
                'driver_phone' => $v->driver_phone ?? 'N/A',
                'total_routes' => $totalRoutes,
                'total_students' => $totalStudents,
                'status' => $v->status,
            ];
        });

        return Inertia::render('Reports/Transport/VehicleAssignments', [
            'vehicleTypes' => $vehicleTypes,
            'data' => $data,
            'totalVehicles' => $data->count(),
            'filters' => $request->only(['vehicle_type_id']),
        ]);
    }

  
    public function stopWiseStudents(Request $request): Response
    {
        $routes = RouteModel::where('status', 'active')->get(['id', 'name']);

        $query = TransportAssignment::where('status', 'active')
            ->with([
                'student:id,admission_no,first_name,last_name,class_id,section_id',
                'route:id,name',
                'stop:id,route_id,stop_name,fare'
            ]);

        if ($request->filled('route_id')) {
            $query->where('route_id', $request->route_id);
        }

        $assignments = $query->get(['id', 'student_id', 'route_id', 'stop_id', 'monthly_fee']);

       
        $grouped = $assignments->groupBy('stop_id');
        $data = [];

        foreach ($grouped as $stopId => $stopAssignments) {
            $first = $stopAssignments->first();
            $stop = $first?->stop;
            $route = $first?->route;

            $studentIds = $stopAssignments->pluck('student_id')->unique();
            $studentsMap = \App\Models\Student::whereIn('id', $studentIds)
                ->with(['classModel:id,name', 'section:id,name'])
                ->get()
                ->keyBy('id');

            $students = $stopAssignments->map(function ($a) use ($studentsMap) {
                $student = $studentsMap[$a->student_id] ?? null;
                return [
                    'admission_no' => $student->admission_no ?? 'N/A',
                    'student_name' => $student ? "{$student->first_name} {$student->last_name}" : 'N/A',
                    'class_name' => $student->classModel?->name ?? 'N/A',
                    'section_name' => $student->section?->name ?? 'N/A',
                    'monthly_fee' => $a->monthly_fee,
                ];
            });

            $data[] = [
                'stop_id' => $stopId,
                'stop_name' => $stop?->stop_name ?? 'N/A',
                'route_name' => $route?->name ?? 'N/A',
                'fare' => $stop?->fare ?? 0,
                'student_count' => $students->count(),
                'total_fee' => $stopAssignments->sum('monthly_fee'),
                'students' => $students,
            ];
        }

        return Inertia::render('Reports/Transport/StopWiseStudents', [
            'routes' => $routes,
            'data' => $data,
            'totalStops' => count($data),
            'filters' => $request->only(['route_id']),
        ]);
    }

    public function transportFee(Request $request): Response
    {
        $routes = RouteModel::where('status', 'active')->get(['id', 'name']);

        $query = TransportAssignment::where('status', 'active')
            ->with([
                'student:id,admission_no,first_name,last_name,class_id,section_id',
                'route:id,name',
                'stop:id,stop_name'
            ]);

        if ($request->filled('route_id')) {
            $query->where('route_id', $request->route_id);
        }

        $assignments = $query->get(['id', 'student_id', 'route_id', 'stop_id', 'monthly_fee']);

        $studentIds = $assignments->pluck('student_id')->unique();
        $studentsMap = \App\Models\Student::whereIn('id', $studentIds)
            ->with(['classModel:id,name', 'section:id,name'])
            ->get()
            ->keyBy('id');

        $data = $assignments->map(function ($a) use ($studentsMap) {
            $student = $studentsMap[$a->student_id] ?? null;
            return [
                'admission_no' => $student->admission_no ?? 'N/A',
                'student_name' => $student ? "{$student->first_name} {$student->last_name}" : 'N/A',
                'class_name' => $student->classModel?->name ?? 'N/A',
                'section_name' => $student->section?->name ?? 'N/A',
                'route_name' => $a->route?->name ?? 'N/A',
                'stop_name' => $a->stop?->stop_name ?? 'N/A',
                'monthly_fee' => $a->monthly_fee,
            ];
        });

        $totalMonthlyFee = $data->sum('monthly_fee');

        return Inertia::render('Reports/Transport/TransportFee', [
            'routes' => $routes,
            'data' => $data,
            'totalStudents' => $data->count(),
            'totalMonthlyFee' => $totalMonthlyFee,
            'filters' => $request->only(['route_id']),
        ]);
    }

 
    public function transportSummary(): Response
    {
        $totalVehicles = Vehicle::count();
        $activeVehicles = Vehicle::where('status', 'active')->count();
        $totalRoutes = RouteModel::where('status', 'active')->count();
        $totalStops = RouteStop::count();
        $totalStudents = TransportAssignment::where('status', 'active')->count();
        $totalMonthlyRevenue = TransportAssignment::where('status', 'active')->sum('monthly_fee');
        $totalCapacity = Vehicle::sum('capacity');
        $utilization = $totalCapacity > 0 ? round(($totalStudents / $totalCapacity) * 100, 2) : 0;

        $summary = [
            'total_vehicles' => $totalVehicles,
            'active_vehicles' => $activeVehicles,
            'total_routes' => $totalRoutes,
            'total_stops' => $totalStops,
            'total_students' => $totalStudents,
            'total_capacity' => $totalCapacity,
            'utilization' => $utilization,
            'total_monthly_revenue' => $totalMonthlyRevenue,
        ];


        $routeSummary = RouteModel::where('status', 'active')
            ->with(['vehicle:id,vehicle_no'])
            ->withCount(['assignments' => function ($q) {
                $q->where('status', 'active');
            }])
            ->get(['id', 'name', 'vehicle_id', 'base_fare'])
            ->map(function ($route) {
                $totalFee = TransportAssignment::where('status', 'active')
                    ->where('route_id', $route->id)
                    ->sum('monthly_fee');
                return [
                    'route_name' => $route->name,
                    'vehicle_no' => $route->vehicle?->vehicle_no ?? 'N/A',
                    'total_students' => $route->assignments_count,
                    'base_fare' => $route->base_fare,
                    'total_monthly_fee' => $totalFee,
                ];
            });

        return Inertia::render('Reports/Transport/TransportSummary', [
            'summary' => $summary,
            'routeSummary' => $routeSummary,
        ]);
    }
}