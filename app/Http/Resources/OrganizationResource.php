<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrganizationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'               => $this->id,
            'name'             => $this->name,
            'logo_url'         => $this->logo_url,
            'address'          => $this->address,
            'phone'            => $this->phone,
            'email'            => $this->email,
            'website'          => $this->website,
            'established_date' => $this->established_date?->format('Y-m-d'),
            'status'           => $this->status,
            'created_at'       => $this->created_at?->format('Y-m-d H:i:s'),

            'users_count'    => $this->when($this->users_count !== null, $this->users_count),
            'branches_count' => $this->when($this->branches_count !== null, $this->branches_count),
        ];
    }
}