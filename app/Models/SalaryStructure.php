<?php

namespace App\Models;

use App\Models\Scopes\BranchScope;
use App\Models\Scopes\OrganizationScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
class SalaryStructure extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'designation_id', 'basic', 'allowance', 'medical',
        'housing', 'transport', 'gross_salary',
    ];

    protected function casts(): array
    {
        return [
            'basic'        => 'decimal:2',
            'allowance'    => 'decimal:2',
            'medical'      => 'decimal:2',
            'housing'      => 'decimal:2',
            'transport'    => 'decimal:2',
            'gross_salary' => 'decimal:2',
        ];
    }

    protected static function booted(): void
    {
        static::addGlobalScope(new OrganizationScope());
        static::addGlobalScope(new BranchScope());

        static::creating(function ($model) {
            if (!$model->organization_id || !$model->branch_id) {
                $user = Auth::user();
                if ($user) {
                    $model->organization_id = $user->organization_id;
                    $model->branch_id = $user->branch_id;
                }
            }
        });
    }

    public function designation(): BelongsTo
    {
        return $this->belongsTo(Designation::class);
    }
}