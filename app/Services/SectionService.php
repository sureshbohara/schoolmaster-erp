<?php

namespace App\Services;

use App\Models\Section;
use App\Repositories\SectionRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class SectionService
{
    protected SectionRepository $repository;

    public function __construct(SectionRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAllPaginated(int $perPage = 15): LengthAwarePaginator
    {
        return $this->repository->getAllPaginated($perPage);
    }

    public function getByClass(int $classId): Collection
    {
        return $this->repository->getByClass($classId);
    }

    public function create(array $data): Section
    {
        return $this->repository->create($data);
    }

    public function update(Section $section, array $data): Section
    {
        return $this->repository->update($section, $data);
    }

    public function delete(Section $section): bool
    {
        return $this->repository->delete($section);
    }
}