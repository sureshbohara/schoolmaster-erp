<?php

namespace App\Http\Requests\HR;

use Illuminate\Foundation\Http\FormRequest;

class SalaryStructureStoreRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'designation_id' => ['required', 'unique:salary_structures,designation_id', 'exists:designations,id'],
            'basic'          => ['required', 'numeric', 'min:0'],
            'allowance'      => ['nullable', 'numeric', 'min:0'],
            'medical'        => ['nullable', 'numeric', 'min:0'],
            'housing'        => ['nullable', 'numeric', 'min:0'],
            'transport'      => ['nullable', 'numeric', 'min:0'],
        ];
    }
}