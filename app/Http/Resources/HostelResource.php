<?php
namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HostelResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'name'       => $this->name,
            'type'       => $this->type,
            'address'    => $this->address,
            'intro'      => $this->intro,
            'status'     => $this->status,
            'rooms_count'=> $this->when($this->rooms_count !== null, $this->rooms_count),
        ];
    }
}