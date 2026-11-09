import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { useState } from 'react';
import { Bed, BarChart3, DoorOpen, DollarSign, Users, Search, ArrowRight } from 'lucide-react';

export default function HostelReportsIndex() {
    const [searchTerm, setSearchTerm] = useState('');

    const hostelReports = [
        { title: 'Hostel Summary', description: 'Overall hostel statistics with occupancy and revenue.', icon: BarChart3, color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400', href: route('reports.hostel.hostel-summary') },
        { title: 'Room Occupancy', description: 'Detailed occupancy status of all hostel rooms.', icon: Bed, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400', href: route('reports.hostel.room-occupancy') },
        { title: 'Hostel Fee Report', description: 'Monthly hostel fee details of all students.', icon: DollarSign, color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400', href: route('reports.hostel.hostel-fee') },
        { title: 'Vacant Rooms', description: 'List of available rooms with vacant beds.', icon: DoorOpen, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400', href: route('reports.hostel.vacant-rooms') },
        { title: 'Hostel-wise Students', description: 'Students staying in hostels with contact details.', icon: Users, color: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400', href: route('reports.hostel.hostel-wise-students') },
    ];

    const filteredReports = hostelReports.filter((r) =>
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) || r.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AppLayout title="Hostel Reports">
            <Head title="Hostel Reports" />
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Hostel Reports" subTitle="Hostel Data & Reports" breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }, { label: 'Reports', href: route('reports.index') }]} />
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <div className="relative max-w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Search hostel reports..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white outline-none text-sm transition-all" />
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