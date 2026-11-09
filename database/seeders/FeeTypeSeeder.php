<?php

namespace Database\Seeders;

use App\Models\FeeType;
use Illuminate\Database\Seeder;

class FeeTypeSeeder extends Seeder
{
    public function run(): void
    {
        $feeTypes = [
            ['name' => 'Admission Fee', 'description' => 'One-time admission fee', 'status' => 'active'],
            ['name' => 'Tuition Fee', 'description' => 'Monthly tuition fee', 'status' => 'active'],
            ['name' => 'Examination Fee', 'description' => 'Term and annual exam fee', 'status' => 'active'],
            ['name' => 'Computer Fee', 'description' => 'Computer lab charges', 'status' => 'active'],
            ['name' => 'Library Fee', 'description' => 'Library membership fee', 'status' => 'active'],
            ['name' => 'Sports Fee', 'description' => 'Sports and games fee', 'status' => 'active'],
            ['name' => 'Transport Fee', 'description' => 'Monthly transport charges', 'status' => 'active'],
            ['name' => 'Hostel Fee', 'description' => 'Monthly hostel charges', 'status' => 'active'],
            ['name' => 'Stationery Fee', 'description' => 'Books and stationery', 'status' => 'active'],
            ['name' => 'Insurance Fee', 'description' => 'Student insurance', 'status' => 'active'],
            ['name' => 'Development Fee', 'description' => 'Infrastructure development', 'status' => 'active'],
            ['name' => 'Science Lab Fee', 'description' => 'Science laboratory charges', 'status' => 'active'],
        ];

        foreach ($feeTypes as $type) {
            FeeType::updateOrCreate(['name' => $type['name']], $type);
        }
    }
}