<?php

namespace Database\Seeders;

use App\Models\Vehicle;
use App\Models\VehicleType;
use Illuminate\Database\Seeder;

class VehicleSeeder extends Seeder
{
    public function run(): void
    {
        $busType   = VehicleType::where('name', 'Bus')->first();
        $vanType   = VehicleType::where('name', 'Van')->first();
        $microType = VehicleType::where('name', 'Micro Bus')->first();

        $vehicles = [
            [
                'vehicle_type_id' => $busType->id,
                'vehicle_no'      => 'Ba 2 Kha 1234',
                'model'           => 'Tata Starbus 2020',
                'capacity'        => 45,
                'driver_name'     => 'Ram Bahadur Tamang',
                'driver_phone'    => '9841234567',
                'status'          => 'active',
            ],
            [
                'vehicle_type_id' => $busType->id,
                'vehicle_no'      => 'Ba 2 Kha 5678',
                'model'           => 'Tata Starbus 2019',
                'capacity'        => 40,
                'driver_name'     => 'Shyam Kumar Shrestha',
                'driver_phone'    => '9841234568',
                'status'          => 'active',
            ],
            [
                'vehicle_type_id' => $vanType->id,
                'vehicle_no'      => 'Ba 1 Ja 9012',
                'model'           => 'Toyota Hiace 2021',
                'capacity'        => 15,
                'driver_name'     => 'Hari Prasad Gurung',
                'driver_phone'    => '9841234569',
                'status'          => 'active',
            ],
            [
                'vehicle_type_id' => $microType->id,
                'vehicle_no'      => 'Ba 2 Cha 3456',
                'model'           => 'Force Traveller 2020',
                'capacity'        => 20,
                'driver_name'     => 'Bikash Rai',
                'driver_phone'    => '9841234570',
                'status'          => 'active',
            ],
            [
                'vehicle_type_id' => $busType->id,
                'vehicle_no'      => 'Ba 2 Kha 7890',
                'model'           => 'Tata Starbus 2018',
                'capacity'        => 40,
                'driver_name'     => 'Kumar Thapa',
                'driver_phone'    => '9841234571',
                'status'          => 'maintenance',
            ],
        ];

        foreach ($vehicles as $vehicle) {
            Vehicle::updateOrCreate(
                ['vehicle_no' => $vehicle['vehicle_no']],
                $vehicle
            );
        }
    }
}