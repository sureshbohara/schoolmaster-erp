import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import Button from '@/Components/Button'; 
import { useState } from 'react';
import { Search, FileText, DollarSign, Users } from 'lucide-react';

export default function StudentFeeStatus({ classes, years, students, totalStudents, filters }) {
    const [classId, setClassId] = useState(filters?.class_id || '');
    const [sectionId, setSectionId] = useState(filters?.section_id || '');
    const [yearId, setYearId] = useState(filters?.academic_year_id || '');
    const [feeStatus, setFeeStatus] = useState(filters?.fee_status || 'all');

    const handleGenerate = () => {
        router.get(route('reports.students.fee-status'), { 
            class_id: classId, 
            section_id: sectionId,
            academic_year_id: yearId,
            fee_status: feeStatus
        }, { preserveState: true });
    };

    const availableSections = classId 
        ? classes.find(c => c.id == classId)?.sections || [] 
        : [];

    const getStatusBadge = (status) => {
        const styles = {
            'Paid': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
            'Partial': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
            'Due': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
            'No Fee': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        };
        return styles[status] || styles['Due'];
    };

    return (
        <AppLayout title="Student Fee Status Report">
            <Head title="Student Fee Status Report" />
            <div className="space-y-3">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb 
                        title="Student Reports" 
                        subTitle="Fee Status Report" 
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <FormInput 
                            label="Academic Year" 
                            type="select" 
                            value={yearId} 
                            onChange={(v) => setYearId(v)} 
                            options={[{ value: '', label: '-- All Years --' }, ...(years?.map(y => ({ value: y.id, label: y.title })) || [])]} 
                        />
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
                            label="Fee Status" 
                            type="select" 
                            value={feeStatus} 
                            onChange={(v) => setFeeStatus(v)} 
                            options={[
                                { value: 'all', label: '-- All Status --' },
                                { value: 'paid', label: '✅ Paid' },
                                { value: 'partial', label: '⚠️ Partial' },
                                { value: 'due', label: '❌ Due' },
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
                    {students.length > 0 && (
                        <div className="mb-4 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-primary-600" />
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Fee Status Overview</h2>
                            </div>
                            <div className="flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-4 py-2 rounded-lg">
                                <Users className="w-4 h-4" />
                                <span className="font-semibold">Total Students: {totalStudents}</span>
                            </div>
                        </div>
                    )}

                    {/* Data Table */}
                    {students.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-slate-700 border-b-2 border-gray-300 dark:border-slate-600">
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">SN</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Admission No</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Student Name</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Class / Section</th>
                                        <th className="px-4 py-2 text-right text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Total Fee</th>
                                        <th className="px-4 py-2 text-right text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Paid Amount</th>
                                        <th className="px-4 py-2 text-right text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Due Amount</th>
                                        <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student, index) => (
                                        <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{index + 1}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{student.admission_no}</td>
                                            <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700">{student.first_name} {student.last_name}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{student.class_name} - {student.section_name}</td>
                                            <td className="px-4 py-2 text-sm text-right font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700">Rs. {student.total_fee.toLocaleString()}</td>
                                            <td className="px-4 py-2 text-sm text-right font-medium text-green-600 dark:text-green-400 border border-gray-200 dark:border-slate-700">Rs. {student.paid_amount.toLocaleString()}</td>
                                            <td className="px-4 py-2 text-sm text-right font-medium text-red-600 dark:text-red-400 border border-gray-200 dark:border-slate-700">Rs. {student.due_amount.toLocaleString()}</td>
                                            <td className="px-4 py-2 text-center border border-gray-200 dark:border-slate-700">
                                                <span className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-md ${getStatusBadge(student.fee_status)}`}>
                                                    {student.fee_status}
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
                            <p className="text-gray-500 dark:text-gray-400">No fee records found. Please adjust filters and generate report.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}