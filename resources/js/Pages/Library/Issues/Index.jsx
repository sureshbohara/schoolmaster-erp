import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { useState } from 'react';
import { BookOpen, Plus, ArrowLeftRight, Search, X, Calendar, User, Pencil, Trash2 } from 'lucide-react';
import IssueModal from './IssueModal';

export default function IssuesIndex({ issues, filters, books, students, employees }) {
    const issueList = issues?.data || [];
    const [statusFilter, setStatusFilter] = useState(filters?.status || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIssue, setEditingIssue] = useState(null);

    const handleFilter = () => {
        router.get(route('library.issues.index'), { status: statusFilter }, { preserveState: true, preserveScroll: true });
    };

    const handleReset = () => {
        setStatusFilter('');
        router.get(route('library.issues.index'), {}, { preserveState: true, preserveScroll: true });
    };

    const handleReturn = (issueId, bookTitle) => {
        if (confirm(`Confirm return of "${bookTitle}"?`)) {
            router.put(route('library.issues.update', issueId), {}, {
                preserveScroll: true,
            });
        }
    };

    const handleEdit = (issue) => {
        setEditingIssue(issue);
        setIsModalOpen(true);
    };

    const handleDelete = (issueId, bookTitle) => {
        if (confirm(`Delete issue for "${bookTitle}"?`)) {
            router.delete(route('library.issues.destroy', issueId), {
                preserveScroll: true,
            });
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            issued: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
            returned: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
            overdue: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
            lost: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        };
        return `inline-flex px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${styles[status] || styles.issued}`;
    };

    return (
        <AppLayout title="Issue / Return">
            <Head title="Issue / Return" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Library" subTitle="Issue / Return" breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }]} />
                    <button onClick={() => { setEditingIssue(null); setIsModalOpen(true); }} className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                        <Plus className="w-4 h-4 mr-1.5" /> Issue Book
                    </button>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm">
                            <option value="">All Status</option>
                            <option value="issued">📤 Issued</option>
                            <option value="returned">✅ Returned</option>
                            <option value="overdue">⏰ Overdue</option>
                        </select>
                        <button onClick={handleFilter} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg text-sm flex items-center justify-center"><Search className="w-4 h-4 mr-1.5" /> Filter</button>
                        <button onClick={handleReset} className="px-4 py-2 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg text-sm flex items-center justify-center"><X className="w-4 h-4 mr-1.5" /> Reset</button>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-gray-200 dark:border-slate-700">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Book Details</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Member</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Issue Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Due Date</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Status</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                                {issueList.map((issue) => (
                                    <tr key={issue.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">

                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <BookOpen className="w-4 h-4 text-gray-400" />
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-white text-sm">{issue.book?.title}</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">{issue.book?.book_no}</div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-gray-400" />
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-white text-sm capitalize">
                                                        {issue.member_info?.first_name} {issue.member_info?.last_name}
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                                        {issue.member_type === 'student' ? issue.member_info?.admission_no : issue.member_info?.employee_id}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                                             {issue.issue_date}
                                        </td>

                                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                                             {issue.due_date}
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            <span className={getStatusBadge(issue.status)}>{issue.status}</span>
                                        </td>

                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end space-x-1">
                                            
                                                <button onClick={() => handleEdit(issue)} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800 transition-colors" title="Edit">
                                                    <Pencil className="w-3.5 h-3.5" />
                                                </button>
                                      
                                                <button onClick={() => handleDelete(issue.id, issue.book?.title)} className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded border border-red-200 dark:border-red-800 transition-colors" title="Delete">
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            
                                                {issue.status === 'issued' || issue.status === 'overdue' ? (
                                                    <button onClick={() => handleReturn(issue.id, issue.book?.title)} className="inline-flex items-center px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-md transition-colors ml-1">
                                                        <ArrowLeftRight className="w-3 h-3 mr-1" /> Return
                                                    </button>
                                                ) : null}
                                            </div>
                                        </td>

                                    </tr>
                                ))}
                                {issueList.length === 0 && <tr><td colSpan="6" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">No issues found</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

             <IssueModal 
                    key={editingIssue?.id || 'new-issue'} 
                    isOpen={isModalOpen} 
                    onClose={() => { setIsModalOpen(false); setEditingIssue(null); }} 
                    books={books} 
                    students={students} 
                    employees={employees}
                    isEdit={!!editingIssue}
                    issueData={editingIssue}
                />
        </AppLayout>
    );
}