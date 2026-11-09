<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\Organization;
use Illuminate\Database\Seeder;

class BranchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $mainOrganization = Organization::where('name', 'Kathmandu International School')->first();

        if (! $mainOrganization) {
            $this->command->error('Organization not found. Please run OrganizationSeeder first.');
            return;
        }

        $branches = [
            [
                'organization_id' => $mainOrganization->id,
                'name'            => 'Head Office',
                'code'            => 'HO-001',
                'address'         => 'Kathmandu, Nepal',
                'phone'           => '9800000001',
                'email'           => 'headoffice@example.com',
                'status'          => 'active',
            ],
            [
                'organization_id' => $mainOrganization->id,
                'name'            => 'Pokhara Branch',
                'code'            => 'PKR-001',
                'address'         => 'Pokhara, Nepal',
                'phone'           => '9800000002',
                'email'           => 'pokhara@example.com',
                'status'          => 'active',
            ],
            [
                'organization_id' => $mainOrganization->id,
                'name'            => 'Chitwan Branch',
                'code'            => 'CHT-001',
                'address'         => 'Chitwan, Nepal',
                'phone'           => '9800000003',
                'email'           => 'chitwan@example.com',
                'status'          => 'active',
            ],
        ];

        foreach ($branches as $branch) {
            Branch::updateOrCreate(
                ['code' => $branch['code']],
                $branch
            );
        }
    }
}