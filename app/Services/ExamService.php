<?php

namespace App\Services;

use App\Models\Exam;
use App\Repositories\ExamRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ExamService
{
    protected ExamRepository $repository;

    public function __construct(ExamRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll(int $perPage = 15, array $filters = []): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->repository->getAllPaginated($perPage, $filters);
    }

    public function create(array $data): Exam
    {
        $schedules = $data['schedules'] ?? [];
        unset($data['schedules']);

        return DB::transaction(function () use ($data, $schedules) {
            $exam = $this->repository->create($data);
            
            if (! empty($schedules)) {
                $validSchedules = collect($schedules)->filter(function ($schedule) {
                    return !empty($schedule['subject_id']) && !empty($schedule['date']);
                })->map(function ($schedule) use ($exam) {
                    $schedule['exam_id'] = $exam->id;
                    // Time format clean
                    $schedule['start_time'] = !empty($schedule['start_time']) ? substr($schedule['start_time'], 0, 5) : null;
                    $schedule['end_time'] = !empty($schedule['end_time']) ? substr($schedule['end_time'], 0, 5) : null;
                    return $schedule;
                })->toArray();

                if (!empty($validSchedules)) {
                    $exam->schedules()->createMany($validSchedules);
                }
            }

            return $exam->load(['schedules.subject', 'examType', 'classModel', 'academicYear']);
        });
    }

    public function update(Exam $exam, array $data): Exam
    {
        $incomingSchedules = $data['schedules'] ?? [];
        unset($data['schedules']);

        return DB::transaction(function () use ($exam, $data, $incomingSchedules) {
    
            $exam->update($data);

    
            $incomingIds = collect($incomingSchedules)->pluck('id')->filter()->toArray();

       
            if (!empty($incomingIds)) {
                $exam->schedules()->whereNotIn('id', $incomingIds)->forceDelete();
            } else {
  
                $exam->schedules()->forceDelete();
            }

      
            foreach ($incomingSchedules as $scheduleData) {
         
                if (empty($scheduleData['subject_id']) || empty($scheduleData['date'])) {
                    continue;
                }

                $startTime = !empty($scheduleData['start_time']) ? substr($scheduleData['start_time'], 0, 5) : null;
                $endTime = !empty($scheduleData['end_time']) ? substr($scheduleData['end_time'], 0, 5) : null;

                $payload = [
                    'exam_id' => $exam->id,
                    'subject_id' => $scheduleData['subject_id'],
                    'date' => $scheduleData['date'],
                    'start_time' => $startTime,
                    'end_time' => $endTime,
                    'full_mark' => $scheduleData['full_mark'] ?? 0,
                    'pass_mark' => $scheduleData['pass_mark'] ?? 0,
                ];

                if (!empty($scheduleData['id'])) {
          
                    $exam->schedules()->where('id', $scheduleData['id'])->update($payload);
                } else {

                    $exam->schedules()->create($payload);
                }
            }

   
            return $exam->fresh(['schedules.subject', 'examType', 'classModel', 'academicYear']);
        });
    }

    public function delete(Exam $exam): bool
    {
        return DB::transaction(function () use ($exam) {
            $exam->schedules()->forceDelete();
            return $this->repository->delete($exam);
        });
    }

    public function updateStatus(Exam $exam, string $status): Exam
    {
        $exam->update(['status' => $status]);
        return $exam->fresh();
    }
}