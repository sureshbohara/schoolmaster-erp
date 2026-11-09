<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\Organization;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
   
    public function run(): void
    {
       
        $mainOrganization = Organization::where('name', 'Kathmandu International School')->first();
        $mainBranch = Branch::where('code', 'HO-001')->first();

       
        $mainOrganization = $mainOrganization ?: Organization::first();
        $mainBranch = $mainBranch ?: Branch::first();

        if (!$mainOrganization || !$mainBranch) {
            $this->command->error('Organization or Branch not found. Please run Organization/Branch seeders first.');
            return;
        }

 
        $usersData = [
            'Super Admin' => [
                'first_name' => 'Super', 'last_name' => 'Admin', 'email' => 'superadmin@example.com', 
                'username' => 'superadmin', 'phone' => '9800000001', 'bio' => 'Full system access'
            ],
            'Admin' => [
                'first_name' => 'School', 'last_name' => 'Admin', 'email' => 'admin@example.com', 
                'username' => 'schooladmin', 'phone' => '9800000002', 'bio' => 'School administrator'
            ],
            'Manager' => [
                'first_name' => 'Branch', 'last_name' => 'Manager', 'email' => 'manager@example.com', 
                'username' => 'branchmanager', 'phone' => '9800000003', 'bio' => 'Branch manager'
            ],
            'Staff' => [
                'first_name' => 'General', 'last_name' => 'Staff', 'email' => 'staff@example.com', 
                'username' => 'generalstaff', 'phone' => '9800000004', 'bio' => 'General staff member'
            ],
            'Accountant' => [
                'first_name' => 'Finance', 'last_name' => 'Accountant', 'email' => 'accountant@example.com', 
                'username' => 'accountant', 'phone' => '9800000005', 'bio' => 'Handles fees and payroll'
            ],
            'Teacher' => [
                'first_name' => 'John', 'last_name' => 'Doe', 'email' => 'teacher@example.com', 
                'username' => 'johndoe', 'phone' => '9800000006', 'bio' => 'Senior Mathematics Teacher'
            ],
            'Parent' => [
                'first_name' => 'Ram', 'last_name' => 'Sharma', 'email' => 'parent@example.com', 
                'username' => 'ramsharma', 'phone' => '9800000007', 'bio' => 'Parent of a student'
            ],
            'Student' => [
                'first_name' => 'Sita', 'last_name' => 'Sharma', 'email' => 'student@example.com', 
                'username' => 'sitasharma', 'phone' => '9800000008', 'bio' => 'Class 10 Student'
            ],
        ];

        $createdCount = 0;


        foreach ($usersData as $roleName => $userData) {
            $role = Role::where('name', $roleName)->first();

            if ($role) {
                User::updateOrCreate(
                    ['email' => $userData['email']], 
                    array_merge($userData, [
                        'password'        => Hash::make('password123'),
                        'role_id'         => $role->id,
                        'branch_id'       => $mainBranch->id,
                        'organization_id' => $mainOrganization->id,
                        'status'          => 'active',
                        'last_login_ip'   => '127.0.0.1',
                    ])
                );
                $createdCount++;
            } else {
                $this->command->warn("⚠️ Role '{$roleName}' not found in database. Skipping user creation.");
            }
        }

        $this->command->info("✅ Successfully created/updated {$createdCount} user accounts for testing!");
        $this->command->info("🔑 Default Password for all users: password123");
    }
}