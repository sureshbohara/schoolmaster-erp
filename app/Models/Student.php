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
class Student extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'academic_year_id', 'class_id', 'section_id', 'user_id',
        'admission_no', 'registration_no', 'admission_date',
        'admission_class_id', 'previous_class_id', 'sibling_id',
        'first_name', 'last_name', 'gender', 'dob', 'blood_group',
        'nationality', 'religion', 'caste', 'category_id', 'mother_tongue',
        'father_name', 'mother_name', 'guardian_name', 'guardian_relation',
        'contact_number', 'emergency_contact', 'email',
        'address', 'city', 'state', 'zip_code',
        'photo', 'previous_school',
        'is_transport_user', 'is_hostel_user', 'is_promoted', 'status',
    ];

    protected function casts(): array
    {
        return [
            'dob'             => 'date',
            'admission_date'  => 'date',
            'is_transport_user' => 'boolean',
            'is_hostel_user'    => 'boolean',
            'is_promoted'       => 'boolean',
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

    public function academicYear(): BelongsTo
    {
        return $this->belongsTo(AcademicYear::class);
    }

    public function classModel(): BelongsTo
    {
        return $this->belongsTo(ClassModel::class, 'class_id');
    }

    public function section(): BelongsTo
    {
        return $this->belongsTo(Section::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(StudentCategory::class, 'category_id');
    }

    public function guardians(): HasMany
    {
        return $this->hasMany(Guardian::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(StudentDocument::class);
    }

    public function attendances(): HasMany
    {
        return $this->hasMany(StudentAttendance::class);
    }

    public function feePayments(): HasMany
    {
        return $this->hasMany(FeePayment::class);
    }

    public function scopeActive($query): void
    {
        $query->where('status', 'active');
    }


}