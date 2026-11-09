<?php
namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HostelRoomResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'hostel_id'    => $this->hostel_id,
            'room_no'      => $this->room_no,
            'room_type'    => $this->room_type,
            'cost_per_bed' => $this->cost_per_bed,
            'no_of_beds'   => $this->no_of_beds,
            'status'       => $this->status,
            'hostel' => $this->when($this->relationLoaded('hostel'), fn() => ['id' => $this->hostel->id, 'name' => $this->hostel->name]),
            'allocations_count' => $this->when($this->allocations_count !== null, $this->allocations_count),
        ];
    }
}