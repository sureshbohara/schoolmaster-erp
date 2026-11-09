<?php

namespace App\Http\Controllers; 

use App\Models\Student;
use App\Models\Employee;
use App\Models\Exam;
use App\Models\FeePayment;
use Illuminate\Http\Request;

class GlobalSearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->query('q', '');

        if (strlen($query) < 2) {
            return response()->json(['success' => true, 'data' => []]);
        }

        $results = [];

    
        $results['students'] = Student::where(function($q) use ($query) {
                $q->where('first_name', 'like', "%{$query}%")
                  ->orWhere('last_name', 'like', "%{$query}%")
                  ->orWhere('admission_no', 'like', "%{$query}%");
            })
            ->where('status', 'active')
            ->limit(5)
            ->get(['id', 'first_name', 'last_name', 'admission_no'])
            ->map(fn($s) => [
                'id' => $s->id,
                'title' => "{$s->first_name} {$s->last_name}",
                'subtitle' => "Admission No: {$s->admission_no}",
                'type' => 'student'
            ]);

        $results['employees'] = Employee::where(function($q) use ($query) {
                $q->where('first_name', 'like', "%{$query}%")
                  ->orWhere('last_name', 'like', "%{$query}%")
                  ->orWhere('employee_id', 'like', "%{$query}%");
            })
            ->where('status', 'active')
            ->limit(5)
            ->get(['id', 'first_name', 'last_name', 'employee_id'])
            ->map(fn($e) => [
                'id' => $e->id,
                'title' => "{$e->first_name} {$e->last_name}",
                'subtitle' => "Employee ID: {$e->employee_id}",
                'type' => 'employee'
            ]);

        $results['exams'] = Exam::where('name', 'like', "%{$query}%")
            ->limit(5)
            ->get(['id', 'name', 'start_date'])
            ->map(fn($e) => [
                'id' => $e->id,
                'title' => $e->name,
                'subtitle' => "Starts: " . ($e->start_date ? $e->start_date->format('d M Y') : 'N/A'),
                'type' => 'exam'
            ]);

        $results['fee_payments'] = FeePayment::where('invoice_no', 'like', "%{$query}%")
            ->limit(5)
            ->get(['id', 'invoice_no', 'net_amount', 'payment_date'])
            ->map(fn($f) => [
                'id' => $f->id,
                'title' => "Invoice: {$f->invoice_no}",
                'subtitle' => "Amount: NPR " . number_format($f->net_amount, 2) . " | " . $f->payment_date->format('d M Y'),
                'type' => 'fee_payment'
            ]);

   
        $results = array_filter($results, fn($arr) => count($arr) > 0);

        return response()->json(['success' => true, 'data' => $results]);
    }
}