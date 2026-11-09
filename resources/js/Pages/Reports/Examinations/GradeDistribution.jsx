import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import Button from '@/Components/Button';
import { useState } from 'react';
import { Search, FileText, PieChart } from 'lucide-react';

export default function GradeDistribution({ exams, distribution, totalStudents, filters }) {
    const [examId, setExamId] = useState(filters?.exam_id || '');

    const handleGenerate = () => {
        router.get(route('reports.examinations.grade-distribution'), { exam_id: examId }, { preserveState: true });
    };

    const getGradeColor = (grade) => {
        const g = grade?.toUpperCase();
        if (g === 'A+' || g === 'A') return 'bg-emerald-500';
        if (g === 'B+' || g === 'B') return 'bg-blue-500';
        if (g === 'C+' || g === 'C') return 'bg-amber-500';
        if (g === 'D') return 'bg-orange-500';
        return 'bg-red-500';
    };

    return (
        <AppLayout title="Grade Distribution">
            <Head title="Grade Distribution" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Examination Reports" subTitle="Grade Distribution" breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }, { label: 'Reports', href: route('reports.index') }, { label: 'Examinations', href: route('reports.examinations.index') }]} />
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2"><Search className="w-4 h-4" /> Filter Data</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput label="Select Exam" type="select" value={examId} onChange={setExamId} options={[{ value: '', label: '-- Select Exam --' }, ...(exams?.map(e => ({ value: e.id, label: e.name })) || [])]} />
                        <div className="flex items-end"><Button variant="primary" size="lg" onClick={handleGenerate} className="w-full"><Search className="w-4 h-4 mr-1.5" /> Generate Report</Button></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
                    {distribution.length > 0 && (
                        <div className="mb-4 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-2"><PieChart className="w-5 h-5 text-primary-600" /><h2 className="text-xl font-semibold text-gray-900 dark:text-white">Grade Distribution</h2></div>
                            <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-lg"><span className="font-semibold">Total Students: {totalStudents}</span></div>
                        </div>
                    )}
                    {distribution.length > 0 ? (
                        <div className="space-y-4">
                            {distribution.map((item, index) => (
                                <div key={index} className="bg-gray-50 dark:bg-slate-900 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <span className={`inline-flex px-3 py-1 text-sm font-bold rounded-md text-white ${getGradeColor(item.grade)}`}>Grade {item.grade}</span>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">{item.count} students</span>
                                        </div>
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">{item.percentage}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                                        <div className={`h-full ${getGradeColor(item.grade)} transition-all duration-500`} style={{ width: `${item.percentage}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (<div className="text-center py-12"><FileText className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" /><p className="text-gray-500 dark:text-gray-400">No grade distribution data found.</p></div>)}
                </div>
            </div>
        </AppLayout>
    );
}