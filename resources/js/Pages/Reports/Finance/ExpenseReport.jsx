import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import Button from '@/Components/Button'; 
import { useState } from 'react';
import { Search, FileText, TrendingDown } from 'lucide-react';

export default function ExpenseReport({ heads, expenses, totalExpense, filters }) {
    const [fromDate, setFromDate] = useState(filters?.from_date || '');
    const [toDate, setToDate] = useState(filters?.to_date || '');
    const [headId, setHeadId] = useState(filters?.head_id || '');

    const handleGenerate = () => {
        router.get(route('reports.finance.expense'), { 
            from_date: fromDate, 
            to_date: toDate, 
            head_id: headId 
        }, { preserveState: true });
    };

    return (
        <AppLayout title="Expense Report">
            <Head title="Expense Report" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb 
                        title="Finance Reports" 
                        subTitle="Expense Report" 
                        breadcrumbItems={[
                            { label: 'Dashboard', href: route('dashboard') }, 
                            { label: 'Reports', href: route('reports.index') },
                            { label: 'Finance', href: route('reports.finance.index') }
                        ]} 
                    />
                </div>

                {/* Filter Section */}
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                        <Search className="w-4 h-4" /> Filter Data
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <FormInput 
                            label="From Date" 
                            type="date" 
                            value={fromDate} 
                            onChange={setFromDate} 
                        />
                        <FormInput 
                            label="To Date" 
                            type="date" 
                            value={toDate} 
                            onChange={setToDate} 
                        />
                        <FormInput 
                            label="Expense Head" 
                            type="select" 
                            value={headId} 
                            onChange={setHeadId} 
                            options={[
                                { value: '', label: '-- All Heads --' }, 
                                ...(heads?.map(h => ({ value: h.id, label: h.name })) || [])
                            ]} 
                        />
                        <div className="flex items-end">
                            <Button variant="primary" size="lg" onClick={handleGenerate} className="w-full">
                                <Search className="w-4 h-4 mr-1.5" /> Generate Report
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Report Output Section */}
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
                    {expenses.length > 0 && (
                        <div className="mb-4 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <TrendingDown className="w-5 h-5 text-red-600" />
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Expense Records</h2>
                            </div>
                            <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-4 py-2 rounded-lg">
                                <span className="font-semibold">Total: Rs. {Number(totalExpense).toLocaleString()}</span>
                            </div>
                        </div>
                    )}

                    {expenses.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-slate-700 border-b-2 border-gray-300 dark:border-slate-600">
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">SN</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Date</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Voucher No</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Expense Head</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Description</th>
                                        <th className="px-4 py-2 text-right text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expenses.map((expense, index) => (
                                        <tr key={expense.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{index + 1}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">
                                                {expense.date ? new Date(expense.date).toLocaleDateString() : 'N/A'}
                                            </td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">
                                                {expense.voucher_no || 'N/A'}
                                            </td>
                                            <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700">
                                                {expense.head?.name || 'N/A'}
                                            </td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">
                                                {expense.description || 'N/A'}
                                            </td>
                                            <td className="px-4 py-2 text-sm text-right font-bold text-red-600 dark:text-red-400 border border-gray-200 dark:border-slate-700">
                                                Rs. {Number(expense.amount).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <FileText className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                            <p className="text-gray-500 dark:text-gray-400">No expense records found.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}