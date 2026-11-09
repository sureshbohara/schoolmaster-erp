<?php

namespace App\Services;

use App\Models\BookCategory;
use App\Repositories\BookCategoryRepository;

class BookCategoryService
{
    protected BookCategoryRepository $repository;

    public function __construct(BookCategoryRepository $repository)
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

    public function create(array $data): BookCategory
    {
        return $this->repository->create($data);
    }

    public function update(BookCategory $category, array $data): BookCategory
    {
        return $this->repository->update($category, $data);
    }

    public function delete(BookCategory $category): bool
    {
        return $this->repository->delete($category);
    }
}