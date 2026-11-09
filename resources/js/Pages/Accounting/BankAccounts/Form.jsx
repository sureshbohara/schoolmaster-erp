import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import { useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { Landmark, Save, ArrowLeft, Info } from 'lucide-react';

export default function BankAccountForm({ account }) {
    const isEdit = !!account;

    const { data, setData, post, processing, errors } = useForm({
        bank_name: account?.bank_name || '',
        account_name: account?.account_name || '',
        account_number: account?.account_number || '',
        branch_name: account?.branch_name || '',
        initial_balance: account?.initial_balance || '',
        _method: isEdit ? 'PUT' : 'POST',
    });

    const submit = (e) => {
        e.preventDefault();
        const url = isEdit ? route('accounting.bank-accounts.update', account.id) : route('accounting.bank-accounts.store');
        post(url, {
            onError: (err) => toast.error(Object.values(err)[0], { icon: '❌' }),
            preserveScroll: true,
        });
    };

    return (
        <AppLayout title={isEdit ? 'Edit Bank Account' : 'Add Bank Account'}>
            <Head title={isEdit ? 'Edit Bank Account' : 'Add Bank Account'} />
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Breadcrumb title="Accounting" subTitle={isEdit ? 'Edit Bank Account' : 'Add Bank Account'} breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }, { label: 'Bank Accounts', href: route('accounting.bank-accounts.index') }]} />
                    <Link href={route('accounting.bank-accounts.index')} className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to List
                    </Link>
                </div>

                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                    <Landmark className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Bank Account Details
                                </h2>

                                <div className="mb-5 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex gap-2">
                                    <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-blue-700 dark:text-blue-300">
                                        Enter the bank account details carefully. The initial balance will be set as the current balance upon creation.
                                    </p>
                                </div>

                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormInput label="Bank Name" value={data.bank_name} onChange={(v) => setData('bank_name', v)} error={errors.bank_name} placeholder="e.g., Nabil Bank" required />
                                        <FormInput label="Branch Name" value={data.branch_name} onChange={(v) => setData('branch_name', v)} error={errors.branch_name} placeholder="e.g., Putalisadak Branch" />
                                    </div>
                                    <FormInput label="Account Name" value={data.account_name} onChange={(v) => setData('account_name', v)} error={errors.account_name} placeholder="Name as per bank records" required />
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormInput label="Account Number" value={data.account_number} onChange={(v) => setData('account_number', v)} error={errors.account_number} placeholder="e.g., 01234567890" required />
                                    <FormInput label="Initial Balance (Rs.)" type="number" value={data.initial_balance} onChange={(v) => setData('initial_balance', v)} error={errors.initial_balance} placeholder="0.00" />
                                  </div>
                              </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6 sticky top-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700">Summary</h2>
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Bank</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{data.bank_name || '—'}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Account No</span>
                                        <span className="font-mono text-gray-900 dark:text-white">{data.account_number || '—'}</span>
                                    </div>
                                    <div className="pt-3 border-t border-gray-200 dark:border-slate-700 flex justify-between">
                                        <span className="text-base font-semibold text-gray-900 dark:text-white">Initial Balance</span>
                                        <span className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">
                                            Rs. {new Intl.NumberFormat('en-NP', { maximumFractionDigits: 2 }).format(parseFloat(data.initial_balance) || 0)}
                                        </span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                                    <button type="submit" disabled={processing} className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:cursor-not-allowed">
                                        {processing ? 'Processing...' : <><Save className="w-5 h-5 mr-2" /> {isEdit ? 'Update Account' : 'Create Account'}</>}
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