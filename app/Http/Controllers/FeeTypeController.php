<?php

namespace App\Http\Controllers;

use App\Http\Requests\Fee\FeeTypeStoreRequest;
use App\Http\Requests\Fee\FeeTypeUpdateRequest;
use App\Http\Resources\FeeTypeResource;
use App\Models\FeeType;
use App\Services\FeeTypeService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class FeeTypeController extends Controller
{
    public function __construct(protected FeeTypeService $service) {}

    public function index(): Response
    {
        return Inertia::render('Fees/Types/Index', [
            'types' => FeeTypeResource::collection($this->service->getAll()),
        ]);
    }

    public function store(FeeTypeStoreRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());
        return redirect()->route('fees.types.index')->with('success', 'Fee type created successfully.');
    }

    public function update(FeeTypeUpdateRequest $request, FeeType $type): RedirectResponse
    {
        $this->service->update($type, $request->validated());
        return redirect()->route('fees.types.index')->with('success', 'Fee type updated successfully.');
    }

    public function destroy(FeeType $type): RedirectResponse
    {
        $this->service->delete($type);
        return redirect()->route('fees.types.index')->with('success', 'Fee type deleted successfully.');
    }
}