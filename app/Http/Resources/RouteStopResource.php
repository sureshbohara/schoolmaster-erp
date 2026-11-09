<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RouteStopResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'stop_name'   => $this->stop_name,
            'sequence'    => $this->sequence,
            'pickup_time' => $this->pickup_time,
            'drop_time'   => $this->drop_time,
            'fare'        => $this->fare,
        ];
    }
}