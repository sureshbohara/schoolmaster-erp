<?php

namespace App\Services;

use App\Models\Book;
use App\Repositories\BookRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class BookService
{
    protected BookRepository $repository;

    public function __construct(BookRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll(int $perPage = 15, array $filters = []): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->repository->getAllPaginated($perPage, $filters);
    }

    public function create(array $data): Book
    {
        if (isset($data['cover_image']) && $data['cover_image'] instanceof UploadedFile) {
            $data['cover_image'] = $data['cover_image']->store('books', 'public');
        }
        $data['available_quantity'] = $data['total_quantity'] ?? 0;
        return $this->repository->create($data);
    }

    public function update(Book $book, array $data): Book
    {
        if (isset($data['cover_image']) && $data['cover_image'] instanceof UploadedFile) {
            if ($book->cover_image) {
                Storage::disk('public')->delete($book->cover_image);
            }
            $data['cover_image'] = $data['cover_image']->store('books', 'public');
        } else {
            unset($data['cover_image']);
        }

        if (isset($data['total_quantity'])) {
            $diff = $data['total_quantity'] - $book->total_quantity;
            $data['available_quantity'] = max(0, $book->available_quantity + $diff);
        }

        return $this->repository->update($book, $data);
    }

    public function delete(Book $book): bool
    {
        if ($book->cover_image) {
            Storage::disk('public')->delete($book->cover_image);
        }
        return $this->repository->delete($book);
    }
}