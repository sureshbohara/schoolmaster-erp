<?php

namespace App\Services;

use App\Models\Designation;
use App\Repositories\DesignationRepository;

class DesignationService
{
    protected DesignationRepository $repository;

    public function __construct(DesignationRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll(int $perPage = 15): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->repository->getAllPaginated($perPage);
    }

    public function getByDepartment(int $departmentId): \Illuminate\Database\Eloquent\Collection
    {
        return $this->repository->getByDepartment($departmentId);
    }

    public function create(array $data): Designation
    {
        return $this->repository->create($data);
    }

    public function update(Designation $designation, array $data): Designation
    {
        return $this->repository->update($designation, $data);
    }

    public function delete(Designation $designation): bool
    {
        return $this->repository->delete($designation);
    }
}