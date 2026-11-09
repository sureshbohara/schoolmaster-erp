import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import { useOrganizationForm } from '@/Hooks/useOrganizationForm';
import { STATUS_OPTIONS } from '@/Services/organizationService';
import { Building2, Save, X, AlertCircle, Loader2, ArrowLeft, Camera } from 'lucide-react';

export default function OrganizationForm({ organization }) {
    const isEdit = !!organization;
    
    const {
        data, setData, processing, errors,
        previewLogo, fileInputRef,
        handleLogoChange, removeLogo, submit
    } = useOrganizationForm(organization, isEdit);

    const breadcrumbItems = [
        { label: 'Dashboard', href: route('dashboard') },
        { label: 'Administration', href: route('organizations.index') },
    ];

    return (
        <AppLayout title={isEdit ? 'Edit Organization' : 'Create Organization'}>
            <Head title={isEdit ? 'Edit Organization' : 'Create Organization'} />

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Breadcrumb title="Administration" subTitle={isEdit ? 'Edit Organization' : 'Create Organization'} breadcrumbItems={breadcrumbItems} />
                    <Link href={route('organizations.index')} className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
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
                                        <Building2 className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Basic Information
                                    </h2>
                                    <div className="space-y-5">
                                        <FormInput label="Organization Name" value={data.name} onChange={(v) => setData('name', v)} error={errors.name} placeholder="School Name Pvt. Ltd." required />
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormInput label="Email Address" type="email" value={data.email} onChange={(v) => setData('email', v)} error={errors.email} placeholder="info@school.com" required />
                                            <FormInput label="Phone Number" value={data.phone} onChange={(v) => setData('phone', v)} error={errors.phone} placeholder="01-4XXXXXX" />
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormInput label="Website" type="text" value={data.website} onChange={(v) => setData('website', v)} error={errors.website} placeholder="www.school.com" />
                                            <FormInput label="Established Date" type="date" value={data.established_date} onChange={(v) => setData('established_date', v)} error={errors.established_date} />
                                        </div>
                                        
                                        <FormInput label="Address" type="textarea" value={data.address} onChange={(v) => setData('address', v)} error={errors.address} placeholder="Full physical address..." rows={7} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Status & Logo */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6 sticky top-6">
                                <div className="mb-8">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700">Organization Status</h2>
                                    <div className="space-y-5">
                                        <FormInput label="Status" type="select" value={data.status} onChange={(v) => setData('status', v)} error={errors.status} options={STATUS_OPTIONS} required />
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700">Organization Logo</h2>
                                    <div className="space-y-4">
                                        <div className="flex gap-2">
                                            <button type="button" onClick={() => fileInputRef.current?.click()} className="flex-1 px-4 py-2 bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 border border-gray-200 dark:border-slate-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors">
                                                Choose File
                                            </button>
                                            <div className="flex-1 px-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-500 flex items-center">
                                                {previewLogo ? 'File selected' : 'No file chosen'}
                                            </div>
                                        </div>
                                        
                                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or WEBP. Max 2MB.</p>

                                        {previewLogo ? (
                                            <div className="relative mt-3">
                                                <img src={previewLogo} alt="Logo Preview" className="w-full h-48 object-contain rounded-lg border-2 border-primary-200 dark:border-primary-800 bg-gray-50 dark:bg-slate-900" />
                                                <button type="button" onClick={removeLogo} className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="w-full h-48 bg-gray-100 dark:bg-slate-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-slate-600 flex items-center justify-center mt-3">
                                                <div className="text-center">
                                                    <div className="bg-primary-600 dark:bg-primary-700 w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center">
                                                        <Camera className="w-8 h-8 text-white" />
                                                    </div>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">No image uploaded</p>
                                                </div>
                                            </div>
                                        )}
                                        
                                        {errors.logo && (
                                            <p className="text-xs text-red-500 mt-1 flex items-center">
                                                <AlertCircle className="w-3 h-3 mr-1" />
                                                {errors.logo}
                                            </p>
                                        )}

                                        <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                                            <button type="submit" disabled={processing} className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:cursor-not-allowed">
                                                {processing ? (
                                                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> {isEdit ? 'Updating...' : 'Creating...'}</>
                                                ) : (
                                                    <><Save className="w-5 h-5 mr-2" /> {isEdit ? 'Update Organization' : 'Create Organization'}</>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}