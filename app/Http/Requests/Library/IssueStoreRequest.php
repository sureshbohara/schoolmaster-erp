<?php

namespace App\Http\Requests\Library;

use Illuminate\Foundation\Http\FormRequest;

class IssueStoreRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'book_id'      => ['required', 'exists:books,id'],
            'member_id'    => ['required', 'numeric'],
            'member_type'  => ['required', 'in:student,employee'],
            'issue_date'   => ['required', 'date'],
            'due_date'     => ['required', 'date', 'after_or_equal:issue_date'],
        ];
    }
}