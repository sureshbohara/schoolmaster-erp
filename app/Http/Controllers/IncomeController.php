<?php

namespace App\Http\Controllers;

use App\Http\Requests\Accounting\IncomeStoreRequest;
use App\Http\Requests\Accounting\IncomeUpdateRequest;
use App\Http\Resources\IncomeResource;
use App\Models\Income;
use App\Models\IncomeHead;
use App\Services\IncomeService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class IncomeController extends Controller
{
    public function __construct(protected IncomeService $service) {}

    private function getHeads(){
        return IncomeHead::where('status', 'active')->orderBy('name')->get(['id', 'name']);
    }


    public function index(Request $request): Response
    {
        return Inertia::render('Accounting/Incomes/Index', [
            'incomes' => IncomeResource::collection(
                $this->service->getAll(15, $request->only(['head_id', 'from_date', 'to_date']))
            ),
            'filters' => $request->only(['head_id', 'from_date', 'to_date']),
            'heads' => $this->getHeads(),
        ]);
    }


    public function create(): Response
    {
        return Inertia::render('Accounting/Incomes/Form', [
            'heads' => $this->getHeads(),
        ]);
    }

    public function store(IncomeStoreRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());
        return redirect()->route('accounting.incomes.index')->with('success', 'Income recorded successfully.');
    }


    public function edit(Income $income): Response
    {
        $income->load('head');
        return Inertia::render('Accounting/Incomes/Form', [
            'income' => new IncomeResource($income),
            'heads' => $this->getHeads(),
        ]);
    }


    public function update(IncomeUpdateRequest $request, Income $income): RedirectResponse
    {
        $this->service->update($income, $request->validated());
        return redirect()->route('accounting.incomes.index')->with('success', 'Income updated successfully.');
    }


    public function destroy(Income $income): RedirectResponse
    {
        $this->service->delete($income);
        return redirect()->route('accounting.incomes.index')->with('success', 'Income deleted successfully.');
    }

    
}