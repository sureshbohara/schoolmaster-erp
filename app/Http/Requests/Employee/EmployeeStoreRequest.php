<?php

namespace App\Http\Requests\Employee;

use App\Models\Employee;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EmployeeStoreRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'employee_id'       => ['required', 'string', 'max:50', Rule::unique(Employee::class)],
            'department_id'     => ['required', 'exists:departments,id'],
            'designation_id'    => ['required', 'exists:designations,id'],
            'first_name'        => ['required', 'string', 'max:100'],
            'last_name'         => ['required', 'string', 'max:100'],
            'gender'            => ['required', 'in:male,female,other'],
            'dob'               => ['nullable', 'date', 'before:today'],
            'blood_group'       => ['nullable', 'string', 'max:10'],
            'nationality'       => ['nullable', 'string', 'max:50'],
            'religion'          => ['nullable', 'string', 'max:50'],
            'marital_status'    => ['nullable', 'in:single,married,divorced,widowed'],
            'father_name'       => ['nullable', 'string', 'max:150'],
            'mother_name'       => ['nullable', 'string', 'max:150'],
            'spouse_name'       => ['nullable', 'string', 'max:150'],
            'joining_date'      => ['required', 'date'],
            'contract_end_date' => ['nullable', 'date', 'after:joining_date'],
            'basic_salary'      => ['nullable', 'numeric', 'min:0'],
            'qualification'     => ['nullable', 'string', 'max:255'],
            'experience_years'  => ['nullable', 'integer', 'min:0'],
            'bank_name'         => ['nullable', 'string', 'max:100'],
            'bank_account'      => ['nullable', 'string', 'max:100'],
            'bank_branch'       => ['nullable', 'string', 'max:100'],
            'ifsc_code'         => ['nullable', 'string', 'max:100'],
            'pan_number'        => ['nullable', 'string', 'max:50'],
            'pf_number'         => ['nullable', 'string', 'max:50'],
            'esi_number'        => ['nullable', 'string', 'max:50'],
            'address'           => ['nullable', 'string', 'max:255'],
            'city'              => ['nullable', 'string', 'max:100'],
            'state'             => ['nullable', 'string', 'max:100'],
            'zip_code'          => ['nullable', 'string', 'max:20'],
            'phone'             => ['nullable', 'string', 'max:20'],
            'emergency_contact' => ['nullable', 'string', 'max:20'],
            'photo'             => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'signature'         => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:1024'],
            'is_teaching_staff' => ['nullable', 'boolean'],
            'status'            => ['required', 'in:active,inactive,resigned,terminated'],
        ];
    }
}