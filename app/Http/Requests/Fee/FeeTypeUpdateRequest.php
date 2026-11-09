<?php

namespace App\Http\Requests\Fee;

use App\Models\FeeType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FeeTypeUpdateRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $typeId = $this->route('type')?->id;

        return [
            'name'        => ['required', 'string', 'max:100', Rule::unique(FeeType::class)->ignore($typeId)],
            'description' => ['nullable', 'string', 'max:500'],
            'status'      => ['required', 'in:active,inactive'],
        ];
    }
}