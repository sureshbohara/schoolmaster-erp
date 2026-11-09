<?php

namespace App\Services;

use App\Models\Student;
use App\Repositories\StudentRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class StudentService
{
    protected StudentRepository $repository;

    public function __construct(StudentRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll(int $perPage = 15, array $filters = []): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->repository->getAllPaginated($perPage, $filters);
    }

    public function create(array $data): Student
    {
        if (isset($data['photo']) && $data['photo'] instanceof UploadedFile) {
            $data['photo'] = $data['photo']->store('students', 'public');
        }
        return $this->repository->create($data);
    }

    public function update(Student $student, array $data): Student
    {
        if (isset($data['photo']) && $data['photo'] instanceof UploadedFile) {
            if ($student->photo) {
                Storage::disk('public')->delete($student->photo);
            }
            $data['photo'] = $data['photo']->store('students', 'public');
        } elseif (array_key_exists('photo', $data) && $data['photo'] === null) {
            if ($student->photo) {
                Storage::disk('public')->delete($student->photo);
            }
            $data['photo'] = null;
        } else {
            unset($data['photo']);
        }

        return $this->repository->update($student, $data);
    }

    public function delete(Student $student): bool
    {
        if ($student->photo) {
            Storage::disk('public')->delete($student->photo);
        }
        return $this->repository->delete($student);
    }

    public function updateStatus(Student $student, string $status): Student
    {
        $student->update(['status' => $status]);
        return $student->fresh();
    }
}