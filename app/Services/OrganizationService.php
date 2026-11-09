<?php

namespace App\Services;

use App\Models\Organization;
use App\Repositories\OrganizationRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class OrganizationService
{
    protected OrganizationRepository $repository;

    public function __construct(OrganizationRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll(int $perPage = 15): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->repository->getAllWithCounts($perPage);
    }

    public function create(array $data): Organization
    {
        if (isset($data['logo']) && $data['logo'] instanceof UploadedFile) {
            $data['logo'] = $data['logo']->store('organizations', 'public');
        }

        return $this->repository->create($data);
    }

    public function update(Organization $organization, array $data): Organization
    {
        if (isset($data['logo']) && $data['logo'] instanceof UploadedFile) {
            if ($organization->logo) {
                Storage::disk('public')->delete($organization->logo);
            }
            $data['logo'] = $data['logo']->store('organizations', 'public');
        } elseif (array_key_exists('logo', $data) && $data['logo'] === null) {
            if ($organization->logo) {
                Storage::disk('public')->delete($organization->logo);
            }
            $data['logo'] = null;
        } else {
            unset($data['logo']);
        }

        return $this->repository->update($organization, $data);
    }

    public function delete(Organization $organization): bool
    {
        if ($organization->logo) {
            Storage::disk('public')->delete($organization->logo);
        }

        return $this->repository->delete($organization);
    }

    public function updateStatus(Organization $organization, string $status): Organization
    {
        $organization->update(['status' => $status]);
        return $organization->fresh();
    }
}