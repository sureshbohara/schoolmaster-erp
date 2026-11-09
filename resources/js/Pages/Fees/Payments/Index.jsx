import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { DollarSign, Plus, Pencil, Trash2, Search, X, Calendar, User, FileText } from 'lucide-react';

export default function FeePaymentsIndex({ payments, dropdownData, filters }) {
    const paymentList = payments?.data || [];
    const [filterStudent, setFilterStudent] = useState(filters?.student_id || '');
    const [filterStatus, setFilterStatus] = useState(filters?.status || '');
    const [fromDate, setFromDate] = useState(filters?.from_date || '');
    const [toDate, setToDate] = useState(filters?.to_date || '');

    const breadcrumbItems = [{ label: 'Dashboard', href: route('dashboard') }, { label: 'Finance & Fees', href: '#' }];

    const handleReset = () => {
        setFilterStudent('');
        setFilterStatus('');
        setFromDate('');
        setToDate('');
        router.get(route('fees.payments.index'), {}, { preserveState: true, preserveScroll: true });
    };

    const handleFilterChange = (key, value) => {
        if (key === 'student_id') setFilterStudent(value);
        if (key === 'status') setFilterStatus(value);
        if (key === 'from_date') setFromDate(value);
        if (key === 'to_date') setToDate(value);
        
        router.get(route('fees.payments.index'), { 
            student_id: filterStudent, 
            status: filterStatus,
            from_date: fromDate,
            to_date: toDate,
            [key]: value 
        }, { preserveState: true, preserveScroll: true });
    };

    const handleDelete = (id, invoiceNo) => {
        if (confirm(`Are you sure you want to delete payment ${invoiceNo}?`)) {
            router.delete(route('fees.payments.destroy', id), { 
                preserveScroll: true,
            });
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-NP', { maximumFractionDigits: 2 }).format(amount || 0);
    };

    return (
        <AppLayout title="Fee Collections">
            <Head title="Fee Collection Management" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Finance & Fees" subTitle="Fee Collections" breadcrumbItems={breadcrumbItems} />
                    <Link href={route('fees.payments.create')} className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                        <Plus className="w-4 h-4 mr-1.5" /> Collect Fee
                    </Link>
                </div>

         
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                        <select 
                            value={filterStudent} 
                            onChange={(e) => handleFilterChange('student_id', e.target.value)} 
                            className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm"
                        >
                            <option value="">All Students</option>
                            {dropdownData?.students?.map(s => <option key={s.id} value={s.id}>{s.first_name} {s.last_name} ({s.admission_no})</option>)}
                        </select>
                        <input 
                            type="date" 
                            value={fromDate} 
                            onChange={(e) => handleFilterChange('from_date', e.target.value)} 
                            placeholder="From Date"
                            className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm"
                        />
                        <input 
                            type="date" 
                            value={toDate} 
                            onChange={(e) => handleFilterChange('to_date', e.target.value)} 
                            placeholder="To Date"
                            className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm"
                        />
                        <select 
                            value={filterStatus} 
                            onChange={(e) => handleFilterChange('status', e.target.value)} 
                            className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm"
                        >
                            <option value="">All Status</option>
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                        </select>
                        <button onClick={handleReset} className="w-full px-4 py-2 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg transition-colors text-sm flex items-center justify-center">
                            <X className="w-4 h-4 mr-1.5" /> Reset
                        </button>
                    </div>
                </div>

         
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-gray-200 dark:border-slate-700">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Invoice</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Student</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Fee Type</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Net Amount</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Payment Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Method</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                                {paymentList.map((payment) => (
                                    <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-gray-400" />
                                                <span className="font-mono text-sm text-gray-900 dark:text-white">{payment.invoice_no}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-gray-400" />
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-white text-sm">{payment.student?.full_name}</div>
                                                    <div className="text-xs text-gray-500 font-mono">{payment.student?.admission_no}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                                            {payment.fee_structure?.fee_type?.name || 'N/A'}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <span className="inline-flex items-center px-2.5 py-1 text-sm font-bold rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-mono">
                                                Rs. {formatCurrency(payment.net_amount)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                                                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                                {payment.payment_date || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 capitalize">
                                            {payment.payment_method?.replace('_', ' ') || 'N/A'}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end space-x-1">
                                                <Link href={route('fees.payments.edit', payment.id)} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800 transition-colors">
                                                    <Pencil className="w-3.5 h-3.5" />
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(payment.id, payment.invoice_no)} 
                                                    className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded border border-red-200 dark:border-red-800 transition-colors"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {paymentList.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                            <DollarSign className="w-12 h-12 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                                            <p className="text-sm">No fee payments found</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}