import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import { useFeeStructureForm } from '@/Hooks/useFeeStructureForm';
import { STATUS_OPTIONS } from '@/Services/feeStructureService';
import { FileText, Save, ArrowLeft, Info } from 'lucide-react';

export default function FeeStructureForm({ structure, dropdownData }) {
    const isEdit = !!structure;
    const { data, setData, processing, errors, submit } = useFeeStructureForm(structure, isEdit);

    const breadcrumbItems = [{ label: 'Dashboard', href: route('dashboard') }, { label: 'Finance & Fees', href: route('fees.structures.index') }];

    return (
        <AppLayout title={isEdit ? 'Edit Fee Structure' : 'Create Fee Structure'}>
            <Head title={isEdit ? 'Edit Fee Structure' : 'Create Fee Structure'} />
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Breadcrumb title="Finance & Fees" subTitle={isEdit ? 'Edit Fee Structure' : 'Create Fee Structure'} breadcrumbItems={breadcrumbItems} />
                    <Link href={route('fees.structures.index')} className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to List
                    </Link>
                </div>
                
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                      
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                    <FileText className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Fee Structure Details
                                </h2>

                          
                                <div className="mb-5 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex gap-2">
                                    <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-blue-700 dark:text-blue-300">
                                        Define a fee structure by selecting the academic year, class, and fee type. Each unique combination can have only one amount set.
                                    </p>
                                </div>

                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormInput 
                                            label="Academic Year" 
                                            type="select" 
                                            value={data.academic_year_id} 
                                            onChange={(v) => setData('academic_year_id', v)} 
                                            error={errors.academic_year_id} 
                                            options={[
                                                { value: '', label: '-- Select Academic Year --' },
                                                ...(dropdownData?.academicYears?.map(y => ({ value: y.id, label: y.title })) || [])
                                            ]} 
                                            required 
                                        />
                                        <FormInput 
                                            label="Class" 
                                            type="select" 
                                            value={data.class_id} 
                                            onChange={(v) => setData('class_id', v)} 
                                            error={errors.class_id} 
                                            options={[
                                                { value: '', label: '-- Select Class --' },
                                                ...(dropdownData?.classes?.map(c => ({ value: c.id, label: c.name })) || [])
                                            ]} 
                                            required 
                                        />
                                    </div>

                              
                                    <div>
                                        <FormInput 
                                            label="Fee Type" 
                                            type="select" 
                                            value={data.fee_type_id} 
                                            onChange={(v) => setData('fee_type_id', v)} 
                                            error={errors.fee_type_id} 
                                            options={[
                                                { value: '', label: '-- Select Fee Type --' },
                                                ...(dropdownData?.feeTypes?.map(t => ({ value: t.id, label: t.name })) || [])
                                            ]} 
                                            required 
                                        />
                                    
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            
                                        <div>
                                            <FormInput 
                                                label="Amount (Rs.)" 
                                                type="number" 
                                                value={data.amount} 
                                                onChange={(v) => setData('amount', v)} 
                                                error={errors.amount} 
                                                placeholder="0.00" 
                                                required 
                                            />
                                           
                                        </div>

                   
                                        <div>
                                            <FormInput 
                                                label="Due Date" 
                                                type="date" 
                                                value={data.due_date} 
                                                onChange={(v) => setData('due_date', v)} 
                                                error={errors.due_date} 
                                                required 
                                            />
                                         
                                        </div>
                                    </div>
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
                                        {processing ? 'Processing...' : <><Save className="w-5 h-5 mr-2" /> {isEdit ? 'Update Structure' : 'Create Structure'}</>}
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