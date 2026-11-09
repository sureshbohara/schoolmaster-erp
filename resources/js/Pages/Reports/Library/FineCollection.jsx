import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import Button from '@/Components/Button';
import { useState } from 'react';
import { Search, FileText, DollarSign, TrendingUp } from 'lucide-react';

export default function FineCollection({ fines, totalFine, filters }) {
    const [fromDate, setFromDate] = useState(filters?.from_date || '');
    const [toDate, setToDate] = useState(filters?.to_date || '');

    const handleGenerate = () => {
        router.get(route('reports.library.fine-collection'), { from_date: fromDate, to_date: toDate }, { preserveState: true });
    };

    return (
        <AppLayout title="Fine Collection Report">
            <Head title="Fine Collection Report" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Library Reports" subTitle="Fine Collection" breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }, { label: 'Reports', href: route('reports.index') }, { label: 'Library', href: route('reports.library.index') }]} />
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2"><Search className="w-4 h-4" /> Filter Data</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormInput label="From Date" type="date" value={fromDate} onChange={setFromDate} />
                        <FormInput label="To Date" type="date" value={toDate} onChange={setToDate} />
                        <div className="flex items-end"><Button variant="primary" size="lg" onClick={handleGenerate} className="w-full"><Search className="w-4 h-4 mr-1.5" /> Generate Report</Button></div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
                    {fines.length > 0 && (
                        <div className="mb-4 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-2"><DollarSign className="w-5 h-5 text-primary-600" /><h2 className="text-xl font-semibold text-gray-900 dark:text-white">Fine Collection Records</h2></div>
                            <div className="flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-4 py-2 rounded-lg"><TrendingUp className="w-4 h-4" /><span className="font-semibold">Total: Rs. {Number(totalFine).toLocaleString()}</span></div>
                        </div>
                    )}
                    {fines.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead><tr className="bg-gray-100 dark:bg-slate-700 border-b-2 border-gray-300 dark:border-slate-600">
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">SN</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Date</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Book</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Member</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Reason</th>
                                    <th className="px-4 py-2 text-right text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Fine Amount</th>
                                </tr></thead>
                                <tbody>
                                    {fines.map((fine, index) => {
                                        const issue = fine.book_issue;
                                        const member = issue?.member_type === 'student' ? issue?.student : issue?.employee;
                                        const memberName = member ? `${member.first_name} ${member.last_name}` : 'N/A';
                                        return (
                                            <tr key={fine.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{index + 1}</td>
                                                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{fine.date ? new Date(fine.date).toLocaleDateString() : 'N/A'}</td>
                                                <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700">{issue?.book?.title || 'N/A'}</td>
                                                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{memberName}</td>
                                                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{fine.reason || 'N/A'}</td>
                                                <td className="px-4 py-2 text-sm text-right font-bold text-amber-600 dark:text-amber-400 border border-gray-200 dark:border-slate-700">Rs. {Number(fine.amount).toLocaleString()}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (<div className="text-center py-12"><FileText className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" /><p className="text-gray-500 dark:text-gray-400">No fine records found.</p></div>)}
                </div>
            </div>
        </AppLayout>
    );
}