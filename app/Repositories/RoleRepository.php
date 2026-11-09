<?php

namespace App\Repositories;

use App\Models\Role;

class RoleRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new Role();
    }

    public function getAllWithPermissions(int $perPage = 15): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->model
            ->with('permissions:id,name,module')
            ->latest()
            ->paginate($perPage);
    }
}