<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use App\Models\ClassModel;
use App\Models\Section;
use App\Models\Student;
use App\Models\StudentCategory;
use App\Models\AcademicYear;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AcademicReportController extends Controller
{


    public function classWiseStudents(Request $request): Response
    {
        $classes = ClassModel::where('status', 'active')
            ->with('sections:id,class_id,name') 
            ->get(['id', 'name']);
            
        $students = collect();
        $selectedClassName = '';
        $selectedSectionName = '';

        if ($request->filled('class_id')) {
            $class = ClassModel::find($request->class_id);
            $selectedClassName = $class ? $class->name : 'Unknown';

            $section = null;
            if ($request->filled('section_id')) {
                $section = Section::find($request->section_id);
                $selectedSectionName = $section ? $section->name : 'Unknown';
            }

            $query = Student::where('class_id', $request->class_id)
                ->where('status', 'active');

            if ($request->filled('section_id')) {
                $query->where('section_id', $request->section_id);
            }

            $students = $query->orderBy('first_name')->get([
                'id', 'admission_no', 'first_name', 'last_name', 'gender', 'class_id', 'section_id'
            ]);
            
            foreach ($students as $student) {
                $student->class_name = $selectedClassName;
                $student->section_name = $selectedSectionName ?: 'N/A';
            }
        }

        return Inertia::render('Reports/Academic/ClassWiseStudents', [
            'classes' => $classes,
            'students' => $students,
            'filters' => $request->only(['class_id', 'section_id']),
            'selectedClassName' => $selectedClassName,
            'selectedSectionName' => $selectedSectionName,
        ]);
    }

    public function studentCategory(Request $request): Response
    {
        $categories = StudentCategory::where('status', 'active')
            ->orderBy('name')
            ->get(['id', 'name', 'discount_percentage']);
            
        $students = collect();
        $selectedCategoryName = '';

        if ($request->filled('category_id')) {
            $category = StudentCategory::find($request->category_id);
            $selectedCategoryName = $category ? $category->name : 'Unknown';

            $studentsQuery = Student::where('status', 'active')
                ->where('category_id', $request->category_id)
                ->orderBy('first_name');

            $students = $studentsQuery->get([
                'id', 'admission_no', 'first_name', 'last_name', 'gender', 'category_id', 'class_id', 'section_id'
            ]);
            
            $classIds = $students->pluck('class_id')->unique()->filter();
            $sectionIds = $students->pluck('section_id')->unique()->filter();

            $classesMap = ClassModel::whereIn('id', $classIds)->pluck('name', 'id');
            $sectionsMap = Section::whereIn('id', $sectionIds)->pluck('name', 'id');

            foreach ($students as $student) {
                $student->class_name = $classesMap[$student->class_id] ?? 'N/A';
                $student->section_name = $sectionsMap[$student->section_id] ?? 'N/A';
                $student->category_name = $selectedCategoryName;
            }
        }

        return Inertia::render('Reports/Academic/StudentCategory', [
            'categories' => $categories,
            'students' => $students,
            'filters' => $request->only(['category_id']),
            'selectedCategoryName' => $selectedCategoryName,
        ]);
    }




    public function academicYearSummary(Request $request): Response
    {
        $years = AcademicYear::where('status', 'active')
            ->orderBy('title', 'desc')
            ->get(['id', 'title']);
            
        $summary = null;

        if ($request->filled('year_id')) {
            $year = AcademicYear::find($request->year_id);
            
            $summary = [
                'year_name' => $year ? $year->title : 'Unknown',
                'total_classes' => ClassModel::where('status', 'active')->count(),
                'total_sections' => Section::where('status', 'active')->count(),
                'total_subjects' => Subject::where('status', 'active')->count(),
                'total_students' => Student::where('academic_year_id', $request->year_id)
                                           ->where('status', 'active')
                                           ->count(),
            ];
        }
        return Inertia::render('Reports/Academic/AcademicYearSummary', [
            'years' => $years,
            'summary' => $summary,
            'filters' => $request->only(['year_id']),
        ]);
    }



    public function newAdmissions(Request $request): Response
    {
        $years = AcademicYear::where('status', 'active')
            ->orderBy('title', 'desc')
            ->get(['id', 'title']);
            
        $students = collect();
        $selectedYearName = '';
        $totalAdmissions = 0;

        if ($request->filled('year_id')) {
            $year = AcademicYear::find($request->year_id);
            $selectedYearName = $year ? $year->title : 'Unknown';

            $query = Student::where('academic_year_id', $request->year_id)
                ->where('status', 'active')
                ->orderBy('admission_date', 'desc');

        
            if ($request->filled('from_date')) {
                $query->whereDate('admission_date', '>=', $request->from_date);
            }
            if ($request->filled('to_date')) {
                $query->whereDate('admission_date', '<=', $request->to_date);
            }

       
            if ($request->filled('class_id')) {
                $query->where('class_id', $request->class_id);
            }

            $students = $query->get([
                'id', 'admission_no', 'first_name', 'last_name', 'gender', 'dob',
                'admission_date', 'class_id', 'section_id', 'category_id',
                'father_name', 'contact_number'
            ]);

            $totalAdmissions = $students->count();
            $classIds = $students->pluck('class_id')->unique()->filter();
            $sectionIds = $students->pluck('section_id')->unique()->filter();
            $categoryIds = $students->pluck('category_id')->unique()->filter();

            $classesMap = ClassModel::whereIn('id', $classIds)->pluck('name', 'id');
            $sectionsMap = Section::whereIn('id', $sectionIds)->pluck('name', 'id');
            $categoriesMap = \App\Models\StudentCategory::whereIn('id', $categoryIds)->pluck('name', 'id');

            foreach ($students as $student) {
                $student->class_name = $classesMap[$student->class_id] ?? 'N/A';
                $student->section_name = $sectionsMap[$student->section_id] ?? 'N/A';
                $student->category_name = $categoriesMap[$student->category_id] ?? 'N/A';
            }
        }
        $classes = ClassModel::where('status', 'active')
            ->orderBy('name')
            ->get(['id', 'name']);
        return Inertia::render('Reports/Academic/NewAdmissions', [
            'years' => $years,
            'classes' => $classes,
            'students' => $students,
            'totalAdmissions' => $totalAdmissions,
            'filters' => $request->only(['year_id', 'from_date', 'to_date', 'class_id']),
            'selectedYearName' => $selectedYearName,
        ]);
    }


}