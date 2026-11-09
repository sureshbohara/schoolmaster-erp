<?php

namespace App\Services;

use App\Models\Income;
use App\Repositories\IncomeRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class IncomeService
{
    protected IncomeRepository $repository;

    public function __construct(IncomeRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll(int $perPage = 15, array $filters = []): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->repository->getAllPaginated($perPage, $filters);
    }

    public function create(array $data): Income
    {
        $data['receipt_no'] = $data['receipt_no'] ?? $this->repository->generateReceiptNo();

        if (isset($data['attachment']) && $data['attachment'] instanceof UploadedFile) {
            $data['attachment'] = $data['attachment']->store('incomes', 'public');
        }

        return $this->repository->create($data);
    }

    public function update(Income $income, array $data): Income
    {
        if (isset($data['attachment']) && $data['attachment'] instanceof UploadedFile) {
            if ($income->attachment) {
                Storage::disk('public')->delete($income->attachment);
            }
            $data['attachment'] = $data['attachment']->store('incomes', 'public');
        } else {
            unset($data['attachment']);
        }

        return $this->repository->update($income, $data);
    }

    public function delete(Income $income): bool
    {
        if ($income->attachment) {
            Storage::disk('public')->delete($income->attachment);
        }
        return $this->repository->delete($income);
    }
}