<?php

namespace App\Console\Commands;

use App\Models\Student;
use App\Models\StudentAttendance;
use Carbon\Carbon;
use Illuminate\Console\Command;

class MarkDailyAbsentStudents extends Command
{
    protected $signature = 'attendance:mark-absent';
    protected $description = 'Mark students as absent if no attendance record exists for today';

    public function handle()
    {
        $this->info('Starting daily absent marking...');
        
        $today = Carbon::today();
        
        $activeStudents = Student::where('status', 'active')->get();
        
        $count = 0;
        foreach ($activeStudents as $student) {

            $exists = StudentAttendance::where('student_id', $student->id)
                ->whereDate('date', $today)
                ->exists();

            if (!$exists) {
                StudentAttendance::create([
                    'student_id' => $student->id,
                    'academic_year_id' => $student->academic_year_id,
                    'class_id' => $student->class_id,
                    'section_id' => $student->section_id,
                    'date' => $today,
                    'status' => 'absent',
                    'remarks' => 'Auto-marked by system at midnight',
                    'organization_id' => $student->organization_id,
                    'branch_id' => $student->branch_id,
                ]);
                $count++;
            }
        }

        $this->info("Successfully marked {$count} students as absent for {$today->format('Y-m-d')}.");
    }
}