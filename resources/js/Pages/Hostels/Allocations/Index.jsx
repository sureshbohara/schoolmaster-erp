import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import Modal from '@/Components/Modal';
import FormInput from '@/Components/Form/FormInput';
import Button from '@/Components/Button';
import { useState, useMemo } from 'react';
import { useAllocationForm } from '@/Hooks/useAllocationForm';
import { STATUS_OPTIONS } from '@/Services/allocationService';
import { Bed, Plus, Pencil, Trash2, Search, X, LogOut } from 'lucide-react';

export default function AllocationsIndex({ allocations, students, hostels, rooms }) {
    const list = allocations?.data || [];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [search, setSearch] = useState('');

    const { data, setData, processing, errors, submit, reset } = useAllocationForm(
        editing, !!editing, () => { setIsModalOpen(false); setEditing(null); }
    );


    const availableRooms = useMemo(() => {
        return rooms?.filter(r => String(r.hostel_id) === String(data.hostel_id)) || [];
    }, [rooms, data.hostel_id]);

    const handleDelete = (id, name) => {
        if (confirm(`Remove allocation for "${name}"?`)) router.delete(route('hostels.allocations.destroy', id), { preserveScroll: true });
    };

    const handleDischarge = (id, name) => {
        if (confirm(`Discharge "${name}" from hostel?`)) {
            router.post(route('hostels.allocations.discharge', id), {}, { preserveScroll: true });
        }
    };

    const filtered = list.filter(a => a.student?.full_name?.toLowerCase().includes(search.toLowerCase()) || a.hostel?.name?.toLowerCase().includes(search.toLowerCase()));

    return (
        <AppLayout title="Hostel Allocations">
            <Head title="Hostel Allocations" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Hostel" subTitle="Allocations" breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }, { label: 'Hostels', href: route('hostels.index') }]} />
                    <Button variant="primary" size="md" onClick={() => { setEditing(null); setIsModalOpen(true); }}>
                        <Plus className="w-4 h-4 mr-1.5" /> Allocate Hostel
                    </Button>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <div className="relative max-w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Search student or hostel..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-10 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm" />
                        {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>}
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-gray-200 dark:border-slate-700">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Student</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Hostel & Room</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Bed No</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Monthly Fee</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Status</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                            {filtered.map((a) => (
                                <tr key={a.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                    <td className="px-4 py-3">
                                        <div className="font-medium text-gray-900 dark:text-white">{a.student?.full_name}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">{a.student?.admission_no}</div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                                        <div>{a.hostel?.name}</div>
                                        <div className="text-xs text-gray-500">Room: {a.room?.room_no}</div>
                                    </td>
                                    <td className="px-4 py-3 text-center text-sm font-medium">{a.bed_no}</td>
                                    <td className="px-4 py-3 text-center text-sm font-medium">Rs. {a.monthly_fee}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${a.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                                            {a.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end space-x-1">
                                            {a.status === 'active' && (
                                                <button onClick={() => handleDischarge(a.id, a.student?.full_name)} className="p-1.5 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded border border-amber-200 dark:border-amber-800" title="Discharge"><LogOut className="w-3.5 h-3.5" /></button>
                                            )}
                                            <button onClick={() => { setEditing(a); setIsModalOpen(true); }} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800"><Pencil className="w-3.5 h-3.5" /></button>
                                            <button onClick={() => handleDelete(a.id, a.student?.full_name)} className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded border border-red-200 dark:border-red-800"><Trash2 className="w-3.5 h-3.5" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && <tr><td colSpan="6" className="px-4 py-8 text-center text-gray-500">No allocations found</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal key={editing ? `edit-${editing.id}` : 'new'} isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditing(null); reset(); }} title={editing ? 'Edit Allocation' : 'Allocate Hostel'} size="lg">
                <form onSubmit={submit} className="space-y-4">

                    <div className="grid grid-cols-2 gap-4">
                    <FormInput label="Student" type="select" value={data.student_id} onChange={(v) => setData('student_id', v)} error={errors.student_id} options={[{ value: '', label: '-- Select Student --' }, ...(students?.map(s => ({ value: s.id, label: `${s.first_name} ${s.last_name} (${s.admission_no})` })) || [])]} required />
                    
                    <FormInput label="Hostel" type="select" value={data.hostel_id} onChange={(v) => { setData('hostel_id', v); setData('room_id', ''); }} error={errors.hostel_id} options={[{ value: '', label: '-- Select Hostel --' }, ...(hostels?.map(h => ({ value: h.id, label: h.name })) || [])]} required />
                    </div>
                    <FormInput label="Room" type="select" value={data.room_id} onChange={(v) => setData('room_id', v)} error={errors.room_id} options={[{ value: '', label: '-- Select Room --' }, ...availableRooms.map(r => ({ value: r.id, label: `${r.room_no} (${r.room_type}) - Rs.${r.cost_per_bed}` }))]} required disabled={!data.hostel_id} />
                    
                    <div className="grid grid-cols-2 gap-4">
                        <FormInput label="Bed No" value={data.bed_no} onChange={(v) => setData('bed_no', v)} error={errors.bed_no} placeholder="e.g., A1" required />
                        <FormInput label="Monthly Fee (Rs.)" type="number" value={data.monthly_fee} onChange={(v) => setData('monthly_fee', v)} error={errors.monthly_fee} placeholder="0.00" />
                    </div>
                    
                    <FormInput label="Allocation Date" type="date" value={data.allocation_date} onChange={(v) => setData('allocation_date', v)} error={errors.allocation_date} required />
                    
                    {!editing && <FormInput label="Status" type="select" value={data.status} onChange={(v) => setData('status', v)} error={errors.status} options={STATUS_OPTIONS} required />}

                    <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-slate-700">
                        <Button type="button" variant="secondary" onClick={() => { setIsModalOpen(false); setEditing(null); }}>Cancel</Button>
                        <Button type="submit" variant="primary" disabled={processing}>{processing ? 'Saving...' : 'Save'}</Button>
                    </div>
                </form>
            </Modal>
        </AppLayout>
    );
}