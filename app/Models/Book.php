<?php

namespace App\Models;

use App\Models\Scopes\BranchScope;
use App\Models\Scopes\OrganizationScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth; 
class Book extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'category_id', 'book_no', 'isbn', 'title', 'author', 'publisher',
        'publish_year', 'rack_no', 'price', 'total_quantity',
        'available_quantity', 'cover_image',
    ];

    protected function casts(): array
    {
        return ['price' => 'decimal:2'];
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

    public function getCoverImageUrlAttribute(): string
    {
        if ($this->cover_image) {
            return Storage::disk('public')->url($this->cover_image);
        }
        return asset('default/noimage.png');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(BookCategory::class, 'category_id');
    }

    public function issues(): HasMany
    {
        return $this->hasMany(BookIssue::class);
    }

    public function scopeAvailable($query): void
    {
        $query->whereColumn('available_quantity', '>', 0);
    }
}