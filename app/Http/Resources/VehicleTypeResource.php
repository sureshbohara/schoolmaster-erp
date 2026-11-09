<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VehicleTypeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'name'          => $this->name,
            'status'        => $this->status,
            'vehicles_count'=> $this->when($this->vehicles_count !== null, $this->vehicles_count),
            'created_at'    => $this->created_at?->format('Y-m-d H:i:s'),
        ];
    }
}