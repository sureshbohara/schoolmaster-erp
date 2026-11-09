<?php

namespace App\Services;

use App\Models\FeePayment;
use App\Repositories\FeePaymentRepository;

class FeePaymentService
{
    protected FeePaymentRepository $repository;

    public function __construct(FeePaymentRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll(int $perPage = 15, array $filters = []): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->repository->getAllPaginated($perPage, $filters);
    }

    public function create(array $data): FeePayment
    {
        $data['discount'] = $data['discount'] ?? 0;
        $data['fine']     = $data['fine'] ?? 0;
        
        $data['invoice_no']   = $data['invoice_no'] ?? $this->repository->generateInvoiceNo();
        $data['net_amount']   = ($data['amount'] ?? 0) - $data['discount'] + $data['fine'];
        $data['collected_by'] = auth()->id();

        return $this->repository->create($data);
    }

    public function update(FeePayment $payment, array $data): FeePayment
    {
        $amount   = $data['amount'] ?? $payment->amount;
        $discount = $data['discount'] ?? $payment->discount ?? 0;
        $fine     = $data['fine'] ?? $payment->fine ?? 0;
        
        $data['discount']   = $discount;
        $data['fine']       = $fine;
        $data['net_amount'] = $amount - $discount + $fine;

        return $this->repository->update($payment, $data);
    }

    public function delete(FeePayment $payment): bool
    {
        return $this->repository->delete($payment);
    }
}