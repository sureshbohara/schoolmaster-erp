<?php

namespace App\Services;

use App\Models\Exam;
use App\Models\Mark;
use App\Models\ReportCard;
use App\Repositories\GradingSystemRepository;
use App\Repositories\MarkRepository;
use Illuminate\Support\Facades\DB;

class MarkService
{
    protected MarkRepository $repository;
    protected GradingSystemRepository $gradingRepository;

    public function __construct(MarkRepository $repository, GradingSystemRepository $gradingRepository)
    {
        $this->repository = $repository;
        $this->gradingRepository = $gradingRepository;
    }

    public function getMarksByExamAndStudent(int $examId, int $studentId): \Illuminate\Database\Eloquent\Collection
    {
        return $this->repository->getMarksByExamAndStudent($examId, $studentId);
    }



    public function saveMarks(array $records): void
    {
        if (empty($records)) return;
        $examId = (int) $records[0]['exam_id'];
        $studentId = (int) $records[0]['student_id'];

        DB::transaction(function () use ($records, $examId, $studentId) {
            foreach ($records as &$record) {
                $obtained = (float) ($record['obtained_mark'] ?? 0);
                $grade = $this->gradingRepository->getGradeForMark($obtained);
                $record['grade'] = $grade?->grade;
                $record['exam_id'] = $examId;
                $record['student_id'] = $studentId;
            }
            unset($record);
            Mark::upsert(
                $records,
                ['exam_id', 'student_id', 'subject_id'],
                ['theory_mark', 'practical_mark', 'obtained_mark', 'grade', 'remarks']
            );
            $this->generateReportCard($examId, $studentId);
        });
    }


    public function generateReportCard(int $examId, int $studentId): void
    {
        $marks = $this->repository->getMarksByExamAndStudent($examId, $studentId);
        $exam = Exam::with('schedules')->find($examId);
        if (!$exam || $marks->isEmpty()) {
            ReportCard::where('exam_id', $examId)->where('student_id', $studentId)->delete();
            return;
        }
        $student = $marks->first()->student;
        $classId = $student->class_id;
        $totalObtained = $marks->sum('obtained_mark');
        $totalFull = $exam->schedules->sum('full_mark');
        $percentage = $totalFull > 0 ? ($totalObtained / $totalFull) * 100 : 0;
        $grade = $this->gradingRepository->getGradeForMark($percentage);
        ReportCard::updateOrCreate(
            ['student_id' => $studentId, 'exam_id' => $examId],
            [
                'total_marks'  => round($totalObtained, 2),
                'percentage'   => round($percentage, 2),
                'grade'        => $grade?->grade,
                'remarks'      => $grade?->remark,
                'generated_at' => now(),
            ]
        );
        $allCards = ReportCard::where('exam_id', $examId)
            ->whereHas('student', fn($q) => $q->where('class_id', $classId))
            ->orderByDesc('percentage')
            ->get();
            
        foreach ($allCards as $index => $card) {
            $card->update(['rank_in_class' => $index + 1]);
        }
    }
}