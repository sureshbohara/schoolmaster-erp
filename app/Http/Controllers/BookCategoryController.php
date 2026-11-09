<?php

namespace App\Http\Controllers;

use App\Http\Requests\Library\BookCategoryStoreRequest;
use App\Http\Requests\Library\BookCategoryUpdateRequest;
use App\Http\Resources\BookCategoryResource;
use App\Models\BookCategory;
use App\Services\BookCategoryService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class BookCategoryController extends Controller
{
    public function __construct(protected BookCategoryService $service) {}

    public function index(): Response
    {
        return Inertia::render('Library/Categories/Index', [
            'categories' => BookCategoryResource::collection($this->service->getAll()),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Library/Categories/Form');
    }

    public function store(BookCategoryStoreRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());
        return redirect()->route('library.categories.index')->with('success', 'Book category created successfully.');
    }

    public function edit(BookCategory $category): Response
    {
        return Inertia::render('Library/Categories/Form', [
            'category' => new BookCategoryResource($category),
        ]);
    }

    public function update(BookCategoryUpdateRequest $request, BookCategory $category): RedirectResponse
    {
        $this->service->update($category, $request->validated());
        return redirect()->route('library.categories.index')->with('success', 'Book category updated successfully.');
    }

    public function destroy(BookCategory $category): RedirectResponse
    {
        $this->service->delete($category);
        return redirect()->route('library.categories.index')->with('success', 'Book category deleted successfully.');
    }

    
}