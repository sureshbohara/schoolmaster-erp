import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import Button from '@/Components/Button';
import { useState } from 'react';
import { Search, FileText, Trophy, Medal } from 'lucide-react';

export default function MeritList({ classes, exams, topStudents, filters }) {
    const [examId, setExamId] = useState(filters?.exam_id || '');
    const [classId, setClassId] = useState(filters?.class_id || '');
    const [limit, setLimit] = useState(filters?.limit || 10);

    const handleGenerate = () => {
        router.get(route('reports.examinations.merit-list'), { exam_id: examId, class_id: classId, limit: limit }, { preserveState: true });
    };

    const getMedal = (position) => {
        if (position === 1) return <Medal className="w-5 h-5 text-yellow-500" />;
        if (position === 2) return <Medal className="w-5 h-5 text-gray-400" />;
        if (position === 3) return <Medal className="w-5 h-5 text-orange-600" />;
        return <span className="text-sm font-bold text-gray-600 dark:text-gray-400">#{position}</span>;
    };

    return (
        <AppLayout title="Merit List">
            <Head title="Merit List" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Examination Reports" subTitle="Merit List" breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }, { label: 'Reports', href: route('reports.index') }, { label: 'Examinations', href: route('reports.examinations.index') }]} />
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2"><Search className="w-4 h-4" /> Filter Data</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <FormInput label="Select Exam" type="select" value={examId} onChange={setExamId} options={[{ value: '', label: '-- Select Exam --' }, ...(exams?.map(e => ({ value: e.id, label: e.name })) || [])]} />
                        <FormInput label="Class (Optional)" type="select" value={classId} onChange={setClassId} options={[{ value: '', label: '-- All Classes --' }, ...(classes?.map(c => ({ value: c.id, label: c.name })) || [])]} />
                        <FormInput label="Top N Students" type="number" value={limit} onChange={setLimit} placeholder="10" />
                        <div className="flex items-end"><Button variant="primary" size="lg" onClick={handleGenerate} className="w-full"><Search className="w-4 h-4 mr-1.5" /> Generate Report</Button></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
                    {topStudents.length > 0 && (
                        <div className="mb-4 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-amber-500" />
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Top Performing Students</h2>
                        </div>
                    )}
                    {topStudents.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead><tr className="bg-gray-100 dark:bg-slate-700 border-b-2 border-gray-300 dark:border-slate-600">
                                    <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Position</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Admission No</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Student Name</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Class / Section</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Exam</th>
                                    <th className="px-4 py-2 text-right text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Total Marks</th>
                                    <th className="px-4 py-2 text-right text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Percentage</th>
                                    <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Grade</th>
                                </tr></thead>
                                <tbody>
                                    {topStudents.map((rc) => (
                                        <tr key={rc.id} className={`hover:bg-gray-50 dark:hover:bg-slate-700/50 ${rc.position <= 3 ? 'bg-amber-50/50 dark:bg-amber-900/10' : ''}`}>
                                            <td className="px-4 py-2 text-center border border-gray-200 dark:border-slate-700">{getMedal(rc.position)}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{rc.student?.admission_no}</td>
                                            <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700">{rc.student?.first_name} {rc.student?.last_name}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{rc.class_name} - {rc.section_name}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{rc.exam?.name}</td>
                                            <td className="px-4 py-2 text-sm text-right font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700">{Number(rc.total_marks).toFixed(2)}</td>
                                            <td className="px-4 py-2 text-sm text-right font-bold text-amber-600 dark:text-amber-400 border border-gray-200 dark:border-slate-700">{Number(rc.percentage).toFixed(2)}%</td>
                                            <td className="px-4 py-2 text-center border border-gray-200 dark:border-slate-700"><span className="inline-flex px-2.5 py-1 text-xs font-bold rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">{rc.grade || 'N/A'}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (<div className="text-center py-12"><FileText className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" /><p className="text-gray-500 dark:text-gray-400">No merit list data found.</p></div>)}
                </div>
            </div>
        </AppLayout>
    );
}