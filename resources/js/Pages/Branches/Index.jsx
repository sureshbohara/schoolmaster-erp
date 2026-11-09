import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
    GitBranch, Plus, Pencil, Trash2, Search, X, 
    Building2, Users, GraduationCap, Phone, Mail 
} from 'lucide-react';

export default function BranchesIndex({ branches }) {
    const branchList = branches?.data || [];
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOrg, setFilterOrg] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    const breadcrumbItems = [
        { label: 'Dashboard', href: route('dashboard') },
        { label: 'Administration', href: '#' },
    ];

    const organizations = [...new Set(branchList.map(b => b.organization?.name).filter(Boolean))];
    const statuses = [...new Set(branchList.map(b => b.status))];

    const filteredBranches = branchList.filter(branch => {
        const matchesSearch = 
            branch.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            branch.code?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesOrg = !filterOrg || branch.organization?.name === filterOrg;
        const matchesStatus = !filterStatus || branch.status === filterStatus;
        return matchesSearch && matchesOrg && matchesStatus;
    });

    const handleReset = () => { setSearchTerm(''); setFilterOrg(''); setFilterStatus(''); };

    const handleStatusToggle = (branchId, currentStatus) => {
        router.post(route('branches.status', branchId), { 
            status: currentStatus === 'active' ? 'inactive' : 'active' 
        }, { preserveScroll: true });
    };

    const handleDelete = (branchId, branchName) => {
        if (confirm(`Are you sure you want to delete "${branchName}"?`)) {
            router.delete(route('branches.destroy', branchId), {
                preserveScroll: true,
                onError: (errors) => toast.error(Object.values(errors)[0] || 'Failed to delete', { icon: '❌' })
            });
        }
    };

    return (
        <AppLayout title="Branches">
            <Head title="Branch Management" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Administration" subTitle="Branches" breadcrumbItems={breadcrumbItems} />
                    <Link href={route('branches.create')} className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                        <Plus className="w-4 h-4 mr-1.5" /> Create New
                    </Link>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <div className="grid grid-cols-4 gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type="text" placeholder="Search by name or code..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm" />
                        </div>
                        <div className="relative">
                            <select value={filterOrg} onChange={(e) => setFilterOrg(e.target.value)} className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm appearance-none cursor-pointer">
                                <option value="">All Organizations</option>
                                {organizations.map(org => <option key={org} value={org}>{org}</option>)}
                            </select>
                        </div>
                        <div className="relative">
                            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm appearance-none cursor-pointer">
                                <option value="">All Status</option>
                                {statuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                            </select>
                        </div>
                        <button onClick={handleReset} className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors text-sm flex items-center justify-center">
                            <X className="w-4 h-4 mr-1.5" /> Reset
                        </button>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-gray-200 dark:border-slate-700">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Branch</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Organization</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Contact</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Stats</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Status</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                                {filteredBranches.map((branch) => (
                                    <tr key={branch.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="font-medium text-gray-900 dark:text-white">{branch.name}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">Code: {branch.code}</div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800">
                                                <Building2 className="w-3 h-3 mr-1" />
                                                {branch.organization?.name || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            {branch.email && <div className="flex items-center text-xs text-gray-600 dark:text-gray-300 mb-1"><Mail className="w-3 h-3 mr-1 text-gray-400" />{branch.email}</div>}
                                            {branch.phone && <div className="flex items-center text-xs text-gray-600 dark:text-gray-300"><Phone className="w-3 h-3 mr-1 text-gray-400" />{branch.phone}</div>}
                                            {!branch.email && !branch.phone && <span className="text-xs text-gray-400">N/A</span>}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center text-xs text-gray-600 dark:text-gray-300 mb-1">
                                                <Users className="w-3.5 h-3.5 mr-1.5 text-gray-400" /> {branch.users_count || 0} Users
                                            </div>
                                            <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                                                <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-gray-400" /> {branch.students_count || 0} Students
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <button onClick={() => handleStatusToggle(branch.id, branch.status)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${branch.status === 'active' ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
                                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${branch.status === 'active' ? 'translate-x-6' : 'translate-x-1'}`} />
                                            </button>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end space-x-1">
                                                <Link href={route('branches.edit', branch.id)} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800 transition-colors"><Pencil className="w-3.5 h-3.5" /></Link>
                                                <button onClick={() => handleDelete(branch.id, branch.name)} className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded border border-red-200 dark:border-red-800 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredBranches.length === 0 && (
                                    <tr><td colSpan="6" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"><GitBranch className="w-12 h-12 mx-auto mb-2 text-gray-300 dark:text-gray-600" /><p className="text-sm">No branches found</p></td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}