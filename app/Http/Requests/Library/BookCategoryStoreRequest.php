<?php
namespace App\Http\Requests\Library;
use Illuminate\Foundation\Http\FormRequest;
class BookCategoryStoreRequest extends FormRequest {

    
    public function authorize(): bool { return true; }


    public function rules(): array {
        return [
            'name' => ['required', 'string', 'max:100', 'unique:book_categories,name'],
            'status' => ['required', 'in:active,inactive'],
        ];
    }

}