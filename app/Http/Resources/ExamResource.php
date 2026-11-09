<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'name'       => $this->name,
            'start_date' => $this->start_date?->format('Y-m-d'),
            'end_date'   => $this->end_date?->format('Y-m-d'),
            'status'     => $this->status,
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),

            'exam_type' => $this->when($this->relationLoaded('examType') && $this->examType, fn () => [
                'id'   => $this->examType->id,
                'name' => $this->examType->name,
            ]),

            'class' => $this->when($this->relationLoaded('classModel') && $this->classModel, fn () => [
                'id'   => $this->classModel->id,
                'name' => $this->classModel->name,
            ]),

            'academic_year' => $this->when($this->relationLoaded('academicYear') && $this->academicYear, fn () => [
                'id'    => $this->academicYear->id,
                'title' => $this->academicYear->title,
            ]),

         
            'schedules' => $this->whenLoaded('schedules', function () {
                return $this->schedules->map(function ($schedule) {
                    return [
                        'id'         => $schedule->id,
                        'subject_id' => $schedule->subject_id,
                        'date'       => $schedule->date ? $schedule->date->format('Y-m-d') : '',
                        'start_time' => $schedule->start_time,
                        'end_time'   => $schedule->end_time,
                        'full_mark'  => $schedule->full_mark,
                        'pass_mark'  => $schedule->pass_mark,
                        'subject'    => $schedule->subject ? [
                            'id'   => $schedule->subject->id,
                            'name' => $schedule->subject->name,
                        ] : null,
                    ];
                })->values(); 
            }),
        ];
    }
}