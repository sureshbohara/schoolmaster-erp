<?php

namespace App\Http\Requests\HR;

use Illuminate\Foundation\Http\FormRequest;

class PayrollGenerateRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'employee_id'         => ['required', 'exists:employees,id'],
            'salary_structure_id' => ['nullable', 'exists:salary_structures,id'],
            'month'               => ['required', 'integer', 'min:1', 'max:12'],
            'year'                => ['required', 'integer', 'min:2000', 'max:2100'],
            'basic'               => ['required', 'numeric', 'min:0'],
            'allowances'          => ['nullable', 'numeric', 'min:0'],
            'deductions'          => ['nullable', 'numeric', 'min:0'],
            'tax'                 => ['nullable', 'numeric', 'min:0'],
        ];
    }
}