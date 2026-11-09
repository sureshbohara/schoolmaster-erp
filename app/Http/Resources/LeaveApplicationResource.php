<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LeaveApplicationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'               => $this->id,
            'start_date'       => $this->start_date?->format('Y-m-d'),
            'end_date'         => $this->end_date?->format('Y-m-d'),
            'reason'           => $this->reason,
            'status'           => $this->status,
            'attachment_url'   => $this->attachment_url,
            'created_at'       => $this->created_at?->format('Y-m-d H:i:s'),

            'employee' => $this->when($this->relationLoaded('employee') && $this->employee, fn () => [
                'id'          => $this->employee->id,
                'employee_id' => $this->employee->employee_id,
                'full_name'   => $this->employee->full_name,
            ]),

            'leave_type' => $this->when($this->relationLoaded('leaveType') && $this->leaveType, fn () => [
                'id'   => $this->leaveType->id,
                'name' => $this->leaveType->name,
            ]),

            'approver' => $this->when($this->relationLoaded('approver') && $this->approver, fn () => [
                'id'        => $this->approver->id,
                'full_name' => $this->approver->full_name,
            ]),
        ];
    }
}