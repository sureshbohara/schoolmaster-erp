<?php

namespace App\Http\Requests\Exam;

use App\Models\ExamType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ExamTypeUpdateRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $typeId = $this->route('type')?->id;

        return [
            'name'   => ['required', 'string', 'max:100', Rule::unique(ExamType::class)->ignore($typeId)],
            'status' => ['required', 'in:active,inactive'],
        ];
    }
}