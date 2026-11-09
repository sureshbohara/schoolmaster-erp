<?php

namespace App\Repositories;

use App\Models\FeeStructure;
use Illuminate\Pagination\LengthAwarePaginator;

class FeeStructureRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new FeeStructure();
    }

    public function getAllPaginated(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        $query = $this->model
            ->with(['academicYear:id,title', 'classModel:id,name', 'feeType:id,name']);

        if (! empty($filters['class_id'])) {
            $query->where('class_id', $filters['class_id']);
        }
        if (! empty($filters['academic_year_id'])) {
            $query->where('academic_year_id', $filters['academic_year_id']);
        }
        if (! empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->latest()->paginate($perPage);
    }
}