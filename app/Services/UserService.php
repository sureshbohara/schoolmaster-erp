<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UserService
{
    public function __construct(protected UserRepository $repository) {}

    public function getAll(int $perPage = 15, ?int $excludeUserId = null)
    {
        return $this->repository->getAllPaginated($perPage, $excludeUserId);
    }

    public function create(array $data): User
    {
        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            $data['image'] = $data['image']->store('users', 'public');
        }
        return $this->repository->create($data);
    }

    public function update(User $user, array $data): User
    {
        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            if ($user->image) Storage::disk('public')->delete($user->image);
            $data['image'] = $data['image']->store('users', 'public');
        } elseif (array_key_exists('image', $data) && $data['image'] === null) {
            if ($user->image) Storage::disk('public')->delete($user->image);
            $data['image'] = null;
        } else {
            unset($data['image']);
        }

        return $this->repository->update($user, $data);
    }

    public function delete(User $user): bool
    {
        return $this->repository->delete($user); 
    }

    public function getDropdownData(): array
    {
        return [
            'roles'         => \App\Models\Role::orderBy('name')->get(['id', 'name']),
            'branches'      => \App\Models\Branch::where('status', 'active')->orderBy('name')->get(['id', 'name', 'organization_id']),
            'organizations' => \App\Models\Organization::where('status', 'active')->orderBy('name')->get(['id', 'name']),
        ];
    }
}