<?php

namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    protected UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function login(array $credentials): array
    {
        $user = $this->userRepository->findByEmail($credentials['email']);

        if (! $user) {
            return ['success' => false, 'message' => 'Email does not exist.', 'status' => 404];
        }

        if (! Hash::check($credentials['password'], $user->password)) {
            return ['success' => false, 'message' => 'Invalid password.', 'status' => 401];
        }

        if ($user->status !== 'active') {
            return ['success' => false, 'message' => 'Your account is inactive. Contact admin.', 'status' => 403];
        }

        $user->update([
            'last_login_at' => now(),
            'last_login_ip' => request()->ip(),
        ]);

        return [
            'success' => true,
            'user'    => $user,
            'status'  => 200,
        ];
    }
}