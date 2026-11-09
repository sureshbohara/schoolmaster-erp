<?php

namespace App\Repositories;

use App\Models\Branch;

class BranchRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new Branch();
    }

    public function getAllPaginated(int $perPage = 15): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->model
            ->select('id', 'organization_id', 'name', 'code', 'address', 'phone', 'email', 'status', 'created_at')
            ->with(['organization:id,name'])
            ->withCount(['users']) 
            ->latest()
            ->paginate($perPage);
    }
}