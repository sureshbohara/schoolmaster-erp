<?php

namespace Database\Seeders;

use App\Models\ExamType;
use Illuminate\Database\Seeder;

class ExamTypeSeeder extends Seeder
{
    public function run(): void
    {
        $types = [
            ['name' => 'First Terminal Exam', 'status' => 'active'],
            ['name' => 'Second Terminal Exam', 'status' => 'active'],
            ['name' => 'Third Terminal Exam', 'status' => 'active'],
            ['name' => 'Half Yearly Exam', 'status' => 'active'],
            ['name' => 'Annual Exam', 'status' => 'active'],
            ['name' => 'Unit Test', 'status' => 'active'],
            ['name' => 'Practical Exam', 'status' => 'active'],
            ['name' => 'Internal Assessment', 'status' => 'active'],
        ];

        foreach ($types as $type) {
            ExamType::updateOrCreate(['name' => $type['name']], $type);
        }
    }
}