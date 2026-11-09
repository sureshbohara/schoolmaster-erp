import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import { useSubjectForm } from '@/Hooks/useSubjectForm';
import { SUBJECT_TYPE_OPTIONS, STATUS_OPTIONS } from '@/Services/subjectService';
import { BookOpen, Save, ArrowLeft } from 'lucide-react';

export default function SubjectForm({ subject }) {
    const isEdit = !!subject;
    const { data, setData, processing, errors, submit } = useSubjectForm(subject, isEdit);

    const breadcrumbItems = [
        { label: 'Dashboard', href: route('dashboard') },
        { label: 'Academic', href: route('academic.subjects.index') },
    ];

    return (
        <AppLayout title={isEdit ? 'Edit Subject' : 'Create Subject'}>
            <Head title={isEdit ? 'Edit Subject' : 'Create Subject'} />
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Breadcrumb title="Academic" subTitle={isEdit ? 'Edit Subject' : 'Create Subject'} breadcrumbItems={breadcrumbItems} />
                    <Link href={route('academic.subjects.index')} className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to List
                    </Link>
                </div>
                
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
                                <div className="mb-8">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                        <BookOpen className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Subject Information
                                    </h2>
                                    <div className="space-y-5">
                                        <FormInput label="Subject Name" value={data.name} onChange={(v) => setData('name', v)} error={errors.name} placeholder="e.g., Mathematics" required />
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormInput label="Subject Code" value={data.code} onChange={(v) => setData('code', v)} error={errors.code} placeholder="e.g., MATH101" />
                                            <FormInput label="Type" type="select" value={data.type} onChange={(v) => setData('type', v)} error={errors.type} options={SUBJECT_TYPE_OPTIONS} required />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6 sticky top-6">
                                <div className="mb-8">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700">Subject Status</h2>
                                    <div className="space-y-5">
                                        <FormInput label="Status" type="select" value={data.status} onChange={(v) => setData('status', v)} error={errors.status} options={STATUS_OPTIONS} required />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                                    <button type="submit" disabled={processing} className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:cursor-not-allowed">
                                        {processing ? 'Processing...' : <><Save className="w-5 h-5 mr-2" /> {isEdit ? 'Update Subject' : 'Create Subject'}</>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}