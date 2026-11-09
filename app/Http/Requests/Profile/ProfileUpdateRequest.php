<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $userId = $this->user()->id;

        return [
            'first_name' => ['required', 'string', 'max:100'],
            'last_name'  => ['required', 'string', 'max:100'],
            'email'      => ['required', 'string', 'email', 'max:150', Rule::unique('users')->ignore($userId)],
            'username'   => ['required', 'string', 'max:100', Rule::unique('users')->ignore($userId)],
            'phone'      => ['nullable', 'string', 'max:20'],
            'image'      => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
            'bio'        => ['nullable', 'string', 'max:1000'],
            'gender'     => ['required', 'in:male,female,other']
        ];
    }
}