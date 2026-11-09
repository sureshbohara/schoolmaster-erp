import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import Button from '@/Components/Button'; 
import { useState } from 'react';
import { Search, FileText, Users } from 'lucide-react';

export default function StudentCategory({ categories, students, filters, selectedCategoryName }) {
    const [categoryId, setCategoryId] = useState(filters?.category_id || '');

    const handleGenerate = () => {
        router.get(route('reports.academic.category'), { category_id: categoryId }, { preserveState: true });
    };

    return (
        <AppLayout title="Student Category Report">
            <Head title="Student Category Report" />
            <div className="space-y-3">
                

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb 
                        title="Academic Reports" 
                        subTitle="Student Category Report" 
                        breadcrumbItems={[
                            { label: 'Dashboard', href: route('dashboard') }, 
                            { label: 'Reports', href: route('reports.index') },
                            { label: 'Academic', href: route('reports.academic.index') }
                        ]} 
                    />
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                        <Search className="w-4 h-4" /> Filter Data
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput 
                            label="Select Student Category" 
                            type="select" 
                            value={categoryId} 
                            onChange={(v) => setCategoryId(v)} 
                            options={[
                                { value: '', label: '-- Select Category --' }, 
                                ...(categories?.map(c => ({ 
                                    value: c.id, 
                                    label: `${c.name} ${c.discount_percentage > 0 ? `(Discount: ${c.discount_percentage}%)` : ''}` 
                                })) || [])
                            ]} 
                        />
                        
                        <div className="flex items-end">
                            <Button variant="primary" size="lg" onClick={handleGenerate} className="w-full">
                                <Search className="w-4 h-4 mr-1.5" /> Generate Report
                            </Button>
                        </div>
                    </div>
                </div>

        
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
                    
            
                    {students.length > 0 && (
                        <div className="mb-4 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center gap-2">
                            <Users className="w-5 h-5 text-primary-600" />
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Student Category Report
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    <strong>Category:</strong> {selectedCategoryName || 'All'} | 
                                    <strong> Total Students:</strong> {students.length}
                                </p>
                            </div>
                        </div>
                    )}

            
                    {students.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-slate-700 border-b-2 border-gray-300 dark:border-slate-600">
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">SN</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Admission No</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Student Name</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Gender</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Category</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Class / Section</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student, index) => (
                                        <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{index + 1}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{student.admission_no}</td>
                                            <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700">{student.first_name} {student.last_name}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 capitalize">{student.gender}</td>
                                            <td className="px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 border border-gray-200 dark:border-slate-700">
                                                {student.category_name}
                                            </td>
                                            
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">
                                                {student.class_name} - {student.section_name}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="text-center py-12">
                            <FileText className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                            <p className="text-gray-500 dark:text-gray-400">No students found. Please select a category and generate report.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}