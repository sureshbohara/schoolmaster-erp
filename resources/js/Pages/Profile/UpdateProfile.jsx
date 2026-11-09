import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import { useProfileForm } from '@/Hooks/useProfileForm';
import { GENDER_OPTIONS } from '@/Services/profileService';
import { User, Mail, Phone, FileText, Camera, Save, X, AlertCircle, Loader2 } from 'lucide-react';

export default function UpdateProfile({ user }) {
    const {
        data, setData, processing, errors,
        previewImage, fileInputRef,
        handleImageChange, removeImage, submit, flash
    } = useProfileForm(user);

    const breadcrumbItems = [
        { label: 'Dashboard', href: route('dashboard') },
        { label: 'Profile', href: route('profile.edit') },
    ];

    return (
        <AppLayout title="Update Profile">
            <Head title="Update Profile - SchoolMaster ERP" />

            <div className="space-y-3">
                <Breadcrumb title="Profile" subTitle="Update Profile" breadcrumbItems={breadcrumbItems} />

                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                       
                        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                <User className="w-5 h-5 mr-2 text-emerald-600 dark:text-emerald-400" />
                                Personal Information
                            </h2>
                            
                            <div className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <FormInput
                                        label="First Name"
                                        value={data.first_name}
                                        onChange={(v) => setData('first_name', v)}
                                        error={errors.first_name}
                                        icon={User}
                                        placeholder="John"
                                        required
                                    />

                                    <FormInput
                                        label="Last Name"
                                        value={data.last_name}
                                        onChange={(v) => setData('last_name', v)}
                                        error={errors.last_name}
                                        icon={User}
                                        placeholder="Doe"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormInput
                                        label="Username"
                                        value={data.username}
                                        onChange={(v) => setData('username', v)}
                                        error={errors.username}
                                        icon={User}
                                        placeholder="johndoe123"
                                        required
                                    />
                                    <FormInput
                                        label="Email Address"
                                        type="email"
                                        value={data.email}
                                        disabled
                                        icon={Mail}
                                    />
                                </div>


                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormInput
                                        label="Mobile Number"
                                        value={data.phone}
                                        onChange={(v) => setData('phone', v)}
                                        error={errors.phone}
                                        icon={Phone}
                                        placeholder="98XXXXXXXX"
                                    />
                                    <FormInput
                                        label="Gender"
                                        type="select"
                                        value={data.gender}
                                        onChange={(v) => setData('gender', v)}
                                        error={errors.gender}
                                        icon={User}
                                        options={GENDER_OPTIONS}
                                        required
                                    />
                                </div>
                                

                                <FormInput
                                    label="Details / Bio"
                                    type="textarea"
                                    value={data.bio}
                                    onChange={(v) => setData('bio', v)}
                                    error={errors.bio}
                                    icon={FileText}
                                    placeholder="Tell us about yourself..."
                                    rows={4}
                                />
                            </div>
                        </div>

                      
                        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                <Camera className="w-5 h-5 mr-2 text-emerald-600 dark:text-emerald-400" />
                                Profile Image
                            </h2>

                            <div className="space-y-6">
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex-1 px-4 py-2 bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 border border-gray-200 dark:border-slate-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors"
                                    >
                                        Choose File
                                    </button>
                                    <div className="flex-1 px-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-500 flex items-center">
                                        {previewImage ? 'File selected' : 'No file chosen'}
                                    </div>
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
                                        <img src={previewImage} alt="Profile Preview" className="w-full h-48 object-cover rounded-lg border-2 border-emerald-200 dark:border-emerald-800" />
                                        <button type="button" onClick={removeImage} className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="w-full h-48 bg-gray-100 dark:bg-slate-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-slate-600 flex items-center justify-center mt-3">
                                        <div className="text-center">
                                            <div className="bg-emerald-600 dark:bg-emerald-700 w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center">
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

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:cursor-not-allowed"
                                >
                                    {processing ? (
                                        <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Saving Changes...</>
                                    ) : (
                                        <><Save className="w-5 h-5 mr-2" /> Save Changes</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}