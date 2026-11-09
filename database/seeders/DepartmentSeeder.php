<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    public function run(): void
    {
        $departments = [
            ['name' => 'Administration', 'description' => 'Administrative staff', 'status' => 'active'],
            ['name' => 'Academic', 'description' => 'Teaching staff', 'status' => 'active'],
            ['name' => 'Science', 'description' => 'Science department', 'status' => 'active'],
            ['name' => 'Mathematics', 'description' => 'Mathematics department', 'status' => 'active'],
            ['name' => 'English', 'description' => 'English department', 'status' => 'active'],
            ['name' => 'Nepali', 'description' => 'Nepali department', 'status' => 'active'],
            ['name' => 'Social Studies', 'description' => 'Social studies department', 'status' => 'active'],
            ['name' => 'Computer', 'description' => 'Computer department', 'status' => 'active'],
            ['name' => 'Accounts', 'description' => 'Accounts and finance', 'status' => 'active'],
            ['name' => 'Library', 'description' => 'Library management', 'status' => 'active'],
            ['name' => 'Sports', 'description' => 'Sports and physical education', 'status' => 'active'],
            ['name' => 'Transport', 'description' => 'Transport management', 'status' => 'active'],
            ['name' => 'Maintenance', 'description' => 'Building maintenance', 'status' => 'active'],
        ];

        foreach ($departments as $department) {
            Department::updateOrCreate(['name' => $department['name']], $department);
        }
    }
}