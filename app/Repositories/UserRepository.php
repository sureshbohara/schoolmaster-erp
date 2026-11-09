<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class UserRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new User();
    }

    public function findByEmail(string $email): ?User
    {
        return $this->findBy('email', $email, [
            'id', 'first_name', 'last_name', 'email', 'password', 'status', 'role_id', 'branch_id', 'organization_id'
        ], ['role', 'branch', 'organization']);
    }

    public function getAllPaginated(int $perPage = 15, ?int $excludeUserId = null, array $relations = ['role', 'branch', 'organization']): \Illuminate\Pagination\LengthAwarePaginator
    {
        $query = $this->model
            ->select(
                'id', 
                'first_name', 
                'last_name', 
                'email', 
                'username', 
                'phone', 
                'gender',
                'image', 
                'bio', 
                'status', 
                'last_login_at', 
                'role_id', 
                'branch_id', 
                'organization_id',
                'created_at'
            )
            ->with($relations);
        if ($excludeUserId) {
            $query->where('id', '!=', $excludeUserId);
        }

        return $query->latest()->paginate($perPage);
    }


    public function create(array $data): User
    {
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }
        
        return $this->model->create($data);
    }

    public function update(Model $model, array $data): User
    {
        if (isset($data['password']) && !empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }
        
        $model->update($data);
        return $model->fresh();
    }
}