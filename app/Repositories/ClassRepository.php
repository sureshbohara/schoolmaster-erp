<?php

namespace App\Repositories;

use App\Models\ClassModel;

class ClassRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new ClassModel();
    }

    public function getAllPaginated(int $perPage = 20): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->model
            ->select('id', 'academic_year_id', 'name', 'numeric_value', 'order', 'status', 'created_at')
            ->with('academicYear:id,title')
            ->withCount('sections')
            ->orderBy('order')
            ->paginate($perPage);
    }

    public function getAllForDropdown(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model
            ->select('id', 'name', 'numeric_value')
            ->where('status', 'active')
            ->orderBy('order')
            ->get();
    }
}