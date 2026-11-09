<?php

namespace Database\Seeders;

use App\Models\AcademicYear;
use Illuminate\Database\Seeder;

class AcademicYearSeeder extends Seeder
{
    public function run(): void
    {
        $years = [
            ['title' => '2079/2080', 'start_date' => '2022-04-14', 'end_date' => '2023-04-13', 'is_active' => false, 'status' => 'inactive'],
            ['title' => '2080/2081', 'start_date' => '2023-04-14', 'end_date' => '2024-04-13', 'is_active' => false, 'status' => 'inactive'],
            ['title' => '2081/2082', 'start_date' => '2024-04-14', 'end_date' => '2025-04-13', 'is_active' => false, 'status' => 'inactive'],
            ['title' => '2082/2083', 'start_date' => '2025-04-14', 'end_date' => '2026-04-13', 'is_active' => false, 'status' => 'inactive'],
            ['title' => '2083/2084', 'start_date' => '2026-04-14', 'end_date' => '2027-04-13', 'is_active' => true, 'status' => 'active'],
        ];

        foreach ($years as $year) {
            AcademicYear::updateOrCreate(['title' => $year['title']], $year);
        }
    }
}