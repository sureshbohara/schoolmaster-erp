<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VehicleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'vehicle_no'   => $this->vehicle_no,
            'model'        => $this->model,
            'capacity'     => $this->capacity,
            'driver_name'  => $this->driver_name,
            'driver_phone' => $this->driver_phone,
            'status'       => $this->status,
            'created_at'   => $this->created_at?->format('Y-m-d H:i:s'),

            'vehicle_type' => $this->when($this->relationLoaded('vehicleType') && $this->vehicleType, fn () => [
                'id'   => $this->vehicleType->id,
                'name' => $this->vehicleType->name,
            ]),
        ];
    }
}