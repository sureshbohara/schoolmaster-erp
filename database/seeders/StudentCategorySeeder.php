<?php

namespace Database\Seeders;

use App\Models\Organization;
use App\Models\Branch;
use App\Models\StudentCategory;
use Illuminate\Database\Seeder;

class StudentCategorySeeder extends Seeder
{
    public function run(): void
    {
 
        $mainOrganization = Organization::first();
        $mainBranch = Branch::first();

        if (!$mainOrganization || !$mainBranch) {
            $this->command->error('Organization or Branch not found. Run Organization/Branch seeders first.');
            return;
        }

        $categories = [
            ['name' => 'General', 'discount_percentage' => 0.00, 'status' => 'active'],
            ['name' => 'Scholarship', 'discount_percentage' => 50.00, 'status' => 'active'],
            ['name' => 'Staff Ward', 'discount_percentage' => 25.00, 'status' => 'active'],
            ['name' => 'Merit', 'discount_percentage' => 75.00, 'status' => 'active'],
            ['name' => 'Sports Quota', 'discount_percentage' => 30.00, 'status' => 'active'],
            ['name' => 'Tribal/Minority', 'discount_percentage' => 15.00, 'status' => 'active'],
            ['name' => 'Economically Weaker', 'discount_percentage' => 40.00, 'status' => 'active'],
        ];

        foreach ($categories as $category) {

            $category['organization_id'] = $mainOrganization->id;
            $category['branch_id'] = $mainBranch->id;

            StudentCategory::updateOrCreate(
                ['name' => $category['name']], 
                $category 
            );
        }
        
        $this->command->info('✅ Student Categories seeded with Organization/Branch context!');
    }
}