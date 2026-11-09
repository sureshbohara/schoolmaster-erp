<?php

namespace App\Models;

use App\Models\Scopes\BranchScope;
use App\Models\Scopes\OrganizationScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
class TransportAssignment extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'student_id', 'route_id', 'stop_id', 'academic_year_id',
        'pickup_point', 'drop_point', 'monthly_fee', 'status',
    ];

    protected function casts(): array
    {
        return ['monthly_fee' => 'decimal:2'];
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

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function route(): BelongsTo
    {
        return $this->belongsTo(RouteModel::class, 'route_id');
    }

    public function stop(): BelongsTo
    {
        return $this->belongsTo(RouteStop::class, 'stop_id');
    }

    public function academicYear(): BelongsTo
    {
        return $this->belongsTo(AcademicYear::class);
    }

    public function scopeActive($query): void
    {
        $query->where('status', 'active');
    }
}