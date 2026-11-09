<?php

namespace App\Http\Controllers;

use App\Http\Requests\Organization\OrganizationStoreRequest;
use App\Http\Requests\Organization\OrganizationUpdateRequest;
use App\Http\Resources\OrganizationResource;
use App\Models\Organization;
use App\Services\OrganizationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrganizationController extends Controller
{
    public function __construct(protected OrganizationService $organizationService) {}

    public function index(): Response
    {
        return Inertia::render('Organizations/Index', [
            'organizations' => OrganizationResource::collection($this->organizationService->getAll()),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Organizations/Form');
    }

    public function store(OrganizationStoreRequest $request): RedirectResponse
    {
        $this->organizationService->create($request->validated());
        return redirect()->route('organizations.index')
            ->with('success', 'Organization created successfully.');
    }

    public function edit(Organization $organization): Response
    {
        return Inertia::render('Organizations/Form', [
            'organization' => new OrganizationResource($organization),
        ]);
    }

    public function update(OrganizationUpdateRequest $request, Organization $organization): RedirectResponse
    {
        $this->organizationService->update($organization, $request->validated());
        return redirect()->route('organizations.index')
            ->with('success', 'Organization updated successfully.');
    }

    public function destroy(Organization $organization): RedirectResponse
    {
        $this->organizationService->delete($organization);
        return redirect()->route('organizations.index')
            ->with('success', 'Organization deleted successfully.');
    }

    public function updateStatus(Request $request, Organization $organization): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:active,inactive'],
        ]);

        $this->organizationService->updateStatus($organization, $validated['status']);
        return back()->with('success', 'Organization status updated successfully.');
    }
}