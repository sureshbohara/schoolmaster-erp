<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use App\Support\TenantContext;
use Illuminate\Support\ServiceProvider;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Gate;
use App\Models\User; 

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->scoped(TenantContext::class, fn () => new TenantContext());
    }

    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        JsonResource::withoutWrapping();

  
        Gate::before(function ($user, $ability) {
            $user->loadMissing('role');
            if ($user->role && strtolower($user->role->name) === 'super admin') {
                return true; 
            }
            return null; 
        });

        Gate::after(function ($user, $ability) {
            if (!$user->role) {
                return false;
            }
            
          
            $permissions = $user->role->permissions()->pluck('name')->toArray();
     
            return in_array($ability, $permissions, true);
        });
    }
}