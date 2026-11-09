<?php

namespace App\Repositories;

use App\Models\Exam;
use Illuminate\Pagination\LengthAwarePaginator;

class ExamRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new Exam();
    }

    public function getAllPaginated(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        $query = $this->model
            ->with([
                'classModel:id,name', 
                'examType:id,name', 
                'academicYear:id,title',
                'schedules:id,exam_id,subject_id,date,start_time,end_time,full_mark,pass_mark',
                'schedules.subject:id,name',
            ]);

        if (! empty($filters['class_id'])) {
            $query->where('class_id', $filters['class_id']);
        }
        if (! empty($filters['academic_year_id'])) {
            $query->where('academic_year_id', $filters['academic_year_id']);
        }
        if (! empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->latest()->paginate($perPage);
    }
}