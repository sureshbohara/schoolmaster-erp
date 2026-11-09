<?php

namespace Database\Seeders;

use App\Models\Hostel;
use App\Models\HostelRoom;
use Illuminate\Database\Seeder;

class HostelSeeder extends Seeder
{
    public function run(): void
    {
        $hostels = [
            [
                'name'    => 'Boys Hostel - Building A',
                'type'    => 'boys',
                'address' => 'Near School Campus, Kathmandu',
                'intro'   => 'Hostel for male students with all modern facilities',
                'status'  => 'active',
            ],
            [
                'name'    => 'Girls Hostel - Building B',
                'type'    => 'girls',
                'address' => 'Near School Campus, Kathmandu',
                'intro'   => 'Hostel for female students with security and modern amenities',
                'status'  => 'active',
            ],
        ];

        foreach ($hostels as $hostelData) {
            $hostel = Hostel::updateOrCreate(['name' => $hostelData['name']], $hostelData);

          
            $roomTypes = [
                ['room_type' => 'single', 'cost_per_bed' => 8000.00, 'no_of_beds' => 1],
                ['room_type' => 'double', 'cost_per_bed' => 6000.00, 'no_of_beds' => 2],
                ['room_type' => 'triple', 'cost_per_bed' => 4500.00, 'no_of_beds' => 3],
                ['room_type' => 'dormitory', 'cost_per_bed' => 3000.00, 'no_of_beds' => 6],
            ];

            foreach (range(1, 5) as $floor) {
                foreach ($roomTypes as $index => $roomType) {
                    $roomNo = $floor . '0' . ($index + 1);
                    HostelRoom::updateOrCreate(
                        ['hostel_id' => $hostel->id, 'room_no' => $roomNo],
                        array_merge($roomType, [
                            'description' => "{$roomType['room_type']} room on floor {$floor}",
                            'status'      => 'active',
                        ])
                    );
                }
            }
        }
    }
}