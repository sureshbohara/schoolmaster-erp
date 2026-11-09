<?php

namespace App\Http\Requests\Academic;

use App\Models\Subject;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SubjectUpdateRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $subjectId = $this->route('subject')?->id;

        return [
            'name'   => ['required', 'string', 'max:100'],
            'code'   => ['nullable', 'string', 'max:50', Rule::unique(Subject::class)->ignore($subjectId)],
            'type'   => ['required', 'in:theory,practical,both'],
            'status' => ['required', 'in:active,inactive'],
        ];
    }
}