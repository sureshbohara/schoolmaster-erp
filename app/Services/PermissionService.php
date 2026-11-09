<?php

namespace App\Services;

use App\Models\Permission;
use App\Repositories\PermissionRepository;

class PermissionService
{
    protected PermissionRepository $repository;

    public function __construct(PermissionRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAllGrouped(): array
    {
        return $this->repository->getAllGroupedByModule();
    }

    public function create(array $data): Permission
    {
        return $this->repository->create($data);
    }

    public function update(Permission $permission, array $data): Permission
    {
        return $this->repository->update($permission, $data);
    }

    public function delete(Permission $permission): bool
    {
        return $this->repository->delete($permission);
    }
}