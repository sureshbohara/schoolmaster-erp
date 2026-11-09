<?php

namespace Database\Seeders;

use App\Models\Subject;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
{
    public function run(): void
    {
        $subjects = [
            ['name' => 'Nepali', 'code' => 'NEP01', 'type' => 'theory', 'status' => 'active'],
            ['name' => 'English', 'code' => 'ENG01', 'type' => 'theory', 'status' => 'active'],
            ['name' => 'Mathematics', 'code' => 'MAT01', 'type' => 'theory', 'status' => 'active'],
            ['name' => 'Science', 'code' => 'SCI01', 'type' => 'both', 'status' => 'active'],
            ['name' => 'Social Studies', 'code' => 'SOC01', 'type' => 'theory', 'status' => 'active'],
            ['name' => 'Computer Science', 'code' => 'COM01', 'type' => 'both', 'status' => 'active'],
            ['name' => 'Physics', 'code' => 'PHY01', 'type' => 'both', 'status' => 'active'],
            ['name' => 'Chemistry', 'code' => 'CHE01', 'type' => 'both', 'status' => 'active'],
            ['name' => 'Biology', 'code' => 'BIO01', 'type' => 'both', 'status' => 'active'],
            ['name' => 'History', 'code' => 'HIS01', 'type' => 'theory', 'status' => 'active'],
            ['name' => 'Geography', 'code' => 'GEO01', 'type' => 'theory', 'status' => 'active'],
            ['name' => 'Economics', 'code' => 'ECO01', 'type' => 'theory', 'status' => 'active'],
            ['name' => 'Accountancy', 'code' => 'ACC01', 'type' => 'theory', 'status' => 'active'],
            ['name' => 'Business Studies', 'code' => 'BUS01', 'type' => 'theory', 'status' => 'active'],
            ['name' => 'Moral Education', 'code' => 'MOR01', 'type' => 'theory', 'status' => 'active'],
            ['name' => 'Optional Mathematics', 'code' => 'OMAT01', 'type' => 'theory', 'status' => 'active'],
            ['name' => 'Physical Education', 'code' => 'PE01', 'type' => 'practical', 'status' => 'active'],
            ['name' => 'Art', 'code' => 'ART01', 'type' => 'practical', 'status' => 'active'],
            ['name' => 'Music', 'code' => 'MUS01', 'type' => 'practical', 'status' => 'active'],
        ];

        foreach ($subjects as $subject) {
            Subject::updateOrCreate(['code' => $subject['code']], $subject);
        }
    }
}