<?php
namespace App\Http\Requests\Library;
use Illuminate\Foundation\Http\FormRequest;
class BookStoreRequest extends FormRequest {

    public function authorize(): bool { return true; }

    public function rules(): array {
        return [
            'category_id' => ['required', 'exists:book_categories,id'],
            'book_no' => ['required', 'string', 'max:50', 'unique:books,book_no'],
            'isbn' => ['nullable', 'string', 'max:50'],
            'title' => ['required', 'string', 'max:255'],
            'author' => ['nullable', 'string', 'max:150'],
            'publisher' => ['nullable', 'string', 'max:150'],
            'publish_year' => ['nullable', 'integer', 'min:1900', 'max:' . date('Y')],
            'rack_no' => ['nullable', 'string', 'max:20'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'total_quantity' => ['required', 'integer', 'min:1'],
            'cover_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'], 
        ];
    }
}