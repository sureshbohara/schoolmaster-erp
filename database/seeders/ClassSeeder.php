<?php

namespace Database\Seeders;

use App\Models\AcademicYear;
use App\Models\ClassModel;
use Illuminate\Database\Seeder;

class ClassSeeder extends Seeder
{
    public function run(): void
    {
        $currentYear = AcademicYear::where('is_active', true)->first();

        if (! $currentYear) {
            $this->command->error('No active academic year found.');
            return;
        }

        $classes = [
            ['name' => 'Nursery', 'numeric_value' => 0, 'order' => 1],
            ['name' => 'LKG', 'numeric_value' => 0, 'order' => 2],
            ['name' => 'UKG', 'numeric_value' => 0, 'order' => 3],
            ['name' => 'One', 'numeric_value' => 1, 'order' => 4],
            ['name' => 'Two', 'numeric_value' => 2, 'order' => 5],
            ['name' => 'Three', 'numeric_value' => 3, 'order' => 6],
            ['name' => 'Four', 'numeric_value' => 4, 'order' => 7],
            ['name' => 'Five', 'numeric_value' => 5, 'order' => 8],
            ['name' => 'Six', 'numeric_value' => 6, 'order' => 9],
            ['name' => 'Seven', 'numeric_value' => 7, 'order' => 10],
            ['name' => 'Eight', 'numeric_value' => 8, 'order' => 11],
            ['name' => 'Nine', 'numeric_value' => 9, 'order' => 12],
            ['name' => 'Ten', 'numeric_value' => 10, 'order' => 13],
            ['name' => 'Eleven', 'numeric_value' => 11, 'order' => 14],
            ['name' => 'Twelve', 'numeric_value' => 12, 'order' => 15],
        ];

        foreach ($classes as $class) {
            ClassModel::updateOrCreate(
                ['academic_year_id' => $currentYear->id, 'name' => $class['name']],
                array_merge($class, ['academic_year_id' => $currentYear->id, 'status' => 'active'])
            );
        }
    }
}