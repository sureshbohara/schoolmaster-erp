<?php

namespace App\Models;

use App\Models\Scopes\BranchScope;
use App\Models\Scopes\OrganizationScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth; 
class FeePayment extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'student_id', 'fee_structure_id', 'collected_by',
        'invoice_no', 'amount', 'discount', 'fine', 'net_amount',
        'payment_method', 'payment_gateway', 'transaction_id',
        'gateway_transaction_id', 'payment_date', 'status',
        'receipt_printed', 'remarks',
    ];

    protected function casts(): array
    {
        return [
            'amount'           => 'decimal:2',
            'discount'         => 'decimal:2',
            'fine'             => 'decimal:2',
            'net_amount'       => 'decimal:2',
            'payment_date'     => 'date',
            'receipt_printed'  => 'boolean',
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

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function feeStructure(): BelongsTo
    {
        return $this->belongsTo(FeeStructure::class);
    }

    public function collector(): BelongsTo
    {
        return $this->belongsTo(User::class, 'collected_by');
    }
}