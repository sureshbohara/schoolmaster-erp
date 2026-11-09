<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\FeePaymentController;
use App\Http\Controllers\FeeTypeController;
use App\Http\Controllers\FeeStructureController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\BankAccountController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\ExamTypeController;
use App\Http\Controllers\MarkController;
use App\Http\Controllers\GradingSystemController;
use App\Http\Controllers\StudentAttendanceController;
use App\Http\Controllers\StaffAttendanceController; 
use App\Http\Controllers\BookController;
use App\Http\Controllers\BookCategoryController;
use App\Http\Controllers\BookIssueController; 
use App\Http\Controllers\RouteController;
use App\Http\Controllers\VehicleTypeController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\TransportAssignmentController;
use App\Http\Controllers\HostelController;
use App\Http\Controllers\HostelRoomController;
use App\Http\Controllers\HostelAllocationController;
use App\Http\Controllers\AcademicYearController;
use App\Http\Controllers\ClassController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\StudentCategoryController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\DesignationController;
use App\Http\Controllers\LeaveApplicationController;
use App\Http\Controllers\SalaryStructureController;
use App\Http\Controllers\PayrollController;

use App\Http\Controllers\Reports\ReportController;
use App\Http\Controllers\Reports\AcademicReportController;
use App\Http\Controllers\Reports\StudentReportController;
use App\Http\Controllers\Reports\FinanceReportController;
use App\Http\Controllers\Reports\StaffReportController;
use App\Http\Controllers\Reports\ExaminationReportController;
use App\Http\Controllers\Reports\LibraryReportController;
use App\Http\Controllers\Reports\TransportReportController;
use App\Http\Controllers\Reports\HostelReportController;
use App\Http\Controllers\Reports\StudentPdfController;


use App\Http\Controllers\GlobalSearchController;


/*
|--------------------------------------------------------------------------
| Guest Routes
|--------------------------------------------------------------------------
*/
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {

    Route::get('/global-search', [GlobalSearchController::class, 'search']);

    Route::get('/', fn () => redirect()->route('dashboard'));
    Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    // Profile
    Route::get('/profile', [ProfileController::class, 'editProfile'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'updateProfile'])->name('profile.update');
    Route::get('/profile/password', [ProfileController::class, 'showChangePassword'])->name('profile.password');
    Route::put('/profile/password', [ProfileController::class, 'changePassword'])->name('profile.password.update');


     Route::prefix('settings')->name('settings.')->group(function () {
        Route::get('/', [SettingController::class, 'index'])->name('index');
        Route::post('/', [SettingController::class, 'update'])->name('update');
    });


    /*
    |--------------------------------------------------------------------------
    | User Management
    |--------------------------------------------------------------------------
    */
    Route::resource('users', UserController::class);
    Route::post('/users/{user}/status', [UserController::class, 'updateStatus'])->name('users.status');

    /*
    |--------------------------------------------------------------------------
    | Roles & Permissions
    |--------------------------------------------------------------------------
    */
    Route::resource('roles', RoleController::class);

    /*
    |--------------------------------------------------------------------------
    | Multi-Tenancy (Organization & Branch)
    |--------------------------------------------------------------------------
    */
    Route::resource('organizations', OrganizationController::class);
    Route::post('/organizations/{organization}/status', [OrganizationController::class, 'updateStatus'])->name('organizations.status');

    Route::resource('branches', BranchController::class);
    Route::post('/branches/{branch}/status', [BranchController::class, 'updateStatus'])->name('branches.status');

    /*
    |--------------------------------------------------------------------------
    | Academic Setup
    |--------------------------------------------------------------------------
    */
    Route::prefix('academic')->name('academic.')->group(function () {
        Route::resource('years', AcademicYearController::class);
        Route::resource('classes', ClassController::class);
        Route::resource('sections', SectionController::class);
        Route::resource('subjects', SubjectController::class);
        Route::resource('student-categories', StudentCategoryController::class);
    });

    /*
    |--------------------------------------------------------------------------
    | Students Module
    |--------------------------------------------------------------------------
    */
    Route::get('/students/export', [StudentController::class, 'export'])->name('students.export');
    Route::post('/students/import', [StudentController::class, 'import'])->name('students.import');
    Route::resource('students', StudentController::class);
    Route::post('/students/{student}/status', [StudentController::class, 'updateStatus'])->name('students.status');
   

    /*
    |--------------------------------------------------------------------------
    | HR Module
    |--------------------------------------------------------------------------
    */
    Route::prefix('hr')->name('hr.')->group(function () {
        Route::resource('employees', EmployeeController::class);
        Route::post('/employees/{employee}/status', [EmployeeController::class, 'updateStatus'])->name('employees.status');

        Route::resource('departments', DepartmentController::class);
        Route::resource('designations', DesignationController::class);
        
        Route::resource('leaves', LeaveApplicationController::class)->parameters(['leaves' => 'application']);
        Route::post('/leaves/{application}/approve', [LeaveApplicationController::class, 'approve'])->name('leaves.approve');
        Route::post('/leaves/{application}/reject', [LeaveApplicationController::class, 'reject'])->name('leaves.reject');

    

        Route::resource('salary-structures', SalaryStructureController::class)->parameters(['salary-structures' => 'salaryStructure']);
        Route::resource('payrolls', PayrollController::class);
        Route::post('/payrolls/{payroll}/mark-paid', [PayrollController::class, 'markAsPaid'])->name('payrolls.mark-paid');
         Route::get('/payrolls/salary-structure/{employeeId}', [PayrollController::class, 'getSalaryStructure'])->name('payrolls.salary-structure');


    });

    /*
    |--------------------------------------------------------------------------
    | Fees Module
    |--------------------------------------------------------------------------
    */
    Route::prefix('fees')->name('fees.')->group(function () {
        Route::resource('types', FeeTypeController::class)->parameters(['types' => 'type']);
        Route::resource('structures', FeeStructureController::class);
        Route::resource('payments', FeePaymentController::class);
        Route::get('/payments/fee-structures/{studentId}', [FeePaymentController::class, 'getFeeStructures'])->name('payments.fee-structures');
    });


   



    /*
    |--------------------------------------------------------------------------
    | Accounting Module
    |--------------------------------------------------------------------------
    */
    Route::prefix('accounting')->name('accounting.')->group(function () {
        Route::resource('incomes', IncomeController::class);
        Route::resource('expenses', ExpenseController::class);
        Route::resource('bank-accounts', BankAccountController::class)->parameters(['bank-accounts' => 'account']);
    });

    /*
    |--------------------------------------------------------------------------
    | Examination Module
    |--------------------------------------------------------------------------
    */
     Route::prefix('exams')->name('exams.')->group(function () {
        Route::resource('types', ExamTypeController::class)->parameters(['types' => 'type']);
        Route::resource('grading-systems', GradingSystemController::class)->parameters(['grading-systems' => 'system']);
        Route::get('/marks', [MarkController::class, 'index'])->name('marks.index');
        Route::post('/marks', [MarkController::class, 'store'])->name('marks.store');
        Route::delete('/marks', [MarkController::class, 'destroy'])->name('marks.destroy');
    });

    Route::resource('exams', ExamController::class);
    Route::post('/exams/{exam}/status', [ExamController::class, 'updateStatus'])->name('exams.status');

       /*
    |--------------------------------------------------------------------------
    | Attendance Module
    |--------------------------------------------------------------------------
    */
    Route::prefix('attendance')->name('attendance.')->group(function () {
        Route::get('/students', [StudentAttendanceController::class, 'index'])->name('students.index');
        Route::post('/students', [StudentAttendanceController::class, 'store'])->name('students.store');
        Route::get('/students/{studentId}/report', [StudentAttendanceController::class, 'report'])->name('students.report');
        
        Route::get('/staff', [StaffAttendanceController::class, 'index'])->name('staff.index');
        Route::post('/staff', [StaffAttendanceController::class, 'store'])->name('staff.store'); 
        Route::get('/staff/{employeeId}/report', [StaffAttendanceController::class, 'report'])->name('staff.report'); 
    });

    /*
    |--------------------------------------------------------------------------
    | Library Module
    |--------------------------------------------------------------------------
    */
    Route::prefix('library')->name('library.')->group(function () {
        Route::resource('categories', BookCategoryController::class);
        Route::resource('books', BookController::class);
        Route::resource('issues', BookIssueController::class);
    });

    /*
    |--------------------------------------------------------------------------
    | Transport Module
    |--------------------------------------------------------------------------
    */
    Route::prefix('transport')->name('transport.')->group(function () {
        Route::resource('vehicle-types', VehicleTypeController::class)->parameters(['vehicle-types' => 'type']);
        Route::resource('vehicles', VehicleController::class);
        Route::resource('routes', RouteController::class);
        Route::resource('assignments', TransportAssignmentController::class);
    });

    /*
    |--------------------------------------------------------------------------
    | Hostel Module
    |--------------------------------------------------------------------------
    */
 

    Route::prefix('hostels')->name('hostels.')->group(function () {
        Route::resource('rooms', HostelRoomController::class);
        Route::resource('allocations', HostelAllocationController::class);
        Route::post('/allocations/{allocation}/discharge', [HostelAllocationController::class, 'discharge'])->name('allocations.discharge');
    });

    Route::resource('hostels', HostelController::class);



    Route::prefix('reports')->name('reports.')->group(function () {
    
    Route::get('/', [ReportController::class, 'index'])->name('index');

        Route::get('/academic', [ReportController::class, 'academic'])->name('academic.index');
        Route::get('/students', [ReportController::class, 'students'])->name('students.index');
        Route::get('/staff', [ReportController::class, 'staff'])->name('staff.index');
        Route::get('/finance', [ReportController::class, 'finance'])->name('finance.index');
        Route::get('/examinations', [ReportController::class, 'examinations'])->name('examinations.index');
        Route::get('/library', [ReportController::class, 'library'])->name('library.index');
        Route::get('/transport', [ReportController::class, 'transport'])->name('transport.index');
        Route::get('/hostel', [ReportController::class, 'hostel'])->name('hostel.index');


        Route::prefix('academic')->name('academic.')->group(function () {
            Route::get('/class-wise', [AcademicReportController::class, 'classWiseStudents'])->name('class-wise');
            Route::get('/category', [AcademicReportController::class, 'studentCategory'])->name('category');
            Route::get('/year-summary', [AcademicReportController::class, 'academicYearSummary'])->name('year-summary');
            Route::get('/admissions', [AcademicReportController::class, 'newAdmissions'])->name('admissions');
        });



        Route::prefix('students')->name('students.')->group(function () {
            Route::get('/', [StudentReportController::class, 'index'])->name('index');
            Route::get('/contact-list', [StudentReportController::class, 'contactList'])->name('contact-list');
            Route::get('/attendance', [StudentReportController::class, 'studentAttendance'])->name('attendance');
            Route::get('/fee-status', [StudentReportController::class, 'feeStatus'])->name('fee-status');
            Route::get('/admission-register', [StudentReportController::class, 'admissionRegister'])->name('admission-register');
            Route::get('/transport-users', [StudentReportController::class, 'transportUsers'])->name('transport-users');
            Route::get('/hostel-users', [StudentReportController::class, 'hostelUsers'])->name('hostel-users');
            Route::get('/library-issues', [StudentReportController::class, 'libraryIssues'])->name('library-issues');
        });



        Route::prefix('staff')->name('staff.')->group(function () {
            Route::get('/', [StaffReportController::class, 'index'])->name('index');
            Route::get('/contact-list', [StaffReportController::class, 'contactList'])->name('contact-list');
            Route::get('/attendance', [StaffReportController::class, 'staffAttendance'])->name('attendance');
            Route::get('/leave-summary', [StaffReportController::class, 'leaveSummary'])->name('leave-summary');
            Route::get('/payroll-summary', [StaffReportController::class, 'payrollSummary'])->name('payroll-summary');
            Route::get('/department-wise', [StaffReportController::class, 'departmentWise'])->name('department-wise');
        });

        Route::prefix('finance')->name('finance.')->group(function () {
             Route::get('/', [FinanceReportController::class, 'index'])->name('index');
             Route::get('/fee-collection', [FinanceReportController::class, 'feeCollection'])->name('fee-collection');
             Route::get('/income', [FinanceReportController::class, 'incomeReport'])->name('income');
             Route::get('/expense', [FinanceReportController::class, 'expenseReport'])->name('expense');
             Route::get('/bank-statement', [FinanceReportController::class, 'bankStatement'])->name('bank-statement');
             Route::get('/fee-defaulter', [FinanceReportController::class, 'feeDefaulter'])->name('fee-defaulter');
         });


        Route::prefix('examinations')->name('examinations.')->group(function () {
            Route::get('/', [ExaminationReportController::class, 'index'])->name('index');
            Route::get('/report-card', [ExaminationReportController::class, 'reportCard'])->name('report-card');
            Route::get('/result-analysis', [ExaminationReportController::class, 'resultAnalysis'])->name('result-analysis');
            Route::get('/grade-distribution', [ExaminationReportController::class, 'gradeDistribution'])->name('grade-distribution');
            Route::get('/merit-list', [ExaminationReportController::class, 'meritList'])->name('merit-list');
            Route::get('/mark-sheet', [ExaminationReportController::class, 'markSheet'])->name('mark-sheet');
        });



        Route::prefix('library')->name('library.')->group(function () {
                Route::get('/', [LibraryReportController::class, 'index'])->name('index');
                Route::get('/book-stock', [LibraryReportController::class, 'bookStock'])->name('book-stock');
                Route::get('/overdue-books', [LibraryReportController::class, 'overdueBooks'])->name('overdue-books');
                Route::get('/fine-collection', [LibraryReportController::class, 'fineCollection'])->name('fine-collection');
                Route::get('/category-wise', [LibraryReportController::class, 'categoryWise'])->name('category-wise');
                Route::get('/member-history', [LibraryReportController::class, 'memberHistory'])->name('member-history');
        });

        

        Route::prefix('transport')->name('transport.')->group(function () {
        Route::get('/', [TransportReportController::class, 'index'])->name('index');
        Route::get('/route-wise-students', [TransportReportController::class, 'routeWiseStudents'])->name('route-wise-students');
        Route::get('/vehicle-assignments', [TransportReportController::class, 'vehicleAssignments'])->name('vehicle-assignments');
        Route::get('/stop-wise-students', [TransportReportController::class, 'stopWiseStudents'])->name('stop-wise-students');
        Route::get('/transport-fee', [TransportReportController::class, 'transportFee'])->name('transport-fee');
        Route::get('/transport-summary', [TransportReportController::class, 'transportSummary'])->name('transport-summary');
    });



        Route::prefix('hostel')->name('hostel.')->group(function () {
            Route::get('/', [HostelReportController::class, 'index'])->name('index');
            Route::get('/hostel-summary', [HostelReportController::class, 'hostelSummary'])->name('hostel-summary');
            Route::get('/room-occupancy', [HostelReportController::class, 'roomOccupancy'])->name('room-occupancy');
            Route::get('/hostel-fee', [HostelReportController::class, 'hostelFee'])->name('hostel-fee');
            Route::get('/vacant-rooms', [HostelReportController::class, 'vacantRooms'])->name('vacant-rooms');
            Route::get('/hostel-wise-students', [HostelReportController::class, 'hostelWiseStudents'])->name('hostel-wise-students');
        });


        
    });


   Route::get('/students/{student}/id-card/pdf', [StudentPdfController::class, 'downloadIdCard'])->name('students.id-card.pdf');
   Route::get('/exams/{exam}/students/{student}/marksheet/pdf', [StudentPdfController::class, 'downloadMarksheet'])->name('exams.marksheet.pdf');

});