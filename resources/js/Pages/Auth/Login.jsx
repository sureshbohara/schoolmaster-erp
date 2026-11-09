import { useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { School, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
    e.preventDefault();
       post(route('login'), {
        onError: (errors) => {
            toast.error(errors.email || 'Invalid credentials!');
        },
        onSuccess: () => {
            toast.success('Login successful! Welcome back.');
        }
    });
};

    return (
        <>
            <Head title="Log in - SchoolMaster ERP" />
            
          
            <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full">
                    
                  
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl shadow-lg mb-4">
                            <School className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">SchoolMaster ERP</h1>
                        <p className="text-gray-500 mt-2">Welcome back! Please sign in to your account.</p>
                    </div>

                
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">

                        <form onSubmit={submit} className="space-y-6">
                     
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors duration-200" />
                                    </div>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200 outline-none"
                                        placeholder="admin@example.com"
                                        required
                                        autoFocus
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-500 flex items-center">
                                        <span className="mr-1">⚠️</span> {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors duration-200" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200 outline-none"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-500 flex items-center">
                                        <span className="mr-1">⚠️</span> {errors.password}
                                    </p>
                                )}
                            </div>

                   
                            <div className="flex items-center justify-between">
                                <label className="flex items-center cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 transition cursor-pointer"
                                    />
                                    <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">Remember me</span>
                                </label>
                                
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline transition-colors"
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>

                           
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign in to Dashboard'
                                )}
                            </button>
                        </form>
                    </div>

             
                    <p className="text-center text-sm text-gray-500 mt-8">
                        Default login: <code className="bg-white px-2 py-1 rounded-md border border-gray-200 text-primary-700 font-mono text-xs shadow-sm">admin@example.com</code> / <code className="bg-white px-2 py-1 rounded-md border border-gray-200 text-primary-700 font-mono text-xs shadow-sm">password123</code>
                    </p>
                </div>
            </div>
        </>
    );
}