<?php

namespace App\Repositories;

use App\Models\Section;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class SectionRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new Section();
    }

    public function getAllPaginated(int $perPage = 15): LengthAwarePaginator
    {
        return $this->model
            ->select('id', 'class_id', 'name', 'room_no', 'capacity', 'status', 'created_at')
            ->with('classModel:id,name')
            ->latest()
            ->paginate($perPage);
    }

    public function getByClass(int $classId): Collection
    {
        return $this->model
            ->where('class_id', $classId)
            ->where('status', 'active')
            ->orderBy('name')
            ->get(['id', 'name', 'room_no', 'capacity']);
    }
}