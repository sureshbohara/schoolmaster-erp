<?php

namespace App\Models;

use App\Models\Scopes\BranchScope;
use App\Models\Scopes\OrganizationScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Auth;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;
    use SoftDeletes;

 
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'username',
        'phone',
        'gender',
        'password',
        'organization_id',
        'role_id',
        'branch_id',
        'image',
        'bio',
        'status',
        'last_login_at',
        'last_login_ip',
    ];

 
    protected $hidden = [
        'password',
        'remember_token',
    ];

  
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
            'last_login_at'     => 'datetime',
        ];
    }

    protected static function boot(){
        parent::boot();
        static::deleting(function ($user) {
            if ($user->image) {
                Storage::disk('public')->delete($user->image);
            }
        });
    }
    
    public function getFullNameAttribute(): string
    {
        return trim("{$this->first_name} {$this->last_name}");
    }

  
    public function getImageUrlAttribute(): string
    {
        if ($this->image) {
            return Storage::disk('public')->url($this->image);
        }

        return asset('default/noimage.png');
    }


    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

  
    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }


    public function scopeActive($query): void
    {
        $query->where('status', 'active');
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