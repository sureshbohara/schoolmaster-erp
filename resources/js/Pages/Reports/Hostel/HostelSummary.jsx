import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { Bed, Building2, DoorOpen, Users, DollarSign, TrendingUp, Gauge } from 'lucide-react';

export default function HostelSummary({ summary, hostelSummary }) {
    const stats = [
        { label: 'Total Hostels', value: summary.total_hostels, icon: Building2, color: 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' },
        { label: 'Active Hostels', value: summary.active_hostels, icon: Building2, color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' },
        { label: 'Total Rooms', value: summary.total_rooms, icon: DoorOpen, color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
        { label: 'Total Beds', value: summary.total_beds, icon: Bed, color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
        { label: 'Occupied Beds', value: summary.occupied_beds, icon: Users, color: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400' },
        { label: 'Vacant Beds', value: summary.vacant_beds, icon: Bed, color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' },
    ];

    const occupancyRate = Math.min(Math.max(Number(summary.occupancy_rate) || 0, 0), 100);

    return (
        <AppLayout title="Hostel Summary">
            <Head title="Hostel Summary" />
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Hostel Reports" subTitle="Hostel Summary" breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }, { label: 'Reports', href: route('reports.index') }, { label: 'Hostel', href: route('reports.hostel.index') }]} />
                </div>

         
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 hover:shadow-md transition-all">
                                <div className="flex items-center justify-between mb-3">
                                    <div className={`p-3 rounded-xl ${stat.color}`}><Icon className="w-5 h-5" /></div>
                                </div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{Number(stat.value || 0).toLocaleString()}</h3>
                            </div>
                        );
                    })}
                </div>

                {/* Revenue & Occupancy Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="relative overflow-hidden rounded-xl p-6 text-white shadow-sm bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700">
                        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10" />
                        <div className="relative z-10 flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="p-2 rounded-lg bg-white/20"><DollarSign className="w-5 h-5 text-white" /></div>
                                    <p className="text-emerald-50 text-sm font-semibold">Monthly Revenue</p>
                                </div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-white">Rs. {Number(summary.total_monthly_revenue || 0).toLocaleString()}</h2>
                                <p className="text-sm text-emerald-50 mt-2">Total monthly hostel fee</p>
                            </div>
                            <DollarSign className="w-16 h-16 text-white/30" />
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-xl p-6 text-white shadow-sm bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700">
                        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10" />
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded-lg bg-white/20"><Gauge className="w-5 h-5 text-white" /></div>
                                    <p className="text-blue-50 text-sm font-semibold">Occupancy Rate</p>
                                </div>
                                <Bed className="w-10 h-10 text-white/30" />
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-1">{occupancyRate.toFixed(2)}%</h2>
                            <div className="mt-5">
                                <div className="flex items-center justify-between text-xs text-blue-50 mb-2 font-medium">
                                    <span>Bed Occupancy</span>
                                    <span>{Number(summary.occupied_beds || 0).toLocaleString()} / {Number(summary.total_beds || 0).toLocaleString()} Beds</span>
                                </div>
                                <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden">
                                    <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${occupancyRate}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hostel-wise Breakdown */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
                    <div className="p-5 border-b border-gray-200 dark:border-slate-700 flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"><TrendingUp className="w-5 h-5" /></div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Hostel-wise Breakdown</h2>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Overview of beds and fees by hostel</p>
                        </div>
                    </div>
                    {hostelSummary.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-slate-700">
                                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase border-b border-gray-200 dark:border-slate-600">SN</th>
                                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase border-b border-gray-200 dark:border-slate-600">Hostel Name</th>
                                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase border-b border-gray-200 dark:border-slate-600">Type</th>
                                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase border-b border-gray-200 dark:border-slate-600">Rooms</th>
                                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase border-b border-gray-200 dark:border-slate-600">Total Beds</th>
                                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase border-b border-gray-200 dark:border-slate-600">Occupied</th>
                                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase border-b border-gray-200 dark:border-slate-600">Vacant</th>
                                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase border-b border-gray-200 dark:border-slate-600">Monthly Fee</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hostelSummary.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 border-b border-gray-100 dark:border-slate-700">{index + 1}</td>
                                            <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-slate-700">{item.hostel_name}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-slate-700 capitalize">{item.hostel_type}</td>
                                            <td className="px-4 py-3 text-sm text-center text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-slate-700">{item.total_rooms}</td>
                                            <td className="px-4 py-3 text-sm text-center text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-slate-700">{item.total_beds}</td>
                                            <td className="px-4 py-3 text-center border-b border-gray-100 dark:border-slate-700">
                                                <span className="inline-flex px-3 py-1 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 text-sm font-bold">{item.occupied_beds}</span>
                                            </td>
                                            <td className="px-4 py-3 text-center border-b border-gray-100 dark:border-slate-700">
                                                <span className="inline-flex px-3 py-1 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-bold">{item.vacant_beds}</span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-right font-bold text-emerald-600 dark:text-emerald-400 border-b border-gray-100 dark:border-slate-700">Rs. {Number(item.total_monthly_fee || 0).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12"><p className="text-gray-500 dark:text-gray-400">No hostel data found.</p></div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}