<?php

namespace App\Services;

use App\Models\Vehicle;
use App\Repositories\VehicleRepository;

class VehicleService
{
    protected VehicleRepository $repository;

    public function __construct(VehicleRepository $repository)
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

    public function create(array $data): Vehicle
    {
        return $this->repository->create($data);
    }

    public function update(Vehicle $vehicle, array $data): Vehicle
    {
        return $this->repository->update($vehicle, $data);
    }

    public function delete(Vehicle $vehicle): bool
    {
        return $this->repository->delete($vehicle);
    }
}