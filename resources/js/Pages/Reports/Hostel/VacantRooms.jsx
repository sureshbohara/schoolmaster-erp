import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import Button from '@/Components/Button';
import { useState } from 'react';
import { Search, FileText, DoorOpen, Bed } from 'lucide-react';

export default function VacantRooms({ hostels, data, totalVacantRooms, totalVacantBeds, filters }) {
    const [hostelId, setHostelId] = useState(filters?.hostel_id || '');

    const handleGenerate = () => {
        router.get(route('reports.hostel.vacant-rooms'), { hostel_id: hostelId }, { preserveState: true });
    };

    return (
        <AppLayout title="Vacant Rooms">
            <Head title="Vacant Rooms" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Hostel Reports" subTitle="Vacant Rooms" breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }, { label: 'Reports', href: route('reports.index') }, { label: 'Hostel', href: route('reports.hostel.index') }]} />
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2"><Search className="w-4 h-4" /> Filter Data</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput label="Select Hostel" type="select" value={hostelId} onChange={setHostelId} options={[{ value: '', label: '-- All Hostels --' }, ...(hostels?.map(h => ({ value: h.id, label: h.name })) || [])]} />
            
                        <div className="flex items-end"><Button variant="primary" size="lg" onClick={handleGenerate} className="w-full"><Search className="w-4 h-4 mr-1.5" /> Generate Report</Button></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
                    {data.length > 0 && (
                        <div className="mb-4 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-2"><DoorOpen className="w-5 h-5 text-primary-600" /><h2 className="text-xl font-semibold text-gray-900 dark:text-white">Vacant Rooms</h2></div>
                            <div className="flex items-center gap-4">
                                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-lg"><span className="font-semibold">Rooms: {totalVacantRooms}</span></div>
                                <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-4 py-2 rounded-lg"><Bed className="w-4 h-4 inline mr-1" /><span className="font-bold">Vacant Beds: {totalVacantBeds}</span></div>
                            </div>
                        </div>
                    )}
                    {data.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead><tr className="bg-gray-100 dark:bg-slate-700 border-b-2 border-gray-300 dark:border-slate-600">
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">SN</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Hostel</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Room No</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Type</th>
                                    <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Total Beds</th>
                                    <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Vacant Beds</th>
                                    <th className="px-4 py-2 text-right text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Cost/Bed</th>
                                </tr></thead>
                                <tbody>
                                    {data.map((room, index) => (
                                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{index + 1}</td>
                                            <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700">{room.hostel_name}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{room.room_no}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 capitalize">{room.room_type}</td>
                                            <td className="px-4 py-2 text-sm text-center text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{room.total_beds}</td>
                                            <td className="px-4 py-2 text-sm text-center font-bold text-amber-600 dark:text-amber-400 border border-gray-200 dark:border-slate-700">{room.vacant_beds}</td>
                                            <td className="px-4 py-2 text-sm text-right text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">Rs. {Number(room.cost_per_bed).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (<div className="text-center py-12"><FileText className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" /><p className="text-gray-500 dark:text-gray-400">No vacant rooms found.</p></div>)}
                </div>
            </div>
        </AppLayout>
    );
}