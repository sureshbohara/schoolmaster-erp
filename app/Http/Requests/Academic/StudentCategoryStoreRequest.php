<?php
namespace App\Http\Requests\Academic;
use Illuminate\Foundation\Http\FormRequest;

class StudentCategoryStoreRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        return [
            'name' => 'required|string|unique:student_categories,name',
            'discount_percentage' => 'required|numeric|min:0|max:100',
            'status' => 'required|in:active,inactive',
        ];
    }
}