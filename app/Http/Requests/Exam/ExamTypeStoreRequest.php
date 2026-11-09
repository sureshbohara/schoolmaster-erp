<?php

namespace App\Http\Requests\Exam;

use App\Models\ExamType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ExamTypeStoreRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name'   => ['required', 'string', 'max:100', Rule::unique(ExamType::class)],
            'status' => ['required', 'in:active,inactive'],
        ];
    }
}