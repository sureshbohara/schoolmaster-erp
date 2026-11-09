<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                 => $this->id,
            'book_no'            => $this->book_no,
            'isbn'               => $this->isbn,
            'title'              => $this->title,
            'author'             => $this->author,
            'publisher'          => $this->publisher,
            'publish_year'       => $this->publish_year,
            'rack_no'            => $this->rack_no,
            'price'              => $this->price,
            'total_quantity'     => $this->total_quantity,
            'available_quantity' => $this->available_quantity,
            'cover_image_url'    => $this->cover_image_url,
            'category' => $this->when($this->relationLoaded('category') && $this->category, fn () => [
                'id'   => $this->category->id,
                'name' => $this->category->name,
            ]),
            
            'category_id' => $this->category_id,
        ];
    }
}