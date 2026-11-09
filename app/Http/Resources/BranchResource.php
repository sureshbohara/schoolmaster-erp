<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BranchResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'name'       => $this->name,
            'code'       => $this->code,
            'address'    => $this->address,
            'phone'      => $this->phone,
            'email'      => $this->email,
            'status'     => $this->status,
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),

            'organization' => $this->whenLoaded('organization', fn () => [
                'id'   => $this->organization->id,
                'name' => $this->organization->name,
            ]),

         
            'users_count'    => $this->when($this->users_count !== null, $this->users_count),
            'students_count' => $this->when($this->students_count !== null, $this->students_count),
        ];
    }
}