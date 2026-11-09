<?php

namespace App\Services;

use App\Models\ClassModel;
use App\Repositories\ClassRepository;

class ClassService
{
    protected ClassRepository $repository;

    public function __construct(ClassRepository $repository)
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

    public function create(array $data): ClassModel
    {
        return $this->repository->create($data);
    }

    public function update(ClassModel $class, array $data): ClassModel
    {
        return $this->repository->update($class, $data);
    }

    public function delete(ClassModel $class): bool
    {
        return $this->repository->delete($class);
    }
}