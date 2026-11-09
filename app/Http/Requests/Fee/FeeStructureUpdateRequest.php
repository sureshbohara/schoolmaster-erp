<?php

namespace App\Http\Requests\Fee;

use Illuminate\Foundation\Http\FormRequest;

class FeeStructureUpdateRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'academic_year_id' => ['required', 'exists:academic_years,id'],
            'class_id'         => ['required', 'exists:classes,id'],
            'fee_type_id'      => ['required', 'exists:fee_types,id'],
            'amount'           => ['required', 'numeric', 'min:0'],
            'due_date'         => ['required', 'date'],
            'status'           => ['required', 'in:active,inactive'],
        ];
    }
}