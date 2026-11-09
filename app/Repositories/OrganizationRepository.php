<?php

namespace App\Repositories;

use App\Models\Organization;

class OrganizationRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new Organization();
    }

    public function getAllWithCounts(int $perPage = 15): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->model
            ->select('id', 'name', 'logo', 'email', 'phone', 'status', 'created_at')
            ->withCount(['users', 'branches'])
            ->latest()
            ->paginate($perPage);
    }
}