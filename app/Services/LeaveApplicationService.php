<?php

namespace App\Services;

use App\Models\LeaveApplication;
use App\Repositories\LeaveApplicationRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class LeaveApplicationService
{
    protected LeaveApplicationRepository $repository;

    public function __construct(LeaveApplicationRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll(int $perPage = 15, array $filters = []): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->repository->getAllPaginated($perPage, $filters);
    }

    public function create(array $data): LeaveApplication
    {
        if (isset($data['attachment']) && $data['attachment'] instanceof UploadedFile) {
            $data['attachment'] = $data['attachment']->store('leave-attachments', 'public');
        }
        return $this->repository->create($data);
    }

    public function approve(LeaveApplication $application): LeaveApplication
    {
        $application->update([
            'status'      => 'approved',
            'approved_by' => auth()->id(),
        ]);
        return $application->fresh();
    }

    public function reject(LeaveApplication $application): LeaveApplication
    {
        $application->update([
            'status'      => 'rejected',
            'approved_by' => auth()->id(),
        ]);
        return $application->fresh();
    }

    public function delete(LeaveApplication $application): bool
    {
        if ($application->attachment) {
            Storage::disk('public')->delete($application->attachment);
        }
        return $this->repository->delete($application);
    }
}