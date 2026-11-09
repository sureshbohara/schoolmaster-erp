<?php

namespace App\Http\Requests\Academic;

use Illuminate\Foundation\Http\FormRequest;

class ClassStoreRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'academic_year_id' => ['required', 'exists:academic_years,id'],
            'name'             => ['required', 'string', 'max:50'],
            'numeric_value'    => ['required', 'integer', 'min:0'],
            'order'            => ['nullable', 'integer', 'min:0'],
            'status'           => ['required', 'in:active,inactive'],
        ];
    }
}