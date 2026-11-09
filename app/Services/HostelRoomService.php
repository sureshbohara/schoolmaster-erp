<?php

namespace App\Services;

use App\Models\HostelRoom;
use App\Repositories\HostelRoomRepository;

class HostelRoomService
{
    protected HostelRoomRepository $repository;

    public function __construct(HostelRoomRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll(int $perPage = 15, array $filters = []): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->repository->getAllPaginated($perPage, $filters);
    }

    public function getByHostel(int $hostelId): \Illuminate\Database\Eloquent\Collection
    {
        return $this->repository->getByHostel($hostelId);
    }

    public function create(array $data): HostelRoom
    {
        return $this->repository->create($data);
    }

    public function update(HostelRoom $room, array $data): HostelRoom
    {
        return $this->repository->update($room, $data);
    }

    public function delete(HostelRoom $room): bool
    {
        return $this->repository->delete($room);
    }
}