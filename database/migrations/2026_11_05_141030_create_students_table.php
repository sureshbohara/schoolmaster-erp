<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            

            $table->foreignId('organization_id')->nullable()->constrained('organizations')->nullOnDelete();
            $table->foreignId('branch_id')->nullable()->constrained('branches')->nullOnDelete();

            $table->foreignId('academic_year_id')->constrained('academic_years')->cascadeOnDelete();
            $table->foreignId('class_id')->constrained('classes')->cascadeOnDelete();
            $table->foreignId('section_id')->constrained('sections')->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            
            $table->string('admission_no', 50)->unique();
            $table->string('registration_no', 50)->nullable()->unique();
            $table->date('admission_date');
            $table->foreignId('admission_class_id')->nullable()->constrained('classes')->nullOnDelete();
            $table->foreignId('previous_class_id')->nullable()->constrained('classes')->nullOnDelete();
            $table->unsignedBigInteger('sibling_id')->nullable();
            
            $table->string('first_name', 100);
            $table->string('last_name', 100);
            $table->enum('gender', ['male', 'female', 'other']);
            $table->date('dob');
            $table->string('blood_group', 10)->nullable();
            $table->string('nationality', 50)->nullable();
            $table->string('religion', 50)->nullable();
            $table->string('caste', 50)->nullable();
            $table->foreignId('category_id')->nullable()->constrained('student_categories')->nullOnDelete();
            $table->string('mother_tongue', 50)->nullable();
            
            $table->string('father_name', 150)->nullable();
            $table->string('mother_name', 150)->nullable();
            $table->string('guardian_name', 150)->nullable();
            $table->string('guardian_relation', 50)->nullable();
            
            $table->string('contact_number', 20)->nullable();
            $table->string('emergency_contact', 20)->nullable();
            $table->string('email', 150)->nullable();
            $table->string('address', 255)->nullable();
            $table->string('city', 100)->nullable();
            $table->string('state', 100)->nullable();
            $table->string('zip_code', 20)->nullable();
            
            $table->string('photo', 255)->nullable();
            $table->string('previous_school', 150)->nullable();
            
            $table->boolean('is_transport_user')->default(false);
            $table->boolean('is_hostel_user')->default(false);
            $table->boolean('is_promoted')->default(false);
            $table->enum('status', ['active', 'inactive', 'graduated', 'tc_issued'])->default('active')->index();
            
            $table->timestamps();
            $table->softDeletes();
            

            $table->index(['organization_id', 'branch_id']);
            $table->index(['class_id', 'section_id']);
            $table->index(['admission_no', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};