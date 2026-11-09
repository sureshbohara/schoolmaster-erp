<?php

namespace App\Services;

use App\Models\TransportAssignment;
use App\Repositories\TransportAssignmentRepository;

class TransportAssignmentService
{
    protected TransportAssignmentRepository $repository;

    public function __construct(TransportAssignmentRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll(int $perPage = 15, array $filters = []): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->repository->getAllPaginated($perPage, $filters);
    }

    public function create(array $data): TransportAssignment
    {
        return $this->repository->create($data);
    }

    public function update(TransportAssignment $assignment, array $data): TransportAssignment
    {
        return $this->repository->update($assignment, $data);
    }

    public function delete(TransportAssignment $assignment): bool
    {
        return $this->repository->delete($assignment);
    }
}