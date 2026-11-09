import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import Button from '@/Components/Button'; 
import { useState } from 'react';
import { Search, FileText, BookOpen, Users } from 'lucide-react';

export default function LibraryIssues({ classes, issues, totalIssues, filters }) {
    const [classId, setClassId] = useState(filters?.class_id || '');
    const [sectionId, setSectionId] = useState(filters?.section_id || '');
    const [status, setStatus] = useState(filters?.status || 'all');

    const handleGenerate = () => {
        router.get(route('reports.students.library-issues'), { 
            class_id: classId, 
            section_id: sectionId,
            status: status
        }, { preserveState: true });
    };

    const availableSections = classId 
        ? classes.find(c => c.id == classId)?.sections || [] 
        : [];

    const getStatusBadge = (status) => {
        const styles = {
            'Returned': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
            'Not Returned': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
            'Overdue': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
        };
        return styles[status] || styles['Not Returned'];
    };

    return (
        <AppLayout title="Library Issue Report">
            <Head title="Library Issue Report" />
            <div className="space-y-3">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb 
                        title="Student Reports" 
                        subTitle="Library Issues" 
                        breadcrumbItems={[
                            { label: 'Dashboard', href: route('dashboard') }, 
                            { label: 'Reports', href: route('reports.index') },
                            { label: 'Students', href: route('reports.students.index') }
                        ]} 
                    />
                </div>

                {/* Filter Section */}
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                        <Search className="w-4 h-4" /> Filter Data
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <FormInput 
                            label="Class" 
                            type="select" 
                            value={classId} 
                            onChange={(v) => { setClassId(v); setSectionId(''); }} 
                            options={[{ value: '', label: '-- All Classes --' }, ...(classes?.map(c => ({ value: c.id, label: c.name })) || [])]} 
                        />
                        <FormInput 
                            label="Section" 
                            type="select" 
                            value={sectionId} 
                            onChange={(v) => setSectionId(v)} 
                            options={[{ value: '', label: '-- All Sections --' }, ...(availableSections.map(s => ({ value: s.id, label: s.name })))]} 
                            disabled={!classId}
                        />
                        <FormInput 
                            label="Status" 
                            type="select" 
                            value={status} 
                            onChange={(v) => setStatus(v)} 
                            options={[
                                { value: 'all', label: '-- All Status --' },
                                { value: 'returned', label: '✅ Returned' },
                                { value: 'not_returned', label: '⏳ Not Returned' },
                                { value: 'overdue', label: '❌ Overdue' },
                            ]} 
                        />
                        <div className="flex items-end">
                            <Button variant="primary" size="lg" onClick={handleGenerate} className="w-full">
                                <Search className="w-4 h-4 mr-1.5" /> Generate Report
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Report Output Section */}
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
                    
                    {/* Summary Header */}
                    {issues.length > 0 && (
                        <div className="mb-4 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-primary-600" />
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Library Issue Records</h2>
                            </div>
                            <div className="flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-lg">
                                <Users className="w-4 h-4" />
                                <span className="font-semibold">Total Issues: {totalIssues}</span>
                            </div>
                        </div>
                    )}

                    {/* Data Table */}
                    {issues.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-slate-700 border-b-2 border-gray-300 dark:border-slate-600">
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">SN</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Admission No</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Student Name</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Class / Section</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Book Title</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Issue Date</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Due Date</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Return Date</th>
                                        <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {issues.map((issue, index) => (
                                        <tr key={issue.admission_no + issue.book_title + index} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{index + 1}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{issue.admission_no}</td>
                                            <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700">{issue.first_name} {issue.last_name}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{issue.class_name} - {issue.section_name}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 font-medium">{issue.book_title}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{issue.issue_date || 'N/A'}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{issue.due_date || 'N/A'}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{issue.return_date || 'N/A'}</td>
                                            <td className="px-4 py-2 text-center border border-gray-200 dark:border-slate-700">
                                                <span className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-md ${getStatusBadge(issue.status)}`}>
                                                    {issue.status}
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
                            <p className="text-gray-500 dark:text-gray-400">No library issues found. Please adjust filters and generate report.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}