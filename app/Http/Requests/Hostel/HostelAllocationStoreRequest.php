<?php

namespace App\Http\Requests\Hostel;

use Illuminate\Foundation\Http\FormRequest;

class HostelAllocationStoreRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'student_id'      => ['required', 'exists:students,id'],
            'hostel_id'       => ['required', 'exists:hostels,id'],
            'room_id'         => ['required', 'exists:hostel_rooms,id'],
            'bed_no'          => ['required', 'string', 'max:10'],
            'allocation_date' => ['required', 'date'],
            'monthly_fee'     => ['nullable', 'numeric', 'min:0'],
            'status'          => ['required', 'in:active,discharged'],
        ];
    }
}