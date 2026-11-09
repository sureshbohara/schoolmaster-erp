<?php

namespace App\Repositories;

use App\Models\Student;
use App\Models\StudentAttendance;
use Illuminate\Support\Collection; 

class StudentAttendanceRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new StudentAttendance();
    }


    public function getAttendanceByClassAndDate(int $classId, int $sectionId, string $date): Collection
    {
        $students = Student::where('class_id', $classId)
            ->where('section_id', $sectionId)
            ->where('status', 'active')
            ->orderBy('first_name')
            ->get(['id', 'first_name', 'last_name', 'admission_no', 'academic_year_id']);
        $existingAttendance = StudentAttendance::whereIn('student_id', $students->pluck('id'))
            ->whereDate('date', $date)
            ->get()
            ->keyBy('student_id');

        return $students->map(function ($student) use ($existingAttendance, $classId, $sectionId, $date) {
            $attendance = $existingAttendance->get($student->id);
            return [
                'student_id'       => $student->id,
                'admission_no'     => $student->admission_no,
                'full_name'        => trim("{$student->first_name} {$student->last_name}"),
                'status'           => $attendance ? $attendance->status : 'present', // Default Present
                'remarks'          => $attendance ? $attendance->remarks : '',
                'academic_year_id' => $student->academic_year_id,
                'class_id'         => $classId,
                'section_id'       => $sectionId,
                'date'             => $date,
            ];
        });
    }

    public function bulkUpsert(array $records): void
    {
        foreach ($records as $record) {
            $this->model->updateOrCreate(
                ['student_id' => $record['student_id'], 'date' => $record['date']],
                [
                    'academic_year_id' => $record['academic_year_id'],
                    'class_id'         => $record['class_id'],
                    'section_id'       => $record['section_id'],
                    'status'           => $record['status'],
                    'remarks'          => $record['remarks'] ?? null,
                ]
            );
        }
    }

    public function getMonthlyReport(int $studentId, int $month, int $year): array
    {
        $attendances = $this->model
            ->where('student_id', $studentId)
            ->whereMonth('date', $month)
            ->whereYear('date', $year)
            ->get();

        return [
            'present'  => $attendances->where('status', 'present')->count(),
            'absent'   => $attendances->where('status', 'absent')->count(),
            'late'     => $attendances->where('status', 'late')->count(),
            'half_day' => $attendances->where('status', 'half_day')->count(),
            'total'    => $attendances->count(),
        ];
    }
}