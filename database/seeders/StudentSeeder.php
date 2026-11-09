<?php

namespace Database\Seeders;

use App\Models\AcademicYear;
use App\Models\Branch; 
use App\Models\ClassModel;
use App\Models\Organization; 
use App\Models\Section;
use App\Models\Student;
use App\Models\StudentCategory;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        $currentYear = AcademicYear::where('is_active', true)->first();
        $classFive   = ClassModel::where('name', 'Five')->where('academic_year_id', $currentYear?->id)->first();
        $classTen    = ClassModel::where('name', 'Ten')->where('academic_year_id', $currentYear?->id)->first();
        $sectionA    = Section::where('name', 'A')->first();
        $general     = StudentCategory::where('name', 'General')->first();
        $scholarship = StudentCategory::where('name', 'Scholarship')->first();


        $mainOrganization = Organization::first();
        $mainBranch = Branch::first();

        if (! $currentYear || ! $classFive || ! $classTen || ! $sectionA || ! $mainOrganization || ! $mainBranch) {
            $this->command->error('Required data not found. Please run Organization, Branch, AcademicYear, Class, Section, and StudentCategory seeders first.');
            return;
        }

        $students = [
            [
                'academic_year_id' => $currentYear->id,
                'class_id'         => $classFive->id,
                'section_id'       => $sectionA->id,
                'admission_no'     => 'STU-2026-0001',
                'registration_no'  => 'REG-0001',
                'admission_date'   => '2026-04-15',
                'first_name'       => 'Aarav',
                'last_name'        => 'Sharma',
                'gender'           => 'male',
                'dob'              => '2015-05-10',
                'blood_group'      => 'B+',
                'nationality'      => 'Nepali',
                'religion'         => 'Hindu',
                'category_id'      => $general->id,
                'mother_tongue'    => 'Nepali',
                'father_name'      => 'Rajesh Sharma',
                'mother_name'      => 'Sita Sharma',
                'contact_number'   => '9841000001',
                'email'            => 'aarav.sharma@example.com',
                'address'          => 'Baluwatar, Kathmandu',
                'city'             => 'Kathmandu',
                'state'            => 'Bagmati',
                'zip_code'         => '44600',
                'status'           => 'active',
            ],
            [
                'academic_year_id' => $currentYear->id,
                'class_id'         => $classFive->id,
                'section_id'       => $sectionA->id,
                'admission_no'     => 'STU-2026-0002',
                'registration_no'  => 'REG-0002',
                'admission_date'   => '2026-04-15',
                'first_name'       => 'Priya',
                'last_name'        => 'Gurung',
                'gender'           => 'female',
                'dob'              => '2015-08-22',
                'blood_group'      => 'A+',
                'nationality'      => 'Nepali',
                'category_id'      => $scholarship->id,
                'mother_tongue'    => 'Nepali',
                'father_name'      => 'Kumar Gurung',
                'mother_name'      => 'Maya Gurung',
                'contact_number'   => '9841000002',
                'email'            => 'priya.gurung@example.com',
                'address'          => 'Lakeside, Pokhara',
                'city'             => 'Pokhara',
                'state'            => 'Gandaki',
                'zip_code'         => '33700',
                'status'           => 'active',
            ],
            [
                'academic_year_id' => $currentYear->id,
                'class_id'         => $classTen->id,
                'section_id'       => $sectionA->id,
                'admission_no'     => 'STU-2026-0003',
                'registration_no'  => 'REG-0003',
                'admission_date'   => '2026-04-15',
                'first_name'       => 'Bikash',
                'last_name'        => 'Tamang',
                'gender'           => 'male',
                'dob'              => '2010-03-15',
                'blood_group'      => 'O+',
                'nationality'      => 'Nepali',
                'category_id'      => $general->id,
                'mother_tongue'    => 'Tamang',
                'father_name'      => 'Dorje Tamang',
                'mother_name'      => 'Lhamu Tamang',
                'contact_number'   => '9841000003',
                'email'            => 'bikash.tamang@example.com',
                'address'          => 'Bhaktapur',
                'city'             => 'Bhaktapur',
                'state'            => 'Bagmati',
                'zip_code'         => '44800',
                'status'           => 'active',
            ],
            [
                'academic_year_id' => $currentYear->id,
                'class_id'         => $classTen->id,
                'section_id'       => $sectionA->id,
                'admission_no'     => 'STU-2026-0004',
                'registration_no'  => 'REG-0004',
                'admission_date'   => '2026-04-15',
                'first_name'       => 'Sunita',
                'last_name'        => 'Rai',
                'gender'           => 'female',
                'dob'              => '2010-11-08',
                'blood_group'      => 'AB+',
                'nationality'      => 'Nepali',
                'category_id'      => $scholarship->id,
                'mother_tongue'    => 'Nepali',
                'father_name'      => 'Bikram Rai',
                'mother_name'      => 'Anita Rai',
                'contact_number'   => '9841000004',
                'email'            => 'sunita.rai@example.com',
                'address'          => 'Chitwan',
                'city'             => 'Bharatpur',
                'state'            => 'Bagmati',
                'zip_code'         => '44200',
                'status'           => 'active',
            ],
            [
                'academic_year_id' => $currentYear->id,
                'class_id'         => $classFive->id,
                'section_id'       => $sectionA->id,
                'admission_no'     => 'STU-2026-0005',
                'registration_no'  => 'REG-0005',
                'admission_date'   => '2026-04-15',
                'first_name'       => 'Rohan',
                'last_name'        => 'Thapa',
                'gender'           => 'male',
                'dob'              => '2015-07-19',
                'blood_group'      => 'B-',
                'nationality'      => 'Nepali',
                'category_id'      => $general->id,
                'mother_tongue'    => 'Nepali',
                'father_name'      => 'Suresh Thapa',
                'mother_name'      => 'Kamala Thapa',
                'contact_number'   => '9841000005',
                'email'            => 'rohan.thapa@example.com',
                'address'          => 'Lalitpur',
                'city'             => 'Lalitpur',
                'state'            => 'Bagmati',
                'zip_code'         => '44700',
                'status'           => 'active',
            ],
        ];

        foreach ($students as $student) {
            $studentData = array_merge($student, [
                'organization_id' => $mainOrganization->id,
                'branch_id'       => $mainBranch->id,
            ]);

            Student::updateOrCreate(
                ['admission_no' => $student['admission_no']],
                $studentData
            );
        }
        
        $this->command->info('✅ Students seeded successfully with Organization and Branch context!');
    }
}