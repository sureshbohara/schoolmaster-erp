<?php

namespace App\Services;

use App\Repositories\StaffAttendanceRepository;
use Illuminate\Support\Collection;

class StaffAttendanceService
{
    protected StaffAttendanceRepository $repository;

    public function __construct(StaffAttendanceRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAttendanceByDepartmentAndDate(int $departmentId, string $date): Collection
    {
        return $this->repository->getAttendanceByDepartmentAndDate($departmentId, $date);
    }

    public function markAttendance(array $records): void
    {
        $this->repository->bulkUpsert($records);
    }


    public function getMonthlyReport(int $employeeId, ?int $month = null, ?int $year = null): array
    {
        $month = $month ?? now()->month;
        $year  = $year  ?? now()->year;

        return $this->repository->getMonthlyReport($employeeId, $month, $year);
    }
}