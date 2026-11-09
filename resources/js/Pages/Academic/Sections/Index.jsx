import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Layers, Plus, Pencil, Trash2, Search, Building2 } from 'lucide-react';

export default function SectionsIndex({ sections }) {
    const list = sections?.data || [];
    const [searchTerm, setSearchTerm] = useState('');

    const filtered = list.filter(item => item.name?.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleDelete = (id, name) => {
        if (confirm(`Delete "${name}"?`)) {
            router.delete(route('academic.sections.destroy', id), { preserveScroll: true });
        }
    };

    return (
        <AppLayout title="Sections">
            <Head title="Section Management" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Academic" subTitle="Sections" breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }, { label: 'Academic', href: '#' }]} />
                    <Link href={route('academic.sections.create')} className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                        <Plus className="w-4 h-4 mr-1.5" /> Create New Section
                    </Link>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">

                     <div className="relative col-span-12 sm:col-span-12">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type="text" placeholder="Search by class name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm" />
                    </div>

                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-gray-200 dark:border-slate-700">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Section</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Class</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Room No</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Capacity</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Status</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                            {filtered.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white flex items-center gap-2"><Layers className="w-4 h-4 text-gray-400" /> {item.name}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{item.class?.name || 'N/A'}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{item.room_no || '-'}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{item.capacity || '-'}</td>
                                    <td className="px-4 py-3"><span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${item.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-gray-100 text-gray-800'}`}>{item.status}</span></td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end space-x-1">
                                            <Link href={route('academic.sections.edit', item.id)} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800"><Pencil className="w-3.5 h-3.5" /></Link>
                                            <button onClick={() => handleDelete(item.id, item.name)} className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded border border-red-200 dark:border-red-800"><Trash2 className="w-3.5 h-3.5" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && <tr><td colSpan="6" className="px-4 py-8 text-center text-gray-500">No sections found</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}