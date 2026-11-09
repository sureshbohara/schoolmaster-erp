<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FeePaymentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                 => $this->id,
            'invoice_no'         => $this->invoice_no,
            'amount'             => $this->amount,
            'discount'           => $this->discount,
            'fine'               => $this->fine,
            'net_amount'         => $this->net_amount,
            'payment_method'     => $this->payment_method,
            'payment_date'       => $this->payment_date?->format('Y-m-d'),
            'transaction_id'     => $this->transaction_id,
            'remarks'            => $this->remarks,
            'status'             => $this->status,
            'created_at'         => $this->created_at?->format('Y-m-d H:i:s'),

            'student' => $this->when($this->relationLoaded('student') && $this->student, fn () => [
                'id'           => $this->student->id,
                'admission_no' => $this->student->admission_no,
                'full_name'    => $this->student->full_name,
            ]),

            'fee_structure' => $this->when($this->relationLoaded('feeStructure') && $this->feeStructure, fn () => [
                'id'        => $this->feeStructure->id,
                'amount'    => $this->feeStructure->amount,
                'fee_type'  => $this->feeStructure->feeType ? [
                    'id'   => $this->feeStructure->feeType->id,
                    'name' => $this->feeStructure->feeType->name,
                ] : null,
            ]),

            'collector' => $this->when($this->relationLoaded('collector') && $this->collector, fn () => [
                'id'        => $this->collector->id,
                'full_name' => $this->collector->full_name ?? 'N/A',
            ]),
        ];
    }
}