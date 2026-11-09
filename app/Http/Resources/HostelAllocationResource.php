<?php
namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HostelAllocationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'              => $this->id,
            'student_id'      => $this->student_id,
            'hostel_id'       => $this->hostel_id,
            'room_id'         => $this->room_id,
            'bed_no'          => $this->bed_no,
            'allocation_date' => $this->allocation_date?->format('Y-m-d'),
            'monthly_fee'     => $this->monthly_fee,
            'status'          => $this->status,
            
            'student' => $this->when($this->relationLoaded('student'), fn() => [
                'id' => $this->student->id,
                'full_name' => $this->student->first_name . ' ' . $this->student->last_name,
                'admission_no' => $this->student->admission_no,
            ]),
            'hostel' => $this->when($this->relationLoaded('hostel'), fn() => ['id' => $this->hostel->id, 'name' => $this->hostel->name]),
            'room' => $this->when($this->relationLoaded('room'), fn() => ['id' => $this->room->id, 'room_no' => $this->room->room_no]),
        ];
    }
}