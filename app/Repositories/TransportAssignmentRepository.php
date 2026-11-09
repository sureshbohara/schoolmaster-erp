<?php

namespace App\Repositories;

use App\Models\TransportAssignment;
use Illuminate\Pagination\LengthAwarePaginator;

class TransportAssignmentRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new TransportAssignment();
    }

    public function getAllPaginated(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        $query = $this->model
            ->with(['student:id,first_name,last_name,admission_no', 'route:id,name', 'stop:id,stop_name', 'academicYear:id,title']);

        if (! empty($filters['route_id'])) {
            $query->where('route_id', $filters['route_id']);
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