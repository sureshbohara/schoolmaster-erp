<?php

namespace App\Services;

use App\Models\StudentCategory;
use App\Repositories\StudentCategoryRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class StudentCategoryService
{
    protected StudentCategoryRepository $repository;

    public function __construct(StudentCategoryRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll(int $perPage = 15): LengthAwarePaginator
    {
        return $this->repository->getAllPaginated($perPage);
    }

    public function getAllForDropdown(): Collection
    {
        return $this->repository->getAllForDropdown();
    }

    public function create(array $data): StudentCategory
    {
        return $this->repository->create($data);
    }

    public function update(StudentCategory $category, array $data): StudentCategory
    {
        return $this->repository->update($category, $data);
    }

    public function delete(StudentCategory $category): bool
    {
        return $this->repository->delete($category);
    }
}