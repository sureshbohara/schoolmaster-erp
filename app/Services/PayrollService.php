<?php

namespace App\Services;

use App\Models\Payroll;
use App\Repositories\PayrollRepository;

class PayrollService
{
    protected PayrollRepository $repository;

    public function __construct(PayrollRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll(int $perPage = 15, array $filters = []): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->repository->getAllPaginated($perPage, $filters);
    }

    public function generate(array $data): Payroll
    {
        $data['net_pay'] = ($data['basic'] ?? 0) + ($data['allowances'] ?? 0)
            - ($data['deductions'] ?? 0) - ($data['tax'] ?? 0);

        return $this->repository->create($data);
    }

    public function markAsPaid(Payroll $payroll, array $data): Payroll
    {
        $payroll->update([
            'status'         => 'paid',
            'paid_date'      => $data['paid_date'] ?? now(),
            'payment_method' => $data['payment_method'] ?? null,
        ]);
        return $payroll->fresh();
    }

    public function delete(Payroll $payroll): bool
    {
        return $this->repository->delete($payroll);
    }
}