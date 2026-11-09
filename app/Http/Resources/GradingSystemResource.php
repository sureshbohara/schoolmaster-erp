<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GradingSystemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'name'        => $this->name,
            'min_mark'    => $this->min_mark,
            'max_mark'    => $this->max_mark,
            'grade_point' => $this->grade_point,
            'grade'       => $this->grade,
            'remark'      => $this->remark,
        ];
    }
}