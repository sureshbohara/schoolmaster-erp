<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            ['name' => 'Super Admin', 'guard_name' => 'web', 'is_system' => true],
            ['name' => 'Admin', 'guard_name' => 'web', 'is_system' => false],
            ['name' => 'Manager', 'guard_name' => 'web', 'is_system' => false],
            ['name' => 'Staff', 'guard_name' => 'web', 'is_system' => false],
            ['name' => 'Accountant', 'guard_name' => 'web', 'is_system' => false],
            ['name' => 'Teacher', 'guard_name' => 'web', 'is_system' => false],
            
            ['name' => 'Parent', 'guard_name' => 'web', 'is_system' => false],
            ['name' => 'Student', 'guard_name' => 'web', 'is_system' => false],
        ];

        foreach ($roles as $role) {
            Role::updateOrCreate(
                ['name' => $role['name'], 'guard_name' => $role['guard_name']],
                $role
            );
        }

        $superAdmin = Role::where('name', 'Super Admin')->first();
        if ($superAdmin) {
            $allPermissionIds = Permission::pluck('id')->toArray();
            if (!empty($allPermissionIds)) {
                $superAdmin->permissions()->sync($allPermissionIds);
                $this->command->info('✅ All permissions assigned to Super Admin successfully!');
            }
        }


        $studentRole = Role::where('name', 'Student')->first();
        if ($studentRole) {
            $studentPermissions = Permission::whereIn('name', [
                'view_dashboard',
                'view_attendance', 
                'view_marks',    
            ])->pluck('id')->toArray();
            
            $studentRole->permissions()->sync($studentPermissions);
            $this->command->info('✅ Specific permissions assigned to Student successfully!');
        }


        $parentRole = Role::where('name', 'Parent')->first();
        if ($parentRole) {
            $parentPermissions = Permission::whereIn('name', [
                'view_dashboard',
                'view_students',  
                'view_attendance',
                'view_marks',     
                'view_fee_payments',
            ])->pluck('id')->toArray();
            
            $parentRole->permissions()->sync($parentPermissions);
            $this->command->info('✅ Specific permissions assigned to Parent successfully!');
        }
    }
}