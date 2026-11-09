<?php

namespace App\Http\Requests\Permission;

use App\Models\Permission;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PermissionUpdateRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $permissionId = $this->route('permission')?->id;

        return [
            'name'       => [
                'required',
                'string',
                'max:100',
                Rule::unique(Permission::class)->ignore($permissionId),
            ],
            'guard_name' => ['required', 'string', 'max:50'],
            'module'     => ['nullable', 'string', 'max:50'],
        ];
    }
}