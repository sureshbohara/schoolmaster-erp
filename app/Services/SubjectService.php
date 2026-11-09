<?php

namespace App\Services;

use App\Models\Subject;
use App\Repositories\SubjectRepository;

class SubjectService
{
    protected SubjectRepository $repository;

    public function __construct(SubjectRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll(int $perPage = 15): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->repository->getAllPaginated($perPage);
    }

    public function getAllForDropdown(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->repository->getAllForDropdown();
    }

    public function create(array $data): Subject
    {
        return $this->repository->create($data);
    }

    public function update(Subject $subject, array $data): Subject
    {
        return $this->repository->update($subject, $data);
    }

    public function delete(Subject $subject): bool
    {
        return $this->repository->delete($subject);
    }
}