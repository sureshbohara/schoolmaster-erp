<?php

namespace App\Http\Requests\User;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserUpdateRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $userId = $this->route('user')?->id;

        return [
            'first_name'      => ['required', 'string', 'max:100'],
            'last_name'       => ['required', 'string', 'max:100'],
            'email'           => ['required', 'string', 'email', 'max:150', Rule::unique(User::class)->ignore($userId)],
            'username'        => ['required', 'string', 'max:100', Rule::unique(User::class)->ignore($userId)],
            'phone'           => ['nullable', 'string', 'max:20'],
            'password'        => ['nullable', 'string', 'min:8', 'confirmed'],
            'role_id'         => ['required', 'exists:roles,id'],
            'branch_id'       => ['nullable', 'exists:branches,id'],
            'organization_id' => ['nullable', 'exists:organizations,id'],
            'image'           => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
            'bio'             => ['nullable', 'string', 'max:1000'],
            'status'          => ['required', 'in:active,inactive,suspended'],
            'gender'     => ['required', 'in:male,female,other']
        ];
    }
}