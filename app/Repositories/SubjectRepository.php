<?php

namespace App\Repositories;

use App\Models\Subject;

class SubjectRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new Subject();
    }

    public function getAllPaginated(int $perPage = 25): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->model
            ->select('id', 'name', 'code', 'type', 'status', 'created_at')
            ->orderBy('id')
            ->paginate($perPage);
    }

    public function getAllForDropdown(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model
            ->where('status', 'active')
            ->orderBy('name')
            ->get(['id', 'name', 'code']);
    }
}