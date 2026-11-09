import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';

export default function Forbidden({ message }) {
    return (
        <AppLayout title="Access Denied">
            <Head title="403 - Access Denied" />
            
            <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
                <div className="bg-red-100 dark:bg-red-900/30 p-6 rounded-full mb-6 animate-pulse">
                    <ShieldAlert className="w-16 h-16 text-red-600 dark:text-red-400" />
                </div>

                <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-2">403</h1>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Access Denied</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8 text-lg">
                    {message || "Sorry, you do not have the necessary permissions to view this page or perform this action."}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        href={route('dashboard')}
                        className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Link>
                    
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center px-6 py-3 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go Back
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}