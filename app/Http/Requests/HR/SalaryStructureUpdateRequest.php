<?php

namespace App\Http\Requests\HR;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SalaryStructureUpdateRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $structureId = $this->route('salaryStructure')?->id;

        return [
            'designation_id' => ['required', Rule::unique('salary_structures', 'designation_id')->ignore($structureId), 'exists:designations,id'],
            'basic'          => ['required', 'numeric', 'min:0'],
            'allowance'      => ['nullable', 'numeric', 'min:0'],
            'medical'        => ['nullable', 'numeric', 'min:0'],
            'housing'        => ['nullable', 'numeric', 'min:0'],
            'transport'      => ['nullable', 'numeric', 'min:0'],
        ];
    }
}