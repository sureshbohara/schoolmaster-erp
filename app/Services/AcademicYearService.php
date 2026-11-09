<?php

namespace App\Services;

use App\Models\AcademicYear;
use App\Repositories\AcademicYearRepository;

class AcademicYearService
{
    protected AcademicYearRepository $repository;

    public function __construct(AcademicYearRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll(int $perPage = 15): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->repository->getAllPaginated($perPage);
    }

    public function getAllActive(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->repository->getAllActive();
    }

    public function getCurrent(): ?AcademicYear
    {
        return $this->repository->getCurrent();
    }

    public function create(array $data): AcademicYear
    {
        if (! empty($data['is_active'])) {
            $this->repository->getModel()->where('is_active', true)->update(['is_active' => false]);
        }
        return $this->repository->create($data);
    }

    public function update(AcademicYear $year, array $data): AcademicYear
    {
        if (! empty($data['is_active'])) {
            $this->repository->getModel()->where('is_active', true)->update(['is_active' => false]);
        }
        return $this->repository->update($year, $data);
    }

    public function delete(AcademicYear $year): bool
    {
        return $this->repository->delete($year);
    }
}