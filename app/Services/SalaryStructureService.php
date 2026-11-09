<?php

namespace App\Services;

use App\Models\SalaryStructure;
use App\Repositories\SalaryStructureRepository;

class SalaryStructureService
{
    protected SalaryStructureRepository $repository;

    public function __construct(SalaryStructureRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll(int $perPage = 15): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->repository->getAllPaginated($perPage);
    }

    public function create(array $data): SalaryStructure
    {
        $data['gross_salary'] = ($data['basic'] ?? 0) + ($data['allowance'] ?? 0)
            + ($data['medical'] ?? 0) + ($data['housing'] ?? 0) + ($data['transport'] ?? 0);

        return $this->repository->create($data);
    }

    public function update(SalaryStructure $structure, array $data): SalaryStructure
    {
        $data['gross_salary'] = ($data['basic'] ?? $structure->basic)
            + ($data['allowance'] ?? $structure->allowance)
            + ($data['medical'] ?? $structure->medical)
            + ($data['housing'] ?? $structure->housing)
            + ($data['transport'] ?? $structure->transport);

        return $this->repository->update($structure, $data);
    }

    public function delete(SalaryStructure $structure): bool
    {
        return $this->repository->delete($structure);
    }
}