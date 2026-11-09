<?php

namespace App\Repositories;

use App\Models\Payroll;
use Illuminate\Pagination\LengthAwarePaginator;

class PayrollRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new Payroll();
    }

    public function getAllPaginated(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        $query = $this->model
            ->with(['employee:id,first_name,last_name,employee_id', 'salaryStructure']);

        if (! empty($filters['employee_id'])) {
            $query->where('employee_id', $filters['employee_id']);
        }
        if (! empty($filters['month'])) {
            $query->where('month', $filters['month']);
        }
        if (! empty($filters['year'])) {
            $query->where('year', $filters['year']);
        }
        if (! empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->latest()->paginate($perPage);
    }
}