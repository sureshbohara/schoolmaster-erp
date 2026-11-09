<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookIssueResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'book_id'     => $this->book_id,
            'member_id'   => $this->member_id,
            'member_type' => $this->member_type,
            'issue_date'  => $this->issue_date?->format('Y-m-d'),
            'due_date'    => $this->due_date?->format('Y-m-d'),
            'return_date' => $this->return_date?->format('Y-m-d'),
            'status'      => $this->status,
            
            'book' => $this->whenLoaded('book', fn () => [
                'id'      => $this->book->id,
                'book_no' => $this->book->book_no,
                'title'   => $this->book->title,
            ]),
            
            'member_info' => $this->member_info, 
        ];
    }
}