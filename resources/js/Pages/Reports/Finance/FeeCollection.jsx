import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import Button from '@/Components/Button'; 
import { useState } from 'react';
import { Search, FileText, DollarSign, TrendingUp } from 'lucide-react';

export default function FeeCollection({ payments, totalCollected, filters }) {
    const [fromDate, setFromDate] = useState(filters?.from_date || '');
    const [toDate, setToDate] = useState(filters?.to_date || '');
    const [paymentMethod, setPaymentMethod] = useState(filters?.payment_method || '');

    const handleGenerate = () => {
        router.get(route('reports.finance.fee-collection'), { from_date: fromDate, to_date: toDate, payment_method: paymentMethod }, { preserveState: true });
    };

    return (
        <AppLayout title="Fee Collection Report">
            <Head title="Fee Collection Report" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Finance Reports" subTitle="Fee Collection" breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }, { label: 'Reports', href: route('reports.index') }, { label: 'Finance', href: route('reports.finance.index') }]} />
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2"><Search className="w-4 h-4" /> Filter Data</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <FormInput label="From Date" type="date" value={fromDate} onChange={setFromDate} />
                        <FormInput label="To Date" type="date" value={toDate} onChange={setToDate} />
                        <FormInput label="Payment Method" type="select" value={paymentMethod} onChange={setPaymentMethod} options={[{ value: '', label: '-- All Methods --' }, { value: 'Cash', label: '💵 Cash' }, { value: 'Bank Transfer', label: '🏦 Bank Transfer' }, { value: 'Online', label: '💳 Online' }]} />
                        <div className="flex items-end"><Button variant="primary" size="lg" onClick={handleGenerate} className="w-full"><Search className="w-4 h-4 mr-1.5" /> Generate Report</Button></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
                    {payments.length > 0 && (
                        <div className="mb-4 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-2"><DollarSign className="w-5 h-5 text-primary-600" /><h2 className="text-xl font-semibold text-gray-900 dark:text-white">Fee Collection Records</h2></div>
                            <div className="flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-lg"><TrendingUp className="w-4 h-4" /><span className="font-semibold">Total: Rs. {Number(totalCollected).toLocaleString()}</span></div>
                        </div>
                    )}
                    {payments.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead><tr className="bg-gray-100 dark:bg-slate-700 border-b-2 border-gray-300 dark:border-slate-600">
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">SN</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Date</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Invoice No</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Student</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Fee Type</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Method</th>
                                    <th className="px-4 py-2 text-right text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Amount</th>
                                </tr></thead>
                                <tbody>
                                    {payments.map((payment, index) => (
                                        <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{index + 1}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{payment.payment_date ? new Date(payment.payment_date).toLocaleDateString() : 'N/A'}</td>
                                            <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700">{payment.invoice_no || 'N/A'}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{payment.student?.first_name} {payment.student?.last_name} <br/><span className="text-xs text-gray-500">({payment.student?.admission_no})</span></td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{payment.fee_structure?.fee_type?.name || 'N/A'}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 capitalize">{payment.payment_method || 'N/A'}</td>
                                            <td className="px-4 py-2 text-sm text-right font-bold text-emerald-600 dark:text-emerald-400 border border-gray-200 dark:border-slate-700">Rs. {Number(payment.net_amount).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (<div className="text-center py-12"><FileText className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" /><p className="text-gray-500 dark:text-gray-400">No records found.</p></div>)}
                </div>
            </div>
        </AppLayout>
    );
}