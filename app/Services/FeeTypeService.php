<?php

namespace App\Services;

use App\Models\FeeType;
use App\Repositories\FeeTypeRepository;

class FeeTypeService
{
    protected FeeTypeRepository $repository;

    public function __construct(FeeTypeRepository $repository)
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

    public function create(array $data): FeeType
    {
        return $this->repository->create($data);
    }

    public function update(FeeType $type, array $data): FeeType
    {
        return $this->repository->update($type, $data);
    }

    public function delete(FeeType $type): bool
    {
        return $this->repository->delete($type);
    }
}