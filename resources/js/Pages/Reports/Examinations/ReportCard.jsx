import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import Button from '@/Components/Button';
import { useState } from 'react';
import { Search, FileText, Award, CreditCard, Printer } from 'lucide-react';

export default function ReportCard({ classes, exams, reportCards, totalCards, filters }) {
    const [examId, setExamId] = useState(filters?.exam_id || '');
    const [studentId, setStudentId] = useState(filters?.student_id || '');

    const handleGenerate = () => {
        router.get(route('reports.examinations.report-card'), { exam_id: examId, student_id: studentId }, { preserveState: true });
    };

    const getGradeColor = (grade) => {
        const g = grade?.toUpperCase();
        if (g === 'A+' || g === 'A') return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
        if (g === 'B+' || g === 'B') return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
        if (g === 'C+' || g === 'C') return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
        if (g === 'D') return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    };

    return (
        <AppLayout title="Report Card">
            <Head title="Report Card" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Examination Reports" subTitle="Report Card" breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }, { label: 'Reports', href: route('reports.index') }, { label: 'Examinations', href: route('reports.examinations.index') }]} />
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2"><Search className="w-4 h-4" /> Filter Data</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormInput label="Select Exam" type="select" value={examId} onChange={setExamId} options={[{ value: '', label: '-- Select Exam --' }, ...(exams?.map(e => ({ value: e.id, label: `${e.name} ${e.exam_type?.name ? `(${e.exam_type.name})` : ''}` })) || [])]} />
                        <FormInput label="Student ID / Admission No (Optional)" type="text" value={studentId} onChange={setStudentId} placeholder="e.g., STU-2026-0003 or 1" />
                        <div className="flex items-end"><Button variant="primary" size="lg" onClick={handleGenerate} className="w-full"><Search className="w-4 h-4 mr-1.5" /> Generate Report</Button></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
                    {reportCards.length > 0 && (
                        <div className="mb-4 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-2"><Award className="w-5 h-5 text-primary-600" /><h2 className="text-xl font-semibold text-gray-900 dark:text-white">Report Cards</h2></div>
                            <div className="bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 px-4 py-2 rounded-lg"><span className="font-semibold">Total: {totalCards}</span></div>
                        </div>
                    )}
                    {reportCards.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead><tr className="bg-gray-100 dark:bg-slate-700 border-b-2 border-gray-300 dark:border-slate-600">
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Position</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Admission No</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Student Name</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Class / Section</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Exam</th>
                                    <th className="px-4 py-2 text-right text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Total Marks</th>
                                    <th className="px-4 py-2 text-right text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Percentage</th>
                                    <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Grade</th>
                                    <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Rank</th>
                                    <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Actions</th>
                                </tr></thead>
                                <tbody>
                                    {reportCards.map((rc, index) => (
                                        <tr key={rc.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{index + 1}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{rc.student?.admission_no}</td>
                                            <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700">{rc.student?.first_name} {rc.student?.last_name}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{rc.class_name} - {rc.section_name}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{rc.exam?.name}</td>
                                            <td className="px-4 py-2 text-sm text-right font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700">{Number(rc.total_marks).toFixed(2)}</td>
                                            <td className="px-4 py-2 text-sm text-right font-medium text-blue-600 dark:text-blue-400 border border-gray-200 dark:border-slate-700">{Number(rc.percentage).toFixed(2)}%</td>
                                            <td className="px-4 py-2 text-center border border-gray-200 dark:border-slate-700"><span className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-md ${getGradeColor(rc.grade)}`}>{rc.grade || 'N/A'}</span></td>
                                            <td className="px-4 py-2 text-sm text-center font-bold text-amber-600 dark:text-amber-400 border border-gray-200 dark:border-slate-700">{rc.rank_in_class || 'N/A'}</td>
                                            <td className="px-4 py-2 text-center border border-gray-200 dark:border-slate-700">
                                                <div className="flex items-center justify-center gap-2">
                                                    {/* Print ID Card Button */}
                                                    <a 
                                                        href={route('students.id-card.pdf', rc.student?.id)} 
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded border border-emerald-200 dark:border-emerald-800 transition-colors"
                                                        title="Print ID Card"
                                                    >
                                                        <CreditCard className="w-4 h-4" />
                                                    </a>
                                                    
                                                    {/* Print Marksheet Button */}
                                                    <a 
                                                        href={route('exams.marksheet.pdf', { exam: rc.exam?.id, student: rc.student?.id })} 
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800 transition-colors"
                                                        title="Print Marksheet"
                                                    >
                                                        <Printer className="w-4 h-4" />
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (<div className="text-center py-12"><FileText className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" /><p className="text-gray-500 dark:text-gray-400">No report cards found.</p></div>)}
                </div>
            </div>
        </AppLayout>
    );
}