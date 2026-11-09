<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DepartmentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'              => $this->id,
            'name'            => $this->name,
            'description'     => $this->description,
            'status'          => $this->status,
            'employees_count' => $this->when($this->employees_count !== null, $this->employees_count),
            'created_at'      => $this->created_at?->format('Y-m-d H:i:s'),
        ];
    }
}