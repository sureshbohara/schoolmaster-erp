<?php

namespace App\Services;

use App\Models\FeeStructure;
use App\Repositories\FeeStructureRepository;

class FeeStructureService
{
    protected FeeStructureRepository $repository;

    public function __construct(FeeStructureRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll(int $perPage = 15, array $filters = []): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->repository->getAllPaginated($perPage, $filters);
    }

    public function create(array $data): FeeStructure
    {
        return $this->repository->create($data);
    }

    public function update(FeeStructure $structure, array $data): FeeStructure
    {
        return $this->repository->update($structure, $data);
    }

    public function delete(FeeStructure $structure): bool
    {
        return $this->repository->delete($structure);
    }
}