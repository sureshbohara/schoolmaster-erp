<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamScheduleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'date'        => $this->date?->format('Y-m-d'),
            'start_time'  => $this->start_time,
            'end_time'    => $this->end_time,
            'full_mark'   => $this->full_mark,
            'pass_mark'   => $this->pass_mark,

            'subject' => $this->when($this->relationLoaded('subject') && $this->subject, fn () => [
                'id'   => $this->subject->id,
                'name' => $this->subject->name,
                'code' => $this->subject->code,
            ]),
        ];
    }
}