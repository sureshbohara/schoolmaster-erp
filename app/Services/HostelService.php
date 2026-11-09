<?php

namespace App\Services;

use App\Models\Hostel;
use App\Repositories\HostelRepository;

class HostelService
{
    protected HostelRepository $repository;

    public function __construct(HostelRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll(int $perPage = 15): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->repository->getAllPaginated($perPage);
    }

    public function create(array $data): Hostel
    {
        return $this->repository->create($data);
    }

    public function update(Hostel $hostel, array $data): Hostel
    {
        return $this->repository->update($hostel, $data);
    }

    public function delete(Hostel $hostel): bool
    {
        return $this->repository->delete($hostel);
    }
}