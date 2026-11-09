<?php

namespace App\Http\Controllers;

use App\Http\Requests\Library\IssueStoreRequest;
use App\Http\Resources\BookIssueResource; 
use App\Models\Book;
use App\Models\BookIssue;
use App\Models\Employee;
use App\Models\Student;
use App\Services\BookIssueService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookIssueController extends Controller
{
    public function __construct(protected BookIssueService $issueService) {}

    public function index(Request $request): Response
    {
        $issues = BookIssue::with([
            'book:id,book_no,title', 
            'student:id,first_name,last_name,admission_no', 
            'employee:id,first_name,last_name,employee_id'
        ])
        ->when($request->status, fn($q) => $q->where('status', $request->status))
        ->latest()
        ->paginate(15);

        return Inertia::render('Library/Issues/Index', [
            'issues'    => BookIssueResource::collection($issues),
            'filters'   => $request->only(['status']),
            'books'     => Book::where('available_quantity', '>', 0)->orderBy('title')->get(['id', 'book_no', 'title']),
            'students'  => Student::where('status', 'active')->orderBy('first_name')->get(['id', 'admission_no', 'first_name', 'last_name']),
            'employees' => Employee::where('status', 'active')->orderBy('first_name')->get(['id', 'employee_id', 'first_name', 'last_name']),
        ]);
    }

    public function store(IssueStoreRequest $request): RedirectResponse
    {
        try {
            $this->issueService->issueBook($request->validated());
            return back()->with('success', 'Book issued successfully!');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function update(Request $request, BookIssue $issue): RedirectResponse
    {
        try {
            $this->issueService->returnBook($issue);
            return back()->with('success', 'Book returned successfully!');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function destroy(BookIssue $issue): RedirectResponse
    {
        $issue->delete();
        return back()->with('success', 'Issue deleted successfully!');
    }
}