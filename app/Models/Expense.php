<?php

namespace App\Models;

use App\Models\Scopes\BranchScope;
use App\Models\Scopes\OrganizationScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth; 
class Expense extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'head_id', 'amount', 'date', 'description', 'voucher_no', 'attachment',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'date'   => 'date',
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

    public function getAttachmentUrlAttribute(): string
    {
        if ($this->attachment) {
            return Storage::disk('public')->url($this->attachment);
        }
        return '';
    }

    public function head(): BelongsTo
    {
        return $this->belongsTo(ExpenseHead::class, 'head_id');
    }
}