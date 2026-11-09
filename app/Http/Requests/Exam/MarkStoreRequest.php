<?php

namespace App\Http\Requests\Exam;

use Illuminate\Foundation\Http\FormRequest;

class MarkStoreRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'marks'              => ['required', 'array', 'min:1'],
            'marks.*.exam_id'    => ['required', 'exists:exams,id'],
            'marks.*.student_id' => ['required', 'exists:students,id'],
            'marks.*.subject_id' => ['required', 'exists:subjects,id'],
            'marks.*.theory_mark'    => ['nullable', 'numeric', 'min:0', 'max:100'],
            'marks.*.practical_mark' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'marks.*.obtained_mark'  => ['required', 'numeric', 'min:0', 'max:100'],
            'marks.*.remarks'        => ['nullable', 'string', 'max:255'],
        ];
    }
}