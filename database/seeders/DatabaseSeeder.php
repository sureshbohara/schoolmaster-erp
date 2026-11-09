<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            // Core Multi-Tenancy
            OrganizationSeeder::class,
            BranchSeeder::class,

            // Academic Setup
            AcademicYearSeeder::class,
            ClassSeeder::class,
            SectionSeeder::class,
            SubjectSeeder::class,
            StudentCategorySeeder::class,

            // RBAC
            PermissionSeeder::class,
            RoleSeeder::class,

            // HR Setup
            DepartmentSeeder::class,
            DesignationSeeder::class,
            LeaveTypeSeeder::class,

            // Fees Setup
            FeeTypeSeeder::class,
            FeeStructureSeeder::class,

            // Accounting Setup
            IncomeHeadSeeder::class,
            ExpenseHeadSeeder::class,
            BankAccountSeeder::class,

            // Exam Setup
            ExamTypeSeeder::class,
            GradingSystemSeeder::class,

            // Library Setup
            BookCategorySeeder::class,
            BookSeeder::class,

            // Transport Setup
            VehicleTypeSeeder::class,
            VehicleSeeder::class,
            RouteSeeder::class,

            // Hostel Setup
            HostelSeeder::class,

            // Users & People
            UserSeeder::class,
            EmployeeSeeder::class,
            StudentSeeder::class,
        ]);
    }
}