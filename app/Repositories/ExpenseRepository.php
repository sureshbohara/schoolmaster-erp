<?php

namespace App\Repositories;

use App\Models\Expense;
use Illuminate\Pagination\LengthAwarePaginator;

class ExpenseRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new Expense();
    }

    public function getAllPaginated(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        $query = $this->model->with('head:id,name');

        if (! empty($filters['head_id'])) {
            $query->where('head_id', $filters['head_id']);
        }
        if (! empty($filters['from_date'])) {
            $query->whereDate('date', '>=', $filters['from_date']);
        }
        if (! empty($filters['to_date'])) {
            $query->whereDate('date', '<=', $filters['to_date']);
        }

        return $query->latest('date')->paginate($perPage);
    }

    public function generateVoucherNo(): string
    {
        $last = $this->model->latest()->first();
        $lastNumber = $last ? (int) substr($last->voucher_no, -6) : 0;
        return 'VCH-' . str_pad($lastNumber + 1, 6, '0', STR_PAD_LEFT);
    }
}