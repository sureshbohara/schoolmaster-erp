import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import { useEmployeeForm } from '@/Hooks/useEmployeeForm';
import { STATUS_OPTIONS, GENDER_OPTIONS, MARITAL_STATUS_OPTIONS } from '@/Services/employeeService';
import { 
    User, Save, ArrowLeft, Camera, X, AlertCircle, Loader2, 
    Briefcase, Building2, CreditCard, Phone, FileText
} from 'lucide-react';

export default function EmployeeForm({ employee, dropdownData }) {
    const isEdit = !!employee;
    const { 
        data, setData, processing, errors, 
        previewPhoto, previewSignature,
        photoInputRef, signatureInputRef,
        handlePhotoChange, handleSignatureChange,
        removePhoto, removeSignature,
        submit 
    } = useEmployeeForm(employee, isEdit);

    const breadcrumbItems = [{ label: 'Dashboard', href: route('dashboard') }, { label: 'HR', href: route('hr.employees.index') }];
    const availableDesignations = dropdownData?.designations?.filter(d => !data.department_id || d.department_id == data.department_id) || [];

    return (
        <AppLayout title={isEdit ? 'Edit Employee' : 'Add Employee'}>
            <Head title={isEdit ? 'Edit Employee' : 'Add Employee'} />
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Breadcrumb title="Human Resource" subTitle={isEdit ? 'Edit Employee' : 'Add Employee'} breadcrumbItems={breadcrumbItems} />
                    <Link href={route('hr.employees.index')} className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to List
                    </Link>
                </div>
                
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                   
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6 space-y-8">
                                
                      
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                        <Briefcase className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Job Information
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormInput label="Employee ID" value={data.employee_id} onChange={(v) => setData('employee_id', v)} error={errors.employee_id} placeholder="e.g., EMP-001" required />
                                        <FormInput label="Department" type="select" value={data.department_id} onChange={(v) => { setData('department_id', v); setData('designation_id', ''); }} error={errors.department_id} options={[{ value: '', label: '-- Select Department --' }, ...(dropdownData?.departments?.map(d => ({ value: d.id, label: d.name })) || [])]} required />
                                        <FormInput label="Designation" type="select" value={data.designation_id} onChange={(v) => setData('designation_id', v)} error={errors.designation_id} options={[{ value: '', label: '-- Select Designation --' }, ...availableDesignations.map(d => ({ value: d.id, label: d.name }))]} required />
                                        <FormInput label="Joining Date" type="date" value={data.joining_date} onChange={(v) => setData('joining_date', v)} error={errors.joining_date} required />
                                        <FormInput label="Contract End Date" type="date" value={data.contract_end_date} onChange={(v) => setData('contract_end_date', v)} error={errors.contract_end_date} />
                                        <FormInput label="Basic Salary" type="number" value={data.basic_salary} onChange={(v) => setData('basic_salary', v)} error={errors.basic_salary} placeholder="e.g., 50000" />
                                        <FormInput label="Qualification" value={data.qualification} onChange={(v) => setData('qualification', v)} error={errors.qualification} placeholder="e.g., M.Ed, B.Sc" />
                                        <FormInput label="Experience (Years)" type="number" value={data.experience_years} onChange={(v) => setData('experience_years', v)} error={errors.experience_years} placeholder="e.g., 5" />
                                    </div>
                                </div>

                          
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                        <User className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Personal Information
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormInput label="First Name" value={data.first_name} onChange={(v) => setData('first_name', v)} error={errors.first_name} placeholder="First Name" required />
                                        <FormInput label="Last Name" value={data.last_name} onChange={(v) => setData('last_name', v)} error={errors.last_name} placeholder="Last Name" required />
                                        <FormInput label="Gender" type="select" value={data.gender} onChange={(v) => setData('gender', v)} error={errors.gender} options={GENDER_OPTIONS} required />
                                        <FormInput label="Date of Birth" type="date" value={data.dob} onChange={(v) => setData('dob', v)} error={errors.dob} />
                                        <FormInput label="Blood Group" value={data.blood_group} onChange={(v) => setData('blood_group', v)} error={errors.blood_group} placeholder="e.g., O+" />
                                        <FormInput label="Nationality" value={data.nationality} onChange={(v) => setData('nationality', v)} error={errors.nationality} placeholder="e.g., Nepali" />
                                        <FormInput label="Religion" value={data.religion} onChange={(v) => setData('religion', v)} error={errors.religion} placeholder="e.g., Hindu" />
                                        <FormInput label="Marital Status" type="select" value={data.marital_status} onChange={(v) => setData('marital_status', v)} error={errors.marital_status} options={MARITAL_STATUS_OPTIONS} />
                                        <FormInput label="Father's Name" value={data.father_name} onChange={(v) => setData('father_name', v)} error={errors.father_name} placeholder="Full Name" />
                                        <FormInput label="Mother's Name" value={data.mother_name} onChange={(v) => setData('mother_name', v)} error={errors.mother_name} placeholder="Full Name" />
                                        <FormInput label="Spouse Name" value={data.spouse_name} onChange={(v) => setData('spouse_name', v)} error={errors.spouse_name} placeholder="Full Name" />
                                    </div>
                                </div>

                            
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                        <CreditCard className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Bank Details
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormInput label="Bank Name" value={data.bank_name} onChange={(v) => setData('bank_name', v)} error={errors.bank_name} placeholder="e.g., Nabil Bank" />
                                        <FormInput label="Account Number" value={data.bank_account} onChange={(v) => setData('bank_account', v)} error={errors.bank_account} placeholder="Account Number" />
                                        <FormInput label="Branch" value={data.bank_branch} onChange={(v) => setData('bank_branch', v)} error={errors.bank_branch} placeholder="Branch Name" />
                                        <FormInput label="IFSC Code" value={data.ifsc_code} onChange={(v) => setData('ifsc_code', v)} error={errors.ifsc_code} placeholder="IFSC Code" />
                                        <FormInput label="PAN Number" value={data.pan_number} onChange={(v) => setData('pan_number', v)} error={errors.pan_number} placeholder="PAN Number" />
                                        <FormInput label="PF Number" value={data.pf_number} onChange={(v) => setData('pf_number', v)} error={errors.pf_number} placeholder="PF Number" />
                                        <FormInput label="ESI Number" value={data.esi_number} onChange={(v) => setData('esi_number', v)} error={errors.esi_number} placeholder="ESI Number" />
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                        <Phone className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Contact Information
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormInput label="Phone Number" value={data.phone} onChange={(v) => setData('phone', v)} error={errors.phone} placeholder="Primary Phone" />
                                        <FormInput label="Emergency Contact" value={data.emergency_contact} onChange={(v) => setData('emergency_contact', v)} error={errors.emergency_contact} placeholder="Emergency Phone" />
                                    </div>
                                    <div className="mt-4">
                                        <FormInput label="Address" type="textarea" value={data.address} onChange={(v) => setData('address', v)} error={errors.address} placeholder="Tole, Ward, City" rows={3} />
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                            <FormInput label="City" value={data.city} onChange={(v) => setData('city', v)} error={errors.city} placeholder="City" />
                                            <FormInput label="State" value={data.state} onChange={(v) => setData('state', v)} error={errors.state} placeholder="State" />
                                            <FormInput label="Zip Code" value={data.zip_code} onChange={(v) => setData('zip_code', v)} error={errors.zip_code} placeholder="Zip" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                   
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6 sticky top-4 space-y-6">
                                
                               
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                        <Camera className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Photo
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="flex gap-2">
                                            <button type="button" onClick={() => photoInputRef.current?.click()} className="flex-1 px-4 py-2 bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 border border-gray-200 dark:border-slate-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors">Choose File</button>
                                            <div className="flex-1 px-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-500 flex items-center">
                                                {previewPhoto ? 'File selected' : 'No file chosen'}
                                            </div>
                                        </div>
                                        <input ref={photoInputRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG. Max 2MB.</p>

                                        {previewPhoto ? (
                                            <div className="relative mt-3">
                                                <img src={previewPhoto} alt="Photo Preview" className="w-full h-48 object-cover rounded-lg border-2 border-primary-200 dark:border-primary-800 bg-gray-50 dark:bg-slate-900" />
                                                <button type="button" onClick={removePhoto} className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"><X className="w-4 h-4" /></button>
                                            </div>
                                        ) : (
                                            <div className="w-full h-48 bg-gray-100 dark:bg-slate-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-slate-600 flex items-center justify-center mt-3">
                                                <div className="text-center">
                                                    <div className="bg-primary-600 dark:bg-primary-700 w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center">
                                                        <User className="w-8 h-8 text-white" />
                                                    </div>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">No photo uploaded</p>
                                                </div>
                                            </div>
                                        )}
                                        {errors.photo && <p className="text-xs text-red-500 mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1" />{errors.photo}</p>}
                                    </div>
                                </div>

                            
                                <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                        <FileText className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Signature
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="flex gap-2">
                                            <button type="button" onClick={() => signatureInputRef.current?.click()} className="flex-1 px-4 py-2 bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 border border-gray-200 dark:border-slate-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors">Choose File</button>
                                            <div className="flex-1 px-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-500 flex items-center">
                                                {previewSignature ? 'File selected' : 'No file chosen'}
                                            </div>
                                        </div>
                                        <input ref={signatureInputRef} type="file" accept="image/*" onChange={handleSignatureChange} className="hidden" />
                                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG. Max 1MB.</p>

                                        {previewSignature ? (
                                            <div className="relative mt-3 py-4">
                                                <img src={previewSignature} alt="Signature Preview" className="w-full h-32 object-contain rounded-lg border-2 border-primary-200 dark:border-primary-800 bg-gray-50 dark:bg-slate-900" />
                                                <button type="button" onClick={removeSignature} className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"><X className="w-4 h-4" /></button>
                                            </div>
                                        ) : (
                                            <div className="w-full py-4 h-32 bg-gray-100 dark:bg-slate-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-slate-600 flex items-center justify-center mt-3">
                                                <div className="text-center">
                                                    <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">No signature uploaded</p>
                                                </div>
                                            </div>
                                        )}
                                        {errors.signature && <p className="text-xs text-red-500 mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1" />{errors.signature}</p>}
                                    </div>
                                </div>

                          
                                <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                        <Building2 className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Settings
                                    </h2>
                                    <div className="space-y-4">
                                        <FormInput label="Status" type="select" value={data.status} onChange={(v) => setData('status', v)} error={errors.status} options={STATUS_OPTIONS} required />
                                        
                                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Teaching Staff</span>
                                            <input type="checkbox" checked={data.is_teaching_staff} onChange={(e) => setData('is_teaching_staff', e.target.checked)} className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500" />
                                        </div>
                                    </div>
                                </div>

                          
                                <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                                    <button type="submit" disabled={processing} className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:cursor-not-allowed">
                                        {processing ? (
                                            <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> {isEdit ? 'Updating...' : 'Saving...'}</>
                                        ) : (
                                            <><Save className="w-5 h-5 mr-2" /> {isEdit ? 'Update Employee' : 'Add Employee'}</>
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