import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import { useForm } from '@inertiajs/react';
import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { TrendingDown, Save, ArrowLeft, Paperclip, X, AlertCircle, Info } from 'lucide-react';

export default function ExpenseForm({ expense, heads }) {
    const isEdit = !!expense;
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState(expense?.attachment_url ? 'File attached' : 'No file chosen');

    const { data, setData, post, processing, errors } = useForm({
        head_id: expense?.head?.id || '',
        amount: expense?.amount || '',
        date: expense?.date || new Date().toISOString().split('T')[0],
        description: expense?.description || '',
        attachment: null,
        _method: isEdit ? 'PUT' : 'POST',
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error('Attachment size must be less than 2MB');
                return;
            }
            setData('attachment', file);
            setFileName(file.name);
        }
    };

    const removeFile = () => {
        setData('attachment', null);
        setFileName('No file chosen');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const submit = (e) => {
        e.preventDefault();
        const url = isEdit ? route('accounting.expenses.update', expense.id) : route('accounting.expenses.store');
        post(url, {
            onSuccess: () => {
                if (!isEdit) {
                    setFileName('No file chosen');
                }
            },
            onError: (err) => toast.error(Object.values(err)[0], { icon: '❌' }),
            preserveScroll: true,
        });
    };

    return (
        <AppLayout title={isEdit ? 'Edit Expense' : 'Record Expense'}>
            <Head title={isEdit ? 'Edit Expense' : 'Record Expense'} />
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Breadcrumb title="Accounting" subTitle={isEdit ? 'Edit Expense' : 'Record Expense'} breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }, { label: 'Expenses', href: route('accounting.expenses.index') }]} />
                    <Link href={route('accounting.expenses.index')} className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to List
                    </Link>
                </div>

                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                    <TrendingDown className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Expense Details
                                </h2>

                                <div className="mb-5 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex gap-2">
                                    <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-blue-700 dark:text-blue-300">
                                        Record a new expense entry. A unique voucher number will be auto-generated (e.g., VCH-000001).
                                    </p>
                                </div>

                                <div className="space-y-5">
                                    <FormInput 
                                        label="Expense Head" 
                                        type="select" 
                                        value={data.head_id} 
                                        onChange={(v) => setData('head_id', v)} 
                                        error={errors.head_id} 
                                        options={[
                                            { value: '', label: '-- Select Expense Head --' },
                                            ...(heads?.map(h => ({ value: h.id, label: h.name })) || [])
                                        ]} 
                                        required 
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormInput 
                                            label="Amount (Rs.)" 
                                            type="number" 
                                            value={data.amount} 
                                            onChange={(v) => setData('amount', v)} 
                                            error={errors.amount} 
                                            placeholder="0.00" 
                                            required 
                                        />
                                        <FormInput 
                                            label="Date" 
                                            type="date" 
                                            value={data.date} 
                                            onChange={(v) => setData('date', v)} 
                                            error={errors.date} 
                                            required 
                                        />
                                    </div>

                                    <FormInput 
                                        label="Description" 
                                        type="textarea" 
                                        value={data.description} 
                                        onChange={(v) => setData('description', v)} 
                                        error={errors.description} 
                                        placeholder="Brief description of the expense..." 
                                        rows={4} 
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
                                            <button type="button" onClick={() => fileInputRef.current?.click()} className="flex-1 px-4 py-2 bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 border border-gray-200 dark:border-slate-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors">
                                                Choose File
                                            </button>
                                            <div className="flex-1 px-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-500 flex items-center truncate">
                                                {fileName}
                                            </div>
                                        </div>
                                        <input ref={fileInputRef} type="file" onChange={handleFileChange} className="hidden" />
                                        <p className="text-xs text-gray-500 dark:text-gray-400">PDF, JPG, or PNG. Max 2MB.</p>

                                        {fileName !== 'No file chosen' && (
                                            <div className="relative p-3 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 flex items-center justify-between">
                                                <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[150px]">{fileName}</span>
                                                <button type="button" onClick={removeFile} className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                        {errors.attachment && <p className="text-xs text-red-500 mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1" />{errors.attachment}</p>}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                                    <button type="submit" disabled={processing} className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:cursor-not-allowed">
                                        {processing ? 'Processing...' : <><Save className="w-5 h-5 mr-2" /> {isEdit ? 'Update Expense' : 'Record Expense'}</>}
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