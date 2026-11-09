<?php

namespace App\Repositories;

use App\Models\Permission;

class PermissionRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new Permission();
    }

    public function getAllGroupedByModule(): array
    {
        return $this->model
            ->select('id', 'name', 'guard_name', 'module')
            ->get()
            ->groupBy('module')
            ->toArray();
    }
}