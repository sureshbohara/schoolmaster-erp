<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GuardianResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                 => $this->id,
            'name'               => $this->name,
            'relation'           => $this->relation,
            'phone'              => $this->phone,
            'email'              => $this->email,
            'occupation'         => $this->occupation,
            'photo_url'          => $this->photo_url,
            'is_primary_contact' => $this->is_primary_contact,
        ];
    }
}