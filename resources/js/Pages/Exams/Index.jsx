import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Calendar, Plus, Pencil, Trash2, X, BookOpen } from 'lucide-react';

export default function ExamsIndex({ exams, dropdownData, filters }) {
    const examList = exams?.data || [];
    const [filterClass, setFilterClass] = useState(filters?.class_id || '');
    const [filterYear, setFilterYear] = useState(filters?.academic_year_id || '');
    const [filterStatus, setFilterStatus] = useState(filters?.status || '');

    const breadcrumbItems = [{ label: 'Dashboard', href: route('dashboard') }, { label: 'Examinations', href: '#' }];

    const handleReset = () => {
        setFilterClass('');
        setFilterYear('');
        setFilterStatus('');
        router.get(route('exams.index'), {}, { preserveState: true, preserveScroll: true });
    };

    const handleFilterChange = (key, value) => {
        if (key === 'class_id') setFilterClass(value);
        if (key === 'academic_year_id') setFilterYear(value);
        if (key === 'status') setFilterStatus(value);
        
        router.get(route('exams.index'), { 
            class_id: filterClass, 
            academic_year_id: filterYear, 
            status: filterStatus, 
            [key]: value 
        }, { preserveState: true, preserveScroll: true });
    };

    const handleStatusChange = (examId, newStatus) => {
        router.post(route('exams.status', examId), { status: newStatus }, { 
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
            },
            onError: () => {
            }
        });
    };

    const handleDelete = (id, name) => {
        if (confirm(`Are you sure you want to delete "${name}"?`)) {
            router.delete(route('exams.destroy', id), { 
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout title="Exams">
            <Head title="Exam Management" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Examinations" subTitle="Exams & Schedules" breadcrumbItems={breadcrumbItems} />
                    <Link href={route('exams.create')} className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                        <Plus className="w-4 h-4 mr-1.5" /> Create Exam
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
                            <option value="scheduled">📅 Scheduled</option>
                            <option value="ongoing">🔄 Ongoing</option>
                            <option value="completed">✅ Completed</option>
                            <option value="published">📢 Published</option>
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
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Exam Name</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Class</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Exam Type</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Duration</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Subjects</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Status</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                                {examList.map((exam) => (
                                    <tr key={exam.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                <span className="font-medium text-gray-900 dark:text-white">{exam.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{exam.class?.name || 'N/A'}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{exam.exam_type?.name || 'N/A'}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                                            {exam.start_date} to {exam.end_date}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800">
                                                <BookOpen className="w-3 h-3 mr-1" />
                                                {exam.schedules?.length || 0} Subjects
                                            </span>
                                        </td>
                                        
                                        {/* ✅ NEW: Status Dropdown (Clickable) */}
                                        <td className="px-4 py-3">
                                            <select 
                                                value={exam.status}
                                                onChange={(e) => handleStatusChange(exam.id, e.target.value)}
                                                className={`px-2.5 py-1 text-xs font-semibold rounded-full border-0 cursor-pointer focus:ring-2 focus:ring-offset-1 focus:ring-emerald-500/30 outline-none transition-all appearance-none ${
                                                    exam.status === 'scheduled' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : 
                                                    exam.status === 'ongoing' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' : 
                                                    exam.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 
                                                    'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                                                }`}
                                            >
                                                <option value="scheduled">📅 Scheduled</option>
                                                <option value="ongoing">🔄 Ongoing</option>
                                                <option value="completed">✅ Completed</option>
                                                <option value="published">📢 Published</option>
                                            </select>
                                        </td>

                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end space-x-1">
                                                <Link href={route('exams.edit', exam.id)} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800 transition-colors">
                                                    <Pencil className="w-3.5 h-3.5" />
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(exam.id, exam.name)} 
                                                    className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded border border-red-200 dark:border-red-800 transition-colors"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {examList.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                            <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                                            <p className="text-sm">No exams found</p>
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