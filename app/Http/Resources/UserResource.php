<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'first_name'    => $this->first_name,
            'last_name'     => $this->last_name,
            'full_name'     => $this->full_name,
            'email'         => $this->email,
            'username'      => $this->username,
            'phone'         => $this->phone,
            'gender'        => $this->gender,
            'bio'           => $this->bio,
            'image_url'     => $this->image_url,
            'status'        => $this->status,
            'last_login_at' => $this->last_login_at?->diffForHumans(),
            'created_at'    => $this->created_at?->format('Y-m-d H:i:s'),
            
            'role' => $this->role ? [
                'id'   => $this->role->id,
                'name' => $this->role->name,
            ] : null,
            
            'branch' => $this->branch ? [
                'id'   => $this->branch->id,
                'name' => $this->branch->name,
            ] : null,
            
            'organization' => $this->organization ? [
                'id'   => $this->organization->id,
                'name' => $this->organization->name,
            ] : null,
        ];
    }
}