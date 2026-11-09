<?php

namespace App\Http\Controllers;

use App\Http\Requests\Accounting\BankAccountStoreRequest;
use App\Http\Requests\Accounting\BankAccountUpdateRequest;
use App\Http\Resources\BankAccountResource;
use App\Models\BankAccount;
use App\Services\BankAccountService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class BankAccountController extends Controller
{
    public function __construct(protected BankAccountService $service) {}


    public function index(): Response
    {
        return Inertia::render('Accounting/BankAccounts/Index', [
            'accounts' => BankAccountResource::collection($this->service->getAll()),
        ]);
    }


    public function create(): Response
    {
        return Inertia::render('Accounting/BankAccounts/Form');
    }


    public function store(BankAccountStoreRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());
        return redirect()->route('accounting.bank-accounts.index')->with('success', 'Bank account created successfully.');
    }


    public function edit(BankAccount $account): Response
    {
        return Inertia::render('Accounting/BankAccounts/Form', [
            'account' => new BankAccountResource($account),
        ]);
    }

    public function update(BankAccountUpdateRequest $request, BankAccount $account): RedirectResponse
    {
        $this->service->update($account, $request->validated());
        return redirect()->route('accounting.bank-accounts.index')->with('success', 'Bank account updated successfully.');
    }


    public function destroy(BankAccount $account): RedirectResponse
    {
        $this->service->delete($account);
        return redirect()->route('accounting.bank-accounts.index')->with('success', 'Bank account deleted successfully.');
    }

}