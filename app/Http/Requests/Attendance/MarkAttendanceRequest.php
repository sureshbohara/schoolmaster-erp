<?php

namespace App\Http\Requests\Attendance;

use Illuminate\Foundation\Http\FormRequest;

class MarkAttendanceRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'attendances'             => ['required', 'array', 'min:1'],
            'attendances.*.student_id'=> ['required', 'exists:students,id'],
            'attendances.*.date'      => ['required', 'date'],
            'attendances.*.class_id'  => ['required', 'exists:classes,id'],
            'attendances.*.section_id'=> ['required', 'exists:sections,id'],
            'attendances.*.academic_year_id' => ['required', 'exists:academic_years,id'],
            'attendances.*.status'    => ['required', 'in:present,absent,late,half_day'],
            'attendances.*.remarks'   => ['nullable', 'string', 'max:255'],
        ];
    }
}