<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IncomeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'receipt_no'    => $this->receipt_no,
            'amount'        => $this->amount,
            'date'          => $this->date?->format('Y-m-d'),
            'description'   => $this->description,
            'attachment_url'=> $this->attachment_url,
            'created_at'    => $this->created_at?->format('Y-m-d H:i:s'),

            'head' => $this->when($this->relationLoaded('head') && $this->head, fn () => [
                'id'   => $this->head->id,
                'name' => $this->head->name,
            ]),
        ];
    }
}