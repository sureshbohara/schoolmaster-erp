<?php

namespace App\Console\Commands;

use App\Models\AcademicYear;
use App\Models\FeePayment;
use App\Models\FeeStructure;
use App\Models\Student;
use Carbon\Carbon;
use Illuminate\Console\Command;

class GenerateMonthlyFeeInvoices extends Command
{
    protected $signature = 'fees:generate-monthly-invoices';
    protected $description = 'Generate pending fee invoices for all active students for the current month';

    public function handle()
    {
        $this->info('Starting monthly fee invoice generation...');
        
        $currentMonth = Carbon::now()->format('Y-m');
        $today = Carbon::today();
        

        $academicYear = AcademicYear::where('is_active', true)->first();
        if (!$academicYear) {
            $this->error('No active academic year found.');
            return;
        }


        $activeStudents = Student::where('status', 'active')
            ->where('academic_year_id', $academicYear->id)
            ->get();

        $count = 0;
        foreach ($activeStudents as $student) {

            $feeStructures = FeeStructure::where('academic_year_id', $academicYear->id)
                ->where('class_id', $student->class_id)
                ->where('status', 'active')
                ->get();

            foreach ($feeStructures as $structure) {

                $exists = FeePayment::where('student_id', $student->id)
                    ->where('fee_structure_id', $structure->id)
                    ->whereMonth('payment_date', Carbon::now()->month)
                    ->whereYear('payment_date', Carbon::now()->year)
                    ->exists();

                if (!$exists) {
                    FeePayment::create([
                        'student_id' => $student->id,
                        'fee_structure_id' => $structure->id,
                        'invoice_no' => 'INV-' . $student->admission_no . '-' . $currentMonth . '-' . $structure->id,
                        'amount' => $structure->amount,
                        'discount' => 0,
                        'fine' => 0,
                        'net_amount' => $structure->amount,
                        'payment_method' => 'cash', 
                        'payment_date' => $today,
                        'status' => 'pending',
                        'organization_id' => $student->organization_id,
                        'branch_id' => $student->branch_id,
                    ]);
                    $count++;
                }
            }
        }

        $this->info("Successfully generated {$count} pending fee invoices for {$currentMonth}.");
    }
}