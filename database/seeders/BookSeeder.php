<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\BookCategory;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    public function run(): void
    {
        $textbook  = BookCategory::where('name', 'Textbooks')->first();
        $reference = BookCategory::where('name', 'Reference Books')->first();
        $fiction   = BookCategory::where('name', 'Fiction')->first();
        $science   = BookCategory::where('name', 'Science')->first();
        $math      = BookCategory::where('name', 'Mathematics')->first();

        $books = [
            ['category_id' => $textbook->id, 'book_no' => 'BK-001', 'isbn' => '978-9937-001-1', 'title' => 'Nepali Vyakaran', 'author' => 'Dr. Ram Sharma', 'publisher' => 'Sajha Publications', 'publish_year' => 2020, 'rack_no' => 'A-1', 'price' => 450.00, 'total_quantity' => 50, 'available_quantity' => 50],
            ['category_id' => $textbook->id, 'book_no' => 'BK-002', 'isbn' => '978-9937-001-2', 'title' => 'English Grammar', 'author' => 'Wren & Martin', 'publisher' => 'S. Chand', 'publish_year' => 2019, 'rack_no' => 'A-2', 'price' => 550.00, 'total_quantity' => 40, 'available_quantity' => 40],
            ['category_id' => $math->id, 'book_no' => 'BK-003', 'isbn' => '978-9937-001-3', 'title' => 'Mathematics for Class 10', 'author' => 'Prof. Hari Prasad', 'publisher' => 'Oxford Nepal', 'publish_year' => 2021, 'rack_no' => 'B-1', 'price' => 650.00, 'total_quantity' => 35, 'available_quantity' => 35],
            ['category_id' => $science->id, 'book_no' => 'BK-004', 'isbn' => '978-9937-001-4', 'title' => 'Physics Fundamentals', 'author' => 'Dr. Sita Devi', 'publisher' => 'Nepal Academic Press', 'publish_year' => 2020, 'rack_no' => 'B-2', 'price' => 750.00, 'total_quantity' => 30, 'available_quantity' => 30],
            ['category_id' => $science->id, 'book_no' => 'BK-005', 'isbn' => '978-9937-001-5', 'title' => 'Chemistry Basics', 'author' => 'Dr. Bikash Rai', 'publisher' => 'Nepal Academic Press', 'publish_year' => 2021, 'rack_no' => 'B-3', 'price' => 700.00, 'total_quantity' => 30, 'available_quantity' => 30],
            ['category_id' => $science->id, 'book_no' => 'BK-006', 'isbn' => '978-9937-001-6', 'title' => 'Biology: The Living World', 'author' => 'Dr. Anju Shrestha', 'publisher' => 'Nepal Academic Press', 'publish_year' => 2022, 'rack_no' => 'B-4', 'price' => 680.00, 'total_quantity' => 25, 'available_quantity' => 25],
            ['category_id' => $fiction->id, 'book_no' => 'BK-007', 'isbn' => '978-9937-001-7', 'title' => 'Muna Madan', 'author' => 'Laxmi Prasad Devkota', 'publisher' => 'Sajha Publications', 'publish_year' => 2018, 'rack_no' => 'C-1', 'price' => 350.00, 'total_quantity' => 20, 'available_quantity' => 20],
            ['category_id' => $fiction->id, 'book_no' => 'BK-008', 'isbn' => '978-9937-001-8', 'title' => 'Palpasa Cafe', 'author' => 'Narayan Wagle', 'publisher' => 'Parijat Publications', 'publish_year' => 2019, 'rack_no' => 'C-2', 'price' => 450.00, 'total_quantity' => 15, 'available_quantity' => 15],
            ['category_id' => $reference->id, 'book_no' => 'BK-009', 'isbn' => '978-9937-001-9', 'title' => 'Encyclopedia Britannica', 'author' => 'Various', 'publisher' => 'Britannica', 'publish_year' => 2015, 'rack_no' => 'D-1', 'price' => 5000.00, 'total_quantity' => 5, 'available_quantity' => 5],
            ['category_id' => $reference->id, 'book_no' => 'BK-010', 'isbn' => '978-9937-002-0', 'title' => 'Oxford English Dictionary', 'author' => 'Oxford University', 'publisher' => 'Oxford', 'publish_year' => 2020, 'rack_no' => 'D-2', 'price' => 3500.00, 'total_quantity' => 10, 'available_quantity' => 10],
        ];

        foreach ($books as $book) {
            Book::updateOrCreate(['book_no' => $book['book_no']], $book);
        }
    }
}