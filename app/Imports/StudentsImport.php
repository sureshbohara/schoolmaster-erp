<?php

namespace App\Imports;

use App\Models\Student;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\SkipsFailures;

class StudentsImport implements ToModel, WithHeadingRow, WithValidation, SkipsOnFailure
{
    use SkipsFailures;

    public function model(array $row)
    {
        return new Student([
            'admission_no'   => $row['admission_no'],
            'first_name'     => $row['first_name'],
            'last_name'      => $row['last_name'],
            'gender'         => strtolower($row['gender']),
            'dob'            => $row['date_of_birth_yyyy_mm_dd'],
            'contact_number' => $row['contact_number'],
            'class_id'       => $row['class_id'],
            'section_id'     => $row['section_id'],
            'status'         => 'active',
        ]);
    }

    public function rules(): array
    {
        return [
            'admission_no'              => 'required|unique:students,admission_no',
            'first_name'                => 'required|string|max:100',
            'last_name'                 => 'required|string|max:100',
            'gender'                    => 'required|in:male,female,other',
            'date_of_birth_yyyy_mm_dd'  => 'required|date_format:Y-m-d',
            'contact_number'            => 'nullable|string|max:20',
            'class_id'                  => 'required|exists:classes,id',
            'section_id'                => 'required|exists:sections,id',
        ];
    }
}