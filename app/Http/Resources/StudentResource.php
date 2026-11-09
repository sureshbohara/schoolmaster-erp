<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'               => $this->id,
            'admission_no'     => $this->admission_no,
            'registration_no'  => $this->registration_no,
            'admission_date'   => $this->admission_date?->format('Y-m-d'),
            'first_name'       => $this->first_name,
            'last_name'        => $this->last_name,
            'full_name'        => $this->full_name,
            'gender'           => $this->gender,
            'dob'              => $this->dob?->format('Y-m-d'),
            'blood_group'      => $this->blood_group,
            'nationality'      => $this->nationality,
            'religion'         => $this->religion,
            'caste'            => $this->caste,
            'mother_tongue'    => $this->mother_tongue,
            'father_name'      => $this->father_name,
            'mother_name'      => $this->mother_name,
            'guardian_name'    => $this->guardian_name,
            'guardian_relation'=> $this->guardian_relation,
            'contact_number'   => $this->contact_number,
            'emergency_contact'=> $this->emergency_contact,
            'email'            => $this->email,
            'address'          => $this->address,
            'city'             => $this->city,
            'state'            => $this->state,
            'zip_code'         => $this->zip_code,
            'photo_url'        => $this->photo_url,
            'previous_school'  => $this->previous_school,
            'is_transport_user'=> $this->is_transport_user,
            'is_hostel_user'   => $this->is_hostel_user,
            'status'           => $this->status,
            'created_at'       => $this->created_at?->format('Y-m-d H:i:s'),

            'academic_year' => $this->when($this->relationLoaded('academicYear') && $this->academicYear, fn () => [
                'id'    => $this->academicYear->id,
                'title' => $this->academicYear->title,
            ]),

            'class' => $this->when($this->relationLoaded('classModel') && $this->classModel, fn () => [
                'id'   => $this->classModel->id,
                'name' => $this->classModel->name,
            ]),

            'section' => $this->when($this->relationLoaded('section') && $this->section, fn () => [
                'id'   => $this->section->id,
                'name' => $this->section->name,
            ]),

            'category' => $this->when($this->relationLoaded('category') && $this->category, fn () => [
                'id'                  => $this->category->id,
                'name'                => $this->category->name,
                'discount_percentage' => $this->category->discount_percentage,
            ]),

            'guardians'  => GuardianResource::collection($this->whenLoaded('guardians')),
            'documents'  => StudentDocumentResource::collection($this->whenLoaded('documents')),
        ];
    }
}