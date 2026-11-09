<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Designation;
use Illuminate\Database\Seeder;

class DesignationSeeder extends Seeder
{
    public function run(): void
    {
        $adminDept    = Department::where('name', 'Administration')->first();
        $academicDept = Department::where('name', 'Academic')->first();
        $scienceDept  = Department::where('name', 'Science')->first();
        $mathDept     = Department::where('name', 'Mathematics')->first();
        $englishDept  = Department::where('name', 'English')->first();
        $nepaliDept   = Department::where('name', 'Nepali')->first();
        $socialDept   = Department::where('name', 'Social Studies')->first();
        $computerDept = Department::where('name', 'Computer')->first();
        $accountsDept = Department::where('name', 'Accounts')->first();
        $libraryDept  = Department::where('name', 'Library')->first();
        $sportsDept   = Department::where('name', 'Sports')->first();

        $designations = [
            ['department_id' => $adminDept->id, 'name' => 'Principal', 'description' => 'School Principal', 'status' => 'active'],
            ['department_id' => $adminDept->id, 'name' => 'Vice Principal', 'description' => 'Vice Principal', 'status' => 'active'],
            ['department_id' => $adminDept->id, 'name' => 'Administrative Officer', 'description' => 'Admin officer', 'status' => 'active'],
            ['department_id' => $adminDept->id, 'name' => 'Receptionist', 'description' => 'Front desk', 'status' => 'active'],
            ['department_id' => $academicDept->id, 'name' => 'Head of Department', 'description' => 'HOD', 'status' => 'active'],
            ['department_id' => $academicDept->id, 'name' => 'Senior Teacher', 'description' => 'Senior teaching staff', 'status' => 'active'],
            ['department_id' => $academicDept->id, 'name' => 'Teacher', 'description' => 'Teaching staff', 'status' => 'active'],
            ['department_id' => $academicDept->id, 'name' => 'Assistant Teacher', 'description' => 'Assistant teaching staff', 'status' => 'active'],
            ['department_id' => $scienceDept->id, 'name' => 'Science Teacher', 'description' => 'Science faculty', 'status' => 'active'],
            ['department_id' => $mathDept->id, 'name' => 'Math Teacher', 'description' => 'Mathematics faculty', 'status' => 'active'],
            ['department_id' => $englishDept->id, 'name' => 'English Teacher', 'description' => 'English faculty', 'status' => 'active'],
            ['department_id' => $nepaliDept->id, 'name' => 'Nepali Teacher', 'description' => 'Nepali faculty', 'status' => 'active'],
            ['department_id' => $socialDept->id, 'name' => 'Social Studies Teacher', 'description' => 'Social studies faculty', 'status' => 'active'],
            ['department_id' => $computerDept->id, 'name' => 'Computer Teacher', 'description' => 'Computer faculty', 'status' => 'active'],
            ['department_id' => $accountsDept->id, 'name' => 'Accountant', 'description' => 'Finance staff', 'status' => 'active'],
            ['department_id' => $accountsDept->id, 'name' => 'Cashier', 'description' => 'Cash handling', 'status' => 'active'],
            ['department_id' => $libraryDept->id, 'name' => 'Librarian', 'description' => 'Library staff', 'status' => 'active'],
            ['department_id' => $sportsDept->id, 'name' => 'Sports Instructor', 'description' => 'PE teacher', 'status' => 'active'],
        ];

        foreach ($designations as $designation) {
            Designation::updateOrCreate(
                ['department_id' => $designation['department_id'], 'name' => $designation['name']],
                $designation
            );
        }
    }
}