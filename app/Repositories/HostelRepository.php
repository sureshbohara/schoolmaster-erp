<?php

namespace App\Repositories;

use App\Models\Hostel;
use Illuminate\Pagination\LengthAwarePaginator;

class HostelRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new Hostel();
    }

    public function getAllPaginated(int $perPage = 15): LengthAwarePaginator
    {
        return $this->model
            ->withCount('rooms')
            ->latest()
            ->paginate($perPage);
    }
}