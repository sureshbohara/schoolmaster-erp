<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PayrollResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'             => $this->id,
            'month'          => $this->month,
            'year'           => $this->year,
            'basic'          => $this->basic,
            'allowances'     => $this->allowances,
            'deductions'     => $this->deductions,
            'tax'            => $this->tax,
            'net_pay'        => $this->net_pay,
            'status'         => $this->status,
            'paid_date'      => $this->paid_date?->format('Y-m-d'),
            'payment_method' => $this->payment_method,
            'created_at'     => $this->created_at?->format('Y-m-d H:i:s'),

            'employee' => $this->when($this->relationLoaded('employee') && $this->employee, fn () => [
                'id'          => $this->employee->id,
                'employee_id' => $this->employee->employee_id,
                'full_name'   => $this->employee->full_name,
            ]),
        ];
    }
}