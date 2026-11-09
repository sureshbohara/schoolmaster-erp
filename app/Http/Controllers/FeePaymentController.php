<?php

namespace App\Http\Controllers;

use App\Http\Requests\Fee\FeePaymentStoreRequest;
use App\Http\Requests\Fee\FeePaymentUpdateRequest;
use App\Http\Resources\FeePaymentResource;
use App\Models\FeePayment;
use App\Models\FeeStructure;
use App\Models\Student;
use App\Services\FeePaymentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FeePaymentController extends Controller
{
    public function __construct(protected FeePaymentService $feePaymentService) {}

    private function getDropdownData()
    {
        return [
            'students' => Student::where('status', 'active')
                ->with(['classModel:id,name', 'section:id,name'])
                ->orderBy('first_name')
                ->get(['id', 'admission_no', 'first_name', 'last_name', 'class_id']),
            'paymentMethods' => [
                ['value' => 'cash', 'label' => '💵 Cash'],
                ['value' => 'bank_transfer', 'label' => '🏦 Bank Transfer'],
                ['value' => 'cheque', 'label' => '📄 Cheque'],
                ['value' => 'online', 'label' => '🌐 Online Payment'],
            ],
        ];
    }

    public function index(Request $request): Response
    {
        return Inertia::render('Fees/Payments/Index', [
            'payments' => FeePaymentResource::collection(
                $this->feePaymentService->getAll(15, $request->only(['student_id', 'status', 'from_date', 'to_date']))
            ),
            'filters' => $request->only(['student_id', 'status', 'from_date', 'to_date']),
            'dropdownData' => $this->getDropdownData(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Fees/Payments/Form', [
            'dropdownData' => $this->getDropdownData(),
        ]);
    }

    public function store(FeePaymentStoreRequest $request): RedirectResponse
    {
        $this->feePaymentService->create($request->validated());
        return redirect()->route('fees.payments.index')->with('success', 'Fee payment recorded successfully.');
    }

    public function edit(FeePayment $payment): Response
    {
        $payment->load(['student', 'feeStructure', 'collector']);
        
        return Inertia::render('Fees/Payments/Form', [
            'payment' => new FeePaymentResource($payment),
            'dropdownData' => $this->getDropdownData(),
        ]);
    }

    public function update(FeePaymentUpdateRequest $request, FeePayment $payment): RedirectResponse
    {
        $this->feePaymentService->update($payment, $request->validated());
        return redirect()->route('fees.payments.index')->with('success', 'Fee payment updated successfully.');
    }

    public function destroy(FeePayment $payment): RedirectResponse
    {
        $this->feePaymentService->delete($payment);
        return redirect()->route('fees.payments.index')->with('success', 'Fee payment deleted successfully.');
    }

    public function getFeeStructures(int $studentId): JsonResponse
    {
        $student = Student::with('classModel')->find($studentId);
        
        if (!$student) {
            return response()->json([]);
        }

        $structures = FeeStructure::where('class_id', $student->class_id)
            ->where('status', 'active')
            ->with('feeType:id,name')
            ->get(['id', 'academic_year_id', 'class_id', 'fee_type_id', 'amount', 'due_date']);

        return response()->json($structures);
    }
}