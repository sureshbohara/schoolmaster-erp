<?php

namespace Database\Seeders;

use App\Models\Organization;
use Illuminate\Database\Seeder;

class OrganizationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $organizations = [
            [
                'name'             => 'Kathmandu International School',
                'email'            => 'info@kis.edu.np',
                'phone'            => '01-4XXXXXX',
                'address'          => 'Baluwatar, Kathmandu',
                'website'          => 'https://kis.edu.np',
                'established_date' => '2000-01-01',
                'status'           => 'active',
            ],
            [
                'name'             => 'Pokhara Academy',
                'email'            => 'admin@pokharaacademy.com',
                'phone'            => '061-4XXXXX',
                'address'          => 'Lakeside, Pokhara',
                'website'          => 'https://pokharaacademy.com',
                'established_date' => '2005-04-15',
                'status'           => 'active',
            ],
            [
                'name'             => 'Chitwan High School',
                'email'            => 'contact@chitwanhigh.com',
                'phone'            => '056-5XXXXX',
                'address'          => 'Bharatpur, Chitwan',
                'website'          => null,
                'established_date' => '2010-07-20',
                'status'           => 'inactive',
            ],
        ];

        foreach ($organizations as $org) {
            Organization::updateOrCreate(
                ['name' => $org['name']],
                $org
            );
        }
    }
}