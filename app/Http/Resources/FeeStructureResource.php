<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FeeStructureResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'amount'     => $this->amount,
            'due_date'   => $this->due_date?->format('Y-m-d'),
            'status'     => $this->status,
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),

            'academic_year' => $this->when($this->relationLoaded('academicYear') && $this->academicYear, fn () => [
                'id'    => $this->academicYear->id,
                'title' => $this->academicYear->title,
            ]),

            'class' => $this->when($this->relationLoaded('classModel') && $this->classModel, fn () => [
                'id'   => $this->classModel->id,
                'name' => $this->classModel->name,
            ]),

            'fee_type' => $this->when($this->relationLoaded('feeType') && $this->feeType, fn () => [
                'id'   => $this->feeType->id,
                'name' => $this->feeType->name,
            ]),
        ];
    }
}