<?php
namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SectionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'room_no' => $this->room_no,
            'capacity' => $this->capacity,
            'status' => $this->status,
            'class' => $this->whenLoaded('classModel', fn() => [
                'id' => $this->classModel->id,
                'name' => $this->classModel->name,
            ]),
        ];
    }
}