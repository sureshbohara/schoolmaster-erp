import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import { useStudentForm } from '@/Hooks/useStudentForm';
import { STATUS_OPTIONS, GENDER_OPTIONS } from '@/Services/studentService';
import { User, Save, ArrowLeft, Camera, X, AlertCircle, Loader2, GraduationCap, Layers } from 'lucide-react';

export default function StudentForm({ student, dropdownData }) {
    const isEdit = !!student;
    const { data, setData, processing, errors, previewPhoto, fileInputRef, handlePhotoChange, removePhoto, submit } = useStudentForm(student, isEdit);

    const breadcrumbItems = [{ label: 'Dashboard', href: route('dashboard') }, { label: 'Students', href: route('students.index') }];

    const availableSections = dropdownData?.sections?.filter(s => !data.class_id || s.class_id == data.class_id) || [];

    return (
        <AppLayout title={isEdit ? 'Edit Student' : 'New Admission'}>
            <Head title={isEdit ? 'Edit Student' : 'New Admission'} />
            <div className="space-y-3">
                <div className="flex items-center justify-between">

                    <Breadcrumb title="Students" subTitle={isEdit ? 'Edit Student' : 'New Admission'} breadcrumbItems={breadcrumbItems} />

                    <Link href={route('students.index')} className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to List
                    </Link>
                </div>
                
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                   
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6 space-y-8">
                                
                  
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                        <GraduationCap className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Academic Information
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormInput label="Academic Year" type="select" value={data.academic_year_id} onChange={(v) => setData('academic_year_id', v)} error={errors.academic_year_id} options={[{ value: '', label: '-- Select Year --' }, ...(dropdownData?.academicYears?.map(y => ({ value: y.id, label: y.title })) || [])]} required />
                                        <FormInput label="Student Category" type="select" value={data.category_id} onChange={(v) => setData('category_id', v)} error={errors.category_id} options={[{ value: '', label: '-- Select Category --' }, ...(dropdownData?.categories?.map(c => ({ value: c.id, label: c.name })) || [])]} />
                                        <FormInput label="Class" type="select" value={data.class_id} onChange={(v) => { setData('class_id', v); setData('section_id', ''); }} error={errors.class_id} options={[{ value: '', label: '-- Select Class --' }, ...(dropdownData?.classes?.map(c => ({ value: c.id, label: c.name })) || [])]} required />
                                        <FormInput label="Section" type="select" value={data.section_id} onChange={(v) => setData('section_id', v)} error={errors.section_id} options={[{ value: '', label: '-- Select Section --' }, ...availableSections.map(s => ({ value: s.id, label: s.name }))]} required />
                                        <FormInput label="Admission No" value={data.admission_no} onChange={(v) => setData('admission_no', v)} error={errors.admission_no} placeholder="e.g., ADM-2024-001" required />
                                        <FormInput label="Registration No" value={data.registration_no} onChange={(v) => setData('registration_no', v)} error={errors.registration_no} placeholder="e.g., REG-001" />
                                        <FormInput label="Admission Date" type="date" value={data.admission_date} onChange={(v) => setData('admission_date', v)} error={errors.admission_date} required />
                                        <FormInput label="Email Address" type="email" value={data.email} onChange={(v) => setData('email', v)} error={errors.email} placeholder="student@email.com" />
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
                                        <FormInput label="Date of Birth" type="date" value={data.dob} onChange={(v) => setData('dob', v)} error={errors.dob} required />
                                        <FormInput label="Blood Group" value={data.blood_group} onChange={(v) => setData('blood_group', v)} error={errors.blood_group} placeholder="e.g., O+" />
                                        <FormInput label="Nationality" value={data.nationality} onChange={(v) => setData('nationality', v)} error={errors.nationality} placeholder="e.g., Nepali" />
                                        <FormInput label="Religion" value={data.religion} onChange={(v) => setData('religion', v)} error={errors.religion} placeholder="e.g., Hindu" />
                                        <FormInput label="Caste" value={data.caste} onChange={(v) => setData('caste', v)} error={errors.caste} placeholder="e.g., Brahmin" />
                                        <FormInput label="Mother Tongue" value={data.mother_tongue} onChange={(v) => setData('mother_tongue', v)} error={errors.mother_tongue} placeholder="e.g., Nepali" />
                                        <FormInput label="Previous School" value={data.previous_school} onChange={(v) => setData('previous_school', v)} error={errors.previous_school} placeholder="If applicable" />
                                    </div>
                                </div>

                   
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                        <User className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Parent & Guardian Information
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormInput label="Father's Name" value={data.father_name} onChange={(v) => setData('father_name', v)} error={errors.father_name} placeholder="Full Name" />
                                        <FormInput label="Mother's Name" value={data.mother_name} onChange={(v) => setData('mother_name', v)} error={errors.mother_name} placeholder="Full Name" />
                                        <FormInput label="Guardian's Name" value={data.guardian_name} onChange={(v) => setData('guardian_name', v)} error={errors.guardian_name} placeholder="Full Name" />
                                        <FormInput label="Guardian Relation" value={data.guardian_relation} onChange={(v) => setData('guardian_relation', v)} error={errors.guardian_relation} placeholder="e.g., Uncle" />
                                        <FormInput label="Contact Number" value={data.contact_number} onChange={(v) => setData('contact_number', v)} error={errors.contact_number} placeholder="Primary Phone" />
                                        <FormInput label="Emergency Contact" value={data.emergency_contact} onChange={(v) => setData('emergency_contact', v)} error={errors.emergency_contact} placeholder="Alternative Phone" />
                                    </div>
                                    
                                    <div className="mt-6">
                                        <FormInput label="Full Address" type="textarea" value={data.address} onChange={(v) => setData('address', v)} error={errors.address} placeholder="Tole, Ward, City" rows={3} />
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
                                        <Camera className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Student Photo
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="flex gap-2">
                                            <button type="button" onClick={() => fileInputRef.current?.click()} className="flex-1 px-4 py-2 bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 border border-gray-200 dark:border-slate-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors">Choose File</button>
                                            <div className="flex-1 px-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-500 flex items-center">
                                                {previewPhoto ? 'File selected' : 'No file chosen'}
                                            </div>
                                        </div>
                                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
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
                                        <Layers className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Settings
                                    </h2>
                                    <div className="space-y-4">
                                        <FormInput label="Status" type="select" value={data.status} onChange={(v) => setData('status', v)} error={errors.status} options={STATUS_OPTIONS} required />
                                        
                                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Transport User</span>
                                            <input type="checkbox" checked={data.is_transport_user} onChange={(e) => setData('is_transport_user', e.target.checked)} className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500" />
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Hostel User</span>
                                            <input type="checkbox" checked={data.is_hostel_user} onChange={(e) => setData('is_hostel_user', e.target.checked)} className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500" />
                                        </div>
                                    </div>
                                </div>

                 
                                <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                                    <button type="submit" disabled={processing} className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:cursor-not-allowed">
                                        {processing ? (
                                            <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> {isEdit ? 'Updating...' : 'Saving...'}</>
                                        ) : (
                                            <><Save className="w-5 h-5 mr-2" /> {isEdit ? 'Update Student' : 'Admit Student'}</>
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