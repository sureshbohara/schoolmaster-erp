<?php

namespace App\Http\Requests\Accounting;

use Illuminate\Foundation\Http\FormRequest;

class BankAccountUpdateRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'bank_name'       => ['required', 'string', 'max:100'],
            'account_name'    => ['required', 'string', 'max:150'],
            'account_number'  => ['required', 'string', 'max:50'],
            'branch_name'     => ['nullable', 'string', 'max:100'],
            'initial_balance' => ['nullable', 'numeric', 'min:0'],
        ];
    }
}