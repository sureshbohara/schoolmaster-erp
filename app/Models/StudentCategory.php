<?php

namespace App\Models;

use App\Models\Scopes\BranchScope;
use App\Models\Scopes\OrganizationScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
class StudentCategory extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['name', 'discount_percentage', 'status'];

    protected function casts(): array
    {
        return ['discount_percentage' => 'decimal:2'];
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

    public function students(): HasMany
    {
        return $this->hasMany(Student::class, 'category_id');
    }

    public function scopeActive($query): void
    {
        $query->where('status', 'active');
    }
}