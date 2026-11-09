import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import Button from '@/Components/Button'; 
import { useState } from 'react';
import { Search, FileText, Calendar, Users } from 'lucide-react';

export default function StaffLeaveSummary({ departments, leaves, totalLeaves, filters }) {
    const [departmentId, setDepartmentId] = useState(filters?.department_id || '');
    const [status, setStatus] = useState(filters?.status || 'all');
    const [fromDate, setFromDate] = useState(filters?.from_date || '');
    const [toDate, setToDate] = useState(filters?.to_date || '');

    const handleGenerate = () => {
        router.get(route('reports.staff.leave-summary'), { 
            department_id: departmentId,
            status: status,
            from_date: fromDate,
            to_date: toDate
        }, { preserveState: true });
    };

    const getStatusBadge = (status) => {
        const styles = {
            approved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
            rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
        };
        return styles[status?.toLowerCase()] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    };

    return (
        <AppLayout title="Leave Summary Report">
            <Head title="Leave Summary Report" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb 
                        title="Staff Reports" 
                        subTitle="Leave Summary" 
                        breadcrumbItems={[
                            { label: 'Dashboard', href: route('dashboard') }, 
                            { label: 'Reports', href: route('reports.index') },
                            { label: 'Staff', href: route('reports.staff.index') }
                        ]} 
                    />
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                        <Search className="w-4 h-4" /> Filter Data
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <FormInput 
                            label="Department" 
                            type="select" 
                            value={departmentId} 
                            onChange={(v) => setDepartmentId(v)} 
                            options={[{ value: '', label: '-- All Departments --' }, ...(departments?.map(d => ({ value: d.id, label: d.name })) || [])]} 
                        />
                        <FormInput 
                            label="Status" 
                            type="select" 
                            value={status} 
                            onChange={(v) => setStatus(v)} 
                            options={[
                                { value: 'all', label: '-- All Status --' },
                                { value: 'approved', label: '✅ Approved' },
                                { value: 'pending', label: '⏳ Pending' },
                                { value: 'rejected', label: '❌ Rejected' },
                            ]} 
                        />
                        <FormInput label="From Date" type="date" value={fromDate} onChange={(v) => setFromDate(v)} />
                        <FormInput label="To Date" type="date" value={toDate} onChange={(v) => setToDate(v)} />
                        <div className="flex items-end">
                            <Button variant="primary" size="lg" onClick={handleGenerate} className="w-full">
                                <Search className="w-4 h-4 mr-1.5" /> Generate Report
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
                    {leaves.length > 0 && (
                        <div className="mb-4 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-primary-600" />
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Leave Applications</h2>
                            </div>
                            <div className="flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-4 py-2 rounded-lg">
                                <Users className="w-4 h-4" />
                                <span className="font-semibold">Total: {totalLeaves}</span>
                            </div>
                        </div>
                    )}

                    {leaves.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-slate-700 border-b-2 border-gray-300 dark:border-slate-600">
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">SN</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Employee ID</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Name</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Department</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Leave Type</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Start Date</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">End Date</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Reason</th>
                                        <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaves.map((leave, index) => (
                                        <tr key={leave.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{index + 1}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{leave.employee?.employee_id || 'N/A'}</td>
                                            <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700">
                                                {leave.employee?.first_name} {leave.employee?.last_name}
                                            </td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{leave.department_name}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 capitalize">{leave.leave_type}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">
                                                {leave.start_date ? new Date(leave.start_date).toLocaleDateString() : 'N/A'}
                                            </td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">
                                                {leave.end_date ? new Date(leave.end_date).toLocaleDateString() : 'N/A'}
                                            </td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 max-w-xs truncate">{leave.reason || 'N/A'}</td>
                                            <td className="px-4 py-2 text-center border border-gray-200 dark:border-slate-700">
                                                <span className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-md capitalize ${getStatusBadge(leave.status)}`}>
                                                    {leave.status || 'Unknown'}
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
                            <p className="text-gray-500 dark:text-gray-400">No leave records found.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}