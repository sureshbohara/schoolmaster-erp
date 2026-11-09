<?php

namespace App\Repositories;

use App\Models\FeePayment;
use Illuminate\Pagination\LengthAwarePaginator;

class FeePaymentRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new FeePayment();
    }

    public function getAllPaginated(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        $query = $this->model
            ->with(['student:id,first_name,last_name,admission_no', 'feeStructure', 'collector:id,first_name,last_name']);

        if (! empty($filters['student_id'])) {
            $query->where('student_id', $filters['student_id']);
        }
        if (! empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }
        if (! empty($filters['from_date'])) {
            $query->whereDate('payment_date', '>=', $filters['from_date']);
        }
        if (! empty($filters['to_date'])) {
            $query->whereDate('payment_date', '<=', $filters['to_date']);
        }

        return $query->latest('payment_date')->paginate($perPage);
    }

    public function generateInvoiceNo(): string
    {
        $lastPayment = $this->model->latest()->first();
        $lastNumber  = $lastPayment ? (int) substr($lastPayment->invoice_no, -6) : 0;
        return 'INV-' . str_pad($lastNumber + 1, 6, '0', STR_PAD_LEFT);
    }
}