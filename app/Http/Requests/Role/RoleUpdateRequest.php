<?php
namespace App\Http\Requests\Role;
use Illuminate\Foundation\Http\FormRequest;

class RoleUpdateRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        $roleId = $this->route('role')->id;
        return [
            'name' => 'sometimes|required|string|max:100|unique:roles,name,' . $roleId,
            'guard_name' => 'sometimes|required|string|in:web,api',
            'permissions' => 'nullable|array',
            'permissions.*' => 'exists:permissions,id',
        ];
    }
}