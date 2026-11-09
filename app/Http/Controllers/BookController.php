<?php

namespace App\Http\Controllers;

use App\Http\Requests\Library\BookStoreRequest;
use App\Http\Requests\Library\BookUpdateRequest;
use App\Http\Resources\BookResource;
use App\Models\Book;
use App\Services\BookService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookController extends Controller
{
    public function __construct(protected BookService $bookService) {}

    public function index(Request $request): Response
    {
        return Inertia::render('Library/Books/Index', [
            'books' => BookResource::collection(
                $this->bookService->getAll(15, $request->only(['category_id', 'available', 'search']))
            ),
            'filters' => $request->only(['category_id', 'available', 'search']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Library/Books/Form', [
            'categories' => \App\Models\BookCategory::where('status', 'active')->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(BookStoreRequest $request): RedirectResponse
    {
        $this->bookService->create($request->validated());
        return redirect()->route('library.books.index')->with('success', 'Book added successfully.');
    }

    public function edit(Book $book): Response
    {
        $book->load('category');
        return Inertia::render('Library/Books/Form', [
            'book' => new BookResource($book),
            'categories' => \App\Models\BookCategory::where('status', 'active')->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(BookUpdateRequest $request, Book $book): RedirectResponse
    {
        $this->bookService->update($book, $request->validated());
        return redirect()->route('library.books.index')->with('success', 'Book updated successfully.');
    }

    public function destroy(Book $book): RedirectResponse
    {
        $this->bookService->delete($book);
        return redirect()->route('library.books.index')->with('success', 'Book deleted successfully.');
    }
}