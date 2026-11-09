<?php

namespace App\Repositories;

use App\Models\SalaryStructure;

class SalaryStructureRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new SalaryStructure();
    }

    public function getAllPaginated(int $perPage = 15): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->model
            ->with('designation:id,name')
            ->latest()
            ->paginate($perPage);
    }

    public function getByDesignation(int $designationId): ?SalaryStructure
    {
        return $this->model->where('designation_id', $designationId)->first();
    }
}