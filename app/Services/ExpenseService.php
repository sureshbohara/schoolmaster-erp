<?php

namespace App\Services;

use App\Models\Expense;
use App\Repositories\ExpenseRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ExpenseService
{
    protected ExpenseRepository $repository;

    public function __construct(ExpenseRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll(int $perPage = 15, array $filters = []): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->repository->getAllPaginated($perPage, $filters);
    }

    public function create(array $data): Expense
    {
        $data['voucher_no'] = $data['voucher_no'] ?? $this->repository->generateVoucherNo();

        if (isset($data['attachment']) && $data['attachment'] instanceof UploadedFile) {
            $data['attachment'] = $data['attachment']->store('expenses', 'public');
        }

        return $this->repository->create($data);
    }

    public function update(Expense $expense, array $data): Expense
    {
        if (isset($data['attachment']) && $data['attachment'] instanceof UploadedFile) {
            if ($expense->attachment) {
                Storage::disk('public')->delete($expense->attachment);
            }
            $data['attachment'] = $data['attachment']->store('expenses', 'public');
        } else {
            unset($data['attachment']);
        }

        return $this->repository->update($expense, $data);
    }

    public function delete(Expense $expense): bool
    {
        if ($expense->attachment) {
            Storage::disk('public')->delete($expense->attachment);
        }
        return $this->repository->delete($expense);
    }
}