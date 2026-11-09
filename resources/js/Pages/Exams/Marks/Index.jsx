import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { ClipboardList, Save, Search, Loader2, BookOpen, Info, Trash2 } from 'lucide-react';

export default function MarksIndex({ marks: initialMarks, examInfo, filters, exams, students }) {
    const examId = filters?.exam_id || '';
    const studentId = filters?.student_id || '';

    const { data, setData, post, processing } = useForm({
        marks: [],
    });

    useEffect(() => {
        if (examInfo?.schedules && examInfo.schedules.length > 0) {
            const newMarks = examInfo.schedules.map(schedule => {
                const existing = (initialMarks || []).find(m => 
                    String(m.subject_id) === String(schedule.subject.id)
                );
                
                return {
                    exam_id: examId,
                    student_id: studentId,
                    subject_id: schedule.subject.id,
                    theory_mark: existing?.theory_mark ?? '',
                    practical_mark: existing?.practical_mark ?? '',
                    obtained_mark: existing?.obtained_mark ?? '',
                    grade: existing?.grade ?? '',
                    remarks: existing?.remarks ?? '',
                };
            });
            setData('marks', newMarks);
        } else {
            setData('marks', []);
        }
    }, [examInfo, initialMarks, examId, studentId]);

    const selectedExam = exams?.find(e => String(e.id) === String(examId));
    const availableStudents = students?.filter(s => 
        !selectedExam || String(s.class_id) === String(selectedExam.class_id)
    ) || [];

    const handleExamChange = (value) => {
        router.get(route('exams.marks.index'), { exam_id: value, student_id: '' }, { preserveState: true, preserveScroll: true });
    };

    const handleStudentChange = (value) => {
        router.get(route('exams.marks.index'), { exam_id: examId, student_id: value }, { preserveState: true, preserveScroll: true });
    };

    const handleReset = () => {
        router.get(route('exams.marks.index'), {}, { preserveState: true, preserveScroll: true });
    };

    const updateMark = (subjectId, field, value) => {
        const newMarks = data.marks.map(m => {
            if (String(m.subject_id) === String(subjectId)) {
                const updated = { ...m, [field]: value };
                if (field === 'theory_mark' || field === 'practical_mark') {
                    const theory = parseFloat(updated.theory_mark) || 0;
                    const practical = parseFloat(updated.practical_mark) || 0;
                    updated.obtained_mark = (theory + practical).toFixed(2);
                }
                return updated;
            }
            return m;
        });
        setData('marks', newMarks);
    };

    const deleteMarkRow = (subjectId, subjectName) => {
        if (!confirm(`Are you sure you want to delete marks for "${subjectName}"?`)) {
            return;
        }

        const newMarks = data.marks.filter(m => String(m.subject_id) !== String(subjectId));
        setData('marks', newMarks);

        router.delete(route('exams.marks.destroy'), {
            data: {
                exam_id: examId,
                student_id: studentId,
                subject_id: subjectId
            },
            preserveScroll: true,
            onSuccess: () => {
            },
            onError: (errors) => {
                router.reload(); 
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const validMarks = data.marks.filter(m => 
            m.subject_id && (m.theory_mark || m.practical_mark || m.obtained_mark)
        );

        if (validMarks.length === 0) {
            return;
        }

        post(route('exams.marks.store'), {
            data: { marks: validMarks },
            onSuccess: () => {
            },
            onError: (errors) => {
            },
            preserveScroll: true,
        });
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('en-GB');
    };

    return (
        <AppLayout title="Marks Entry">
            <Head title="Marks & Grading" />
            <div className="space-y-4">
                <Breadcrumb title="Examinations" subTitle="Marks Entry" breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }, { label: 'Examinations', href: '#' }]} />

                {/* Filters */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col">
                            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Exam <span className="text-red-500">*</span></label>
                            <select value={examId} onChange={(e) => handleExamChange(e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm">
                                <option value="">Select Exam</option>
                                {exams?.map(e => (<option key={e.id} value={e.id}>{e.name} ({e.class_model?.name || 'No Class'})</option>))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Student <span className="text-red-500">*</span></label>
                            <select value={studentId} onChange={(e) => handleStudentChange(e.target.value)} disabled={!examId} className="w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                                <option value="">Select Student</option>
                                {availableStudents.map(s => (<option key={s.id} value={s.id}>{s.first_name} {s.last_name} ({s.admission_no})</option>))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 opacity-0">Actions</label>
                            <button onClick={handleReset} className="w-full px-4 py-2.5 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg transition-all text-sm flex items-center justify-center">
                                <Search className="w-4 h-4 mr-1.5" /> Reset
                            </button>
                        </div>
                    </div>
                </div>

                {examInfo && studentId && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3">
                        <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-700 dark:text-blue-300">
                            <p className="font-semibold mb-1">Entering marks for: {examInfo.name}</p>
                            <p className="text-xs">Class: {examInfo.class_model?.name || 'N/A'} | Duration: {formatDate(examInfo.start_date)} to {formatDate(examInfo.end_date)}</p>
                        </div>
                    </div>
                )}

                {examId && studentId && examInfo?.schedules?.length > 0 && (
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
                            <div className="p-4 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/50">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <ClipboardList className="w-5 h-5 text-emerald-600" /> Subject-wise Marks Entry
                                </h3>
                                <button type="submit" disabled={processing} className="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium rounded-lg transition-all text-sm flex items-center shadow-sm hover:shadow-md disabled:cursor-not-allowed">
                                    {processing ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : <><Save className="w-4 h-4 mr-2" /> Save Marks</>}
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Subject</th>
                                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Theory</th>
                                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Practical</th>
                                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Total</th>
                                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Grade</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Remarks</th>
                                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                                        {examInfo.schedules.map((schedule) => {
                                            const currentMark = data.marks.find(m => String(m.subject_id) === String(schedule.subject.id)) || {};
                                            const hasData = currentMark.theory_mark || currentMark.practical_mark || currentMark.obtained_mark;

                                            return (
                                                <tr key={schedule.id} className="hover:bg-emerald-50/30 dark:hover:bg-slate-700/30 transition-colors">
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-2">
                                                            <BookOpen className="w-4 h-4 text-gray-400" />
                                                            <span className="text-sm font-medium text-gray-900 dark:text-white">{schedule.subject.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        <input type="number" min="0" value={currentMark.theory_mark ?? ''} onChange={(e) => updateMark(schedule.subject.id, 'theory_mark', e.target.value)} placeholder="0" className="w-20 px-2 py-1.5 text-sm text-center bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none" />
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        <input type="number" min="0" value={currentMark.practical_mark ?? ''} onChange={(e) => updateMark(schedule.subject.id, 'practical_mark', e.target.value)} placeholder="0" className="w-20 px-2 py-1.5 text-sm text-center bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none" />
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        <span className="text-sm font-bold text-gray-900 dark:text-white font-mono">{currentMark.obtained_mark || '—'}</span>
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        <span className="inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-md bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">{currentMark.grade || '—'}</span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <input type="text" value={currentMark.remarks ?? ''} onChange={(e) => updateMark(schedule.subject.id, 'remarks', e.target.value)} placeholder="Optional" className="w-full px-2 py-1.5 text-sm bg-transparent border border-transparent rounded-md focus:bg-white dark:focus:bg-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:text-white outline-none" />
                                                    </td>
                                                    {/* ✅ Delete Action Column */}
                                                    <td className="px-4 py-3 text-center">
                                                        {hasData ? (
                                                            <button 
                                                                type="button"
                                                                onClick={() => deleteMarkRow(schedule.subject.id, schedule.subject.name)}
                                                                className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded border border-red-200 dark:border-red-800 transition-colors"
                                                                title="Delete this subject's marks immediately"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        ) : (
                                                            <span className="text-gray-300 dark:text-gray-600">—</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </form>
                )}

                {examId && studentId && (!examInfo?.schedules || examInfo.schedules.length === 0) && (
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-12 text-center shadow-sm">
                        <BookOpen className="w-12 h-12 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">No Subjects Found</p>
                    </div>
                )}
                {!examId && (
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-12 text-center shadow-sm">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ClipboardList className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Select Exam to Begin</h3>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}