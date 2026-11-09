import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import { useUserForm } from '@/Hooks/useUserForm';
import { GENDER_OPTIONS } from '@/Services/userService';
import { 
    Camera, Save, X, 
    AlertCircle, Loader2, ArrowLeft
} from 'lucide-react';

export default function UserForm({ user, dropdownData }) {
    const isEdit = !!user;
    const {
        data, setData, processing, errors,
        previewImage, fileInputRef,
        handleImageChange, removeImage, submit
    } = useUserForm(user, isEdit);

    const breadcrumbItems = [
        { label: 'Dashboard', href: route('dashboard') },
        { label: 'Administration', href: route('users.index') },
    ];
    
    const filteredBranches = dropdownData?.branches?.filter(
        (b) => !data.organization_id || b.organization_id == data.organization_id
    ) || [];

    return (
        <AppLayout title={isEdit ? 'Edit User' : 'Create User'}>
            <Head title={isEdit ? 'Edit User - SchoolMaster ERP' : 'Create User - SchoolMaster ERP'} />

            <div className="space-y-3">

                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <Breadcrumb 
                        title="Users" 
                        subTitle={isEdit ? 'Edit User' : 'Create User'} 
                        breadcrumbItems={breadcrumbItems} 
                    />
                    <Link
                        href={route('users.index')}
                        className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Users
                    </Link>
                </div>
                
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                 
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
                                
                              
                                <div className="mb-8">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700">
                                        Personal Information
                                    </h2>
                                    <div className="space-y-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormInput label="First Name" value={data.first_name} onChange={(v) => setData('first_name', v)} error={errors.first_name} placeholder="John" required />
                                            <FormInput label="Last Name" value={data.last_name} onChange={(v) => setData('last_name', v)} error={errors.last_name} placeholder="Doe" required />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormInput label="Username" value={data.username} onChange={(v) => setData('username', v)} error={errors.username} placeholder="johndoe123" required />
                                            <FormInput label="Email Address" type="email" value={data.email} onChange={(v) => setData('email', v)} error={errors.email} placeholder="john@example.com" required />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormInput label="Mobile Number" value={data.phone} onChange={(v) => setData('phone', v)} error={errors.phone} placeholder="98XXXXXXXX" />
                                            <FormInput label="Gender" type="select" value={data.gender} onChange={(v) => setData('gender', v)} error={errors.gender} options={GENDER_OPTIONS} required />
                                        </div>

                                        <FormInput label="Bio / About" type="textarea" value={data.bio} onChange={(v) => setData('bio', v)} error={errors.bio} placeholder="Tell us about this user..." rows={7} />
                                    </div>
                                </div>

                         
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700">
                                        Account & Security
                                    </h2>
                                    <div className="space-y-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormInput 
                                                label={isEdit ? "New Password (leave blank to keep current)" : "Password"} 
                                                type="password" 
                                                value={data.password} 
                                                onChange={(v) => setData('password', v)} 
                                                error={errors.password} 
                                                placeholder={isEdit ? "Leave blank to keep current" : "Minimum 8 characters"} 
                                                required={!isEdit} 
                                            />
                                            <FormInput 
                                                label="Confirm Password" 
                                                type="password" 
                                                value={data.password_confirmation} 
                                                onChange={(v) => setData('password_confirmation', v)} 
                                                error={errors.password_confirmation} 
                                                placeholder="Re-enter password" 
                                                required={!isEdit} 
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

           
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6 sticky top-6">
                                
               
                                <div className="mb-8">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700">
                                        Organization & Role
                                    </h2>
                                    <div className="space-y-5">
                                        <FormInput
                                            label="Organization"
                                            type="select"
                                            value={data.organization_id}
                                            onChange={(v) => {
                                                setData('organization_id', v);
                                                setData('branch_id', ''); 
                                            }}
                                            error={errors.organization_id}
                                            options={[
                                                { value: '', label: '-- Select Organization --' },
                                                ...(dropdownData?.organizations?.map(org => ({ value: org.id, label: org.name })) || [])
                                            ]}
                                        />
                                        <FormInput
                                            label="Branch"
                                            type="select"
                                            value={data.branch_id}
                                            onChange={(v) => setData('branch_id', v)}
                                            error={errors.branch_id}
                                            options={[
                                                { value: '', label: '-- Select Branch --' },
                                                ...filteredBranches.map(branch => ({ value: branch.id, label: branch.name }))
                                            ]}
                                        />
                                        <FormInput
                                            label="Role"
                                            type="select"
                                            value={data.role_id}
                                            onChange={(v) => setData('role_id', v)}
                                            error={errors.role_id}
                                            options={[
                                                { value: '', label: '-- Select Role --' },
                                                ...(dropdownData?.roles?.map(role => ({ value: role.id, label: role.name })) || [])
                                            ]}
                                            required
                                        />
                                    </div>
                                </div>

             
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700">
                                        Profile Image
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="flex-1 px-4 py-2 bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 border border-gray-200 dark:border-slate-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors"
                                            >
                                                Choose File
                                            </button>
                                        </div>
                                        
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                        
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            PNG, JPG or WEBP. Max 2MB.
                                        </p>

                                        {previewImage ? (
                                            <div className="relative mt-3">
                                                <img src={previewImage} alt="Profile Preview" className="w-full h-48 object-cover rounded-lg border-2 border-primary-200 dark:border-primary-800" />
                                                <button type="button" onClick={removeImage} className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
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
                                        
                                        {errors.image && (
                                            <p className="text-xs text-red-500 mt-1 flex items-center">
                                                <AlertCircle className="w-3 h-3 mr-1" />
                                                {errors.image}
                                            </p>
                                        )}

                                        <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:cursor-not-allowed"
                                            >
                                                {processing ? (
                                                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> {isEdit ? 'Updating...' : 'Creating...'}</>
                                                ) : (
                                                    <><Save className="w-5 h-5 mr-2" /> {isEdit ? 'Update User' : 'Create User'}</>
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