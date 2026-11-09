import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import Button from '@/Components/Button'; 
import { useState } from 'react';
import { Search, FileText, AlertTriangle } from 'lucide-react';

export default function FeeDefaulter({ classes, years, defaulters, totalDefaulters, totalDueAmount, filters }) {
    const [yearId, setYearId] = useState(filters?.academic_year_id || '');
    const [classId, setClassId] = useState(filters?.class_id || '');
    const [sectionId, setSectionId] = useState(filters?.section_id || '');

    const handleGenerate = () => {
        router.get(route('reports.finance.fee-defaulter'), { academic_year_id: yearId, class_id: classId, section_id: sectionId }, { preserveState: true });
    };

    const availableSections = classId ? classes.find(c => c.id == classId)?.sections || [] : [];

    return (
        <AppLayout title="Fee Defaulter List">
            <Head title="Fee Defaulter List" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Finance Reports" subTitle="Fee Defaulter List" breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }, { label: 'Reports', href: route('reports.index') }, { label: 'Finance', href: route('reports.finance.index') }]} />
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2"><Search className="w-4 h-4" /> Filter Data</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <FormInput label="Academic Year" type="select" value={yearId} onChange={setYearId} options={[{ value: '', label: '-- All Years --' }, ...(years?.map(y => ({ value: y.id, label: y.title })) || [])]} />
                        <FormInput label="Class" type="select" value={classId} onChange={(v) => { setClassId(v); setSectionId(''); }} options={[{ value: '', label: '-- All Classes --' }, ...(classes?.map(c => ({ value: c.id, label: c.name })) || [])]} />
                        <FormInput label="Section" type="select" value={sectionId} onChange={setSectionId} options={[{ value: '', label: '-- All Sections --' }, ...(availableSections.map(s => ({ value: s.id, label: s.name })))]} disabled={!classId} />
                        <div className="flex items-end"><Button variant="primary" size="lg" onClick={handleGenerate} className="w-full"><Search className="w-4 h-4 mr-1.5" /> Generate Report</Button></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
                    {defaulters.length > 0 && (
                        <div className="mb-4 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-red-600" /><h2 className="text-xl font-semibold text-gray-900 dark:text-white">Fee Defaulters</h2></div>
                            <div className="flex items-center gap-4">
                                <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-4 py-2 rounded-lg"><span className="font-semibold">Students: {totalDefaulters}</span></div>
                                <div className="bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 px-4 py-2 rounded-lg"><span className="font-bold">Total Due: Rs. {Number(totalDueAmount).toLocaleString()}</span></div>
                            </div>
                        </div>
                    )}
                    {defaulters.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead><tr className="bg-gray-100 dark:bg-slate-700 border-b-2 border-gray-300 dark:border-slate-600">
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">SN</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Admission No</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Student Name</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Class / Section</th>
                                    <th className="px-4 py-2 text-right text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Total Fee</th>
                                    <th className="px-4 py-2 text-right text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Paid</th>
                                    <th className="px-4 py-2 text-right text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Due Amount</th>
                                </tr></thead>
                                <tbody>
                                    {defaulters.map((student, index) => (
                                        <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{index + 1}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{student.admission_no}</td>
                                            <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700">{student.first_name} {student.last_name}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{student.class_name} - {student.section_name}</td>
                                            <td className="px-4 py-2 text-sm text-right text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">Rs. {Number(student.total_fee).toLocaleString()}</td>
                                            <td className="px-4 py-2 text-sm text-right text-emerald-600 dark:text-emerald-400 border border-gray-200 dark:border-slate-700">Rs. {Number(student.paid_amount).toLocaleString()}</td>
                                            <td className="px-4 py-2 text-sm text-right font-bold text-red-600 dark:text-red-400 border border-gray-200 dark:border-slate-700">Rs. {Number(student.due_amount).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12"><FileText className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" /><p className="text-gray-500 dark:text-gray-400">No defaulters found. Great job!</p></div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}