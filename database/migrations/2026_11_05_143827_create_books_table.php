<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->nullable()->constrained('organizations')->nullOnDelete();
            $table->foreignId('branch_id')->nullable()->constrained('branches')->nullOnDelete();
            $table->foreignId('category_id')->constrained('book_categories')->cascadeOnDelete();
            $table->string('book_no', 50)->unique();
            $table->string('isbn', 50)->nullable();
            $table->string('title', 255);
            $table->string('author', 150)->nullable();
            $table->string('publisher', 150)->nullable();
            $table->integer('publish_year')->nullable();
            $table->string('rack_no', 20)->nullable();
            $table->decimal('price', 10, 2)->default(0.00);
            $table->integer('total_quantity')->default(0);
            $table->integer('available_quantity')->default(0);
            $table->string('cover_image', 255)->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['organization_id', 'branch_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};