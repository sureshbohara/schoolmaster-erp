<?php

namespace App\Services;

use App\Models\Book;
use App\Models\BookIssue;

class BookIssueService
{


    public function issueBook(array $data): BookIssue
    {
        $book = Book::findOrFail($data['book_id']);

        if ($book->available_quantity <= 0) {
            throw new \Exception('Book is not available for issue.');
        }
        $issue = BookIssue::create([
            'book_id'      => $data['book_id'],
            'member_id'    => $data['member_id'],
            'member_type'  => $data['member_type'],
            'issue_date'   => $data['issue_date'] ?? now(),
            'due_date'     => $data['due_date'] ?? now()->addDays(14),
            'status'       => 'issued',
            'issued_by'    => auth()->id(),
        ]);
        $book->decrement('available_quantity');

        return $issue->load(['book:id,book_no,title', 'student:id,first_name,last_name,admission_no', 'employee:id,first_name,last_name,employee_id']);
    }

    public function returnBook(BookIssue $issue): BookIssue
    {
        if ($issue->status === 'returned') {
            throw new \Exception('Book already returned.');
        }

        $issue->update([
            'return_date' => now(),
            'status'      => 'returned',
        ]);
        $issue->book->increment('available_quantity');

        return $issue->fresh(['book:id,book_no,title', 'student:id,first_name,last_name,admission_no', 'employee:id,first_name,last_name,employee_id']);
    }
}