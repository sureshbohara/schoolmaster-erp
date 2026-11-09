<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('salary_structures', function (Blueprint $table) {
            $table->id();

            $table->foreignId('organization_id')->nullable()->constrained('organizations')->nullOnDelete();
            $table->foreignId('branch_id')->nullable()->constrained('branches')->nullOnDelete();

            $table->foreignId('designation_id')->constrained('designations')->cascadeOnDelete();
            $table->decimal('basic', 10, 2)->default(0.00);
            $table->decimal('allowance', 10, 2)->default(0.00);
            $table->decimal('medical', 10, 2)->default(0.00);
            $table->decimal('housing', 10, 2)->default(0.00);
            $table->decimal('transport', 10, 2)->default(0.00);
            $table->decimal('gross_salary', 10, 2)->default(0.00);
            $table->timestamps();
            $table->softDeletes();
            $table->index(['organization_id', 'branch_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('salary_structures');
    }
};