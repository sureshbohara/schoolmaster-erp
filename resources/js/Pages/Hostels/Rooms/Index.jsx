import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import Modal from '@/Components/Modal';
import FormInput from '@/Components/Form/FormInput';
import Button from '@/Components/Button';
import { useState } from 'react';
import { useRoomForm } from '@/Hooks/useRoomForm';
import { ROOM_TYPE_OPTIONS, STATUS_OPTIONS } from '@/Services/roomService';
import { DoorClosed, Plus, Pencil, Trash2, Search, X } from 'lucide-react';

export default function RoomsIndex({ rooms, hostels }) {
    const list = rooms?.data || [];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [search, setSearch] = useState('');

    const { data, setData, processing, errors, submit, reset } = useRoomForm(
        editing, !!editing, () => { setIsModalOpen(false); setEditing(null); }
    );

    const filtered = list.filter(r => r.room_no.toLowerCase().includes(search.toLowerCase()) || r.hostel?.name?.toLowerCase().includes(search.toLowerCase()));

    return (
        <AppLayout title="Hostel Rooms">
            <Head title="Hostel Rooms" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Hostel" subTitle="Rooms" breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }, { label: 'Hostels', href: route('hostels.index') }]} />
                    <Button variant="primary" size="md" onClick={() => { setEditing(null); setIsModalOpen(true); }}>
                        <Plus className="w-4 h-4 mr-1.5" /> Add Room
                    </Button>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <div className="relative max-w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Search room or hostel..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-10 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm" />
                        {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>}
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-gray-200 dark:border-slate-700">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Room No</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Hostel</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Type</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Beds</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Cost/Bed</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                            {filtered.map((r) => (
                                <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white flex items-center gap-2"><DoorClosed className="w-4 h-4 text-gray-400" /> {r.room_no}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{r.hostel?.name || 'N/A'}</td>
                                    <td className="px-4 py-3 text-sm capitalize text-gray-600 dark:text-gray-300">{r.room_type}</td>
                                    <td className="px-4 py-3 text-center text-sm"><span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1 rounded-md text-xs font-bold">{r.allocations_count || 0} / {r.no_of_beds}</span></td>
                                    <td className="px-4 py-3 text-center text-sm font-medium">Rs. {r.cost_per_bed}</td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end space-x-1">
                                            <button onClick={() => { setEditing(r); setIsModalOpen(true); }} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800"><Pencil className="w-3.5 h-3.5" /></button>
                                            <button onClick={() => confirm(`Delete room "${r.room_no}"?`) && router.delete(route('hostels.rooms.destroy', r.id), { preserveScroll: true })} className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded border border-red-200 dark:border-red-800"><Trash2 className="w-3.5 h-3.5" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && <tr><td colSpan="6" className="px-4 py-8 text-center text-gray-500">No rooms found</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal key={editing ? `edit-${editing.id}` : 'new'} isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditing(null); reset(); }} title={editing ? 'Edit Room' : 'Add Room'} size="lg">
                <form onSubmit={submit} className="space-y-4">
                    <FormInput label="Hostel" type="select" value={data.hostel_id} onChange={(v) => setData('hostel_id', v)} error={errors.hostel_id} options={[{ value: '', label: '-- Select Hostel --' }, ...(hostels?.map(h => ({ value: h.id, label: h.name })) || [])]} required />
                    <div className="grid grid-cols-2 gap-4">
                        <FormInput label="Room No" value={data.room_no} onChange={(v) => setData('room_no', v)} error={errors.room_no} required />
                        <FormInput label="Room Type" type="select" value={data.room_type} onChange={(v) => setData('room_type', v)} error={errors.room_type} options={ROOM_TYPE_OPTIONS} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormInput label="No. of Beds" type="number" value={data.no_of_beds} onChange={(v) => setData('no_of_beds', v)} error={errors.no_of_beds} required />
                        <FormInput label="Cost per Bed (Rs.)" type="number" value={data.cost_per_bed} onChange={(v) => setData('cost_per_bed', v)} error={errors.cost_per_bed} />
                    </div>
                    <FormInput label="Status" type="select" value={data.status} onChange={(v) => setData('status', v)} error={errors.status} options={STATUS_OPTIONS} required />
                    <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-slate-700">
                        <Button type="button" variant="secondary" onClick={() => { setIsModalOpen(false); setEditing(null); }}>Cancel</Button>
                        <Button type="submit" variant="primary" disabled={processing}>{processing ? 'Saving...' : 'Save'}</Button>
                    </div>
                </form>
            </Modal>
        </AppLayout>
    );
}