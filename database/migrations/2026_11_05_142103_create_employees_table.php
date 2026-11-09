<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();

            $table->foreignId('organization_id')->nullable()->constrained('organizations')->nullOnDelete();
            $table->foreignId('branch_id')->nullable()->constrained('branches')->nullOnDelete();


            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('employee_id', 50)->unique();
            $table->foreignId('department_id')->constrained('departments')->cascadeOnDelete();
            $table->foreignId('designation_id')->constrained('designations')->cascadeOnDelete();
            $table->string('first_name', 100);
            $table->string('last_name', 100);
            $table->enum('gender', ['male', 'female', 'other']);
            $table->date('dob')->nullable();
            $table->string('blood_group', 10)->nullable();
            $table->string('nationality', 50)->nullable();
            $table->string('religion', 50)->nullable();
            $table->enum('marital_status', ['single', 'married', 'divorced', 'widowed'])->nullable();
            $table->string('father_name', 150)->nullable();
            $table->string('mother_name', 150)->nullable();
            $table->string('spouse_name', 150)->nullable();
            $table->date('joining_date');
            $table->date('contract_end_date')->nullable();
            $table->decimal('basic_salary', 10, 2)->default(0.00);
            $table->string('qualification', 255)->nullable();
            $table->integer('experience_years')->default(0);
            $table->string('bank_name', 100)->nullable();
            $table->string('bank_account', 100)->nullable();
            $table->string('bank_branch', 100)->nullable();
            $table->string('ifsc_code', 100)->nullable();
            $table->string('pan_number', 50)->nullable();
            $table->string('pf_number', 50)->nullable();
            $table->string('esi_number', 50)->nullable();
            $table->string('address', 255)->nullable();
            $table->string('city', 100)->nullable();
            $table->string('state', 100)->nullable();
            $table->string('zip_code', 20)->nullable();
            $table->string('phone', 20)->nullable();
            $table->string('emergency_contact', 20)->nullable();
            $table->string('photo', 255)->nullable();
            $table->string('signature', 255)->nullable();
            $table->boolean('is_teaching_staff')->default(false);
            $table->enum('status', ['active', 'inactive', 'resigned', 'terminated'])->default('active')->index();
            $table->timestamps();
            $table->softDeletes();
            
            $table->index(['organization_id', 'branch_id']);
            $table->index(['department_id', 'status']);
            $table->index(['employee_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};