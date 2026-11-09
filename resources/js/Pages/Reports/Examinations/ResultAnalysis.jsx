import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import Button from '@/Components/Button';
import { useState } from 'react';
import { Search, FileText, BarChart3 } from 'lucide-react';

export default function ResultAnalysis({ classes, exams, analysis, filters }) {
    const [examId, setExamId] = useState(filters?.exam_id || '');

    const handleGenerate = () => {
        router.get(route('reports.examinations.result-analysis'), { exam_id: examId }, { preserveState: true });
    };

    return (
        <AppLayout title="Result Analysis">
            <Head title="Result Analysis" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Examination Reports" subTitle="Result Analysis" breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }, { label: 'Reports', href: route('reports.index') }, { label: 'Examinations', href: route('reports.examinations.index') }]} />
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2"><Search className="w-4 h-4" /> Filter Data</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput label="Select Exam" type="select" value={examId} onChange={setExamId} options={[{ value: '', label: '-- Select Exam --' }, ...(exams?.map(e => ({ value: e.id, label: e.name })) || [])]} />
                        <div className="flex items-end"><Button variant="primary" size="lg" onClick={handleGenerate} className="w-full"><Search className="w-4 h-4 mr-1.5" /> Generate Report</Button></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
                    {analysis.length > 0 && (
                        <div className="mb-4 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-primary-600" />
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Class-wise Result Analysis</h2>
                        </div>
                    )}
                    {analysis.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead><tr className="bg-gray-100 dark:bg-slate-700 border-b-2 border-gray-300 dark:border-slate-600">
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">SN</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Class</th>
                                    <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Total Students</th>
                                    <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Passed</th>
                                    <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Failed</th>
                                    <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Pass %</th>
                                    <th className="px-4 py-2 text-right text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Avg %</th>
                                </tr></thead>
                                <tbody>
                                    {analysis.map((item, index) => (
                                        <tr key={item.class_id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{index + 1}</td>
                                            <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700">{item.class_name}</td>
                                            <td className="px-4 py-2 text-sm text-center text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{item.total_students}</td>
                                            <td className="px-4 py-2 text-sm text-center font-bold text-emerald-600 dark:text-emerald-400 border border-gray-200 dark:border-slate-700">{item.passed}</td>
                                            <td className="px-4 py-2 text-sm text-center font-bold text-red-600 dark:text-red-400 border border-gray-200 dark:border-slate-700">{item.failed}</td>
                                            <td className="px-4 py-2 text-sm text-center font-medium text-blue-600 dark:text-blue-400 border border-gray-200 dark:border-slate-700">{item.pass_percentage}%</td>
                                            <td className="px-4 py-2 text-sm text-right font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700">{item.avg_percentage}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (<div className="text-center py-12"><FileText className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" /><p className="text-gray-500 dark:text-gray-400">No analysis data found.</p></div>)}
                </div>
            </div>
        </AppLayout>
    );
}