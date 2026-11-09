<?php

namespace App\Services;

use App\Repositories\StudentAttendanceRepository;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection; 

class StudentAttendanceService
{
    protected StudentAttendanceRepository $repository;

    public function __construct(StudentAttendanceRepository $repository)
    {
        $this->repository = $repository;
    }


    public function getAttendanceByClassAndDate(int $classId, int $sectionId, string $date): Collection
    {
        return $this->repository->getAttendanceByClassAndDate($classId, $sectionId, $date);
    }

    public function markAttendance(array $records): void
    {
        $this->repository->bulkUpsert($records);
    }

    public function getMonthlyReport(int $studentId, ?int $month = null, ?int $year = null): array
    {
        $month = $month ?? now()->month;
        $year  = $year  ?? now()->year;

        return $this->repository->getMonthlyReport($studentId, $month, $year);
    }
}