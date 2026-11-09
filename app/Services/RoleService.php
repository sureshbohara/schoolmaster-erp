<?php

namespace App\Services;

use App\Models\Role;
use App\Repositories\RoleRepository;

class RoleService
{
    protected RoleRepository $repository;

    public function __construct(RoleRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll(int $perPage = 15): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->repository->getAllWithPermissions($perPage);
    }

    public function create(array $data): Role
    {
        $role = $this->repository->create($data);
        
        if (isset($data['permissions'])) {
            $role->permissions()->sync($data['permissions']);
        }

        return $role->load('permissions');
    }

    public function update(Role $role, array $data): Role
    {
        $this->repository->update($role, $data);

        if (isset($data['permissions'])) {
            $role->permissions()->sync($data['permissions']);
        }

        return $role->fresh(['permissions']);
    }

    public function delete(Role $role): bool
    {
        if ($role->is_system) {
            return false;
        }

        return $this->repository->delete($role);
    }
}