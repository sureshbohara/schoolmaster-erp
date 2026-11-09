<?php

namespace Database\Seeders;

use App\Models\IncomeHead;
use Illuminate\Database\Seeder;

class IncomeHeadSeeder extends Seeder
{
    public function run(): void
    {
        $heads = [
            ['name' => 'Tuition Fees Collection', 'status' => 'active'],
            ['name' => 'Admission Fees', 'status' => 'active'],
        ];

        foreach ($heads as $head) {
            IncomeHead::updateOrCreate(['name' => $head['name']], $head);
        }
    }
}