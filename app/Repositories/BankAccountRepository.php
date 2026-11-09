<?php

namespace App\Repositories;

use App\Models\BankAccount;

class BankAccountRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new BankAccount();
    }

    public function getAllPaginated(int $perPage = 15): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->model->latest()->paginate($perPage);
    }
}