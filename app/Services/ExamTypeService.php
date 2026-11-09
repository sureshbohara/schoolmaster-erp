<?php

namespace App\Services;

use App\Models\ExamType;
use App\Repositories\ExamTypeRepository;

class ExamTypeService
{
    protected ExamTypeRepository $repository;

    public function __construct(ExamTypeRepository $repository)
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

    public function create(array $data): ExamType
    {
        return $this->repository->create($data);
    }

    public function update(ExamType $type, array $data): ExamType
    {
        return $this->repository->update($type, $data);
    }

    public function delete(ExamType $type): bool
    {
        return $this->repository->delete($type);
    }
}