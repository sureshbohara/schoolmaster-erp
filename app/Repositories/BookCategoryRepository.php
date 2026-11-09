<?php

namespace App\Repositories;

use App\Models\BookCategory;

class BookCategoryRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new BookCategory();
    }

    public function getAllPaginated(int $perPage = 15): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->model
            ->select('id', 'name', 'status', 'created_at')
            ->withCount('books')
            ->latest()
            ->paginate($perPage);
    }

    public function getAllForDropdown(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model
            ->where('status', 'active')
            ->orderBy('name')
            ->get(['id', 'name']);
    }
}