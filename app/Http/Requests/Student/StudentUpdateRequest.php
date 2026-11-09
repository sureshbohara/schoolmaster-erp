<?php

namespace App\Http\Requests\Student;

use App\Models\Student;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StudentUpdateRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $studentId = $this->route('student')?->id;

        return [
            'academic_year_id' => ['required', 'exists:academic_years,id'],
            'class_id'         => ['required', 'exists:classes,id'],
            'section_id'       => ['required', 'exists:sections,id'],
            'admission_no'     => ['required', 'string', 'max:50', Rule::unique(Student::class)->ignore($studentId)],
            'registration_no'  => ['nullable', 'string', 'max:50', Rule::unique(Student::class)->ignore($studentId)],
            'admission_date'   => ['required', 'date'],
            'first_name'       => ['required', 'string', 'max:100'],
            'last_name'        => ['required', 'string', 'max:100'],
            'gender'           => ['required', 'in:male,female,other'],
            'dob'              => ['required', 'date', 'before:today'],
            'blood_group'      => ['nullable', 'string', 'max:10'],
            'nationality'      => ['nullable', 'string', 'max:50'],
            'religion'         => ['nullable', 'string', 'max:50'],
            'caste'            => ['nullable', 'string', 'max:50'],
            'category_id'      => ['nullable', 'exists:student_categories,id'],
            'mother_tongue'    => ['nullable', 'string', 'max:50'],
            'father_name'      => ['nullable', 'string', 'max:150'],
            'mother_name'      => ['nullable', 'string', 'max:150'],
            'guardian_name'    => ['nullable', 'string', 'max:150'],
            'guardian_relation'=> ['nullable', 'string', 'max:50'],
            'contact_number'   => ['nullable', 'string', 'max:20'],
            'emergency_contact'=> ['nullable', 'string', 'max:20'],
            'email'            => ['nullable', 'email', 'max:150'],
            'address'          => ['nullable', 'string', 'max:255'],
            'city'             => ['nullable', 'string', 'max:100'],
            'state'            => ['nullable', 'string', 'max:100'],
            'zip_code'         => ['nullable', 'string', 'max:20'],
            'photo'            => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'previous_school'  => ['nullable', 'string', 'max:150'],
            'is_transport_user'=> ['nullable', 'boolean'],
            'is_hostel_user'   => ['nullable', 'boolean'],
            'status'           => ['required', 'in:active,inactive,graduated,tc_issued'],
        ];
    }
}