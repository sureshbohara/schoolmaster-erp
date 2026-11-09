<?php

namespace App\Models;

use App\Models\Scopes\BranchScope;
use App\Models\Scopes\OrganizationScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
class Payroll extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'employee_id', 'salary_structure_id', 'month', 'year',
        'basic', 'allowances', 'deductions', 'tax', 'net_pay',
        'status', 'paid_date', 'payment_method',
    ];

    protected function casts(): array
    {
        return [
            'basic'        => 'decimal:2',
            'allowances'   => 'decimal:2',
            'deductions'   => 'decimal:2',
            'tax'          => 'decimal:2',
            'net_pay'      => 'decimal:2',
            'paid_date'    => 'date',
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

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    public function salaryStructure(): BelongsTo
    {
        return $this->belongsTo(SalaryStructure::class);
    }
}