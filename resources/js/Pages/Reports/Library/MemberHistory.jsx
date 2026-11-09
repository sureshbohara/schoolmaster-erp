import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import Button from '@/Components/Button';
import { useState } from 'react';
import { Search, FileText, History, Users } from 'lucide-react';

export default function MemberHistory({ issues, totalIssues, filters }) {
    const [memberType, setMemberType] = useState(filters?.member_type || '');
    const [memberId, setMemberId] = useState(filters?.member_id || '');
    const [status, setStatus] = useState(filters?.status || '');

    const handleGenerate = () => {
        router.get(route('reports.library.member-history'), { member_type: memberType, member_id: memberId, status: status }, { preserveState: true });
    };

    const getStatusBadge = (issue) => {
        if (issue.return_date) return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
        if (issue.due_date && new Date(issue.due_date) < new Date()) return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    };

    const getStatusText = (issue) => {
        if (issue.return_date) return 'Returned';
        if (issue.due_date && new Date(issue.due_date) < new Date()) return 'Overdue';
        return 'Not Returned';
    };

    return (
        <AppLayout title="Member Issue History">
            <Head title="Member Issue History" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Library Reports" subTitle="Member Issue History" breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }, { label: 'Reports', href: route('reports.index') }, { label: 'Library', href: route('reports.library.index') }]} />
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2"><Search className="w-4 h-4" /> Filter Data</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <FormInput label="Member Type" type="select" value={memberType} onChange={setMemberType} options={[{ value: '', label: '-- All Members --' }, { value: 'student', label: '👨‍🎓 Students' }, { value: 'employee', label: '👨‍💼 Employees' }]} />
                        <FormInput label="Member ID (Admission/Employee)" type="text" value={memberId} onChange={setMemberId} placeholder="e.g., STD-001" />
                        <FormInput label="Status" type="select" value={status} onChange={setStatus} options={[{ value: '', label: '-- All Status --' }, { value: 'returned', label: '✅ Returned' }, { value: 'not_returned', label: '⏳ Not Returned' }, { value: 'overdue', label: '❌ Overdue' }]} />
                        <div className="flex items-end"><Button variant="primary" size="lg" onClick={handleGenerate} className="w-full"><Search className="w-4 h-4 mr-1.5" /> Generate Report</Button></div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
                    {issues.length > 0 && (
                        <div className="mb-4 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-2"><History className="w-5 h-5 text-primary-600" /><h2 className="text-xl font-semibold text-gray-900 dark:text-white">Issue History</h2></div>
                            <div className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-lg"><Users className="w-4 h-4" /><span className="font-semibold">Total: {totalIssues}</span></div>
                        </div>
                    )}
                    {issues.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead><tr className="bg-gray-100 dark:bg-slate-700 border-b-2 border-gray-300 dark:border-slate-600">
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">SN</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Book</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Member</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Type</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Issue Date</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Due Date</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Return Date</th>
                                    <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Status</th>
                                </tr></thead>
                                <tbody>
                                    {issues.map((issue, index) => {
                                        const member = issue.member_type === 'student' ? issue.student : issue.employee;
                                        const memberName = member ? `${member.first_name} ${member.last_name}` : 'N/A';
                                        const memberId = issue.member_type === 'student' ? member?.admission_no : member?.employee_id;
                                        return (
                                            <tr key={issue.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{index + 1}</td>
                                                <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700">
                                                    {issue.book?.title || 'N/A'} <br/>
                                                    <span className="text-xs text-gray-500">({issue.book?.book_no})</span>
                                                </td>
                                                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">
                                                    {memberName} <br/>
                                                    <span className="text-xs text-gray-500">({memberId || 'N/A'})</span>
                                                </td>
                                                <td className="px-4 py-2 text-center border border-gray-200 dark:border-slate-700">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-bold rounded-md ${issue.member_type === 'student' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'}`}>
                                                        {issue.member_type === 'student' ? '👨‍🎓 Student' : '👨‍💼 Employee'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{issue.issue_date ? new Date(issue.issue_date).toLocaleDateString() : 'N/A'}</td>
                                                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{issue.due_date ? new Date(issue.due_date).toLocaleDateString() : 'N/A'}</td>
                                                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{issue.return_date ? new Date(issue.return_date).toLocaleDateString() : '—'}</td>
                                                <td className="px-4 py-2 text-center border border-gray-200 dark:border-slate-700">
                                                    <span className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-md ${getStatusBadge(issue)}`}>{getStatusText(issue)}</span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (<div className="text-center py-12"><FileText className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" /><p className="text-gray-500 dark:text-gray-400">No issue history found.</p></div>)}
                </div>
            </div>
        </AppLayout>
    );
}