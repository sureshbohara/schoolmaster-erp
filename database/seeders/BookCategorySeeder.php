<?php

namespace Database\Seeders;

use App\Models\BookCategory;
use Illuminate\Database\Seeder;

class BookCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Textbooks', 'status' => 'active'],
            ['name' => 'Reference Books', 'status' => 'active'],
            ['name' => 'Fiction', 'status' => 'active'],
            ['name' => 'Non-Fiction', 'status' => 'active'],
            ['name' => 'Science', 'status' => 'active'],
            ['name' => 'Mathematics', 'status' => 'active'],
            ['name' => 'Literature', 'status' => 'active'],
            ['name' => 'History', 'status' => 'active'],
            ['name' => 'Geography', 'status' => 'active'],
            ['name' => 'Encyclopedia', 'status' => 'active'],
            ['name' => 'Dictionary', 'status' => 'active'],
            ['name' => 'Children Books', 'status' => 'active'],
            ['name' => 'Magazines', 'status' => 'active'],
            ['name' => 'Journals', 'status' => 'active'],
        ];

        foreach ($categories as $category) {
            BookCategory::updateOrCreate(['name' => $category['name']], $category);
        }
    }
}