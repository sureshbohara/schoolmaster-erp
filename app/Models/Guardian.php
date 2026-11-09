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
class Guardian extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'student_id', 'name', 'relation', 'phone', 'email',
        'password', 'occupation', 'photo', 'is_primary_contact',
    ];

    protected $hidden = ['password'];

    protected function casts(): array
    {
        return ['is_primary_contact' => 'boolean'];
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

    public function getPhotoUrlAttribute(): string
    {
        if ($this->photo) {
            return Storage::disk('public')->url($this->photo);
        }
        return asset('default/noimage.png');
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}