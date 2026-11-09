<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('fee_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->nullable()->constrained('organizations')->nullOnDelete();
            $table->foreignId('branch_id')->nullable()->constrained('branches')->nullOnDelete();

            $table->foreignId('student_id')->constrained('students')->cascadeOnDelete();
            $table->foreignId('fee_structure_id')->constrained('fee_structures')->cascadeOnDelete();
            $table->foreignId('collected_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('invoice_no', 50)->unique();
            $table->decimal('amount', 10, 2);
            $table->decimal('discount', 10, 2)->default(0.00);
            $table->decimal('fine', 10, 2)->default(0.00);
            $table->decimal('net_amount', 10, 2);
            $table->enum('payment_method', ['cash', 'cheque', 'bank_transfer', 'online']);
            $table->string('payment_gateway', 50)->nullable();
            $table->string('transaction_id', 100)->nullable();
            $table->string('gateway_transaction_id', 100)->nullable();
            $table->date('payment_date');
            $table->enum('status', ['paid', 'pending', 'failed', 'refunded'])->default('paid')->index();
            $table->boolean('receipt_printed')->default(false);
            $table->text('remarks')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            $table->index(['student_id', 'payment_date']);
            $table->index(['invoice_no']);
            $table->index(['organization_id', 'branch_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fee_payments');
    }
};