import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Landmark, FileText, Search, ArrowRight } from 'lucide-react';

export default function FinanceReportsIndex() {
    const [searchTerm, setSearchTerm] = useState('');

    const financeReports = [
        { title: 'Fee Collection Report', description: 'Daily, monthly, or date-range summary of collected fees.', icon: DollarSign, color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400', href: route('reports.finance.fee-collection') },
        { title: 'Income Report', description: 'Summary of all income sources grouped by income heads.', icon: TrendingUp, color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400', href: route('reports.finance.income') },
        { title: 'Expense Report', description: 'Summary of all expenses grouped by expense heads.', icon: TrendingDown, color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400', href: route('reports.finance.expense') },
        { title: 'Bank Statement', description: 'Bank account balances and transaction summaries.', icon: Landmark, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400', href: route('reports.finance.bank-statement') },
        { title: 'Fee Defaulter List', description: 'List of students with pending or overdue fee payments.', icon: FileText, color: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400', href: route('reports.finance.fee-defaulter') },
    ];

    const filteredReports = financeReports.filter((report) =>
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) || report.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AppLayout title="Finance & Fee Reports">
            <Head title="Finance & Fee Reports" />
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Finance Reports" subTitle="Financial Data & Reports" breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }, { label: 'Reports', href: route('reports.index') }]} />
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <div className="relative max-w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Search finance reports..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white outline-none text-sm transition-all" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredReports.map((report, index) => (
                        <div key={index} onClick={() => router.visit(report.href)} className="group bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-all duration-300 flex flex-col h-full">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-lg ${report.color}`}><report.icon className="w-6 h-6" /></div>
                                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                            </div>
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">{report.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-grow">{report.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}