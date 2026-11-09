<?php

namespace App\Http\Requests\Organization;

use Illuminate\Foundation\Http\FormRequest;

class OrganizationUpdateRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name'             => ['required', 'string', 'max:150'],
            'logo'             => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
            'address'          => ['nullable', 'string'],
            'phone'            => ['nullable', 'string', 'max:50'],
            'email'            => ['nullable', 'string', 'email', 'max:100'],
            'website'          => ['nullable', 'url', 'max:150'],
            'established_date' => ['nullable', 'date'],
            'status'           => ['required', 'in:active,inactive'],
        ];
    }
}