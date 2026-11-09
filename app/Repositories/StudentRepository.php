<?php

namespace App\Repositories;

use App\Models\Student;
use Illuminate\Pagination\LengthAwarePaginator;

class StudentRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new Student();
    }

    public function getAllPaginated(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        $query = $this->model
            ->select('id', 'academic_year_id', 'class_id', 'section_id',
                'admission_no', 'first_name', 'last_name', 'gender',
                'dob', 'contact_number', 'photo', 'status', 'created_at')
            ->with(['classModel:id,name', 'section:id,name', 'academicYear:id,title']);

        if (! empty($filters['class_id'])) {
            $query->where('class_id', $filters['class_id']);
        }
        if (! empty($filters['section_id'])) {
            $query->where('section_id', $filters['section_id']);
        }
        if (! empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }
        if (! empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('admission_no', 'like', "%{$search}%");
            });
        }

        return $query->latest()->paginate($perPage);
    }
}