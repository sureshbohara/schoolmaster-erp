<?php

namespace App\Http\Requests\Exam;

use Illuminate\Foundation\Http\FormRequest;

class GradingSystemUpdateRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name'        => ['required', 'string', 'max:50'],
            'min_mark'    => ['required', 'numeric', 'min:0', 'max:100'],
            'max_mark'    => ['required', 'numeric', 'min:0', 'max:100', 'gte:min_mark'],
            'grade_point' => ['required', 'numeric', 'min:0', 'max:4'],
            'grade'       => ['required', 'string', 'max:10'],
            'remark'      => ['nullable', 'string', 'max:50'],
        ];
    }
}