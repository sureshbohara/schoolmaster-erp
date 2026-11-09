<?php

namespace Database\Seeders;

use App\Models\GradingSystem;
use Illuminate\Database\Seeder;

class GradingSystemSeeder extends Seeder
{
    public function run(): void
    {
        $grades = [
            ['name' => 'Nepal Grading', 'min_mark' => 90.00, 'max_mark' => 100.00, 'grade_point' => 4.00, 'grade' => 'A+', 'remark' => 'Outstanding'],
            ['name' => 'Nepal Grading', 'min_mark' => 80.00, 'max_mark' => 89.99, 'grade_point' => 3.60, 'grade' => 'A', 'remark' => 'Excellent'],
            ['name' => 'Nepal Grading', 'min_mark' => 70.00, 'max_mark' => 79.99, 'grade_point' => 3.20, 'grade' => 'B+', 'remark' => 'Very Good'],
            ['name' => 'Nepal Grading', 'min_mark' => 60.00, 'max_mark' => 69.99, 'grade_point' => 2.80, 'grade' => 'B', 'remark' => 'Good'],
            ['name' => 'Nepal Grading', 'min_mark' => 50.00, 'max_mark' => 59.99, 'grade_point' => 2.40, 'grade' => 'C+', 'remark' => 'Satisfactory'],
            ['name' => 'Nepal Grading', 'min_mark' => 40.00, 'max_mark' => 49.99, 'grade_point' => 2.00, 'grade' => 'C', 'remark' => 'Acceptable'],
            ['name' => 'Nepal Grading', 'min_mark' => 30.00, 'max_mark' => 39.99, 'grade_point' => 1.60, 'grade' => 'D', 'remark' => 'Needs Improvement'],
            ['name' => 'Nepal Grading', 'min_mark' => 0.00, 'max_mark' => 29.99, 'grade_point' => 0.00, 'grade' => 'F', 'remark' => 'Fail'],
        ];

        foreach ($grades as $grade) {
            GradingSystem::updateOrCreate(
                ['name' => $grade['name'], 'grade' => $grade['grade']],
                $grade
            );
        }
    }
}