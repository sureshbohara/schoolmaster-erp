<?php

namespace App\Http\Requests\Transport;

use App\Models\Vehicle;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class VehicleUpdateRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $vehicleId = $this->route('vehicle')?->id;

        return [
            'vehicle_type_id' => ['required', 'exists:vehicle_types,id'],
            'vehicle_no'      => ['required', 'string', 'max:50', Rule::unique(Vehicle::class)->ignore($vehicleId)],
            'model'           => ['nullable', 'string', 'max:50'],
            'capacity'        => ['nullable', 'integer', 'min:0'],
            'driver_name'     => ['nullable', 'string', 'max:100'],
            'driver_phone'    => ['nullable', 'string', 'max:20'],
            'status'          => ['required', 'in:active,inactive,maintenance'],
        ];
    }
}