<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'first_name' => $request->user()->first_name,
                    'last_name' => $request->user()->last_name,
                    'full_name' => $request->user()->full_name,
                    'email' => $request->user()->email,
                    'role' => $request->user()->role ? [
                        'id' => $request->user()->role->id,
                        'name' => $request->user()->role->name,
                    ] : null,
                    'permissions' => $request->user()->role 
                        ? $request->user()->role->permissions->pluck('name')->toArray() 
                        : [],
                ] : null,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ];
    }
}