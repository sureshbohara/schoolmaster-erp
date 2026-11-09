<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookCategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'name'       => $this->name,
            'status'     => $this->status,
            'books_count'=> $this->when($this->books_count !== null, $this->books_count),
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
        ];
    }
}