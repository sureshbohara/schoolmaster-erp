<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use App\Models\AcademicYear;
use App\Models\Book;
use App\Models\BookIssue;
use App\Models\ClassModel;
use App\Models\FeePayment;
use App\Models\FeeStructure;
use App\Models\Hostel;
use App\Models\HostelAllocation;
use App\Models\HostelRoom;
use App\Models\RouteModel;
use App\Models\RouteStop;
use App\Models\Section;
use App\Models\Student;
use App\Models\StudentAttendance;
use App\Models\TransportAssignment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StudentReportController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Reports/Students/Index');
    }

    public function contactList(Request $request): Response
    {
        $classes = ClassModel::where('status', 'active')->with('sections')->get(['id', 'name']);
        
        $query = Student::where('status', 'active')
            ->orderBy('class_id')
            ->orderBy('section_id')
            ->orderBy('first_name');

        if ($request->filled('class_id')) {
            $query->where('class_id', $request->class_id);
        }

        if ($request->filled('section_id')) {
            $query->where('section_id', $request->section_id);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('admission_no', 'like', "%{$search}%")
                  ->orWhere('contact_number', 'like', "%{$search}%");
            });
        }

        $students = $query->get([
            'id', 'admission_no', 'first_name', 'last_name', 'class_id', 'section_id',
            'father_name', 'mother_name', 'contact_number', 'emergency_contact', 'address'
        ]);

        $classIds = $students->pluck('class_id')->unique()->filter();
        $sectionIds = $students->pluck('section_id')->unique()->filter();
        $classesMap = ClassModel::whereIn('id', $classIds)->pluck('name', 'id');
        $sectionsMap = Section::whereIn('id', $sectionIds)->pluck('name', 'id');

        foreach ($students as $student) {
            $student->class_name = $classesMap[$student->class_id] ?? 'N/A';
            $student->section_name = $sectionsMap[$student->section_id] ?? 'N/A';
        }

        return Inertia::render('Reports/Students/ContactList', [
            'classes' => $classes,
            'students' => $students,
            'totalContacts' => $students->count(),
            'filters' => $request->only(['class_id', 'section_id', 'search']),
        ]);
    }

    public function studentAttendance(Request $request): Response
    {
        $classes = ClassModel::where('status', 'active')->with('sections')->get(['id', 'name']);
        
        $query = StudentAttendance::with(['student:id,admission_no,first_name,last_name,class_id,section_id'])
            ->whereHas('student', function ($q) use ($request) {
                $q->where('status', 'active');
                if ($request->filled('class_id')) $q->where('class_id', $request->class_id);
                if ($request->filled('section_id')) $q->where('section_id', $request->section_id);
            });

        if ($request->filled('from_date')) {
            $query->whereDate('date', '>=', $request->from_date);
        }
        if ($request->filled('to_date')) {
            $query->whereDate('date', '<=', $request->to_date);
        }

        $records = $query->orderBy('date', 'desc')->orderBy('student_id')->get([
            'id', 'student_id', 'date', 'status'
        ]);

        $classIds = $records->pluck('student.class_id')->unique()->filter();
        $sectionIds = $records->pluck('student.section_id')->unique()->filter();

        $classesMap = ClassModel::whereIn('id', $classIds)->pluck('name', 'id');
        $sectionsMap = Section::whereIn('id', $sectionIds)->pluck('name', 'id');

        foreach ($records as $record) {
            $record->class_name = $classesMap[$record->student->class_id] ?? 'N/A';
            $record->section_name = $sectionsMap[$record->student->section_id] ?? 'N/A';
        }

        return Inertia::render('Reports/Students/Attendance', [
            'classes' => $classes,
            'records' => $records,
            'totalRecords' => $records->count(),
            'filters' => $request->only(['class_id', 'section_id', 'from_date', 'to_date']),
        ]);
    }

    public function feeStatus(Request $request): Response
    {
        $classes = ClassModel::where('status', 'active')->with('sections')->get(['id', 'name']);
        $years = AcademicYear::where('status', 'active')->orderBy('title', 'desc')->get(['id', 'title']);
        
        $query = Student::where('status', 'active')
            ->select('id', 'admission_no', 'first_name', 'last_name', 'class_id', 'section_id', 'academic_year_id');

        if ($request->filled('class_id')) $query->where('class_id', $request->class_id);
        if ($request->filled('section_id')) $query->where('section_id', $request->section_id);
        if ($request->filled('academic_year_id')) $query->where('academic_year_id', $request->academic_year_id);

        $students = $query->get();

        $studentsData = $students->map(function ($student) use ($request) {
            $totalPaid = FeePayment::where('student_id', $student->id)->sum('net_amount');
            
            $totalFee = FeeStructure::where('academic_year_id', $student->academic_year_id)
                ->where('class_id', $student->class_id)
                ->sum('amount');
            
            $dueAmount = max(0, $totalFee - $totalPaid);
            
            $status = 'Due';
            if ($totalFee == 0) {
                $status = 'No Fee';
            } elseif ($totalPaid >= $totalFee) {
                $status = 'Paid';
            } elseif ($totalPaid > 0 && $totalPaid < $totalFee) {
                $status = 'Partial';
            }

            if ($request->filled('fee_status') && $request->fee_status !== 'all') {
                if (strtolower($status) !== strtolower($request->fee_status)) {
                    return null; 
                }
            }

            $student->total_fee = $totalFee;
            $student->paid_amount = $totalPaid;
            $student->due_amount = $dueAmount;
            $student->fee_status = $status;
            
            return $student;
        })->filter()->values();

        $classIds = $studentsData->pluck('class_id')->unique()->filter();
        $sectionIds = $studentsData->pluck('section_id')->unique()->filter();

        $classesMap = ClassModel::whereIn('id', $classIds)->pluck('name', 'id');
        $sectionsMap = Section::whereIn('id', $sectionIds)->pluck('name', 'id');

        foreach ($studentsData as $student) {
            $student->class_name = $classesMap[$student->class_id] ?? 'N/A';
            $student->section_name = $sectionsMap[$student->section_id] ?? 'N/A';
        }

        return Inertia::render('Reports/Students/FeeStatus', [
            'classes' => $classes,
            'years' => $years,
            'students' => $studentsData,
            'totalStudents' => $studentsData->count(),
            'filters' => $request->only(['class_id', 'section_id', 'academic_year_id', 'fee_status']),
        ]);
    }

    public function admissionRegister(Request $request): Response
    {
        $classes = ClassModel::where('status', 'active')->with('sections')->get(['id', 'name']);
        $years = AcademicYear::where('status', 'active')->orderBy('title', 'desc')->get(['id', 'title']);
        
        $query = Student::where('status', 'active')
            ->select('id', 'admission_no', 'first_name', 'last_name', 'gender', 'dob', 'admission_date', 'class_id', 'section_id', 'father_name', 'contact_number', 'academic_year_id')
            ->orderBy('admission_date', 'desc')
            ->orderBy('admission_no', 'asc');

        if ($request->filled('academic_year_id')) $query->where('academic_year_id', $request->academic_year_id);
        if ($request->filled('class_id')) $query->where('class_id', $request->class_id);
        if ($request->filled('section_id')) $query->where('section_id', $request->section_id);

        $students = $query->get();

        $classIds = $students->pluck('class_id')->unique()->filter();
        $sectionIds = $students->pluck('section_id')->unique()->filter();

        $classesMap = ClassModel::whereIn('id', $classIds)->pluck('name', 'id');
        $sectionsMap = Section::whereIn('id', $sectionIds)->pluck('name', 'id');

        foreach ($students as $student) {
            $student->class_name = $classesMap[$student->class_id] ?? 'N/A';
            $student->section_name = $sectionsMap[$student->section_id] ?? 'N/A';
        }

        return Inertia::render('Reports/Students/AdmissionRegister', [
            'classes' => $classes,
            'years' => $years,
            'students' => $students,
            'totalStudents' => $students->count(),
            'filters' => $request->only(['academic_year_id', 'class_id', 'section_id']),
        ]);
    }

    public function transportUsers(Request $request): Response
    {
        $classes = ClassModel::where('status', 'active')->with('sections')->get(['id', 'name']);
        $routes = RouteModel::where('status', 'active')->get(['id', 'name']);

        $query = TransportAssignment::where('status', 'active')
            ->select('id', 'student_id', 'route_id', 'stop_id', 'monthly_fee', 'status');

        if ($request->filled('class_id')) {
            $query->whereHas('student', fn($q) => $q->where('class_id', $request->class_id));
        }
        if ($request->filled('section_id')) {
            $query->whereHas('student', fn($q) => $q->where('section_id', $request->section_id));
        }
        if ($request->filled('route_id')) {
            $query->where('route_id', $request->route_id);
        }

        $assignments = $query->get();

        $studentIds = $assignments->pluck('student_id')->unique();
        $studentsMap = Student::whereIn('id', $studentIds)
            ->with(['classModel:id,name', 'section:id,name'])
            ->get()
            ->keyBy('id');

        $routeIds = $assignments->pluck('route_id')->unique();
        $routesMap = RouteModel::whereIn('id', $routeIds)->pluck('name', 'id');

        $stopIds = $assignments->pluck('stop_id')->unique()->filter();
        $stopsMap = RouteStop::whereIn('id', $stopIds)->pluck('stop_name', 'id');

        $studentsData = $assignments->map(function ($assignment) use ($studentsMap, $routesMap, $stopsMap) {
            $student = $studentsMap[$assignment->student_id] ?? null;
            return [
                'admission_no' => $student->admission_no ?? 'N/A',
                'first_name' => $student->first_name ?? 'N/A',
                'last_name' => $student->last_name ?? '',
                'class_name' => $student->classModel?->name ?? 'N/A',
                'section_name' => $student->section?->name ?? 'N/A',
                'route_name' => $routesMap[$assignment->route_id] ?? 'N/A',
                'stop_name' => $stopsMap[$assignment->stop_id] ?? 'N/A',
                'monthly_fee' => $assignment->monthly_fee,
            ];
        });

        return Inertia::render('Reports/Students/TransportUsers', [
            'classes' => $classes,
            'routes' => $routes,
            'students' => $studentsData,
            'totalStudents' => $studentsData->count(),
            'filters' => $request->only(['class_id', 'section_id', 'route_id']),
        ]);
    }

    public function hostelUsers(Request $request): Response
    {
        $classes = ClassModel::where('status', 'active')->with('sections')->get(['id', 'name']);
        $hostels = Hostel::where('status', 'active')->get(['id', 'name', 'type']);

        $query = HostelAllocation::where('status', 'active')
            ->select('id', 'student_id', 'hostel_id', 'room_id', 'bed_no', 'monthly_fee', 'allocation_date', 'status');

        if ($request->filled('class_id')) {
            $query->whereHas('student', fn($q) => $q->where('class_id', $request->class_id));
        }
        if ($request->filled('section_id')) {
            $query->whereHas('student', fn($q) => $q->where('section_id', $request->section_id));
        }
        if ($request->filled('hostel_id')) {
            $query->where('hostel_id', $request->hostel_id);
        }

        $allocations = $query->get();

        $studentIds = $allocations->pluck('student_id')->unique();
        $studentsMap = Student::whereIn('id', $studentIds)->get()->keyBy('id');

        $hostelIds = $allocations->pluck('hostel_id')->unique();
        $hostelsMap = Hostel::whereIn('id', $hostelIds)->pluck('name', 'id');

        $roomIds = $allocations->pluck('room_id')->unique()->filter();
        $roomsMap = HostelRoom::whereIn('id', $roomIds)->pluck('room_no', 'id');

        $studentsData = $allocations->map(function ($allocation) use ($studentsMap, $hostelsMap, $roomsMap) {
            $student = $studentsMap[$allocation->student_id] ?? null;
            return [
                'admission_no' => $student->admission_no ?? 'N/A',
                'first_name' => $student->first_name ?? 'N/A',
                'last_name' => $student->last_name ?? '',
                'class_name' => $student->classModel?->name ?? 'N/A',
                'section_name' => $student->section?->name ?? 'N/A',
                'hostel_name' => $hostelsMap[$allocation->hostel_id] ?? 'N/A',
                'room_no' => $roomsMap[$allocation->room_id] ?? 'N/A',
                'bed_no' => $allocation->bed_no,
                'allocation_date' => $allocation->allocation_date?->format('Y-m-d'),
                'monthly_fee' => $allocation->monthly_fee,
            ];
        });

        return Inertia::render('Reports/Students/HostelUsers', [
            'classes' => $classes,
            'hostels' => $hostels,
            'students' => $studentsData,
            'totalStudents' => $studentsData->count(),
            'filters' => $request->only(['class_id', 'section_id', 'hostel_id']),
        ]);
    }

    public function libraryIssues(Request $request): Response
    {
        $classes = ClassModel::where('status', 'active')->with('sections')->get(['id', 'name']);
        
        $query = BookIssue::select('id', 'member_id', 'book_id', 'issue_date', 'due_date', 'return_date', 'member_type')
            ->where('member_type', 'student');

        if ($request->filled('class_id') || $request->filled('section_id')) {
            $query->whereHas('student', function ($q) use ($request) {
                if ($request->filled('class_id')) $q->where('class_id', $request->class_id);
                if ($request->filled('section_id')) $q->where('section_id', $request->section_id);
            });
        }

        if ($request->filled('status')) {
            if ($request->status === 'returned') {
                $query->whereNotNull('return_date');
            } elseif ($request->status === 'not_returned') {
                $query->whereNull('return_date');
            } elseif ($request->status === 'overdue') {
                $query->whereNull('return_date')->where('due_date', '<', now());
            }
        }

        $issues = $query->orderBy('issue_date', 'desc')->get();

        $memberIds = $issues->pluck('member_id')->unique()->filter();
        $studentsMap = Student::whereIn('id', $memberIds)
            ->with(['classModel:id,name', 'section:id,name'])
            ->get()
            ->keyBy('id');

        $bookIds = $issues->pluck('book_id')->unique()->filter();
        $booksMap = Book::whereIn('id', $bookIds)->pluck('title', 'id');

        $studentsData = $issues->map(function ($issue) use ($studentsMap, $booksMap) {
            $student = $studentsMap[$issue->member_id] ?? null;
            
            $status = 'Not Returned';
            if ($issue->return_date) {
                $status = 'Returned';
            } elseif ($issue->due_date && $issue->due_date < now()) {
                $status = 'Overdue';
            }

            return [
                'admission_no' => $student->admission_no ?? 'N/A',
                'first_name' => $student->first_name ?? 'N/A',
                'last_name' => $student->last_name ?? '',
                'class_name' => $student->classModel?->name ?? 'N/A',
                'section_name' => $student->section?->name ?? 'N/A',
                'book_title' => $booksMap[$issue->book_id] ?? 'N/A',
                'issue_date' => $issue->issue_date?->format('Y-m-d'),
                'due_date' => $issue->due_date?->format('Y-m-d'),
                'return_date' => $issue->return_date?->format('Y-m-d'),
                'status' => $status,
            ];
        });

        return Inertia::render('Reports/Students/LibraryIssues', [
            'classes' => $classes,
            'issues' => $studentsData,
            'totalIssues' => $studentsData->count(),
            'filters' => $request->only(['class_id', 'section_id', 'status']),
        ]);
    }
}