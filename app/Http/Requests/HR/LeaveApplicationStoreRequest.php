<?php

namespace App\Http\Requests\HR;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class LeaveApplicationStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'employee_id'   => ['required', 'exists:employees,id'],
            'leave_type_id' => ['required', 'exists:leave_types,id'],
            'start_date'    => ['required', 'date'],
            'end_date'      => ['required', 'date', 'after_or_equal:start_date'],
            'reason'        => ['required', 'string', 'max:1000'],
            'status'        => ['required', Rule::in(['pending', 'approved', 'rejected'])],
            'attachment'    => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:2048'], // Max 2MB
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'end_date.after_or_equal' => 'End date must be the same as or after the start date.',
            'attachment.max'          => 'The attachment may not be greater than 2MB.',
            'attachment.mimes'        => 'The attachment must be a file of type: pdf, jpg, jpeg, png.',
        ];
    }
}