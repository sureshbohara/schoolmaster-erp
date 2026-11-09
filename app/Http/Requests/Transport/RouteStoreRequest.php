<?php

namespace App\Http\Requests\Transport;

use Illuminate\Foundation\Http\FormRequest;

class RouteStoreRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'vehicle_id'    => ['nullable', 'exists:vehicles,id'],
            'name'          => ['required', 'string', 'max:100'],
            'base_fare'     => ['nullable', 'numeric', 'min:0'],
            'status'        => ['required', 'in:active,inactive'],
            'stops'         => ['nullable', 'array'],
            'stops.*.stop_name'   => ['required_with:stops', 'string', 'max:100'],
            'stops.*.sequence'    => ['required_with:stops', 'integer', 'min:1'],
            'stops.*.pickup_time' => ['nullable', 'date_format:H:i'],
            'stops.*.drop_time'   => ['nullable', 'date_format:H:i'],
            'stops.*.fare'        => ['nullable', 'numeric', 'min:0'],
        ];
    }
}