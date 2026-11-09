<?php

namespace App\Http\Requests\Academic;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StudentCategoryUpdateRequest extends FormRequest 
{
    public function authorize(): bool 
    { 
        return true; 
    }

    public function rules(): array 
    {

        $studentCategory = $this->route('student_category');

        return [
            'name' => [
                'required', 
                'string', 
                'max:100',
   
                Rule::unique('student_categories')->ignore($studentCategory?->id)
            ],
            'discount_percentage' => 'required|numeric|min:0|max:100',
            'status' => 'required|in:active,inactive',
        ];
    }
}