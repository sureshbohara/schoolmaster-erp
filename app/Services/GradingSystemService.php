<?php

namespace App\Services;

use App\Models\GradingSystem;
use App\Repositories\GradingSystemRepository;

class GradingSystemService
{
    protected GradingSystemRepository $repository;

    public function __construct(GradingSystemRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll(int $perPage = 15): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->repository->getAllPaginated($perPage);
    }

    public function create(array $data): GradingSystem
    {
        return $this->repository->create($data);
    }

    public function update(GradingSystem $system, array $data): GradingSystem
    {
        return $this->repository->update($system, $data);
    }

    public function delete(GradingSystem $system): bool
    {
        return $this->repository->delete($system);
    }
}