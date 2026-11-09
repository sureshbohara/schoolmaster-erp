<?php

namespace Database\Seeders;

use App\Models\ExpenseHead;
use Illuminate\Database\Seeder;

class ExpenseHeadSeeder extends Seeder
{
    public function run(): void
    {
        $heads = [
            ['name' => 'Salary & Wages', 'status' => 'active'],
            ['name' => 'Electricity Bill', 'status' => 'active'],
            ['name' => 'Water Bill', 'status' => 'active'],
            ['name' => 'Internet Bill', 'status' => 'active'],
            ['name' => 'Telephone Bill', 'status' => 'active'],
            ['name' => 'Office Supplies', 'status' => 'active'],
            ['name' => 'Maintenance & Repairs', 'status' => 'active'],
            ['name' => 'Transport Expenses', 'status' => 'active'],
            ['name' => 'Printing & Stationery', 'status' => 'active'],
            ['name' => 'Training & Development', 'status' => 'active'],
            ['name' => 'Rent', 'status' => 'active'],
            ['name' => 'Insurance', 'status' => 'active'],
            ['name' => 'Miscellaneous', 'status' => 'active'],
        ];

        foreach ($heads as $head) {
            ExpenseHead::updateOrCreate(['name' => $head['name']], $head);
        }
    }
}