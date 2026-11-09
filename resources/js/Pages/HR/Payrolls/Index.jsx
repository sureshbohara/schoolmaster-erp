import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Wallet, Plus, Trash2, Search, X, CheckCircle, User, Calendar } from 'lucide-react';

export default function PayrollsIndex({ payrolls, dropdownData, filters }) {
    const payrollList = payrolls?.data || [];
    const [filterEmployee, setFilterEmployee] = useState(filters?.employee_id || '');
    const [filterMonth, setFilterMonth] = useState(filters?.month || '');
    const [filterYear, setFilterYear] = useState(filters?.year || '');
    const [filterStatus, setFilterStatus] = useState(filters?.status || '');

    const breadcrumbItems = [{ label: 'Dashboard', href: route('dashboard') }, { label: 'HR', href: '#' }];


    const handleFilterChange = (key, value) => {
        if (key === 'employee_id') setFilterEmployee(value);
        if (key === 'month') setFilterMonth(value);
        if (key === 'year') setFilterYear(value);
        if (key === 'status') setFilterStatus(value);
        
        router.get(route('hr.payrolls.index'), { 
            employee_id: filterEmployee, month: filterMonth, year: filterYear, status: filterStatus, [key]: value 
        }, { preserveState: true, preserveScroll: true });
    };

    const handleMarkAsPaid = (payrollId) => {
        const paidDate = prompt('Enter paid date (YYYY-MM-DD):', new Date().toISOString().split('T')[0]);
        if (!paidDate) return;
        
        router.post(route('hr.payrolls.mark-paid', payrollId), { paid_date: paidDate }, { 
            preserveScroll: true,
            onSuccess: () => toast.success('Payroll marked as paid'),
        });
    };

    const handleDelete = (id) => {
        if (confirm('Delete this payroll?')) {
            router.delete(route('hr.payrolls.destroy', id), { preserveScroll: true });
        }
    };

    const formatCurrency = (amount) => new Intl.NumberFormat('en-NP', { maximumFractionDigits: 2 }).format(amount || 0);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return (
        <AppLayout title="Payrolls">
            <Head title="Payroll Management" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Human Resource" subTitle="Payrolls" breadcrumbItems={breadcrumbItems} />
                    <Link href={route('hr.payrolls.create')} className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                        <Plus className="w-4 h-4 mr-1.5" /> Generate Payroll
                    </Link>
                </div>

               
               <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">

                        <div className="relative w-full">
                            <select
                                value={filterEmployee}
                                onChange={(e) => handleFilterChange('employee_id', e.target.value)}
                                className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm"
                            >
                                <option value="">All Employees</option>
                                {dropdownData?.employees?.map(e => (
                                    <option key={e.id} value={e.id}>
                                        {e.first_name} {e.last_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="relative w-full">
                            <select
                                value={filterMonth}
                                onChange={(e) => handleFilterChange('month', e.target.value)}
                                className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm"
                            >
                                <option value="">All Months</option>
                                {monthNames.map((m, i) => (
                                    <option key={i+1} value={i+1}>{m}</option>
                                ))}
                            </select>
                        </div>

                        <div className="relative w-full">
                            <input
                                type="number"
                                placeholder="Year"
                                value={filterYear}
                                onChange={(e) => handleFilterChange('year', e.target.value)}
                                className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm"
                            />
                        </div>

                        <div className="relative w-full">
                            <select
                                value={filterStatus}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                                className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm"
                            >
                                <option value="">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="paid">Paid</option>
                            </select>
                        </div>

                    </div>
                </div>

                {/* Table */}
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-gray-200 dark:border-slate-700">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Employee</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Period</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Basic</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Deductions</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Net Pay</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Status</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                                {payrollList.map((p) => (
                                    <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-gray-400" />
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-white text-sm">{p.employee?.full_name}</div>
                                                    <div className="text-xs text-gray-500 font-mono">{p.employee?.employee_id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                                                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                                {monthNames[p.month - 1]} {p.year}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-300 font-mono">{formatCurrency(p.basic)}</td>
                                        <td className="px-4 py-3 text-sm text-right text-red-600 dark:text-red-400 font-mono">-{formatCurrency((parseFloat(p.deductions) || 0) + (parseFloat(p.tax) || 0))}</td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-mono">
                                                <Wallet className="w-3 h-3 mr-1" />
                                                {formatCurrency(p.net_pay)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${
                                                p.status === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                                            }`}>
                                                {p.status === 'paid' ? '✓ Paid' : '⏳ Pending'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end space-x-1">
                                                {p.status === 'pending' && (
                                                    <button onClick={() => handleMarkAsPaid(p.id)} className="p-1.5 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded border border-green-200 dark:border-green-800 transition-colors" title="Mark as Paid">
                                                        <CheckCircle className="w-3.5 h-3.5" />
                                                    </button>
                                                )}
                                                <button onClick={() => handleDelete(p.id)} className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded border border-red-200 dark:border-red-800 transition-colors" title="Delete">
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {payrollList.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                            <Wallet className="w-12 h-12 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                                            <p className="text-sm">No payrolls found</p>
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