import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { useState } from 'react';
import { BookOpen, Package, AlertTriangle, DollarSign, Layers, History, Search, ArrowRight } from 'lucide-react';

export default function LibraryReportsIndex() {
    const [searchTerm, setSearchTerm] = useState('');

    const libraryReports = [
        { title: 'Book Stock Report', description: 'Complete inventory of all books with availability status.', icon: Package, color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400', href: route('reports.library.book-stock') },
        { title: 'Overdue Books Report', description: 'List of books not returned past their due date.', icon: AlertTriangle, color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400', href: route('reports.library.overdue-books') },
        { title: 'Fine Collection Report', description: 'Summary of library fines collected from members.', icon: DollarSign, color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400', href: route('reports.library.fine-collection') },
        { title: 'Category-wise Books', description: 'Books distribution across different categories.', icon: Layers, color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400', href: route('reports.library.category-wise') },
        { title: 'Member Issue History', description: 'Issue history of students and employees.', icon: History, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400', href: route('reports.library.member-history') },
    ];

    const filteredReports = libraryReports.filter((r) =>
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) || r.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AppLayout title="Library Reports">
            <Head title="Library Reports" />
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Library Reports" subTitle="Library Data & Reports" breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }, { label: 'Reports', href: route('reports.index') }]} />
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <div className="relative max-w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Search library reports..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white outline-none text-sm transition-all" />
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