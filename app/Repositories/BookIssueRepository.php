<?php

namespace App\Repositories;

use App\Models\BookIssue;
use Illuminate\Pagination\LengthAwarePaginator;

class BookIssueRepository extends BaseRepository
{
    protected function setModel(): void
    {
        $this->model = new BookIssue();
    }

    public function getAllPaginated(int $perPage = 15, array $filters = []): LengthAwarePaginator
    {
        $query = $this->model->with(['book:id,book_no,title', 'issuer:id,first_name,last_name']);

        if (! empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }
        if (! empty($filters['member_type'])) {
            $query->where('member_type', $filters['member_type']);
        }

        return $query->latest()->paginate($perPage);
    }
}