<?php

namespace App\Http\Controllers;

use App\Http\Requests\Accounting\ExpenseStoreRequest;
use App\Http\Requests\Accounting\ExpenseUpdateRequest;
use App\Http\Resources\ExpenseResource;
use App\Models\Expense;
use App\Models\ExpenseHead;
use App\Services\ExpenseService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExpenseController extends Controller
{
    public function __construct(protected ExpenseService $service) {}

    private function getHeads(){
        return ExpenseHead::where('status', 'active')->orderBy('name')->get(['id', 'name']);
    }


    public function index(Request $request): Response
    {
        return Inertia::render('Accounting/Expenses/Index', [
            'expenses' => ExpenseResource::collection(
                $this->service->getAll(15, $request->only(['head_id', 'from_date', 'to_date']))
            ),
            'filters' => $request->only(['head_id', 'from_date', 'to_date']),
            'heads' => $this->getHeads(),
        ]);
    }


    public function create(): Response
    {
        return Inertia::render('Accounting/Expenses/Form', [
            'heads' => $this->getHeads(),
        ]);
    }


    public function store(ExpenseStoreRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());
        return redirect()->route('accounting.expenses.index')->with('success', 'Expense recorded successfully.');
    }


    public function edit(Expense $expense): Response
    {
        $expense->load('head');
        return Inertia::render('Accounting/Expenses/Form', [
            'expense' => new ExpenseResource($expense),
            'heads' => $this->getHeads(),
        ]);
    }


    public function update(ExpenseUpdateRequest $request, Expense $expense): RedirectResponse
    {
        $this->service->update($expense, $request->validated());
        return redirect()->route('accounting.expenses.index')->with('success', 'Expense updated successfully.');
    }


    public function destroy(Expense $expense): RedirectResponse
    {
        $this->service->delete($expense);
        return redirect()->route('accounting.expenses.index')->with('success', 'Expense deleted successfully.');
    }
    
}