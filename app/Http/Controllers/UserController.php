<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\UserStoreRequest;
use App\Http\Requests\User\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct(protected UserService $userService) {}


    public function index(): \Inertia\Response
    { 

        return Inertia::render('Users/Index', [
            'users' => UserResource::collection($this->userService->getAll(15, auth()->id())),
        ]);
    }

    public function create(): \Inertia\Response
    {
        return Inertia::render('Users/Form', [
            'dropdownData' => $this->userService->getDropdownData(),
        ]);
    }


    public function store(UserStoreRequest $request): RedirectResponse
    {
        $this->userService->create($request->validated());
        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }


    public function edit(User $user): \Inertia\Response
    {
        return Inertia::render('Users/Form', [
            'user'         => new UserResource($user),
            'dropdownData' => $this->userService->getDropdownData(),
        ]);
    }


    public function update(UserUpdateRequest $request, User $user): RedirectResponse
    {
        $this->userService->update($user, $request->validated());
        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }


    public function destroy(User $user): RedirectResponse
    {
        $this->userService->delete($user);
        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }


    public function updateStatus(Request $request, User $user): RedirectResponse
    {
        $user->update(['status' => $request->validate(['status' => 'required|in:active,inactive,suspended'])['status']]);
        return back()->with('success', 'User status updated successfully.');
    }

    
}