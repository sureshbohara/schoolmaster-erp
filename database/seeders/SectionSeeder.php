<?php

namespace Database\Seeders;

use App\Models\ClassModel;
use App\Models\Section;
use Illuminate\Database\Seeder;

class SectionSeeder extends Seeder
{
    public function run(): void
    {
        $classes = ClassModel::all();

        $sectionNames = ['A', 'B', 'C'];

        foreach ($classes as $class) {
            foreach ($sectionNames as $index => $sectionName) {
                Section::updateOrCreate(
                    [
                        'class_id' => $class->id,
                        'name'     => $sectionName,
                    ],
                    [
                        'room_no'  => 'Room-' . $class->numeric_value . chr(65 + $index),
                        'capacity' => 40,
                        'status'   => 'active',
                    ]
                );
            }
        }
    }
}