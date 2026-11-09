<?php

namespace App\Http\Controllers;

use App\Http\Requests\Profile\ProfileUpdateRequest;
use App\Http\Requests\Profile\ChangePasswordRequest;
use App\Http\Resources\UserResource;
use App\Services\ProfileService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function __construct(protected ProfileService $profileService) {}


    public function editProfile(Request $request): Response
    {
        return Inertia::render('Profile/UpdateProfile', [
            'user' => new UserResource($request->user()),
        ]);
    }

    public function updateProfile(ProfileUpdateRequest $request): RedirectResponse
    {
        $this->profileService->updateProfile($request->user(), $request->validated());
        return back()->with('success', 'Profile updated successfully.');
    }


    public function showChangePassword(): Response
    {
        return Inertia::render('Profile/UpdatePassword');
    }


    public function changePassword(ChangePasswordRequest $request): RedirectResponse
    {
        $this->profileService->changePassword($request->user(), $request->validated());
        return back()->with('success', 'Password changed successfully.');
    }
    
}