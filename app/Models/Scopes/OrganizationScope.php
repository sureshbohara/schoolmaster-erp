<?php

namespace App\Models\Scopes;

use App\Support\TenantContext;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class OrganizationScope implements Scope
{
    public function apply(Builder $builder, Model $model): void
    {
        $context = app(TenantContext::class);
        if (!$context->organizationId || in_array($context->role, ['super admin', 'super_admin'])) {
            return;
        }

        $builder->where($model->getTable() . '.organization_id', $context->organizationId);
    }

    public function extend(Builder $builder): void
    {
        $builder->macro('withoutOrganization', function (Builder $builder) {
            return $builder->withoutGlobalScope($this);
        });
    }
}