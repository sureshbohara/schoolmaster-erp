<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class ProfileService
{
    public function updateProfile(User $user, array $data): User
    {
        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            if ($user->image) {
                Storage::disk('public')->delete($user->image);
            }
            $data['image'] = $data['image']->store('users', 'public');
        } elseif (array_key_exists('image', $data) && $data['image'] === null) {
            if ($user->image) {
                Storage::disk('public')->delete($user->image);
            }
            $data['image'] = null;
        } else {
            unset($data['image']);
        }

        $user->update($data);
        return $user->fresh();
    }

    public function changePassword(User $user, array $data): bool
    {
        if (! Hash::check($data['current_password'], $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => 'Current password is incorrect.',
            ]);
        }

        $user->update([
            'password' => Hash::make($data['password']),
        ]);

        return true;
    }
}