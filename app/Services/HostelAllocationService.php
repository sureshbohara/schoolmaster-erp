<?php

namespace App\Services;

use App\Models\HostelAllocation;
use App\Repositories\HostelAllocationRepository;

class HostelAllocationService
{
    protected HostelAllocationRepository $repository;

    public function __construct(HostelAllocationRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll(int $perPage = 15, array $filters = []): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->repository->getAllPaginated($perPage, $filters);
    }

    public function create(array $data): HostelAllocation
    {
        return $this->repository->create($data);
    }

    public function update(HostelAllocation $allocation, array $data): HostelAllocation
    {
        return $this->repository->update($allocation, $data);
    }

    public function discharge(HostelAllocation $allocation): HostelAllocation
    {
        $allocation->update([
            'status'         => 'discharged',
            'discharge_date' => now(),
        ]);
        return $allocation->fresh();
    }

    public function delete(HostelAllocation $allocation): bool
    {
        return $this->repository->delete($allocation);
    }
}