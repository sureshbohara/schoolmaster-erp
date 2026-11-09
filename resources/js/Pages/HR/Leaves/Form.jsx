import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import { useLeaveApplicationForm } from '@/Hooks/useLeaveApplicationForm';
import { STATUS_OPTIONS } from '@/Services/leaveApplicationService';
import { Calendar, Save, ArrowLeft, FileText, X, AlertCircle, Paperclip } from 'lucide-react';

export default function LeaveForm({ leave, dropdownData }) {
    const isEdit = !!leave;
    const { data, setData, processing, errors, fileName, fileInputRef, handleFileChange, removeFile, submit } = useLeaveApplicationForm(leave, isEdit);

    const breadcrumbItems = [{ label: 'Dashboard', href: route('dashboard') }, { label: 'HR', href: route('hr.leaves.index') }];

    return (
        <AppLayout title={isEdit ? 'Edit Leave Application' : 'New Leave Application'}>
            <Head title={isEdit ? 'Edit Leave Application' : 'New Leave Application'} />
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Breadcrumb title="Human Resource" subTitle={isEdit ? 'Edit Leave Application' : 'New Leave Application'} breadcrumbItems={breadcrumbItems} />
                    <Link href={route('hr.leaves.index')} className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to List
                    </Link>
                </div>
                
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                    
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                    <Calendar className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Leave Details
                                </h2>
                                <div className="space-y-5">
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormInput 
                                        label="Employee" 
                                        type="select" 
                                        value={data.employee_id} 
                                        onChange={(v) => setData('employee_id', v)} 
                                        error={errors.employee_id} 
                                        options={[{ value: '', label: '-- Select Employee --' }, ...(dropdownData?.employees?.map(e => ({ value: e.id, label: `${e.first_name} ${e.last_name} (${e.employee_id})` })) || [])]} 
                                        required 
                                    />
                                    <FormInput 
                                        label="Leave Type" 
                                        type="select" 
                                        value={data.leave_type_id} 
                                        onChange={(v) => setData('leave_type_id', v)} 
                                        error={errors.leave_type_id} 
                                        options={[{ value: '', label: '-- Select Leave Type --' }, ...(dropdownData?.leaveTypes?.map(lt => ({ value: lt.id, label: `${lt.name} (${lt.days_count} days)` })) || [])]} 
                                        required 
                                    />
                                   </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormInput label="Start Date" type="date" value={data.start_date} onChange={(v) => setData('start_date', v)} error={errors.start_date} required />
                                        <FormInput label="End Date" type="date" value={data.end_date} onChange={(v) => setData('end_date', v)} error={errors.end_date} required />
                                    </div>
                                    <FormInput 
                                        label="Reason for Leave" 
                                        type="textarea" 
                                        value={data.reason} 
                                        onChange={(v) => setData('reason', v)} 
                                        error={errors.reason} 
                                        placeholder="Please provide a detailed reason for your leave request..." 
                                        rows={4} 
                                        required 
                                    />
                                </div>
                            </div>
                        </div>

                 
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6 sticky top-6 space-y-6">
                                
                             
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                        <Paperclip className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Attachment (Optional)
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="flex gap-2">
                                            <button type="button" onClick={() => fileInputRef.current?.click()} className="flex-1 px-4 py-2 bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 border border-gray-200 dark:border-slate-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors">Choose File</button>
                                            <div className="flex-1 px-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-500 flex items-center truncate">
                                                {fileName}
                                            </div>
                                        </div>
                                        <input ref={fileInputRef} type="file" onChange={handleFileChange} className="hidden" />
                                        <p className="text-xs text-gray-500 dark:text-gray-400">PDF, JPG, or PNG. Max 2MB.</p>

                                        {fileName !== 'No file chosen' && (
                                            <div className="relative mt-3 p-3 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                                    <FileText className="w-4 h-4 text-primary-600" />
                                                    <span className="truncate max-w-[150px]">{fileName}</span>
                                                </div>
                                                <button type="button" onClick={removeFile} className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                        {errors.attachment && <p className="text-xs text-red-500 mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1" />{errors.attachment}</p>}
                                    </div>
                                </div>

                               
                                <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                        <FileText className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Status
                                    </h2>
                                    <FormInput label="Status" type="select" value={data.status} onChange={(v) => setData('status', v)} error={errors.status} options={STATUS_OPTIONS} required />
                                </div>

               
                                <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                                    <button type="submit" disabled={processing} className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:cursor-not-allowed">
                                        {processing ? 'Processing...' : <><Save className="w-5 h-5 mr-2" /> {isEdit ? 'Update Application' : 'Submit Application'}</>}
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