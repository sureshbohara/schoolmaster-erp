<?php

namespace App\Repositories;

use App\Models\StudentCategory;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class StudentCategoryRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new StudentCategory();
    }

    public function getAllPaginated(int $perPage = 15): LengthAwarePaginator
    {
        return $this->model
            ->select('id', 'name', 'discount_percentage', 'status', 'created_at')
            ->latest()
            ->paginate($perPage);
    }

    public function getAllForDropdown(): Collection
    {
        return $this->model
            ->where('status', 'active')
            ->orderBy('name')
            ->get(['id', 'name', 'discount_percentage']);
    }
}