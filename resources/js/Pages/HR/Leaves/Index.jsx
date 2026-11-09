import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Calendar, Plus, Trash2, Search, X, CheckCircle, XCircle, FileText, User } from 'lucide-react';

export default function LeavesIndex({ applications, dropdownData, filters }) {
    const leaveList = applications?.data || [];
    const [filterEmployee, setFilterEmployee] = useState(filters?.employee_id || '');
    const [filterStatus, setFilterStatus] = useState(filters?.status || '');

    const breadcrumbItems = [{ label: 'Dashboard', href: route('dashboard') }, { label: 'HR', href: '#' }];

    const handleReset = () => {
        setFilterEmployee('');
        setFilterStatus('');
        router.get(route('hr.leaves.index'), {}, { preserveState: true, preserveScroll: true });
    };

    const handleFilterChange = (key, value) => {
        if (key === 'employee_id') setFilterEmployee(value);
        if (key === 'status') setFilterStatus(value);
        
        router.get(route('hr.leaves.index'), { employee_id: filterEmployee, status: filterStatus, [key]: value }, { preserveState: true, preserveScroll: true });
    };

    const handleAction = (action, leaveId) => {
        const confirmMsg = action === 'approve' ? 'Approve this leave?' : 'Reject this leave?';
        if (confirm(confirmMsg)) {
            router.post(route(`hr.leaves.${action}`, leaveId), {}, { preserveScroll: true });
        }
    };

    const handleDelete = (leaveId) => {
        if (confirm('Are you sure you want to delete this application?')) {
            router.delete(route('hr.leaves.destroy', leaveId), { preserveScroll: true });
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
            approved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
            rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
        };
        return `inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${styles[status] || styles.pending}`;
    };

    return (
        <AppLayout title="Leave Applications">
            <Head title="Leave Management" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Human Resource" subTitle="Leave Applications" breadcrumbItems={breadcrumbItems} />
                    <Link href={route('hr.leaves.create')} className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                        <Plus className="w-4 h-4 mr-1.5" /> New Application
                    </Link>
                </div>

             
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">

                    <div className="grid grid-cols-3 gap-3">

                         <div className="relative">

                        <select value={filterEmployee} onChange={(e) => handleFilterChange('employee_id', e.target.value)} className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm">
                            <option value="">All Employees</option>
                            {dropdownData?.employees?.map(e => <option key={e.id} value={e.id}>{e.first_name} {e.last_name} ({e.employee_id})</option>)}
                        </select>
                    </div>

                     <div className="relative">

                        <select value={filterStatus} onChange={(e) => handleFilterChange('status', e.target.value)} className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm">
                            <option value="">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>

                    </div>

                     <div className="relative">

                        <button onClick={handleReset} className="w-full px-4 py-2 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg transition-colors text-sm flex items-center justify-center">
                            <X className="w-4 h-4 mr-1.5" /> Reset
                        </button>
                    </div>

                    </div>
                </div>

                {/* Table */}
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-gray-200 dark:border-slate-700">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Employee</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Leave Type</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Duration</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Reason</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Status</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                                {leaveList.map((leave) => (
                                    <tr key={leave.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-gray-400" />
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-white text-sm">{leave.employee?.full_name}</div>
                                                    <div className="text-xs text-gray-500 font-mono">{leave.employee?.employee_id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{leave.leave_type?.name || 'N/A'}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                                {leave.start_date} to {leave.end_date}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate" title={leave.reason}>{leave.reason}</td>
                                        <td className="px-4 py-3">
                                            <span className={getStatusBadge(leave.status)}>
                                                {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end space-x-1">
                                                {leave.status === 'pending' && (
                                                    <>
                                                        <button onClick={() => handleAction('approve', leave.id)} className="p-1.5 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded border border-green-200 dark:border-green-800 transition-colors" title="Approve">
                                                            <CheckCircle className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button onClick={() => handleAction('reject', leave.id)} className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded border border-red-200 dark:border-red-800 transition-colors" title="Reject">
                                                            <XCircle className="w-3.5 h-3.5" />
                                                        </button>
                                                    </>
                                                )}
                                                {leave.attachment_url && (
                                                    <a href={leave.attachment_url} target="_blank" rel="noopener noreferrer" className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800 transition-colors" title="View Attachment">
                                                        <FileText className="w-3.5 h-3.5" />
                                                    </a>
                                                )}
                                                <button onClick={() => handleDelete(leave.id)} className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded border border-red-200 dark:border-red-800 transition-colors" title="Delete">
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {leaveList.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                            <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                                            <p className="text-sm">No leave applications found</p>
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