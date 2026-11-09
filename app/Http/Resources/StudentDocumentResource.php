<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentDocumentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'document_type' => $this->document_type,
            'file_url'      => $this->file_url,
            'expiry_date'   => $this->expiry_date?->format('Y-m-d'),
        ];
    }
}