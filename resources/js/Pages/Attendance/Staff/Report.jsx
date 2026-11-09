import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { ArrowLeft, Calendar, CheckCircle, XCircle, Briefcase, Coffee } from 'lucide-react';

export default function StaffAttendanceReport({ employee_id, report, month, year }) {
    const breadcrumbItems = [
        { label: 'Dashboard', href: route('dashboard') },
        { label: 'Attendance', href: route('attendance.staff.index') },
    ];

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const stats = [
        { label: 'Present', value: report.present, icon: CheckCircle, color: 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800' },
        { label: 'Absent', value: report.absent, icon: XCircle, color: 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800' },
        { label: 'Leave', value: report.leave, icon: Briefcase, color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-800' },
        { label: 'Half Day', value: report.half_day, icon: Coffee, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800' },
    ];

    return (
        <AppLayout title="Staff Attendance Report">
            <Head title="Staff Attendance Report" />
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Breadcrumb title="Attendance" subTitle="Monthly Report" breadcrumbItems={breadcrumbItems} />
                    <Link href={route('attendance.staff.index')} className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors text-sm">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Link>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <Calendar className="w-6 h-6 text-emerald-600" />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Report for {monthNames[month - 1]} {year}
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((stat, index) => (
                            <div key={index} className={`p-4 rounded-xl border ${stat.color}`}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium opacity-80">{stat.label}</span>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <div className="text-3xl font-bold">{stat.value}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Working Days Recorded</span>
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">{report.total} Days</span>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}