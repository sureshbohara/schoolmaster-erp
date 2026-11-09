<?php

namespace App\Repositories;

use App\Models\Employee;
use Illuminate\Pagination\LengthAwarePaginator;

class EmployeeRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new Employee();
    }

    public function getAllPaginated(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        $query = $this->model
            ->select('id', 'employee_id', 'department_id', 'designation_id',
                'first_name', 'last_name', 'gender', 'phone', 'joining_date',
                'basic_salary', 'photo', 'is_teaching_staff', 'status', 'created_at')
            ->with(['department:id,name', 'designation:id,name']);

        if (! empty($filters['department_id'])) {
            $query->where('department_id', $filters['department_id']);
        }
        if (! empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }
        if (! empty($filters['is_teaching_staff'])) {
            $query->where('is_teaching_staff', $filters['is_teaching_staff']);
        }
        if (! empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('employee_id', 'like', "%{$search}%");
            });
        }

        return $query->latest()->paginate($perPage);
    }
}