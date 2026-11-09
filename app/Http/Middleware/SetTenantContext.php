<?php

namespace App\Http\Middleware;

use App\Support\TenantContext;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetTenantContext
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();
        $context = app(TenantContext::class);

        if ($user) {
            $context->set($user);
        } else {
            $context->clear();
        }

        return $next($request);
    }
}