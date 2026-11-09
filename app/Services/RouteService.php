<?php

namespace App\Services;

use App\Models\RouteModel;
use App\Repositories\RouteRepository;
use Illuminate\Support\Facades\DB;

class RouteService
{
    protected RouteRepository $repository;

    public function __construct(RouteRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll(int $perPage = 15): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->repository->getAllPaginated($perPage);
    }

    public function create(array $data): RouteModel
    {
        return DB::transaction(function () use ($data) {
            $stops = $data['stops'] ?? [];
            unset($data['stops']);

            $route = $this->repository->create($data);

            if (!empty($stops)) {
                $route->stops()->createMany($stops);
            }

            return $route->load('stops');
        });
    }

    public function update(RouteModel $route, array $data): RouteModel
    {
        return DB::transaction(function () use ($route, $data) {
            $stops = $data['stops'] ?? [];
            unset($data['stops']);
            $this->repository->update($route, $data);
            $route->stops()->delete();

            if (!empty($stops)) {
                $route->stops()->createMany($stops);
            }

            return $route->fresh(['stops', 'vehicle']);
        });
    }

    public function delete(RouteModel $route): bool
    {
        return $this->repository->delete($route);
    }
}