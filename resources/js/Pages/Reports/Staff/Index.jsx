import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { useState } from 'react';
import {
    Users,
    Calendar,
    FileText,
    Banknote,
    Building2,
    Search,
    ArrowRight,
} from 'lucide-react';

export default function StaffReportsIndex() {
    const [searchTerm, setSearchTerm] = useState('');

        const staffReports = [
        {
            title: 'Employee Contact List',
            description: 'Complete employee details with contact information and department.',
            icon: Users,
            color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
            href: route('reports.staff.contact-list'),
        },
        {
            title: 'Staff Attendance Report',
            description: 'Daily, monthly or date-range attendance report of employees.',
            icon: Calendar,
            color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
            href: route('reports.staff.attendance'),
        },
        {
            title: 'Leave Summary Report',
            description: 'Employee leave applications, approvals and leave balance summary.',
            icon: FileText,
            color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
            href: route('reports.staff.leave-summary'),
        },
        {
            title: 'Payroll Summary Report',
            description: 'Monthly salary breakdown with allowances, deductions and net pay.',
            icon: Banknote,
            color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
            href: route('reports.staff.payroll-summary'),
        },
        {
            title: 'Department-wise Staff Report',
            description: 'Employee distribution across departments with designation details.',
            icon: Building2,
            color: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
            href: route('reports.staff.department-wise'),
        },
    ];

    const handleReportClick = (href) => {
        if (href !== '#') {
            router.visit(href);
        }
    };

    const filteredReports = staffReports.filter((report) =>
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AppLayout title="Staff & HR Reports">
            <Head title="Staff & HR Reports" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb
                        title="Staff & HR Reports"
                        subTitle="Employee Data & Reports"
                        breadcrumbItems={[
                            { label: 'Dashboard', href: route('dashboard') },
                            { label: 'Reports', href: route('reports.index') },
                        ]}
                    />
                </div>

                {/* Search Bar */}
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <div className="relative max-w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search staff reports..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white outline-none text-sm transition-all"
                        />
                    </div>
                </div>

                {/* Report Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredReports.map((report, index) => {
                        const isComingSoon = report.href === '#';

                        return (
                            <div
                                key={index}
                                onClick={() => handleReportClick(report.href)}
                                className={`group bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 transition-all duration-300 flex flex-col h-full ${
                                    isComingSoon
                                        ? 'opacity-70 cursor-not-allowed'
                                        : 'hover:shadow-lg hover:-translate-y-1 cursor-pointer'
                                }`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-lg ${report.color}`}>
                                        <report.icon className="w-6 h-6" />
                                    </div>

                                    {isComingSoon ? (
                                        <span className="text-[10px] px-2 py-1 rounded-full bg-gray-100 text-gray-500 dark:bg-slate-700 dark:text-gray-300 font-semibold">
                                            Soon
                                        </span>
                                    ) : (
                                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                                    )}
                                </div>

                                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                                    {report.title}
                                </h3>

                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-grow">
                                    {report.description}
                                </p>
                            </div>
                        );
                    })}

                    {/* Empty State */}
                    {filteredReports.length === 0 && (
                        <div className="col-span-full py-12 text-center">
                            <Search className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                            <p className="text-gray-500 dark:text-gray-400">
                                No reports found matching "{searchTerm}"
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}