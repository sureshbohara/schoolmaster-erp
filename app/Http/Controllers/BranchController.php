<?php

namespace App\Http\Controllers;

use App\Http\Requests\Branch\BranchStoreRequest;
use App\Http\Requests\Branch\BranchUpdateRequest;
use App\Http\Resources\BranchResource;
use App\Models\Branch;
use App\Services\BranchService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BranchController extends Controller
{
    public function __construct(protected BranchService $branchService) {}

    public function index(): Response
    {
        return Inertia::render('Branches/Index', [
            'branches' => BranchResource::collection($this->branchService->getAll()),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Branches/Form', [
            'dropdownData' => $this->branchService->getDropdownData(), 
        ]);
    }

    public function store(BranchStoreRequest $request): RedirectResponse
    {
        $this->branchService->create($request->validated());
        return redirect()->route('branches.index')->with('success', 'Branch created successfully.');
    }

    public function edit(Branch $branch): Response
    {

        $branch->load('organization');
        return Inertia::render('Branches/Form', [
            'branch' => new BranchResource($branch),
            'dropdownData' => $this->branchService->getDropdownData(), 
        ]);
    }

    public function update(BranchUpdateRequest $request, Branch $branch): RedirectResponse
    {
        $this->branchService->update($branch, $request->validated());
        return redirect()->route('branches.index')->with('success', 'Branch updated successfully.');
    }

    public function destroy(Branch $branch): RedirectResponse
    {
        $this->branchService->delete($branch);
        return redirect()->route('branches.index')->with('success', 'Branch deleted successfully.');
    }

    public function updateStatus(Request $request, Branch $branch): RedirectResponse
    {
        $validated = $request->validate(['status' => ['required', 'in:active,inactive']]);
        $this->branchService->updateStatus($branch, $validated['status']);
        return back()->with('success', 'Branch status updated successfully.');
    }
}