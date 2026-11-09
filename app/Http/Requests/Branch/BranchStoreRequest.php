<?php

namespace App\Http\Requests\Branch;

use App\Models\Branch;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BranchStoreRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name'            => ['required', 'string', 'max:150'],
            'code'            => ['required', 'string', 'max:50', Rule::unique(Branch::class)],
            'address'         => ['nullable', 'string'],
            'phone'           => ['nullable', 'string', 'max:50'],
            'email'           => ['nullable', 'string', 'email', 'max:100'],
            'organization_id' => ['nullable', 'exists:organizations,id'],
            'status'          => ['required', 'in:active,inactive'],
        ];
    }
}