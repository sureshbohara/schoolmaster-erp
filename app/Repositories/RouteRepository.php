<?php

namespace App\Repositories;

use App\Models\RouteModel;
use Illuminate\Pagination\LengthAwarePaginator;

class RouteRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new RouteModel();
    }

    public function getAllPaginated(int $perPage = 15): LengthAwarePaginator
    {
        return $this->model
            ->with(['vehicle:id,vehicle_no,model', 'stops'])
            ->withCount('assignments')
            ->latest()
            ->paginate($perPage);
    }
}