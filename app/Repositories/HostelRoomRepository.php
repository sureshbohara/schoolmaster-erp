<?php

namespace App\Repositories;

use App\Models\HostelRoom;
use Illuminate\Pagination\LengthAwarePaginator;

class HostelRoomRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new HostelRoom();
    }

    public function getAllPaginated(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        $query = $this->model
            ->with('hostel:id,name,type')
            ->withCount('allocations');

        if (! empty($filters['hostel_id'])) {
            $query->where('hostel_id', $filters['hostel_id']);
        }
        if (! empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->latest()->paginate($perPage);
    }

    public function getByHostel(int $hostelId): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model
            ->where('hostel_id', $hostelId)
            ->where('status', '!=', 'full')
            ->orderBy('room_no')
            ->get(['id', 'room_no', 'room_type', 'cost_per_bed', 'no_of_beds']);
    }
}