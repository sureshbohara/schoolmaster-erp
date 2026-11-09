<?php

namespace Database\Seeders;

use App\Models\LeaveType;
use Illuminate\Database\Seeder;

class LeaveTypeSeeder extends Seeder
{
    public function run(): void
    {
        $types = [
            ['name' => 'Casual Leave', 'days_count' => 15, 'status' => 'active'],
            ['name' => 'Sick Leave', 'days_count' => 15, 'status' => 'active'],
            ['name' => 'Earned Leave', 'days_count' => 30, 'status' => 'active'],
            ['name' => 'Maternity Leave', 'days_count' => 90, 'status' => 'active'],
            ['name' => 'Paternity Leave', 'days_count' => 15, 'status' => 'active'],
            ['name' => 'Unpaid Leave', 'days_count' => 0, 'status' => 'active'],
            ['name' => 'Compensatory Off', 'days_count' => 0, 'status' => 'active'],
        ];

        foreach ($types as $type) {
            LeaveType::updateOrCreate(['name' => $type['name']], $type);
        }
    }
}