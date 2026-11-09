<?php

namespace App\Http\Requests\HR;

use App\Models\Designation;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DesignationUpdateRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $designationId = $this->route('designation')?->id;

        return [
            'department_id' => ['required', 'exists:departments,id'],
            'name'          => ['required', 'string', 'max:100'],
            'description'   => ['nullable', 'string', 'max:500'],
            'status'        => ['required', 'in:active,inactive'],
        ];
    }
}