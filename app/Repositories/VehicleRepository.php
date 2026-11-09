<?php

namespace App\Repositories;

use App\Models\Vehicle;

class VehicleRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new Vehicle();
    }

    public function getAllPaginated(int $perPage = 15): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->model
            ->with('vehicleType:id,name')
            ->latest()
            ->paginate($perPage);
    }

    public function getAllForDropdown(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model
            ->where('status', 'active')
            ->orderBy('vehicle_no')
            ->get(['id', 'vehicle_no', 'model']);
    }
}