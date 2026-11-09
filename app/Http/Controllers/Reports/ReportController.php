<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Reports/Index');
    }

    public function academic(): Response
    {
        return Inertia::render('Reports/Academic/Index');
    }

    public function students(): Response
    {
        return Inertia::render('Reports/Students/Index');
    }

    public function staff(): Response
    {
        return Inertia::render('Reports/Staff/Index');
    }

    public function finance(): Response
    {
        return Inertia::render('Reports/Finance/Index');
    }

    public function examinations(): Response
    {
        return Inertia::render('Reports/Examinations/Index');
    }

    public function library(): Response
    {
        return Inertia::render('Reports/Library/Index');
    }

    public function transport(): Response
    {
        return Inertia::render('Reports/Transport/Index');
    }

    public function hostel(): Response
    {
        return Inertia::render('Reports/Hostel/Index');
    }
}