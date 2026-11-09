import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import { useDepartmentForm } from '@/Hooks/useDepartmentForm';
import { STATUS_OPTIONS } from '@/Services/departmentService';
import { Building2, Save, ArrowLeft } from 'lucide-react';

export default function DepartmentForm({ department }) {
    const isEdit = !!department;
    const { data, setData, processing, errors, submit } = useDepartmentForm(department, isEdit);

    const breadcrumbItems = [
        { label: 'Dashboard', href: route('dashboard') },
        { label: 'HR', href: route('hr.departments.index') },
    ];

    return (
        <AppLayout title={isEdit ? 'Edit Department' : 'Create Department'}>
            <Head title={isEdit ? 'Edit Department' : 'Create Department'} />
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Breadcrumb title="Human Resource" subTitle={isEdit ? 'Edit Department' : 'Create Department'} breadcrumbItems={breadcrumbItems} />
                    <Link href={route('hr.departments.index')} className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to List
                    </Link>
                </div>
                
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                   
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                    <Building2 className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Department Details
                                </h2>
                                <div className="space-y-5">
                                    <FormInput 
                                        label="Department Name" 
                                        value={data.name} 
                                        onChange={(v) => setData('name', v)} 
                                        error={errors.name} 
                                        placeholder="e.g., Human Resources, Finance, IT" 
                                        required 
                                    />
                                    
                                    <FormInput 
                                        label="Description" 
                                        type="textarea" 
                                        value={data.description} 
                                        onChange={(v) => setData('description', v)} 
                                        error={errors.description} 
                                        placeholder="Brief description of the department's role and responsibilities..." 
                                        rows={5} 
                                    />
                                </div>
                            </div>
                        </div>

                        
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6 sticky top-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700">Settings</h2>
                                <div className="space-y-5">
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

                                <div className="pt-4 border-t border-gray-200 dark:border-slate-700 mt-8">
                                    <button type="submit" disabled={processing} className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:cursor-not-allowed">
                                        {processing ? (
                                            <>Processing...</>
                                        ) : (
                                            <><Save className="w-5 h-5 mr-2" /> {isEdit ? 'Update Department' : 'Create Department'}</>
                                        )}
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