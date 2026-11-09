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
class Employee extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'user_id', 'employee_id', 'department_id', 'designation_id',
        'first_name', 'last_name', 'gender', 'dob', 'blood_group',
        'nationality', 'religion', 'marital_status',
        'father_name', 'mother_name', 'spouse_name',
        'joining_date', 'contract_end_date', 'basic_salary',
        'qualification', 'experience_years',
        'bank_name', 'bank_account', 'bank_branch', 'ifsc_code',
        'pan_number', 'pf_number', 'esi_number',
        'address', 'city', 'state', 'zip_code',
        'phone', 'emergency_contact',
        'photo', 'signature', 'is_teaching_staff', 'status',
    ];

    protected function casts(): array
    {
        return [
            'dob'               => 'date',
            'joining_date'      => 'date',
            'contract_end_date' => 'date',
            'basic_salary'      => 'decimal:2',
            'is_teaching_staff' => 'boolean',
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

    public function getFullNameAttribute(): string
    {
        return trim("{$this->first_name} {$this->last_name}");
    }

    public function getPhotoUrlAttribute(): string
    {
        if ($this->photo) {
            return Storage::disk('public')->url($this->photo);
        }
        return asset('default/noimage.png');
    }

    public function getSignatureUrlAttribute(): string
    {
        if ($this->signature) {
            return Storage::disk('public')->url($this->signature);
        }
        return '';
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function designation(): BelongsTo
    {
        return $this->belongsTo(Designation::class);
    }

    public function attendances(): HasMany
    {
        return $this->hasMany(StaffAttendance::class);
    }

    public function leaveApplications(): HasMany
    {
        return $this->hasMany(LeaveApplication::class);
    }

    public function payrolls(): HasMany
    {
        return $this->hasMany(Payroll::class);
    }

    public function scopeActive($query): void
    {
        $query->where('status', 'active');
    }
}