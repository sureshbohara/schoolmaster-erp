<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransportAssignmentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'student_id'    => $this->student_id,
            'route_id'      => $this->route_id,
            'stop_id'       => $this->stop_id,
            'academic_year_id' => $this->academic_year_id,
            'pickup_point'  => $this->pickup_point,
            'drop_point'    => $this->drop_point,
            'monthly_fee'   => $this->monthly_fee,
            'status'        => $this->status,
            'created_at'    => $this->created_at?->format('Y-m-d H:i:s'),

            'student' => $this->when($this->relationLoaded('student') && $this->student, fn () => [
                'id'           => $this->student->id,
                'full_name'    => $this->student->first_name . ' ' . $this->student->last_name,
                'admission_no' => $this->student->admission_no,
            ]),

            'route' => $this->when($this->relationLoaded('route') && $this->route, fn () => [
                'id'   => $this->route->id,
                'name' => $this->route->name,
                'stops' => $this->route->stops->map(fn ($stop) => [
                    'id'        => $stop->id,
                    'stop_name' => $stop->stop_name,
                    'sequence'  => $stop->sequence,
                ]),
            ]),

            'stop' => $this->when($this->relationLoaded('stop') && $this->stop, fn () => [
                'id'        => $this->stop->id,
                'stop_name' => $this->stop->stop_name,
            ]),

            'academic_year' => $this->when($this->relationLoaded('academicYear') && $this->academicYear, fn () => [
                'id'    => $this->academicYear->id,
                'title' => $this->academicYear->title,
            ]),
        ];
    }
}