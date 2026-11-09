import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import { useFeePaymentForm } from '@/Hooks/useFeePaymentForm';
import { PAYMENT_METHODS, calculateNetAmount } from '@/Services/feePaymentService';
import { DollarSign, Save, ArrowLeft, Calculator, Loader2, Info } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FeePaymentForm({ payment, dropdownData }) {
    const isEdit = !!payment;
    const { data, setData, processing, errors, submit } = useFeePaymentForm(payment, isEdit);
    const [feeStructures, setFeeStructures] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const breadcrumbItems = [
        { label: 'Dashboard', href: route('dashboard') }, 
        { label: 'Finance & Fees', href: route('fees.payments.index') }
    ];

    const netAmount = calculateNetAmount(data);
    const formatCurrency = (amount) => new Intl.NumberFormat('en-NP', { maximumFractionDigits: 2 }).format(amount || 0);

    // ✅ Student छान्दा fee structures auto-fetch गर्ने
    useEffect(() => {
        if (!data.student_id) {
            setFeeStructures([]);
            setData('fee_structure_id', '');
            setData('amount', '');
            return;
        }

        const fetchStructures = async () => {
            setIsFetching(true);
            try {
                const response = await fetch(route('fees.payments.fee-structures', data.student_id));
                const structures = await response.json();
                setFeeStructures(structures);
            } catch (error) {
                console.error('Failed to fetch fee structures');
            } finally {
                setIsFetching(false);
            }
        };

        fetchStructures();
    }, [data.student_id]);

    // ✅ Fee Structure छान्दा amount auto-fill गर्ने
    const handleStructureChange = (structureId) => {
        setData('fee_structure_id', structureId);
        if (!structureId) {
            setData('amount', '');
            return;
        }
        const selected = feeStructures.find(s => s.id == structureId);
        if (selected) {
            setData('amount', selected.amount);
        }
    };

    return (
        <AppLayout title={isEdit ? 'Edit Payment' : 'Collect Fee'}>
            <Head title={isEdit ? 'Edit Payment' : 'Collect Fee'} />
            <div className="space-y-3">
                
      
                <div className="flex items-center justify-between">
                    <Breadcrumb title="Finance & Fees" subTitle={isEdit ? 'Edit Payment' : 'Collect Fee'} breadcrumbItems={breadcrumbItems} />
                    <Link href={route('fees.payments.index')} className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to List
                    </Link>
                </div>
                
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
          
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                    <DollarSign className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Payment Details
                                </h2>

                             
                                <div className="mb-5 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex gap-2">
                                    <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-blue-700 dark:text-blue-300">
                                        Select a student to view their pending fees. Choose a fee structure and enter payment details.
                                    </p>
                                </div>

                                <div className="space-y-5">
                               
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Student <span className="text-red-500">*</span>
                                            </label>
                                            {isFetching && (
                                                <div className="flex items-center gap-1.5 text-xs text-primary-600 dark:text-primary-400">
                                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                    Fetching fees...
                                                </div>
                                            )}
                                        </div>
                                        <select 
                                            value={data.student_id} 
                                            onChange={(e) => setData('student_id', e.target.value)}
                                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white transition-all outline-none"
                                        >
                                            <option value="">-- Select Student --</option>
                                            {dropdownData?.students?.map(s => (
                                                <option key={s.id} value={s.id}>
                                                    {s.first_name} {s.last_name} ({s.admission_no})
                                                </option>
                                            ))}
                                        </select>
                                        {errors.student_id && <p className="text-xs text-red-500 mt-1.5">{errors.student_id}</p>}
                                    </div>

                                 
                                    <div>
                                        <FormInput 
                                            label="Fee Structure" 
                                            type="select" 
                                            value={data.fee_structure_id} 
                                            onChange={handleStructureChange} 
                                            error={errors.fee_structure_id} 
                                            options={[
                                                { value: '', label: '-- Select Fee Structure --' },
                                                ...(feeStructures?.map(s => ({ 
                                                    value: s.id, 
                                                    label: `${s.fee_type?.name || 'Fee'} - Rs. ${formatCurrency(s.amount)}` 
                                                })) || [])
                                            ]} 
                                            required 
                                        />
                                        <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                            <Info className="w-3 h-3" />
                                            Fee structures are automatically loaded based on the student's class.
                                        </p>
                                    </div>

                         
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <FormInput 
                                            label="Amount (Rs.)" 
                                            type="number" 
                                            value={data.amount} 
                                            onChange={(v) => setData('amount', v)} 
                                            error={errors.amount} 
                                            placeholder="0.00" 
                                            required 
                                        />
                                        <FormInput 
                                            label="Discount (Rs.)" 
                                            type="number" 
                                            value={data.discount} 
                                            onChange={(v) => setData('discount', v)} 
                                            error={errors.discount} 
                                            placeholder="0.00" 
                                        />
                                        <FormInput 
                                            label="Fine (Rs.)" 
                                            type="number" 
                                            value={data.fine} 
                                            onChange={(v) => setData('fine', v)} 
                                            error={errors.fine} 
                                            placeholder="0.00" 
                                        />
                                    </div>

                            
                             
                                 
                                    <FormInput 
                                        label="Remarks" 
                                        type="textarea" 
                                        value={data.remarks} 
                                        onChange={(v) => setData('remarks', v)} 
                                        error={errors.remarks} 
                                        placeholder="Any additional notes..." 
                                        rows={3} 
                                    />
                                </div>
                            </div>
                        </div>

                  
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6 sticky top-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                    <Calculator className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Payment Summary
                                </h2>
                                
                      
                                <div className="space-y-3 mb-6">


                                   <FormInput 
                                    label="Payment Method" 
                                    type="select" 
                                    value={data.payment_method} 
                                    onChange={(v) => setData('payment_method', v)} 
                                    error={errors.payment_method} 
                                    options={PAYMENT_METHODS} 
                                    required 
                                />
                                <FormInput 
                                    label="Payment Date" 
                                    type="date" 
                                    value={data.payment_date} 
                                    onChange={(v) => setData('payment_date', v)} 
                                    error={errors.payment_date} 
                                    required 
                                />
                     

                        
                                <FormInput 
                                    label="Transaction ID (Optional)" 
                                    value={data.transaction_id} 
                                    onChange={(v) => setData('transaction_id', v)} 
                                    error={errors.transaction_id} 
                                    placeholder="e.g., Bank reference number" 
                                />
                                        
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Amount</span>
                                        <span className="font-mono text-gray-900 dark:text-white">Rs. {formatCurrency(data.amount)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Discount</span>
                                        <span className="font-mono text-red-600 dark:text-red-400">- Rs. {formatCurrency(data.discount)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Fine</span>
                                        <span className="font-mono text-amber-600 dark:text-amber-400">+ Rs. {formatCurrency(data.fine)}</span>
                                    </div>
                                    
                                  
                                    <div className="pt-3 border-t border-gray-200 dark:border-slate-700 flex justify-between items-center">
                                        <span className="text-base font-semibold text-gray-900 dark:text-white">Net Amount</span>
                                        <span className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">Rs. {formatCurrency(netAmount)}</span>
                                    </div>
                                </div>

                   
                                <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                                    <button 
                                        type="submit" 
                                        disabled={processing} 
                                        className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:cursor-not-allowed"
                                    >
                                        {processing ? (
                                            <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</>
                                        ) : (
                                            <><Save className="w-5 h-5 mr-2" /> {isEdit ? 'Update Payment' : 'Collect Fee'}</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </AppLayout>
    );
}