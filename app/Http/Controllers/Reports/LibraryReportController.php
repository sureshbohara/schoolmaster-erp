<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\BookCategory;
use App\Models\BookIssue;
use App\Models\LibraryFine;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LibraryReportController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Reports/Library/Index');
    }


    public function bookStock(Request $request): Response
    {
        $categories = BookCategory::where('status', 'active')->get(['id', 'name']);

        $query = Book::with('category:id,name')->orderBy('title');

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('author', 'like', "%{$search}%")
                  ->orWhere('book_no', 'like', "%{$search}%");
            });
        }
        

        if ($request->filled('availability')) {
            if ($request->availability === 'available') {
                $query->where('available_quantity', '>', 0); 
            } elseif ($request->availability === 'unavailable') {
                $query->where('available_quantity', '<=', 0); 
            }
        }


        $books = $query->get([
            'id', 'book_no', 'title', 'author', 'publisher', 'category_id',
            'rack_no', 'price', 'total_quantity', 'available_quantity'
        ]);

        $totalBooks = $books->sum('total_quantity');
        $availableBooks = $books->sum('available_quantity');
        $issuedBooks = $totalBooks - $availableBooks;

        return Inertia::render('Reports/Library/BookStock', [
            'categories' => $categories,
            'books' => $books,
            'totalBooks' => $totalBooks,
            'availableBooks' => $availableBooks,
            'issuedBooks' => $issuedBooks,
            'filters' => $request->only(['category_id', 'search', 'availability']),
        ]);
    }


    public function overdueBooks(Request $request): Response
    {
        $query = BookIssue::with([
            'book:id,title,book_no',
            'student:id,admission_no,first_name,last_name,class_id,section_id',
            'employee:id,employee_id,first_name,last_name'
        ])->whereNull('return_date')
          ->where('due_date', '<', now());

        if ($request->filled('member_type')) {
            $query->where('member_type', $request->member_type);
        }

        $issues = $query->orderBy('due_date', 'asc')->get([
            'id', 'book_id', 'member_id', 'member_type', 'issue_date', 'due_date'
        ]);

        // Calculate overdue days
        foreach ($issues as $issue) {
            $issue->overdue_days = now()->diffInDays($issue->due_date);
            if ($issue->member_type === 'student' && $issue->student) {
                $class = \App\Models\ClassModel::find($issue->student->class_id);
                $section = \App\Models\Section::find($issue->student->section_id);
                $issue->class_name = $class?->name ?? 'N/A';
                $issue->section_name = $section?->name ?? 'N/A';
            }
        }

        return Inertia::render('Reports/Library/OverdueBooks', [
            'issues' => $issues,
            'totalOverdue' => $issues->count(),
            'filters' => $request->only(['member_type']),
        ]);
    }

  
    public function fineCollection(Request $request): Response
    {
        $query = LibraryFine::with([
            'bookIssue.book:id,title,book_no',
            'bookIssue.student:id,admission_no,first_name,last_name',
            'bookIssue.employee:id,employee_id,first_name,last_name'
        ])->orderBy('date', 'desc');

        if ($request->filled('from_date')) $query->whereDate('date', '>=', $request->from_date);
        if ($request->filled('to_date')) $query->whereDate('date', '<=', $request->to_date);

        $fines = $query->get(['id', 'book_issue_id', 'amount', 'reason', 'date']);
        $totalFine = $fines->sum('amount');

        return Inertia::render('Reports/Library/FineCollection', [
            'fines' => $fines,
            'totalFine' => $totalFine,
            'filters' => $request->only(['from_date', 'to_date']),
        ]);
    }

    public function categoryWise(Request $request): Response
    {
        $categories = BookCategory::withCount('books')
            ->orderBy('name')
            ->get(['id', 'name']);

        $categoryData = $categories->map(function ($category) {
            $totalQuantity = Book::where('category_id', $category->id)->sum('total_quantity');
            $availableQuantity = Book::where('category_id', $category->id)->sum('available_quantity');
            $totalValue = Book::where('category_id', $category->id)->sum(\DB::raw('price * total_quantity'));

            return [
                'id' => $category->id,
                'name' => $category->name,
                'total_books' => $category->books_count,
                'total_quantity' => $totalQuantity,
                'available_quantity' => $availableQuantity,
                'issued_quantity' => $totalQuantity - $availableQuantity,
                'total_value' => $totalValue,
            ];
        });

        return Inertia::render('Reports/Library/CategoryWise', [
            'categoryData' => $categoryData,
            'grandTotalBooks' => $categoryData->sum('total_books'),
            'grandTotalQuantity' => $categoryData->sum('total_quantity'),
            'grandTotalValue' => $categoryData->sum('total_value'),
        ]);
    }

 
    public function memberHistory(Request $request): Response
    {
        $query = BookIssue::with([
            'book:id,title,book_no',
            'student:id,admission_no,first_name,last_name,class_id,section_id',
            'employee:id,employee_id,first_name,last_name'
        ]);

        if ($request->filled('member_type')) {
            $query->where('member_type', $request->member_type);
        }
        if ($request->filled('member_id')) {
            $query->where('member_id', $request->member_id);
        }
        if ($request->filled('status')) {
            if ($request->status === 'returned') {
                $query->whereNotNull('return_date');
            } elseif ($request->status === 'not_returned') {
                $query->whereNull('return_date');
            } elseif ($request->status === 'overdue') {
                $query->whereNull('return_date')->where('due_date', '<', now());
            }
        }

        $issues = $query->orderBy('issue_date', 'desc')
            ->limit(500)
            ->get([
                'id', 'book_id', 'member_id', 'member_type',
                'issue_date', 'due_date', 'return_date', 'status'
            ]);

        // Add class info for students
        foreach ($issues as $issue) {
            if ($issue->member_type === 'student' && $issue->student) {
                $class = \App\Models\ClassModel::find($issue->student->class_id);
                $section = \App\Models\Section::find($issue->student->section_id);
                $issue->class_name = $class?->name ?? 'N/A';
                $issue->section_name = $section?->name ?? 'N/A';
            }
        }

        return Inertia::render('Reports/Library/MemberHistory', [
            'issues' => $issues,
            'totalIssues' => $issues->count(),
            'filters' => $request->only(['member_type', 'member_id', 'status']),
        ]);
    }
}