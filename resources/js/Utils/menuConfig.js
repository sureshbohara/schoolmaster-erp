import {
    LayoutDashboard, GraduationCap, Users, Briefcase, Wallet,
    ClipboardList, BookOpen, Bus, Bed, Settings, Building2,
    ShieldCheck, Calendar, FileText, DollarSign, UserCheck,
    Banknote, Landmark, Layers, Award, BarChart3
} from 'lucide-react';

export const menuItems = [
    { name: 'Dashboard', href: 'dashboard', icon: LayoutDashboard, permission: 'view_dashboard' },
    {
        name: 'Academics',
        icon: GraduationCap,
        permission: 'view_classes',
        children: [
            { name: 'Academic Years', href: 'academic.years.index', icon: Calendar, permission: 'view_academic_years' },
            { name: 'Classes', href: 'academic.classes.index', icon: Building2, permission: 'view_classes' },
            { name: 'Sections', href: 'academic.sections.index', icon: Layers, permission: 'view_sections' }, 
            { name: 'Subjects', href: 'academic.subjects.index', icon: BookOpen, permission: 'view_subjects' },
            { name: 'Student Categories', href: 'academic.student-categories.index', icon: Users, permission: 'view_student_categories' }, 
        ]
    },
    {
        name: 'Students',
        icon: Users,
        permission: 'view_students',
        children: [
            { name: 'Admission / List', href: 'students.index', icon: UserCheck, permission: 'view_students' },
            { name: 'Attendance', href: 'attendance.students.index', icon: Calendar, permission: 'view_attendance' },
        ]
    },
    {
        name: 'Human Resource',
        icon: Briefcase,
        permission: 'view_employees',
        children: [
            { name: 'Employees', href: 'hr.employees.index', icon: Users, permission: 'view_employees' },
            { name: 'Departments', href: 'hr.departments.index', icon: Building2, permission: 'view_departments' },
            { name: 'Designations', href: 'hr.designations.index', icon: Building2, permission: 'view_designations' },
            { name: 'Salary Structures', href: 'hr.salary-structures.index', icon: Wallet, permission: 'view_salary_structures' }, 
            { name: 'Staff Attendance', href: 'attendance.staff.index', icon: Calendar, permission: 'view_attendance' }, 
            { name: 'Leave Applications', href: 'hr.leaves.index', icon: FileText, permission: 'view_leaves' },
            { name: 'Payroll & Salary', href: 'hr.payrolls.index', icon: Banknote, permission: 'view_payrolls' },
        ]
    },
    {
        name: 'Finance & Fees',
        icon: Wallet,
        permission: 'view_fee_payments',
        children: [
            { name: 'Fee Types', href: 'fees.types.index', icon: FileText, permission: 'view_fee_types' },
            { name: 'Fee Structures', href: 'fees.structures.index', icon: FileText, permission: 'view_fee_structures' },
            { name: 'Fee Collections', href: 'fees.payments.index', icon: DollarSign, permission: 'view_fee_payments' },
            { name: 'Incomes', href: 'accounting.incomes.index', icon: Landmark, permission: 'view_incomes' },
            { name: 'Expenses', href: 'accounting.expenses.index', icon: Banknote, permission: 'view_expenses' },
            { name: 'Bank Accounts', href: 'accounting.bank-accounts.index', icon: Landmark, permission: 'view_bank_accounts' },
        ]
    },
    {
        name: 'Examinations',
        icon: ClipboardList,
        permission: 'view_exams',
        children: [
            { name: 'Exam Types', href: 'exams.types.index', icon: FileText, permission: 'view_exam_types' },
            { name: 'Exams & Schedules', href: 'exams.index', icon: Calendar, permission: 'view_exams' },
            { name: 'Grading Systems', href: 'exams.grading-systems.index', icon: Award, permission: 'view_grading_systems' }, 
            { name: 'Marks & Grading', href: 'exams.marks.index', icon: ClipboardList, permission: 'view_marks' },
        ]
    },
    {
        name: 'Library',
        icon: BookOpen,
        permission: 'view_books',
        children: [
            { name: 'Book Categories', href: 'library.categories.index', icon: BookOpen, permission: 'view_book_categories' },
            { name: 'Books List', href: 'library.books.index', icon: BookOpen, permission: 'view_books' },
            { name: 'Issue / Return', href: 'library.issues.index', icon: FileText, permission: 'view_book_issues' },
        ]
    },
    {
        name: 'Transport',
        icon: Bus,
        permission: 'view_vehicles',
        children: [
            { name: 'Vehicle Types', href: 'transport.vehicle-types.index', icon: Bus, permission: 'view_vehicle_types' },
            { name: 'Vehicles', href: 'transport.vehicles.index', icon: Bus, permission: 'view_vehicles' },
            { name: 'Routes & Stops', href: 'transport.routes.index', icon: Calendar, permission: 'view_routes' },
            { name: 'Assignments', href: 'transport.assignments.index', icon: UserCheck, permission: 'view_transport_assignments' },
        ]
    },
    {
        name: 'Hostel',
        icon: Bed,
        permission: 'view_hostels',
        children: [
            { name: 'Hostels', href: 'hostels.index', icon: Building2, permission: 'view_hostels' },
            { name: 'Rooms', href: 'hostels.rooms.index', icon: Bed, permission: 'view_hostel_rooms' },
            { name: 'Allocations', href: 'hostels.allocations.index', icon: UserCheck, permission: 'view_hostel_allocations' },
        ]
    },
    {
        name: 'Reports',
        href: 'reports.index',
        icon: BarChart3,
        permission: 'view_reports'
    },
    {
        name: 'Administration',
        icon: Settings,
        permission: 'view_settings',
        children: [
            { name: 'System Settings', href: 'settings.index', icon: Settings, permission: 'view_settings' },
            { name: 'Organizations', href: 'organizations.index', icon: Building2, permission: 'view_organizations' },
            { name: 'Branches', href: 'branches.index', icon: Building2, permission: 'view_branches' },
            { name: 'Users', href: 'users.index', icon: Users, permission: 'view_users' },
            { name: 'Roles', href: 'roles.index', icon: ShieldCheck, permission: 'view_roles' },
        ]
    },
];