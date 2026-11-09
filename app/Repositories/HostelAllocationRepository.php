<?php

namespace App\Repositories;

use App\Models\HostelAllocation;
use Illuminate\Pagination\LengthAwarePaginator;

class HostelAllocationRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new HostelAllocation();
    }

    public function getAllPaginated(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        $query = $this->model
            ->with(['student:id,first_name,last_name,admission_no', 'hostel:id,name,type', 'room:id,room_no,room_type']);

        if (! empty($filters['hostel_id'])) {
            $query->where('hostel_id', $filters['hostel_id']);
        }
        if (! empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->latest()->paginate($perPage);
    }
}