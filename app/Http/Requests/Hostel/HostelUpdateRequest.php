<?php

namespace App\Http\Requests\Hostel;

use Illuminate\Foundation\Http\FormRequest;

class HostelUpdateRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name'    => ['required', 'string', 'max:100'],
            'type'    => ['required', 'in:boys,girls,unisex'],
            'address' => ['nullable', 'string'],
            'intro'   => ['nullable', 'string'],
            'status'  => ['required', 'in:active,inactive'],
        ];
    }
}