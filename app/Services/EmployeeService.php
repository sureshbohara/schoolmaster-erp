<?php

namespace App\Services;

use App\Models\Employee;
use App\Repositories\EmployeeRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class EmployeeService
{
    protected EmployeeRepository $repository;

    public function __construct(EmployeeRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll(int $perPage = 15, array $filters = []): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->repository->getAllPaginated($perPage, $filters);
    }

    public function create(array $data): Employee
    {
        if (isset($data['photo']) && $data['photo'] instanceof UploadedFile) {
            $data['photo'] = $data['photo']->store('employees', 'public');
        }
        if (isset($data['signature']) && $data['signature'] instanceof UploadedFile) {
            $data['signature'] = $data['signature']->store('signatures', 'public');
        }
        return $this->repository->create($data);
    }

    public function update(Employee $employee, array $data): Employee
    {
        if (isset($data['photo']) && $data['photo'] instanceof UploadedFile) {
            if ($employee->photo) {
                Storage::disk('public')->delete($employee->photo);
            }
            $data['photo'] = $data['photo']->store('employees', 'public');
        } else {
            unset($data['photo']);
        }

        if (isset($data['signature']) && $data['signature'] instanceof UploadedFile) {
            if ($employee->signature) {
                Storage::disk('public')->delete($employee->signature);
            }
            $data['signature'] = $data['signature']->store('signatures', 'public');
        } else {
            unset($data['signature']);
        }

        return $this->repository->update($employee, $data);
    }

    public function delete(Employee $employee): bool
    {
        if ($employee->photo) {
            Storage::disk('public')->delete($employee->photo);
        }
        if ($employee->signature) {
            Storage::disk('public')->delete($employee->signature);
        }
        return $this->repository->delete($employee);
    }

    public function updateStatus(Employee $employee, string $status): Employee
    {
        $employee->update(['status' => $status]);
        return $employee->fresh();
    }
}