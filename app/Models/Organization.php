<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Organization extends Model
{
    use HasFactory;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'logo',
        'address',
        'phone',
        'email',
        'website',
        'established_date',
        'status',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'established_date' => 'date',
        ];
    }

    /**
     * Get the organization's logo URL.
     */
    public function getLogoUrlAttribute(): string
    {
        if ($this->logo) {
            return Storage::disk('public')->url($this->logo);
        }

        return asset('default/noimage.png');
    }

    /**
     * Get the branches for the organization.
     */
    public function branches(): HasMany
    {
        return $this->hasMany(Branch::class);
    }

    /**
     * Get the users for the organization.
     */
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    /**
     * Scope a query to only include active organizations.
     */
    public function scopeActive($query): void
    {
        $query->where('status', 'active');
    }
}