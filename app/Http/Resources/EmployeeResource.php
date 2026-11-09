<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                => $this->id,
            'employee_id'       => $this->employee_id,
            'first_name'        => $this->first_name,
            'last_name'         => $this->last_name,
            'full_name'         => $this->full_name,
            'gender'            => $this->gender,
            'dob'               => $this->dob?->format('Y-m-d'),
            'blood_group'       => $this->blood_group,
            'nationality'       => $this->nationality,
            'religion'          => $this->religion,
            'marital_status'    => $this->marital_status,
            'father_name'       => $this->father_name,
            'mother_name'       => $this->mother_name,
            'spouse_name'       => $this->spouse_name,
            'joining_date'      => $this->joining_date?->format('Y-m-d'),
            'contract_end_date' => $this->contract_end_date?->format('Y-m-d'),
            'basic_salary'      => $this->basic_salary,
            'qualification'     => $this->qualification,
            'experience_years'  => $this->experience_years,
            'bank_name'         => $this->bank_name,
            'bank_account'      => $this->bank_account,
            'bank_branch'       => $this->bank_branch,
            'ifsc_code'         => $this->ifsc_code,
            'pan_number'        => $this->pan_number,
            'pf_number'         => $this->pf_number,
            'esi_number'        => $this->esi_number,
            'address'           => $this->address,
            'city'              => $this->city,
            'state'             => $this->state,
            'zip_code'          => $this->zip_code,
            'phone'             => $this->phone,
            'emergency_contact' => $this->emergency_contact,
            'photo_url'         => $this->photo_url,
            'signature_url'     => $this->signature_url,
            'is_teaching_staff' => $this->is_teaching_staff,
            'status'            => $this->status,
            'created_at'        => $this->created_at?->format('Y-m-d H:i:s'),

            'department' => $this->when($this->relationLoaded('department') && $this->department, fn () => [
                'id'   => $this->department->id,
                'name' => $this->department->name,
            ]),

            'designation' => $this->when($this->relationLoaded('designation') && $this->designation, fn () => [
                'id'   => $this->designation->id,
                'name' => $this->designation->name,
            ]),
        ];
    }
}