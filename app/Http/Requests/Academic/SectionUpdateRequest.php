<?php

namespace App\Http\Requests\Academic;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SectionUpdateRequest extends FormRequest 
{
    public function authorize(): bool 
    { 
        return true; 
    }

    public function rules(): array 
    {
        return [
            'class_id' => 'required|exists:classes,id',
            
            'name' => [
                'required', 
                'string', 
                'max:50', 
                Rule::unique('sections')
                    ->where('class_id', $this->class_id) 
                    ->ignore($this->section->id)   
            ],
            
            'room_no' => 'nullable|string|max:50',
            'capacity' => 'nullable|integer|min:1',
            'status' => 'required|in:active,inactive',
        ];
    }
}