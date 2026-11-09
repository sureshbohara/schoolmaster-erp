
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import Button from '@/Components/Button';
import { useState } from 'react';
import { Search, FileText, MapPin, Users, ChevronDown, ChevronUp } from 'lucide-react';

export default function StopWiseStudents({ routes, data, totalStops, filters }) {
    const [routeId, setRouteId] = useState(filters?.route_id || '');
    const [expandedStop, setExpandedStop] = useState(null);

    const handleGenerate = () => {
        router.get(
            route('reports.transport.stop-wise-students'),
            { route_id: routeId },
            { preserveState: true }
        );
    };

    const toggleStop = (stopId) => {
        setExpandedStop(expandedStop === stopId ? null : stopId);
    };

    return (
        <AppLayout title="Stop-wise Students">
            <Head title="Stop-wise Students" />

            <div className="space-y-3">

                {/* Breadcrumb */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb
                        title="Transport Reports"
                        subTitle="Stop-wise Students"
                        breadcrumbItems={[
                            { label: 'Dashboard', href: route('dashboard') },
                            { label: 'Reports', href: route('reports.index') },
                            { label: 'Transport', href: route('reports.transport.index') }
                        ]}
                    />
                </div>

                {/* Filter Section */}
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                        <Search className="w-4 h-4" />
                        Filter Data
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                            label="Select Route"
                            type="select"
                            value={routeId}
                            onChange={setRouteId}
                            options={[
                                { value: '', label: '-- All Routes --' },
                                ...(routes?.map(r => ({
                                    value: r.id,
                                    label: r.name
                                })) || [])
                            ]}
                        />

                        <div className="flex items-end">
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={handleGenerate}
                                className="w-full"
                            >
                                <Search className="w-4 h-4 mr-1.5" />
                                Generate Report
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Report Section */}
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">

                    {data.length > 0 && (
                        <div className="mb-4 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">

                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-primary-600" />
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Stop-wise Students
                                </h2>
                            </div>

                            <div className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-lg">
                                <Users className="w-4 h-4" />
                                <span className="font-semibold">
                                    Total Stops: {totalStops}
                                </span>
                            </div>
                        </div>
                    )}

                    {data.length > 0 ? (
                        <div className="space-y-3">

                            {data.map((stop, index) => (
                                <div
                                    key={stop.stop_id}
                                    className="bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden"
                                >

                                    {/* Stop Header */}
                                    <div
                                        onClick={() => toggleStop(stop.stop_id)}
                                        className="p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                                                <MapPin className="w-5 h-5" />
                                            </div>

                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                                    {stop.stop_name}
                                                </h3>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Route: {stop.route_name}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">

                                            <div className="text-right">
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Students
                                                </p>
                                                <p className="font-bold text-purple-600 dark:text-purple-400">
                                                    {stop.student_count}
                                                </p>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Total Fee
                                                </p>
                                                <p className="font-bold text-emerald-600 dark:text-emerald-400">
                                                    Rs. {Number(stop.total_fee).toLocaleString()}
                                                </p>
                                            </div>

                                            {expandedStop === stop.stop_id ? (
                                                <ChevronUp className="w-5 h-5 text-gray-400" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-gray-400" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Expanded Student Details */}
                                    {expandedStop === stop.stop_id && (
                                        <div className="border-t border-gray-200 dark:border-slate-700 p-4">
                                            <div className="overflow-x-auto">
                                                <table className="w-full border-collapse">

                                                    <thead>
                                                        <tr className="bg-gray-100 dark:bg-slate-700">
                                                            <th className="px-3 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase">
                                                                SN
                                                            </th>
                                                            <th className="px-3 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase">
                                                                Admission No
                                                            </th>
                                                            <th className="px-3 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase">
                                                                Student Name
                                                            </th>
                                                            <th className="px-3 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase">
                                                                Class / Section
                                                            </th>
                                                            <th className="px-3 py-2 text-right text-xs font-bold text-gray-700 dark:text-gray-200 uppercase">
                                                                Monthly Fee
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {stop.students.map((s, i) => (
                                                            <tr
                                                                key={i}
                                                                className="hover:bg-gray-50 dark:hover:bg-slate-700/50"
                                                            >
                                                                <td className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-slate-700">
                                                                    {i + 1}
                                                                </td>

                                                                <td className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-slate-700">
                                                                    {s.admission_no}
                                                                </td>

                                                                <td className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-slate-700">
                                                                    {s.student_name}
                                                                </td>

                                                                <td className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-slate-700">
                                                                    {s.class_name} - {s.section_name}
                                                                </td>

                                                                <td className="px-3 py-2 text-sm text-right font-medium text-cyan-600 dark:text-cyan-400 border-b border-gray-200 dark:border-slate-700">
                                                                    Rs. {Number(s.monthly_fee).toLocaleString()}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>

                                                </table>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            ))}

                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <FileText className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                            <p className="text-gray-500 dark:text-gray-400">
                                No stop data found.
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </AppLayout>
    );
}
