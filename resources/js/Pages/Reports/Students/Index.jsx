import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { useState } from 'react';
import {
    Calendar,
    DollarSign,
    Bus,
    Bed,
    BookOpen,
    Phone,
    Search,
    ArrowRight,
    FileText,
} from 'lucide-react';

export default function StudentReportsIndex() {
    const [searchTerm, setSearchTerm] = useState('');

    // ✅ Clean Array: सबै ७ वटै Report को सही Route राखिएको छ
    const studentReports = [
        {
            title: 'Student Contact List',
            description: 'Student and guardian contact details for communication.',
            icon: Phone,
            color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
            href: route('reports.students.contact-list'),
        },
        {
            title: 'Student Attendance Report',
            description: 'Daily, monthly or date-range attendance report of students.',
            icon: Calendar,
            color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
            href: route('reports.students.attendance'),
        },
        {
            title: 'Student Fee Status Report',
            description: 'Paid, partial and due fee status of students.',
            icon: DollarSign,
            color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
            href: route('reports.students.fee-status'),
        },
        {
            title: 'Transport User Report',
            description: 'Students using transport service with route and stop details.',
            icon: Bus,
            color: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400',
            href: route('reports.students.transport-users'),
        },
        {
            title: 'Hostel User Report',
            description: 'Students staying in hostel with room and bed details.',
            icon: Bed,
            color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
            href: route('reports.students.hostel-users'),
        },
        {
            title: 'Library Issue Report',
            description: 'Students who issued books and current return status.',
            icon: BookOpen,
            color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
            href: route('reports.students.library-issues'),
        },
        {
            title: 'Admission Register',
            description: 'Admission register with student admission details and class information.',
            icon: FileText,
            color: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
            href: route('reports.students.admission-register'),
        },
    ];

    const handleReportClick = (href) => {
        router.visit(href);
    };

    const filteredReports = studentReports.filter((report) =>
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AppLayout title="Student Reports">
            <Head title="Student Reports" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb
                        title="Student Reports"
                        subTitle="Student Data & Reports"
                        breadcrumbItems={[
                            { label: 'Dashboard', href: route('dashboard') },
                            { label: 'Reports', href: route('reports.index') },
                        ]}
                    />
                </div>

         
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <div className="relative max-w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search student reports..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white outline-none text-sm transition-all"
                        />
                    </div>
                </div>

        
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredReports.map((report, index) => (
                        <div
                            key={index}
                            onClick={() => handleReportClick(report.href)}
                            className="group bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-all duration-300 flex flex-col h-full"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-lg ${report.color}`}>
                                    <report.icon className="w-6 h-6" />
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                            </div>

                            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                                {report.title}
                            </h3>

                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-grow">
                                {report.description}
                            </p>
                        </div>
                    ))}

               
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