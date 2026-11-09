import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import { useAcademicYearForm } from '@/Hooks/useAcademicYearForm';
import { STATUS_OPTIONS, IS_ACTIVE_OPTIONS } from '@/Services/academicYearService';
import { Calendar, Save, ArrowLeft } from 'lucide-react';

export default function AcademicYearForm({ year }) {
    const isEdit = !!year;
    const { data, setData, processing, errors, submit } = useAcademicYearForm(year, isEdit);

    const breadcrumbItems = [
        { label: 'Dashboard', href: route('dashboard') },
        { label: 'Academic', href: route('academic.years.index') },
    ];

    return (
        <AppLayout title={isEdit ? 'Edit Academic Year' : 'Create Academic Year'}>
            <Head title={isEdit ? 'Edit Academic Year' : 'Create Academic Year'} />
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Breadcrumb title="Academic" subTitle={isEdit ? 'Edit Academic Year' : 'Create Academic Year'} breadcrumbItems={breadcrumbItems} />
                    <Link href={route('academic.years.index')} className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to List
                    </Link>
                </div>
                
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        {/* Left Column: Details */}
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
                                <div className="mb-8">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                        <Calendar className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Year Details
                                    </h2>
                                    <div className="space-y-5">
                                        <FormInput label="Academic Year Title" value={data.title} onChange={(v) => setData('title', v)} error={errors.title} placeholder="e.g., 2081 BS / 2024-2025" required />
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormInput label="Start Date" type="date" value={data.start_date} onChange={(v) => setData('start_date', v)} error={errors.start_date} required />
                                            <FormInput label="End Date" type="date" value={data.end_date} onChange={(v) => setData('end_date', v)} error={errors.end_date} required />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6 sticky top-6">
                                <div className="mb-8">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700">Settings</h2>
                                    <div className="space-y-5">
                                        <FormInput 
                                            label="Is Current Year?" 
                                            type="select" 
                                            value={data.is_active} 
                                            onChange={(v) => setData('is_active', v)} 
                                            error={errors.is_active} 
                                            options={IS_ACTIVE_OPTIONS} 
                                            required 
                                        />
                                        <FormInput 
                                            label="Status" 
                                            type="select" 
                                            value={data.status} 
                                            onChange={(v) => setData('status', v)} 
                                            error={errors.status} 
                                            options={STATUS_OPTIONS} 
                                            required 
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                                    <button type="submit" disabled={processing} className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:cursor-not-allowed">
                                        {processing ? 'Processing...' : <><Save className="w-5 h-5 mr-2" /> {isEdit ? 'Update Year' : 'Create Year'}</>}
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