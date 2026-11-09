<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SalaryStructureResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'basic'        => $this->basic,
            'allowance'    => $this->allowance,
            'medical'      => $this->medical,
            'housing'      => $this->housing,
            'transport'    => $this->transport,
            'gross_salary' => $this->gross_salary,
            'created_at'   => $this->created_at?->format('Y-m-d H:i:s'),

            'designation' => $this->when($this->relationLoaded('designation') && $this->designation, fn () => [
                'id'   => $this->designation->id,
                'name' => $this->designation->name,
            ]),
        ];
    }
}