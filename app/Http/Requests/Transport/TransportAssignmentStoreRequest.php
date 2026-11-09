<?php

namespace App\Http\Requests\Transport;

use Illuminate\Foundation\Http\FormRequest;

class TransportAssignmentStoreRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'student_id'       => ['required', 'exists:students,id'],
            'route_id'         => ['required', 'exists:routes,id'],
            'stop_id'          => ['required', 'exists:route_stops,id'],
            'academic_year_id' => ['required', 'exists:academic_years,id'],
            'pickup_point'     => ['nullable', 'string', 'max:150'],
            'drop_point'       => ['nullable', 'string', 'max:150'],
            'monthly_fee'      => ['nullable', 'numeric', 'min:0'],
            'status'           => ['required', 'in:active,inactive'],
        ];
    }
}