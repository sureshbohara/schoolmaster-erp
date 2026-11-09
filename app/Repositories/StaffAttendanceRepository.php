<?php

namespace App\Repositories;

use App\Models\Employee;
use App\Models\StaffAttendance;
use Illuminate\Support\Collection;

class StaffAttendanceRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new StaffAttendance();
    }

    public function getAttendanceByDepartmentAndDate(int $departmentId, string $date): Collection
    {
        $employees = Employee::where('department_id', $departmentId)
            ->where('status', 'active')
            ->orderBy('first_name')
            ->get(['id', 'employee_id', 'first_name', 'last_name']);

        $existingAttendance = StaffAttendance::whereIn('employee_id', $employees->pluck('id'))
            ->whereDate('date', $date)
            ->get()
            ->keyBy('employee_id');

        return $employees->map(function ($emp) use ($existingAttendance, $departmentId, $date) {
            $attendance = $existingAttendance->get($emp->id);
            return [
                'employee_id'   => $emp->id,
                'employee_code' => $emp->employee_id,
                'full_name'     => trim("{$emp->first_name} {$emp->last_name}"),
                'status'        => $attendance ? $attendance->status : 'present',
                'check_in'      => $attendance ? $attendance->check_in : null,
                'check_out'     => $attendance ? $attendance->check_out : null,
                'remarks'       => $attendance ? $attendance->remarks : null,
                'date'          => $date,
            ];
        });
    }

    public function bulkUpsert(array $records): void
    {
        foreach ($records as $record) {
            $this->model->updateOrCreate(
                ['employee_id' => $record['employee_id'], 'date' => $record['date']],
                [
                    'status'    => $record['status'],
                    'check_in'  => $record['check_in'] ?? null,
                    'check_out' => $record['check_out'] ?? null,
                    'remarks'   => $record['remarks'] ?? null,
                ]
            );
        }
    }


    public function getMonthlyReport(int $employeeId, int $month, int $year): array
    {
        $attendances = $this->model
            ->where('employee_id', $employeeId)
            ->whereMonth('date', $month)
            ->whereYear('date', $year)
            ->get();

        return [
            'present'  => $attendances->where('status', 'present')->count(),
            'absent'   => $attendances->where('status', 'absent')->count(),
            'leave'    => $attendances->where('status', 'leave')->count(),
            'half_day' => $attendances->where('status', 'half_day')->count(),
            'total'    => $attendances->count(),
        ];
    }
}