import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import {
    Bus,
    MapPin,
    Users,
    DollarSign,
    TrendingUp,
    Gauge,
    ArrowUpRight,
    Route,
    Wallet,
    Armchair,
    FileText
} from 'lucide-react';

export default function TransportSummary({ summary, routeSummary }) {
    const stats = [
        {
            label: 'Total Vehicles',
            value: summary.total_vehicles,
            icon: Bus,
            color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
        },
        {
            label: 'Active Vehicles',
            value: summary.active_vehicles,
            icon: Bus,
            color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
        },
        {
            label: 'Total Routes',
            value: summary.total_routes,
            icon: Route,
            color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
        },
        {
            label: 'Total Stops',
            value: summary.total_stops,
            icon: MapPin,
            color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
        },
        {
            label: 'Total Students',
            value: summary.total_students,
            icon: Users,
            color: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400'
        },
        {
            label: 'Total Capacity',
            value: summary.total_capacity,
            icon: Armchair,
            color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
        }
    ];

    const utilization = Math.min(
        Math.max(Number(summary.utilization) || 0, 0),
        100
    );

    return (
        <AppLayout title="Transport Summary">
            <Head title="Transport Summary" />

            <div className="space-y-4">

                {/* Breadcrumb */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb
                        title="Transport Reports"
                        subTitle="Transport Summary"
                        breadcrumbItems={[
                            { label: 'Dashboard', href: route('dashboard') },
                            { label: 'Reports', href: route('reports.index') },
                            { label: 'Transport', href: route('reports.transport.index') }
                        ]}
                    />
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={index}
                                className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 hover:shadow-md transition-all duration-200"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className={`p-3 rounded-xl ${stat.color}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>

                                    <ArrowUpRight className="w-4 h-4 text-gray-400" />
                                </div>

                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {stat.label}
                                </p>

                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                                    {Number(stat.value || 0).toLocaleString()}
                                </h3>
                            </div>
                        );
                    })}
                </div>

                {/* Revenue & Utilization Cards - FIXED */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                    {/* Monthly Revenue Card */}
                    <div className="relative overflow-hidden rounded-xl p-6 text-white shadow-sm bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700">
                        {/* Decorative circles */}
                        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10" />
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/5" />

                        <div className="relative z-10 flex items-center justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                                        <Wallet className="w-5 h-5 text-white" />
                                    </div>

                                    <p className="text-emerald-50 text-sm font-semibold">
                                        Monthly Revenue
                                    </p>
                                </div>

                                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                                    Rs. {Number(summary.total_monthly_revenue || 0).toLocaleString()}
                                </h2>

                                <p className="text-sm text-emerald-50 font-medium">
                                    Total monthly transport fee
                                </p>
                            </div>

                            <DollarSign className="w-16 h-16 text-white/30" />
                        </div>
                    </div>

                    {/* Vehicle Utilization Card */}
                    <div className="relative overflow-hidden rounded-xl p-6 text-white shadow-sm bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700">
                        {/* Decorative circles */}
                        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10" />
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/5" />

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                                        <Gauge className="w-5 h-5 text-white" />
                                    </div>

                                    <p className="text-blue-50 text-sm font-semibold">
                                        Vehicle Utilization
                                    </p>
                                </div>

                                <Bus className="w-10 h-10 text-white/30" />
                            </div>

                            <h2 className="text-4xl font-bold text-white mb-1">
                                {utilization.toFixed(2)}%
                            </h2>

                            <div className="mt-5">
                                <div className="flex items-center justify-between text-xs text-blue-50 mb-2 font-medium">
                                    <span>Seat Occupancy</span>

                                    <span>
                                        {Number(summary.total_students || 0).toLocaleString()} / {Number(summary.total_capacity || 0).toLocaleString()} Seats
                                    </span>
                                </div>

                                {/* Progress Bar - FIXED */}
                                <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden backdrop-blur-sm">
                                    <div
                                        className="h-full bg-white rounded-full transition-all duration-500 shadow-lg"
                                        style={{ width: `${utilization}%` }}
                                    />
                                </div>

                                <p className="text-xs text-blue-100 mt-2">
                                    {utilization >= 80 ? '🟢 High utilization' : utilization >= 50 ? '🟡 Moderate utilization' : '🔴 Low utilization'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Route-wise Breakdown Table */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden">

                    {/* Header */}
                    <div className="p-5 border-b border-gray-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                                <TrendingUp className="w-5 h-5" />
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                    Route-wise Breakdown
                                </h2>

                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Overview of students and transport fees by route
                                </p>
                            </div>
                        </div>

                        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-semibold">
                            <Route className="w-4 h-4" />
                            {routeSummary.length} Routes
                        </div>
                    </div>

                    {/* Table */}
                    {routeSummary.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-slate-700">
                                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase border-b border-gray-200 dark:border-slate-600">
                                            SN
                                        </th>

                                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase border-b border-gray-200 dark:border-slate-600">
                                            Route Name
                                        </th>

                                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase border-b border-gray-200 dark:border-slate-600">
                                            Vehicle
                                        </th>

                                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase border-b border-gray-200 dark:border-slate-600">
                                            Students
                                        </th>

                                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase border-b border-gray-200 dark:border-slate-600">
                                            Base Fare
                                        </th>

                                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase border-b border-gray-200 dark:border-slate-600">
                                            Total Monthly Fee
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {routeSummary.map((item, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                                        >
                                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 border-b border-gray-100 dark:border-slate-700">
                                                {index + 1}
                                            </td>

                                            <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-slate-700">
                                                <div className="flex items-center gap-2">
                                                    <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/30">
                                                        <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                                    </div>

                                                    {item.route_name}
                                                </div>
                                            </td>

                                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-slate-700">
                                                <div className="flex items-center gap-2">
                                                    <Bus className="w-4 h-4 text-gray-400" />
                                                    {item.vehicle_no}
                                                </div>
                                            </td>

                                            <td className="px-4 py-3 text-center border-b border-gray-100 dark:border-slate-700">
                                                <span className="inline-flex px-3 py-1 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 text-sm font-bold">
                                                    {Number(item.total_students || 0).toLocaleString()}
                                                </span>
                                            </td>

                                            <td className="px-4 py-3 text-sm text-right text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-slate-700">
                                                Rs. {Number(item.base_fare || 0).toLocaleString()}
                                            </td>

                                            <td className="px-4 py-3 text-sm text-right font-bold text-emerald-600 dark:text-emerald-400 border-b border-gray-100 dark:border-slate-700">
                                                Rs. {Number(item.total_monthly_fee || 0).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
                                <FileText className="w-7 h-7 text-gray-400" />
                            </div>

                            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                No Route Data Found
                            </h3>

                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                There are currently no transport routes available.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}