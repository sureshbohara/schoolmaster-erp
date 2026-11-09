<?php

namespace App\Http\Controllers;

use App\Models\AcademicYear;
use App\Models\BookIssue;
use App\Models\ClassModel;
use App\Models\Department;
use App\Models\Employee;
use App\Models\Exam;
use App\Models\FeePayment;
use App\Models\FeeStructure;
use App\Models\Hostel;
use App\Models\HostelAllocation;
use App\Models\LeaveApplication;
use App\Models\RouteModel;
use App\Models\Student;
use App\Models\StudentAttendance;
use App\Models\StaffAttendance;
use App\Models\TransportAssignment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function dashboard(): Response
    {
        $today = Carbon::today();
        $currentMonth = Carbon::now()->startOfMonth();
        $currentYear = Carbon::now()->year;

        // ============================================
        //  CORE STATS
        // ============================================
        $totalStudents = Student::where('status', 'active')->count();
        $totalStaff = Employee::where('status', 'active')->count();
        $totalClasses = ClassModel::where('status', 'active')->count();
        $totalDepartments = Department::where('status', 'active')->count();

        // ============================================
        //  FINANCIAL STATS
        // ============================================
        $totalFeeStructure = FeeStructure::sum('amount');
        
        $students = Student::where('status', 'active')->get(['id', 'class_id', 'academic_year_id']);
        $totalExpectedFee = 0;
        foreach ($students as $student) {
            $totalExpectedFee += FeeStructure::where('academic_year_id', $student->academic_year_id)
                ->where('class_id', $student->class_id)
                ->sum('amount');
        }

        // This month collection
        $thisMonthCollection = FeePayment::where('status', 'paid')
            ->whereMonth('payment_date', $today->month)
            ->whereYear('payment_date', $today->year)
            ->sum('net_amount');

        // Total collection ever
        $totalCollection = FeePayment::where('status', 'paid')->sum('net_amount');

        // Pending dues
        $totalPaid = FeePayment::where('status', 'paid')->sum('net_amount');
        $pendingDues = max(0, $totalExpectedFee - $totalPaid);

        // ============================================
        // ATTENDANCE STATS
        // ============================================
        $todayAttendance = StudentAttendance::whereDate('date', $today)->count();
        $todayPresent = StudentAttendance::whereDate('date', $today)
            ->where('status', 'present')
            ->count();
        $attendancePercentage = $todayAttendance > 0 
            ? round(($todayPresent / $todayAttendance) * 100, 1) 
            : 0;

        // Staff attendance today
        $staffPresent = StaffAttendance::whereDate('date', $today)
            ->where('status', 'present')
            ->count();

        // ============================================
        // LIBRARY STATS
        // ============================================
        $overdueBooks = BookIssue::whereNull('return_date')
            ->where('due_date', '<', $today)
            ->count();

        // ============================================
        // TRANSPORT & HOSTEL STATS
        // ============================================
        $transportStudents = TransportAssignment::where('status', 'active')->count();
        $hostelStudents = HostelAllocation::where('status', 'active')->count();
        $totalRoutes = RouteModel::where('status', 'active')->count();
        $totalHostels = Hostel::where('status', 'active')->count();

        // ============================================
        // RECENT ACTIVITIES
        // ============================================
        $recentFeePayments = FeePayment::with(['student:id,first_name,last_name,admission_no'])
            ->where('status', 'paid')
            ->orderBy('payment_date', 'desc')
            ->limit(5)
            ->get(['id', 'student_id', 'net_amount', 'payment_date', 'payment_method']);

        $recentAdmissions = Student::orderBy('created_at', 'desc')
            ->limit(5)
            ->get(['id', 'admission_no', 'first_name', 'last_name', 'created_at', 'class_id']);

        // Class names map
        $classIds = $recentAdmissions->pluck('class_id')->unique()->filter();
        $classesMap = ClassModel::whereIn('id', $classIds)->pluck('name', 'id');
        foreach ($recentAdmissions as $adm) {
            $adm->class_name = $classesMap[$adm->class_id] ?? 'N/A';
        }

        // ============================================
        // MONTHLY COLLECTION CHART (Last 6 months)
        // ============================================
        $monthlyCollection = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i);
            $amount = FeePayment::where('status', 'paid')
                ->whereMonth('payment_date', $month->month)
                ->whereYear('payment_date', $month->year)
                ->sum('net_amount');
            $monthlyCollection[] = [
                'month' => $month->format('M Y'),
                'amount' => $amount,
            ];
        }

        // ============================================
        // CLASS-WISE STUDENT DISTRIBUTION
        // ============================================
        $classWiseStudents = ClassModel::where('status', 'active')
            ->withCount(['students' => function ($q) {
                $q->where('status', 'active');
            }])
            ->orderBy('name')
            ->get(['id', 'name'])
            ->map(fn($c) => [
                'name' => $c->name,
                'count' => $c->students_count,
            ]);

        // ============================================
        // UPCOMING EXAMS
        // ============================================
        $upcomingExams = Exam::where('start_date', '>=', $today)
            ->orderBy('start_date', 'asc')
            ->limit(5)
            ->get(['id', 'name', 'start_date', 'end_date']);

        // ============================================
        //  PENDING LEAVES
        // ============================================
        $pendingLeaves = LeaveApplication::where('status', 'pending')->count();

        // ============================================
        // NEW THIS MONTH
        // ============================================
        $newStudentsThisMonth = Student::whereMonth('created_at', $today->month)
            ->whereYear('created_at', $today->year)
            ->count();
        $newStaffThisMonth = Employee::whereMonth('created_at', $today->month)
            ->whereYear('created_at', $today->year)
            ->count();

        return Inertia::render('Dashboard/Dashboard', [
            // Core Stats
            'totalStudents' => $totalStudents,
            'totalStaff' => $totalStaff,
            'totalClasses' => $totalClasses,
            'totalDepartments' => $totalDepartments,
            
            // Financial Stats
            'totalExpectedFee' => $totalExpectedFee,
            'thisMonthCollection' => $thisMonthCollection,
            'totalCollection' => $totalCollection,
            'pendingDues' => $pendingDues,
            
            // Attendance
            'attendancePercentage' => $attendancePercentage,
            'todayPresent' => $todayPresent,
            'todayTotalAttendance' => $todayAttendance,
            'staffPresent' => $staffPresent,
            
            // Library
            'overdueBooks' => $overdueBooks,
            
            // Transport & Hostel
            'transportStudents' => $transportStudents,
            'hostelStudents' => $hostelStudents,
            'totalRoutes' => $totalRoutes,
            'totalHostels' => $totalHostels,
            
            // Recent Activities
            'recentFeePayments' => $recentFeePayments,
            'recentAdmissions' => $recentAdmissions,
            
            // Charts
            'monthlyCollection' => $monthlyCollection,
            'classWiseStudents' => $classWiseStudents,
            
            // Upcoming
            'upcomingExams' => $upcomingExams,
            'pendingLeaves' => $pendingLeaves,
            
            // New This Month
            'newStudentsThisMonth' => $newStudentsThisMonth,
            'newStaffThisMonth' => $newStaffThisMonth,
        ]);
    }
}