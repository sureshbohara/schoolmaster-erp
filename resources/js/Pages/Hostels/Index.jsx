import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import Modal from '@/Components/Modal';
import FormInput from '@/Components/Form/FormInput';
import Button from '@/Components/Button';
import { useState } from 'react';
import { useHostelForm } from '@/Hooks/useHostelForm'; 
import { HOSTEL_TYPE_OPTIONS, STATUS_OPTIONS } from '@/Services/hostelService';
import { Home, Plus, Pencil, Trash2, Search, X } from 'lucide-react';

export default function HostelsIndex({ hostels }) {
    const list = hostels?.data || [];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [search, setSearch] = useState('');

    const { data, setData, processing, errors, submit, reset } = useHostelForm(
        editing, !!editing, () => { setIsModalOpen(false); setEditing(null); }
    );

    const filtered = list.filter(h => h.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <AppLayout title="Hostels">
            <Head title="Hostels" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Hostel" subTitle="Hostels List" breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }, { label: 'Hostels', href: route('hostels.index') }]} />
                    <Button variant="primary" size="md" onClick={() => { setEditing(null); setIsModalOpen(true); }}>
                        <Plus className="w-4 h-4 mr-1.5" /> Add Hostel
                    </Button>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <div className="relative max-w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Search hostel..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-10 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm" />
                        {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>}
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-gray-200 dark:border-slate-700">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Hostel Name</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Type</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Total Rooms</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Status</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                            {filtered.map((h) => (
                                <tr key={h.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white flex items-center gap-2"><Home className="w-4 h-4 text-gray-400" /> {h.name}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 capitalize">{h.type}</td>
                                    <td className="px-4 py-3 text-center text-sm"><span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1 rounded-md text-xs font-bold">{h.rooms_count || 0}</span></td>
                                    <td className="px-4 py-3 text-center"><span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${h.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>{h.status}</span></td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end space-x-1">
                                            <button onClick={() => { setEditing(h); setIsModalOpen(true); }} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800"><Pencil className="w-3.5 h-3.5" /></button>
                                            <button onClick={() => confirm(`Delete "${h.name}"?`) && router.delete(route('hostels.destroy', h.id), { preserveScroll: true })} className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded border border-red-200 dark:border-red-800"><Trash2 className="w-3.5 h-3.5" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && <tr><td colSpan="5" className="px-4 py-8 text-center text-gray-500">No hostels found</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal key={editing ? `edit-${editing.id}` : 'new'} isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditing(null); reset(); }} title={editing ? 'Edit Hostel' : 'Add Hostel'} size="lg">
                <form onSubmit={submit} className="space-y-4">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput label="Hostel Name" value={data.name} onChange={(v) => setData('name', v)} error={errors.name} required />

                    <FormInput label="Type" type="select" value={data.type} onChange={(v) => setData('type', v)} error={errors.type} options={HOSTEL_TYPE_OPTIONS} required />
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput label="Address" value={data.address} onChange={(v) => setData('address', v)} error={errors.address} />
                    <FormInput label="Status" type="select" value={data.status} onChange={(v) => setData('status', v)} error={errors.status} options={STATUS_OPTIONS} required />
                   </div>
                    <FormInput label="Introduction" type="textarea" value={data.intro} onChange={(v) => setData('intro', v)} error={errors.intro} />

                    
                    <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-slate-700">

                        <Button type="button" variant="secondary" onClick={() => { setIsModalOpen(false); setEditing(null); }}>Cancel</Button>

                        <Button type="submit" variant="primary" disabled={processing}>{processing ? 'Saving...' : 'Save'}</Button>

                    </div>
                </form>
            </Modal>
        </AppLayout>
    );
}