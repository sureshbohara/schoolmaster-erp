<?php

namespace App\Models;

use App\Models\Scopes\BranchScope;
use App\Models\Scopes\OrganizationScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth; 
class GradingSystem extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'name', 'min_mark', 'max_mark', 'grade_point', 'grade', 'remark',
    ];

    protected function casts(): array
    {
        return [
            'min_mark'    => 'decimal:2',
            'max_mark'    => 'decimal:2',
            'grade_point' => 'decimal:2',
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
}