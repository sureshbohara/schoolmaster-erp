<?php

namespace App\Services;

use App\Models\BankAccount;
use App\Repositories\BankAccountRepository;

class BankAccountService
{
    protected BankAccountRepository $repository;

    public function __construct(BankAccountRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll(int $perPage = 15): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->repository->getAllPaginated($perPage);
    }

    public function create(array $data): BankAccount
    {
        $data['current_balance'] = $data['initial_balance'] ?? 0;
        return $this->repository->create($data);
    }

    public function update(BankAccount $account, array $data): BankAccount
    {
        return $this->repository->update($account, $data);
    }

    public function delete(BankAccount $account): bool
    {
        return $this->repository->delete($account);
    }
}