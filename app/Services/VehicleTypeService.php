<?php

namespace App\Services;

use App\Models\VehicleType;
use App\Repositories\VehicleTypeRepository;

class VehicleTypeService
{
    protected VehicleTypeRepository $repository;

    public function __construct(VehicleTypeRepository $repository)
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

    public function create(array $data): VehicleType
    {
        return $this->repository->create($data);
    }

    public function update(VehicleType $type, array $data): VehicleType
    {
        return $this->repository->update($type, $data);
    }

    public function delete(VehicleType $type): bool
    {
        return $this->repository->delete($type);
    }
}