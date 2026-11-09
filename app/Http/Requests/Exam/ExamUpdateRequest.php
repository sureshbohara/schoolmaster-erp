<?php

namespace App\Http\Requests\Exam;

use Illuminate\Foundation\Http\FormRequest;

class ExamUpdateRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'exam_type_id'     => ['required', 'exists:exam_types,id'],
            'class_id'         => ['required', 'exists:classes,id'],
            'academic_year_id' => ['required', 'exists:academic_years,id'],
            'name'             => ['required', 'string', 'max:150'],
            'start_date'       => ['required', 'date'],
            'end_date'         => ['required', 'date', 'after_or_equal:start_date'],
            'status'           => ['required', 'in:scheduled,ongoing,completed,published'],
            
            'schedules'        => ['nullable', 'array'],
            'schedules.*.subject_id' => ['required_with:schedules', 'exists:subjects,id'],
            'schedules.*.date'       => ['required_with:schedules', 'date'],
            
          
            'schedules.*.start_time' => ['required_with:schedules', 'date_format:H:i'],
            'schedules.*.end_time'   => ['required_with:schedules', 'date_format:H:i'],
            
            'schedules.*.full_mark'  => ['required_with:schedules', 'numeric', 'min:0'],
            'schedules.*.pass_mark'  => ['required_with:schedules', 'numeric', 'min:0', 'lte:schedules.*.full_mark'],
        ];
    }
}