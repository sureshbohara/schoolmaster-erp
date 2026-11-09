<?php

namespace App\Exports;

use App\Models\Student;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class StudentsExport implements FromCollection, WithHeadings, WithMapping
{
    public function collection()
    {
        return Student::where('status', 'active')
            ->with(['classModel:id,name', 'section:id,name'])
            ->get(['id', 'admission_no', 'first_name', 'last_name', 'gender', 'dob', 'contact_number', 'class_id', 'section_id']);
    }

    public function headings(): array
    {
        return [
            'Admission No',
            'First Name',
            'Last Name',
            'Gender (male/female/other)',
            'Date of Birth (YYYY-MM-DD)',
            'Contact Number',
            'Class ID',
            'Section ID',
        ];
    }

    public function map($student): array
    {
        return [
            $student->admission_no,
            $student->first_name,
            $student->last_name,
            $student->gender,
            $student->dob ? $student->dob->format('Y-m-d') : '',
            $student->contact_number,
            $student->class_id,
            $student->section_id,
        ];
    }
}