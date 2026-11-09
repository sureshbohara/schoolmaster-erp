<?php

namespace App\Http\Requests\Permission;

use App\Models\Permission;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PermissionStoreRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name'       => [
                'required',
                'string',
                'max:100',
                Rule::unique(Permission::class),
            ],
            'guard_name' => ['required', 'string', 'max:50'],
            'module'     => ['nullable', 'string', 'max:50'],
        ];
    }
}