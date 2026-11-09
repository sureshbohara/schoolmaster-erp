<?php

namespace App\Repositories;

use App\Models\LeaveApplication;
use Illuminate\Pagination\LengthAwarePaginator;

class LeaveApplicationRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new LeaveApplication();
    }

    public function getAllPaginated(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        $query = $this->model
            ->with(['employee:id,first_name,last_name,employee_id', 'leaveType:id,name', 'approver:id,first_name,last_name']);

        if (! empty($filters['employee_id'])) {
            $query->where('employee_id', $filters['employee_id']);
        }
        if (! empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->latest()->paginate($perPage);
    }
}