<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        $modules = [
            'dashboard',
            'users', 'roles', 'permissions', 'branches', 'organizations', 'settings',
            'academic_years', 'classes', 'sections', 'subjects', 'student_categories',
            'students', 'attendance', 
            'employees', 'departments', 'designations', 'salary_structures', 'payrolls', 'leaves',
            'fee_types', 'fee_structures', 'fee_payments', 'incomes', 'expenses', 'bank_accounts',
            'exam_types', 'exams', 'grading_systems', 'marks',
            'book_categories', 'books', 'book_issues',
            'vehicle_types', 'vehicles', 'routes', 'transport_assignments',
            'hostels', 'hostel_rooms', 'hostel_allocations',
            'reports',
        ];

        $actions = ['view', 'create', 'edit', 'delete', 'export'];

        foreach ($modules as $module) {
            foreach ($actions as $action) {
                Permission::updateOrCreate(
                    [
                        'name'       => $action . '_' . $module, 
                        'guard_name' => 'web',
                    ],
                    [
                        'module' => $module,
                    ]
                );
            }
        }
    }
}