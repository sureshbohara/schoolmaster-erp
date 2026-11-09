<?php

namespace Database\Seeders;

use App\Models\RouteModel;
use App\Models\RouteStop;
use App\Models\Vehicle;
use Illuminate\Database\Seeder;

class RouteSeeder extends Seeder
{
    public function run(): void
    {
        $vehicle1 = Vehicle::where('vehicle_no', 'Ba 2 Kha 1234')->first();
        $vehicle2 = Vehicle::where('vehicle_no', 'Ba 2 Kha 5678')->first();
        $vehicle3 = Vehicle::where('vehicle_no', 'Ba 1 Ja 9012')->first();

        $routes = [
            [
                'vehicle_id' => $vehicle1->id,
                'name'       => 'Baluwatar - Koteshwor Route',
                'base_fare'  => 3500.00,
                'status'     => 'active',
                'stops'      => [
                    ['stop_name' => 'Baluwatar School', 'sequence' => 1, 'pickup_time' => '07:00', 'drop_time' => '16:00', 'fare' => 0.00],
                    ['stop_name' => 'Lazimpat', 'sequence' => 2, 'pickup_time' => '07:15', 'drop_time' => '15:45', 'fare' => 500.00],
                    ['stop_name' => 'Maharajgunj', 'sequence' => 3, 'pickup_time' => '07:30', 'drop_time' => '15:30', 'fare' => 800.00],
                    ['stop_name' => 'Baneshwor', 'sequence' => 4, 'pickup_time' => '07:45', 'drop_time' => '15:15', 'fare' => 1200.00],
                    ['stop_name' => 'Koteshwor', 'sequence' => 5, 'pickup_time' => '08:00', 'drop_time' => '15:00', 'fare' => 1500.00],
                ],
            ],
            [
                'vehicle_id' => $vehicle2->id,
                'name'       => 'Patan - Balkhu Route',
                'base_fare'  => 3000.00,
                'status'     => 'active',
                'stops'      => [
                    ['stop_name' => 'Baluwatar School', 'sequence' => 1, 'pickup_time' => '07:00', 'drop_time' => '16:00', 'fare' => 0.00],
                    ['stop_name' => 'Pulchowk', 'sequence' => 2, 'pickup_time' => '07:20', 'drop_time' => '15:40', 'fare' => 600.00],
                    ['stop_name' => 'Lagankhel', 'sequence' => 3, 'pickup_time' => '07:35', 'drop_time' => '15:25', 'fare' => 900.00],
                    ['stop_name' => 'Satdobato', 'sequence' => 4, 'pickup_time' => '07:50', 'drop_time' => '15:10', 'fare' => 1200.00],
                    ['stop_name' => 'Balkhu', 'sequence' => 5, 'pickup_time' => '08:05', 'drop_time' => '14:55', 'fare' => 1500.00],
                ],
            ],
            [
                'vehicle_id' => $vehicle3->id,
                'name'       => 'Bhaktapur Route',
                'base_fare'  => 4000.00,
                'status'     => 'active',
                'stops'      => [
                    ['stop_name' => 'Baluwatar School', 'sequence' => 1, 'pickup_time' => '06:45', 'drop_time' => '16:15', 'fare' => 0.00],
                    ['stop_name' => 'Bhaktapur Durbar Square', 'sequence' => 2, 'pickup_time' => '07:15', 'drop_time' => '15:45', 'fare' => 1000.00],
                    ['stop_name' => 'Madhyapur Thimi', 'sequence' => 3, 'pickup_time' => '07:30', 'drop_time' => '15:30', 'fare' => 1500.00],
                    ['stop_name' => 'Suryabinayak', 'sequence' => 4, 'pickup_time' => '07:45', 'drop_time' => '15:15', 'fare' => 2000.00],
                ],
            ],
        ];

        foreach ($routes as $routeData) {
            $stops = $routeData['stops'];
            unset($routeData['stops']);

            $route = RouteModel::updateOrCreate(
                ['name' => $routeData['name']],
                $routeData
            );

            foreach ($stops as $stop) {
                RouteStop::updateOrCreate(
                    ['route_id' => $route->id, 'stop_name' => $stop['stop_name']],
                    array_merge($stop, ['route_id' => $route->id])
                );
            }
        }
    }
}