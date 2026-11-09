<?php

namespace App\Http\Requests\Transport;

use Illuminate\Foundation\Http\FormRequest;

class RouteUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:100'],
            'vehicle_id' => ['nullable', 'exists:vehicles,id'],
            'base_fare' => ['nullable', 'numeric', 'min:0'],
            'status' => ['required', 'in:active,inactive'],
            'stops' => ['required', 'array', 'min:1'],
            'stops.*.id' => ['nullable', 'exists:route_stops,id'],
            'stops.*.stop_name' => ['required', 'string', 'max:100'],
            'stops.*.sequence' => ['required', 'integer', 'min:1'],
            'stops.*.pickup_time' => ['nullable', 'date_format:H:i'],
            'stops.*.drop_time' => ['nullable', 'date_format:H:i'],
            'stops.*.fare' => ['nullable', 'numeric', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'stops.*.pickup_time.date_format' => 'The pickup time must be in HH:MM format.',
            'stops.*.drop_time.date_format' => 'The drop time must be in HH:MM format.',
        ];
    }
}