<?php

namespace Database\Seeders;

use App\Models\AcademicYear;
use App\Models\ClassModel;
use App\Models\FeeStructure;
use App\Models\FeeType;
use Illuminate\Database\Seeder;

class FeeStructureSeeder extends Seeder
{
    public function run(): void
    {
        $currentYear = AcademicYear::where('is_active', true)->first();
        $tuitionFee  = FeeType::where('name', 'Tuition Fee')->first();
        $examFee     = FeeType::where('name', 'Examination Fee')->first();
        $computerFee = FeeType::where('name', 'Computer Fee')->first();
        $libraryFee  = FeeType::where('name', 'Library Fee')->first();
        $sportsFee   = FeeType::where('name', 'Sports Fee')->first();

        if (! $currentYear || ! $tuitionFee) {
            $this->command->error('Required data not found.');
            return;
        }

        $classes = ClassModel::where('academic_year_id', $currentYear->id)->get();

        $feeMap = [
            'Nursery' => 3500, 'LKG' => 3500, 'UKG' => 3500,
            'One' => 4500, 'Two' => 4500, 'Three' => 4500, 'Four' => 4500, 'Five' => 4500,
            'Six' => 5500, 'Seven' => 5500, 'Eight' => 5500,
            'Nine' => 6500, 'Ten' => 6500,
            'Eleven' => 7500, 'Twelve' => 7500,
        ];

        foreach ($classes as $class) {
            $tuitionAmount = $feeMap[$class->name] ?? 5000;

            // Tuition Fee
            FeeStructure::updateOrCreate(
                ['academic_year_id' => $currentYear->id, 'class_id' => $class->id, 'fee_type_id' => $tuitionFee->id],
                [
                    'amount'    => $tuitionAmount,
                    'due_date'  => now()->endOfMonth(),
                    'status'    => 'active',
                ]
            );

            // Exam Fee
            FeeStructure::updateOrCreate(
                ['academic_year_id' => $currentYear->id, 'class_id' => $class->id, 'fee_type_id' => $examFee->id],
                [
                    'amount'    => 1500,
                    'due_date'  => now()->addMonths(3)->endOfMonth(),
                    'status'    => 'active',
                ]
            );

            // Computer Fee (for class 4+)
            if ($class->numeric_value >= 4) {
                FeeStructure::updateOrCreate(
                    ['academic_year_id' => $currentYear->id, 'class_id' => $class->id, 'fee_type_id' => $computerFee->id],
                    [
                        'amount'    => 1000,
                        'due_date'  => now()->endOfMonth(),
                        'status'    => 'active',
                    ]
                );
            }

            // Library Fee
            FeeStructure::updateOrCreate(
                ['academic_year_id' => $currentYear->id, 'class_id' => $class->id, 'fee_type_id' => $libraryFee->id],
                [
                    'amount'    => 500,
                    'due_date'  => now()->endOfMonth(),
                    'status'    => 'active',
                ]
            );

            // Sports Fee
            FeeStructure::updateOrCreate(
                ['academic_year_id' => $currentYear->id, 'class_id' => $class->id, 'fee_type_id' => $sportsFee->id],
                [
                    'amount'    => 300,
                    'due_date'  => now()->endOfMonth(),
                    'status'    => 'active',
                ]
            );
        }
    }
}