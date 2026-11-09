import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FileText, Plus, Pencil, Trash2, Search, X, Calendar, Building2 } from 'lucide-react';

export default function FeeStructuresIndex({ structures, dropdownData, filters }) {
    const structureList = structures?.data || [];
    const [filterClass, setFilterClass] = useState(filters?.class_id || '');
    const [filterYear, setFilterYear] = useState(filters?.academic_year_id || '');
    const [filterStatus, setFilterStatus] = useState(filters?.status || '');

    const breadcrumbItems = [{ label: 'Dashboard', href: route('dashboard') }, { label: 'Finance & Fees', href: '#' }];

    const handleReset = () => {
        setFilterClass('');
        setFilterYear('');
        setFilterStatus('');
        router.get(route('fees.structures.index'), {}, { preserveState: true, preserveScroll: true });
    };

    const handleFilterChange = (key, value) => {
        if (key === 'class_id') setFilterClass(value);
        if (key === 'academic_year_id') setFilterYear(value);
        if (key === 'status') setFilterStatus(value);
        
        router.get(route('fees.structures.index'), { 
            class_id: filterClass, 
            academic_year_id: filterYear, 
            status: filterStatus, 
            [key]: value 
        }, { preserveState: true, preserveScroll: true });
    };

    const handleDelete = (id, info) => {
        if (confirm(`Are you sure you want to delete fee structure for ${info}?`)) {
            router.delete(route('fees.structures.destroy', id), { 
                preserveScroll: true,
            });
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-NP', { maximumFractionDigits: 2 }).format(amount || 0);
    };

    return (
        <AppLayout title="Fee Structures">
            <Head title="Fee Structure Management" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Finance & Fees" subTitle="Fee Structures" breadcrumbItems={breadcrumbItems} />
                    <Link href={route('fees.structures.create')} className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                        <Plus className="w-4 h-4 mr-1.5" /> Create Fee Structure
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <select 
                            value={filterClass} 
                            onChange={(e) => handleFilterChange('class_id', e.target.value)} 
                            className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm"
                        >
                            <option value="">All Classes</option>
                            {dropdownData?.classes?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                        <select 
                            value={filterYear} 
                            onChange={(e) => handleFilterChange('academic_year_id', e.target.value)} 
                            className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm"
                        >
                            <option value="">All Academic Years</option>
                            {dropdownData?.academicYears?.map(y => <option key={y.id} value={y.id}>{y.title}</option>)}
                        </select>
                        <select 
                            value={filterStatus} 
                            onChange={(e) => handleFilterChange('status', e.target.value)} 
                            className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm"
                        >
                            <option value="">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <button onClick={handleReset} className="w-full px-4 py-2 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg transition-colors text-sm flex items-center justify-center">
                            <X className="w-4 h-4 mr-1.5" /> Reset
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-gray-200 dark:border-slate-700">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Academic Year</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Class</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Fee Type</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Amount</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Due Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Status</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                                {structureList.map((structure) => (
                                    <tr key={structure.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-900 dark:text-white">{structure.academic_year?.title || 'N/A'}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <Building2 className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-900 dark:text-white">{structure.class?.name || 'N/A'}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-900 dark:text-white">{structure.fee_type?.name || 'N/A'}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <span className="inline-flex items-center px-2.5 py-1 text-sm font-bold rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-mono">
                                                Rs. {formatCurrency(structure.amount)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{structure.due_date || 'N/A'}</td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${
                                                structure.status === 'active' 
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                            }`}>
                                                {structure.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end space-x-1">
                                                <Link href={route('fees.structures.edit', structure.id)} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800 transition-colors">
                                                    <Pencil className="w-3.5 h-3.5" />
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(structure.id, `${structure.class?.name} - ${structure.fee_type?.name}`)} 
                                                    className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded border border-red-200 dark:border-red-800 transition-colors"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {structureList.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                            <FileText className="w-12 h-12 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                                            <p className="text-sm">No fee structures found</p>
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