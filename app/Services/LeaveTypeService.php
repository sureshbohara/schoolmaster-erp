<?php

namespace App\Services;

use App\Models\LeaveType;
use App\Repositories\LeaveTypeRepository;

class LeaveTypeService
{
    protected LeaveTypeRepository $repository;

    public function __construct(LeaveTypeRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll(int $perPage = 15): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->repository->getAllPaginated($perPage);
    }

    public function getAllForDropdown(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->repository->getAllForDropdown();
    }

    public function create(array $data): LeaveType
    {
        return $this->repository->create($data);
    }

    public function update(LeaveType $type, array $data): LeaveType
    {
        return $this->repository->update($type, $data);
    }

    public function delete(LeaveType $type): bool
    {
        return $this->repository->delete($type);
    }
}