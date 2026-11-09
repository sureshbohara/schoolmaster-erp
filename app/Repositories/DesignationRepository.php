<?php

namespace App\Repositories;

use App\Models\Designation;

class DesignationRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new Designation();
    }

    public function getAllPaginated(int $perPage = 15): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->model
            ->with('department:id,name')
            ->withCount('employees')
            ->latest()
            ->paginate($perPage);
    }

    public function getByDepartment(int $departmentId): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model
            ->where('department_id', $departmentId)
            ->where('status', 'active')
            ->orderBy('name')
            ->get(['id', 'name']);
    }
}