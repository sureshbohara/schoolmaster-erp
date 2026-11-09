<?php

namespace App\Repositories;

use App\Models\FeeType;

class FeeTypeRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new FeeType();
    }

    public function getAllPaginated(int $perPage = 15): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->model
            ->select('id', 'name', 'description', 'status', 'created_at')
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