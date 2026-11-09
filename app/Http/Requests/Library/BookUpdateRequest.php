<?php

namespace App\Http\Requests\Library;

use App\Models\Book;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BookUpdateRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $bookId = $this->route('book')?->id;

        return [
            'category_id'        => ['required', 'exists:book_categories,id'],
            'book_no'            => ['required', 'string', 'max:50', Rule::unique(Book::class)->ignore($bookId)],
            'isbn'               => ['nullable', 'string', 'max:50'],
            'title'              => ['required', 'string', 'max:255'],
            'author'             => ['nullable', 'string', 'max:150'],
            'publisher'          => ['nullable', 'string', 'max:150'],
            'publish_year'       => ['nullable', 'integer', 'min:1000', 'max:' . now()->year],
            'rack_no'            => ['nullable', 'string', 'max:20'],
            'price'              => ['nullable', 'numeric', 'min:0'],
            'total_quantity'     => ['required', 'integer', 'min:0'],
            'cover_image'        => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
        ];
    }
}