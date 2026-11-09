<?php

namespace App\Repositories;

use App\Models\GradingSystem;

class GradingSystemRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new GradingSystem();
    }

    public function getAllPaginated(int $perPage = 15): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->model->orderBy('min_mark', 'desc')->paginate($perPage);
    }

    public function getGradeForMark(float $mark): ?GradingSystem
    {
        return $this->model
            ->where('min_mark', '<=', $mark)
            ->where('max_mark', '>=', $mark)
            ->first();
    }
}