<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('marks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->nullable()->constrained('organizations')->nullOnDelete();
            $table->foreignId('branch_id')->nullable()->constrained('branches')->nullOnDelete();
            $table->foreignId('exam_id')->constrained('exams')->cascadeOnDelete();
            $table->foreignId('student_id')->constrained('students')->cascadeOnDelete();
            $table->foreignId('subject_id')->constrained('subjects')->cascadeOnDelete();
            $table->decimal('theory_mark', 5, 2)->nullable();
            $table->decimal('practical_mark', 5, 2)->nullable();
            $table->decimal('obtained_mark', 5, 2);
            $table->string('grade', 10)->nullable();
            $table->string('remarks', 255)->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            $table->unique(['exam_id', 'student_id', 'subject_id']);
            $table->index(['exam_id', 'student_id']);
            $table->index(['organization_id', 'branch_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('marks');
    }
};