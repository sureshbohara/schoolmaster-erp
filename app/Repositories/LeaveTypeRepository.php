<?php

namespace App\Repositories;

use App\Models\LeaveType;

class LeaveTypeRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new LeaveType();
    }

    public function getAllPaginated(int $perPage = 15): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->model
            ->select('id', 'name', 'days_count', 'status', 'created_at')
            ->latest()
            ->paginate($perPage);
    }

    public function getAllForDropdown(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model
            ->where('status', 'active')
            ->orderBy('name')
            ->get(['id', 'name', 'days_count']);
    }
}