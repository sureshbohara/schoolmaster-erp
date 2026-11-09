<?php

namespace App\Http\Requests\Fee;

use Illuminate\Foundation\Http\FormRequest;

class FeePaymentUpdateRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'student_id'         => ['required', 'exists:students,id'],
            'fee_structure_id'   => ['required', 'exists:fee_structures,id'],
            'amount'             => ['required', 'numeric', 'min:0'],
            'discount'           => ['nullable', 'numeric', 'min:0'],
            'fine'               => ['nullable', 'numeric', 'min:0'],
            'payment_method'     => ['required', 'in:cash,bank_transfer,cheque,online'],
            'payment_date'       => ['required', 'date'],
            'transaction_id'     => ['nullable', 'string', 'max:100'],
            'remarks'            => ['nullable', 'string', 'max:500'],
        ];
    }
}