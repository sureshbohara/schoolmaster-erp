
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import Button from '@/Components/Button';
import { useState } from 'react';
import { Search, FileText, Bus, Users } from 'lucide-react';

export default function VehicleAssignments({ vehicleTypes, data, totalVehicles, filters }) {
    const [vehicleTypeId, setVehicleTypeId] = useState(filters?.vehicle_type_id || '');

    const handleGenerate = () => {
        router.get(
            route('reports.transport.vehicle-assignments'),
            { vehicle_type_id: vehicleTypeId },
            { preserveState: true }
        );
    };

    const getStatusBadge = (status) => {
        const styles = {
            active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
            inactive: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
            maintenance: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
        };

        return styles[status?.toLowerCase()] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    };

    return (
        <AppLayout title="Vehicle Assignments">
            <Head title="Vehicle Assignments" />

            <div className="space-y-3">

                {/* Breadcrumb */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb
                        title="Transport Reports"
                        subTitle="Vehicle Assignments"
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
                            label="Vehicle Type"
                            type="select"
                            value={vehicleTypeId}
                            onChange={setVehicleTypeId}
                            options={[
                                { value: '', label: '-- All Types --' },
                                ...(vehicleTypes?.map(v => ({
                                    value: v.id,
                                    label: v.name
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
                                <Bus className="w-5 h-5 text-primary-600" />
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Vehicle Assignments
                                </h2>
                            </div>

                            <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg">
                                <Users className="w-4 h-4" />
                                <span className="font-semibold">
                                    Total: {totalVehicles}
                                </span>
                            </div>
                        </div>
                    )}

                    {data.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">

                                <thead>
                                    <tr className="bg-gray-100 dark:bg-slate-700 border-b-2 border-gray-300 dark:border-slate-600">
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">
                                            SN
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">
                                            Vehicle No
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">
                                            Model
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">
                                            Type
                                        </th>
                                        <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">
                                            Capacity
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">
                                            Driver
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">
                                            Driver Phone
                                        </th>
                                        <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">
                                            Routes
                                        </th>
                                        <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">
                                            Students
                                        </th>
                                        <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {data.map((v, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-gray-50 dark:hover:bg-slate-700/50"
                                        >
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">
                                                {index + 1}
                                            </td>

                                            <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700">
                                                {v.vehicle_no}
                                            </td>

                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">
                                                {v.model || 'N/A'}
                                            </td>

                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">
                                                {v.vehicle_type}
                                            </td>

                                            <td className="px-4 py-2 text-sm text-center text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">
                                                {v.capacity}
                                            </td>

                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">
                                                {v.driver_name}
                                            </td>

                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">
                                                {v.driver_phone}
                                            </td>

                                            <td className="px-4 py-2 text-sm text-center font-bold text-blue-600 dark:text-blue-400 border border-gray-200 dark:border-slate-700">
                                                {v.total_routes}
                                            </td>

                                            <td className="px-4 py-2 text-sm text-center font-bold text-cyan-600 dark:text-cyan-400 border border-gray-200 dark:border-slate-700">
                                                {v.total_students}
                                            </td>

                                            <td className="px-4 py-2 text-center border border-gray-200 dark:border-slate-700">
                                                <span className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-md capitalize ${getStatusBadge(v.status)}`}>
                                                    {v.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <FileText className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                            <p className="text-gray-500 dark:text-gray-400">
                                No vehicles found.
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </AppLayout>
    );
}
