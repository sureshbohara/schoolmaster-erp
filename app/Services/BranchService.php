<?php

namespace App\Services;

use App\Models\Branch;
use App\Repositories\BranchRepository;

class BranchService
{
    protected BranchRepository $repository;

    public function __construct(BranchRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll(int $perPage = 15): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->repository->getAllPaginated($perPage);
    }

    public function create(array $data): Branch
    {
        return $this->repository->create($data);
    }

    public function update(Branch $branch, array $data): Branch
    {
        return $this->repository->update($branch, $data);
    }

    public function delete(Branch $branch): bool
    {
        return $this->repository->delete($branch);
    }

    public function updateStatus(Branch $branch, string $status): Branch
    {
        $branch->update(['status' => $status]);
        return $branch->fresh();
    }


    public function getDropdownData(): array
    {
        return [
            'organizations' => \App\Models\Organization::where('status', 'active')->orderBy('name')->get(['id', 'name']),
        ];
    }
}