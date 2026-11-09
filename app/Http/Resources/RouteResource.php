<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RouteResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'        => $this->id,
            'name'      => $this->name,
            'base_fare' => $this->base_fare,
            'status'    => $this->status,


            'vehicle' => $this->when($this->relationLoaded('vehicle') && $this->vehicle, fn () => [
                'id'         => $this->vehicle->id,
                'vehicle_no' => $this->vehicle->vehicle_no,
                'model'      => $this->vehicle->model,
            ]),


            'stops' => $this->when($this->relationLoaded('stops'), fn () => 
                $this->stops->map(fn ($stop) => [
                    'id'          => $stop->id,
                    'stop_name'   => $stop->stop_name,
                    'sequence'    => $stop->sequence,
                    'pickup_time' => $stop->pickup_time,
                    'drop_time'   => $stop->drop_time,
                    'fare'        => $stop->fare,
                ])
            ),
        ];
    }
}