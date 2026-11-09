<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClassResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'name'          => $this->name,
            'numeric_value' => $this->numeric_value,
            'order'         => $this->order,
            'status'        => $this->status,
            'sections_count'=> $this->when($this->sections_count !== null, $this->sections_count),
            'created_at'    => $this->created_at?->format('Y-m-d H:i:s'),

            'academic_year' => $this->whenLoaded('academicYear', fn () => [
                'id'    => $this->academicYear->id,
                'title' => $this->academicYear->title,
            ]),
        ];
    }
}