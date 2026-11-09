import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import { 
    Key, Lock, Save, 
    AlertCircle, Loader2, Shield, Check
} from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useForm, usePage } from '@inertiajs/react';

export default function UpdatePassword() {
    const { flash } = usePage().props;
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const { data, setData, put, processing, errors, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
        _method: 'PUT',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('profile.password.update'), {
            onSuccess: () => {
                reset('current_password', 'password', 'password_confirmation');
            },
            onError: (errors) => {
                toast.error(Object.values(errors)[0] || 'Failed to update password', {
                    duration: 4000,
                    icon: '❌',
                });
            },
            preserveScroll: true,
        });
    };

    const checks = [
        { 
            label: 'New password must be at least 8 characters', 
            met: (data.password?.length || 0) >= 8 
        },
        { 
            label: 'Must include letters and numbers', 
            met: /[a-zA-Z]/.test(data.password || '') && /[0-9]/.test(data.password || '') 
        },
        { 
            label: 'Confirm by re-typing the new password', 
            met: data.password && data.password_confirmation && data.password === data.password_confirmation 
        },
        { 
            label: 'New password must be different from current', 
            met: data.password && data.current_password && data.password !== data.current_password 
        },
    ];

    const breadcrumbItems = [
        { label: 'Dashboard', href: route('dashboard') },
        { label: 'Password', href: '#' },
    ];

    return (
        <AppLayout title="Update Password">
            <Head title="Update Password - SchoolMaster ERP" />

            <div className="space-y-3">
                <Breadcrumb title="Password" subTitle="Update Password" breadcrumbItems={breadcrumbItems} />

                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        
                        {/* Password Fields */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                <Key className="w-5 h-5 mr-2 text-emerald-600 dark:text-emerald-400" />
                                Password Fields
                            </h2>

                            <div className="space-y-5">
                                <FormInput
                                    label="Current Password"
                                    type="password"
                                    value={data.current_password}
                                    onChange={(v) => setData('current_password', v)}
                                    error={errors.current_password}
                                    showPassword={showCurrent}
                                    onTogglePassword={() => setShowCurrent(!showCurrent)}
                                    placeholder="Enter your current password"
                                    autoComplete="current-password"
                                    required
                                />

                                <FormInput
                                    label="New Password"
                                    type="password"
                                    value={data.password}
                                    onChange={(v) => setData('password', v)}
                                    error={errors.password}
                                    showPassword={showNew}
                                    onTogglePassword={() => setShowNew(!showNew)}
                                    placeholder="Minimum 8 characters"
                                    autoComplete="new-password"
                                    required
                                />

                                <FormInput
                                    label="Confirm Password"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(v) => setData('password_confirmation', v)}
                                    error={errors.password_confirmation}
                                    showPassword={showConfirm}
                                    onTogglePassword={() => setShowConfirm(!showConfirm)}
                                    placeholder="Re-enter new password"
                                    autoComplete="new-password"
                                    required
                                />

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all mt-6 disabled:cursor-not-allowed"
                                >
                                    {processing ? (
                                        <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Saving & Updating...</>
                                    ) : (
                                        <><Save className="w-5 h-5 mr-2" /> Save & Update</>
                                    )}
                                </button>
                            </div>
                        </div>

                     
                        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                <Shield className="w-5 h-5 mr-2 text-emerald-600 dark:text-emerald-400" />
                                Password Requirements
                            </h2>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                                    <Key className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-gray-700 dark:text-gray-200">
                                        Enter your <strong>current password</strong> to verify it's you.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    {checks.map((check, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-center p-3 rounded-lg border transition-all ${
                                                check.met 
                                                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                                                    : 'bg-gray-50 dark:bg-slate-700/30 border-gray-200 dark:border-slate-700'
                                            }`}
                                        >
                                            <div className={`w-5 h-5 rounded flex items-center justify-center mr-3 flex-shrink-0 ${
                                                check.met ? 'bg-green-500' : 'bg-gray-300 dark:bg-slate-600'
                                            }`}>
                                                {check.met && <Check className="w-3.5 h-3.5 text-white" />}
                                            </div>
                                            <span className={`text-sm ${
                                                check.met ? 'text-green-700 dark:text-green-300 font-medium' : 'text-gray-600 dark:text-gray-400'
                                            }`}>
                                                {check.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                                    <div className="flex items-start space-x-3">
                                        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">Important Security Notice</p>
                                            <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                                                Make sure your new password is strong and unique. Never share your password with anyone.
                                            </p>
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