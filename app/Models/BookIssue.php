<?php

namespace App\Models;

use App\Models\Scopes\BranchScope;
use App\Models\Scopes\OrganizationScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth; 
class BookIssue extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'book_id', 'member_id', 'member_type',
        'issue_date', 'due_date', 'return_date', 'status', 'issued_by',
    ];

    protected function casts(): array
    {
        return [
            'issue_date'  => 'date',
            'due_date'    => 'date',
            'return_date' => 'date',
        ];
    }

    protected $appends = ['member_info'];

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

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    public function issuer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'issued_by');
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class, 'member_id');
    }

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'member_id');
    }

    public function getMemberInfoAttribute(){
        if ($this->member_type === 'student' && $this->relationLoaded('student')) {
            return [
                'first_name'   => $this->student->first_name,
                'last_name'    => $this->student->last_name,
                'admission_no' => $this->student->admission_no,
            ];
        } elseif ($this->member_type === 'employee' && $this->relationLoaded('employee')) {
            return [
                'first_name'  => $this->employee->first_name,
                'last_name'   => $this->employee->last_name,
                'employee_id' => $this->employee->employee_id,
            ];
        }
        return null;
    }

    public function fines(): HasMany
    {
        return $this->hasMany(LibraryFine::class, 'book_issue_id');
    }
}