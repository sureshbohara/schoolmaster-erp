import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Wallet, Plus, Pencil, Trash2, Search, Building2 } from 'lucide-react';

export default function SalaryStructuresIndex({ structures }) {
    const structureList = structures?.data || [];
    const [searchTerm, setSearchTerm] = useState('');

    const breadcrumbItems = [{ label: 'Dashboard', href: route('dashboard') }, { label: 'HR', href: '#' }];

    const filtered = structureList.filter(s => 
        s.designation?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id, name) => {
        if (confirm(`Delete salary structure for "${name}"?`)) {
            router.delete(route('hr.salary-structures.destroy', id), { preserveScroll: true });
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-NP', { maximumFractionDigits: 2 }).format(amount || 0);
    };

    return (
        <AppLayout title="Salary Structures">
            <Head title="Salary Structure Management" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Human Resource" subTitle="Salary Structures" breadcrumbItems={breadcrumbItems} />
                    <Link href={route('hr.salary-structures.create')} className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                        <Plus className="w-4 h-4 mr-1.5" /> Create Structure
                    </Link>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Search by designation..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm" />
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-gray-200 dark:border-slate-700">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Designation</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Basic</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Allowance</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Medical</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Housing</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Transport</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Gross Salary</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                                {filtered.map((s) => (
                                    <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <Building2 className="w-4 h-4 text-gray-400" />
                                                <span className="font-medium text-gray-900 dark:text-white">{s.designation?.name || 'N/A'}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-300 font-mono">{formatCurrency(s.basic)}</td>
                                        <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-300 font-mono">{formatCurrency(s.allowance)}</td>
                                        <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-300 font-mono">{formatCurrency(s.medical)}</td>
                                        <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-300 font-mono">{formatCurrency(s.housing)}</td>
                                        <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-300 font-mono">{formatCurrency(s.transport)}</td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-mono">
                                                <Wallet className="w-3 h-3 mr-1" />
                                                {formatCurrency(s.gross_salary)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end space-x-1">
                                                <Link href={route('hr.salary-structures.edit', s.id)} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800 transition-colors">
                                                    <Pencil className="w-3.5 h-3.5" />
                                                </Link>
                                                <button onClick={() => handleDelete(s.id, s.designation?.name)} className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded border border-red-200 dark:border-red-800 transition-colors">
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filtered.length === 0 && (
                                    <tr>
                                        <td colSpan="8" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                            <Wallet className="w-12 h-12 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                                            <p className="text-sm">No salary structures found</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}