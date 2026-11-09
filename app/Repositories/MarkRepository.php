<?php

namespace App\Repositories;

use App\Models\Mark;

class MarkRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new Mark();
    }

    public function getMarksByExamAndStudent(int $examId, int $studentId): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model
            ->where('exam_id', $examId)
            ->where('student_id', $studentId)
            ->with('subject:id,name,code')
            ->get();
    }

    public function bulkUpsert(array $records): void
    {
        foreach ($records as $record) {
            $this->model->updateOrCreate(
                [
                    'exam_id'    => $record['exam_id'],
                    'student_id' => $record['student_id'],
                    'subject_id' => $record['subject_id'],
                ],
                $record
            );
        }
    }
}