<?php

namespace App\Support;

class TenantContext
{
    public ?int $organizationId = null;
    public ?int $branchId = null;
    public string $role = '';

    public function set($user): void
    {
        $this->organizationId = $user->organization_id;
        $this->branchId = $user->branch_id;
        $this->role = strtolower($user->role?->name ?? '');
    }

    public function clear(): void
    {
        $this->organizationId = null;
        $this->branchId = null;
        $this->role = '';
    }
}