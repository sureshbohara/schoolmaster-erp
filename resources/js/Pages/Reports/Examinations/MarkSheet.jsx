import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import Button from '@/Components/Button';
import { useState } from 'react';
import { Search, FileText, ClipboardList } from 'lucide-react';

export default function MarkSheet({ classes, exams, marks, filters }) {
    const [examId, setExamId] = useState(filters?.exam_id || '');
    const [studentId, setStudentId] = useState(filters?.student_id || '');
    const [classId, setClassId] = useState(filters?.class_id || '');

    const handleGenerate = () => {
        router.get(route('reports.examinations.mark-sheet'), { exam_id: examId, student_id: studentId, class_id: classId }, { preserveState: true });
    };

    return (
        <AppLayout title="Mark Sheet">
            <Head title="Mark Sheet" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Examination Reports" subTitle="Mark Sheet" breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }, { label: 'Reports', href: route('reports.index') }, { label: 'Examinations', href: route('reports.examinations.index') }]} />
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2"><Search className="w-4 h-4" /> Filter Data</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <FormInput label="Select Exam" type="select" value={examId} onChange={setExamId} options={[{ value: '', label: '-- Select Exam --' }, ...(exams?.map(e => ({ value: e.id, label: e.name })) || [])]} />
                        <FormInput label="Student ID (Optional)" type="text" value={studentId} onChange={setStudentId} placeholder="Enter Student ID" />
                        <FormInput label="Class (Optional)" type="select" value={classId} onChange={setClassId} options={[{ value: '', label: '-- All Classes --' }, ...(classes?.map(c => ({ value: c.id, label: c.name })) || [])]} />
                        <div className="flex items-end"><Button variant="primary" size="lg" onClick={handleGenerate} className="w-full"><Search className="w-4 h-4 mr-1.5" /> Generate Report</Button></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
                    {marks.length > 0 && (
                        <div className="mb-4 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center gap-2">
                            <ClipboardList className="w-5 h-5 text-primary-600" />
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Subject-wise Marks</h2>
                        </div>
                    )}
                    {marks.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead><tr className="bg-gray-100 dark:bg-slate-700 border-b-2 border-gray-300 dark:border-slate-600">
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">SN</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Student</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Subject</th>
                                    <th className="px-4 py-2 text-right text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Full Marks</th>
                                    <th className="px-4 py-2 text-right text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Pass Marks</th>
                                    <th className="px-4 py-2 text-right text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Obtained</th>
                                    <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Status</th>
                                </tr></thead>
                                <tbody>
                                    {marks.map((mark, index) => {
                                        const isPassed = Number(mark.marks_obtained) >= Number(mark.pass_marks);
                                        return (
                                            <tr key={mark.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{index + 1}</td>
                                                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">
                                                    {mark.student?.first_name} {mark.student?.last_name} <br/>
                                                    <span className="text-xs text-gray-500">({mark.student?.admission_no})</span>
                                                </td>
                                                <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700">
                                                    {mark.subject?.name} <br/>
                                                    <span className="text-xs text-gray-500">({mark.subject?.code})</span>
                                                </td>
                                                <td className="px-4 py-2 text-sm text-right text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{mark.full_marks}</td>
                                                <td className="px-4 py-2 text-sm text-right text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{mark.pass_marks}</td>
                                                <td className="px-4 py-2 text-sm text-right font-bold text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700">{mark.marks_obtained}</td>
                                                <td className="px-4 py-2 text-center border border-gray-200 dark:border-slate-700">
                                                    <span className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-md ${isPassed ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`}>
                                                        {isPassed ? '✅ Pass' : '❌ Fail'}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (<div className="text-center py-12"><FileText className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" /><p className="text-gray-500 dark:text-gray-400">No marks data found.</p></div>)}
                </div>
            </div>
        </AppLayout>
    );
}