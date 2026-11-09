import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import { useBranchForm } from '@/Hooks/useBranchForm';
import { STATUS_OPTIONS } from '@/Services/branchService';
import { Save, ArrowLeft, GitBranch } from 'lucide-react';

export default function BranchForm({ branch, dropdownData }) {
    const isEdit = !!branch;
    const { data, setData, processing, errors, submit } = useBranchForm(branch, isEdit);

    const breadcrumbItems = [
        { label: 'Dashboard', href: route('dashboard') },
        { label: 'Administration', href: route('branches.index') },
    ];

    return (
        <AppLayout title={isEdit ? 'Edit Branch' : 'Create Branch'}>
            <Head title={isEdit ? 'Edit Branch' : 'Create Branch'} />
            
            <div className="space-y-3">
          
                <div className="flex items-center justify-between">
                    <Breadcrumb 
                        title="Administration" 
                        subTitle={isEdit ? 'Edit Branch' : 'Create Branch'} 
                        breadcrumbItems={breadcrumbItems} 
                    />
                    <Link 
                        href={route('branches.index')} 
                        className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> 
                        Back to List
                    </Link>
                </div>
                
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                  
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
                                <div className="mb-8">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                        <GitBranch className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> 
                                        Branch Information
                                    </h2>
                                    
                                    <div className="space-y-5">
                                        <FormInput 
                                            label="Branch Name" 
                                            value={data.name} 
                                            onChange={(v) => setData('name', v)} 
                                            error={errors.name} 
                                            placeholder="Main Branch" 
                                            required 
                                        />
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormInput 
                                                label="Email Address" 
                                                type="email" 
                                                value={data.email} 
                                                onChange={(v) => setData('email', v)} 
                                                error={errors.email} 
                                                placeholder="branch@school.com" 
                                            />
                                            <FormInput 
                                                label="Phone Number" 
                                                value={data.phone} 
                                                onChange={(v) => setData('phone', v)} 
                                                error={errors.phone} 
                                                placeholder="01-4XXXXXX" 
                                            />
                                        </div>
                                        
                                        <FormInput 
                                            label="Address" 
                                            type="textarea" 
                                            value={data.address} 
                                            onChange={(v) => setData('address', v)} 
                                            error={errors.address} 
                                            placeholder="Full branch address..." 
                                            rows={4} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

          
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6 sticky top-6">
                                
                                <div className="mb-8">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700">
                                        Branch Details & Status
                                    </h2>
                                    
                                    <div className="space-y-5">
                                        <FormInput 
                                            label="Branch Code" 
                                            value={data.code} 
                                            onChange={(v) => setData('code', v)} 
                                            error={errors.code} 
                                            placeholder="BR-001" 
                                            required 
                                        />
                                        
                                        <FormInput 
                                            label="Organization" 
                                            type="select" 
                                            value={data.organization_id} 
                                            onChange={(v) => setData('organization_id', v)} 
                                            error={errors.organization_id} 
                                            options={[
                                                { value: '', label: '-- Select Organization --' },
                                                ...(dropdownData?.organizations?.map(org => ({ value: org.id, label: org.name })) || [])
                                            ]} 
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
                                    <button 
                                        type="submit" 
                                        disabled={processing} 
                                        className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:cursor-not-allowed"
                                    >
                                        {processing ? (
                                            'Processing...'
                                        ) : (
                                            <>
                                                <Save className="w-5 h-5 mr-2" /> 
                                                {isEdit ? 'Update Branch' : 'Create Branch'}
                                            </>
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