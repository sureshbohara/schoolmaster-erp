<?php

namespace App\Repositories;

use App\Models\AcademicYear;

class AcademicYearRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new AcademicYear();
    }

    public function getAllPaginated(int $perPage = 15): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->model
            ->select('id', 'title', 'start_date', 'end_date', 'is_active', 'status', 'created_at')
            ->latest('start_date')
            ->paginate($perPage);
    }

    public function getCurrent(): ?AcademicYear
    {
        return $this->model->where('is_active', true)->first();
    }


    public function getAllActive(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model
            ->where('status', 'active')
            ->orderBy('start_date', 'desc')
            ->get(['id', 'title']);
    }
}