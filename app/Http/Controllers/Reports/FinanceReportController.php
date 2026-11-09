<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use App\Models\BankAccount;
use App\Models\ClassModel;
use App\Models\Expense;
use App\Models\ExpenseHead;
use App\Models\FeePayment;
use App\Models\FeeStructure;
use App\Models\Income;
use App\Models\IncomeHead;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FinanceReportController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Reports/Finance/Index');
    }

    public function feeCollection(Request $request): Response
    {
        $query = FeePayment::with(['student:id,admission_no,first_name,last_name', 'feeStructure.feeType:id,name'])
            ->where('status', 'paid');

        if ($request->filled('from_date')) $query->whereDate('payment_date', '>=', $request->from_date);
        if ($request->filled('to_date')) $query->whereDate('payment_date', '<=', $request->to_date);
        if ($request->filled('payment_method')) $query->where('payment_method', $request->payment_method);

        $payments = $query->orderBy('payment_date', 'desc')->get(['id', 'student_id', 'invoice_no', 'payment_date', 'payment_method', 'net_amount', 'fee_structure_id']);
        $totalCollected = $payments->sum('net_amount');

        return Inertia::render('Reports/Finance/FeeCollection', [
            'payments' => $payments, 'totalCollected' => $totalCollected,
            'filters' => $request->only(['from_date', 'to_date', 'payment_method']),
        ]);
    }

    public function incomeReport(Request $request): Response
    {
        $heads = IncomeHead::where('status', 'active')->get(['id', 'name']);
        $query = Income::with('head:id,name')->orderBy('date', 'desc');

        if ($request->filled('from_date')) $query->whereDate('date', '>=', $request->from_date);
        if ($request->filled('to_date')) $query->whereDate('date', '<=', $request->to_date);
        if ($request->filled('head_id')) $query->where('head_id', $request->head_id);

        $incomes = $query->get(['id', 'head_id', 'date', 'receipt_no', 'description', 'amount']);
        $totalIncome = $incomes->sum('amount');

        return Inertia::render('Reports/Finance/IncomeReport', [
            'heads' => $heads, 'incomes' => $incomes, 'totalIncome' => $totalIncome,
            'filters' => $request->only(['from_date', 'to_date', 'head_id']),
        ]);
    }

    public function expenseReport(Request $request): Response
    {
        $heads = ExpenseHead::where('status', 'active')->get(['id', 'name']);
        $query = Expense::with('head:id,name')->orderBy('date', 'desc');

        if ($request->filled('from_date')) $query->whereDate('date', '>=', $request->from_date);
        if ($request->filled('to_date')) $query->whereDate('date', '<=', $request->to_date);
        if ($request->filled('head_id')) $query->where('head_id', $request->head_id);

        $expenses = $query->get(['id', 'head_id', 'date', 'voucher_no', 'description', 'amount']);
        $totalExpense = $expenses->sum('amount');

        return Inertia::render('Reports/Finance/ExpenseReport', [
            'heads' => $heads, 'expenses' => $expenses, 'totalExpense' => $totalExpense,
            'filters' => $request->only(['from_date', 'to_date', 'head_id']),
        ]);
    }

    public function bankStatement(Request $request): Response
    {
        $accounts = BankAccount::orderBy('bank_name')->get(['id', 'bank_name', 'account_name', 'account_number', 'current_balance']);
        $totalBalance = $accounts->sum('current_balance');

        return Inertia::render('Reports/Finance/BankStatement', [
            'accounts' => $accounts, 'totalBalance' => $totalBalance,
        ]);
    }

    public function feeDefaulter(Request $request): Response
    {
        $classes = ClassModel::where('status', 'active')->with('sections')->get(['id', 'name']);
        $query = Student::where('status', 'active')
            ->select('id', 'admission_no', 'first_name', 'last_name', 'class_id', 'section_id', 'academic_year_id');

        if ($request->filled('class_id')) $query->where('class_id', $request->class_id);
        if ($request->filled('section_id')) $query->where('section_id', $request->section_id);
        if ($request->filled('academic_year_id')) $query->where('academic_year_id', $request->academic_year_id);

        $students = $query->get();

        $defaulters = $students->map(function ($student) {
            $totalFee = FeeStructure::where('academic_year_id', $student->academic_year_id)
                ->where('class_id', $student->class_id)->sum('amount');
            
            $totalPaid = FeePayment::where('student_id', $student->id)->where('status', 'paid')->sum('net_amount');
            $dueAmount = max(0, $totalFee - $totalPaid);

            $student->total_fee = $totalFee;
            $student->paid_amount = $totalPaid;
            $student->due_amount = $dueAmount;
            return $dueAmount > 0 ? $student : null;
        })->filter()->values();

        $classIds = $defaulters->pluck('class_id')->unique()->filter();
        $sectionIds = $defaulters->pluck('section_id')->unique()->filter();
        $classesMap = ClassModel::whereIn('id', $classIds)->pluck('name', 'id');
        $sectionsMap = \App\Models\Section::whereIn('id', $sectionIds)->pluck('name', 'id');

        foreach ($defaulters as $student) {
            $student->class_name = $classesMap[$student->class_id] ?? 'N/A';
            $student->section_name = $sectionsMap[$student->section_id] ?? 'N/A';
        }

        return Inertia::render('Reports/Finance/FeeDefaulter', [
            'classes' => $classes,
            'years' => \App\Models\AcademicYear::where('status', 'active')->orderBy('title', 'desc')->get(['id', 'title']),
            'defaulters' => $defaulters,
            'totalDefaulters' => $defaulters->count(),
            'totalDueAmount' => $defaulters->sum('due_amount'),
            'filters' => $request->only(['academic_year_id', 'class_id', 'section_id']),
        ]);
    }
}