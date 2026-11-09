<?php

namespace Database\Seeders;

use App\Models\VehicleType;
use Illuminate\Database\Seeder;

class VehicleTypeSeeder extends Seeder
{
    public function run(): void
    {
        $types = [
            ['name' => 'Bus', 'status' => 'active'],
            ['name' => 'Van', 'status' => 'active'],
            ['name' => 'Micro Bus', 'status' => 'active'],
            ['name' => 'Car', 'status' => 'active'],
            ['name' => 'Hiace', 'status' => 'active'],
            ['name' => 'Coaster', 'status' => 'active'],
        ];

        foreach ($types as $type) {
            VehicleType::updateOrCreate(['name' => $type['name']], $type);
        }
    }
}