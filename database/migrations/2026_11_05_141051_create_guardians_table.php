<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('guardians', function (Blueprint $table) {
            $table->id();

            $table->foreignId('organization_id')->nullable()->constrained('organizations')->nullOnDelete();
            $table->foreignId('branch_id')->nullable()->constrained('branches')->nullOnDelete();

            $table->foreignId('student_id')->constrained('students')->cascadeOnDelete();
            $table->string('name', 150);
            $table->string('relation', 50);
            $table->string('phone', 20);
            $table->string('email', 150)->nullable();
            $table->string('password', 255)->nullable();
            $table->string('occupation', 100)->nullable();
            $table->string('photo', 255)->nullable();
            $table->boolean('is_primary_contact')->default(false);
            $table->timestamps();
            $table->softDeletes();
            $table->index(['organization_id', 'branch_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('guardians');
    }
};