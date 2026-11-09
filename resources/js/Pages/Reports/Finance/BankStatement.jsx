import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { Landmark, Wallet } from 'lucide-react';

export default function BankStatement({ accounts, totalBalance }) {
    return (
        <AppLayout title="Bank Statement">
            <Head title="Bank Statement" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Finance Reports" subTitle="Bank Statement" breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }, { label: 'Reports', href: route('reports.index') }, { label: 'Finance', href: route('reports.finance.index') }]} />
                </div>

                {/* Total Balance Card */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100 text-sm font-medium mb-1">Total Bank Balance</p>
                            <h2 className="text-3xl font-bold">Rs. {Number(totalBalance).toLocaleString()}</h2>
                        </div>
                        <Wallet className="w-12 h-12 text-blue-200 opacity-50" />
                    </div>
                </div>

                {/* Accounts Table */}
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
                    <div className="mb-4 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center gap-2">
                        <Landmark className="w-5 h-5 text-primary-600" />
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Bank Accounts Overview</h2>
                    </div>
                    {accounts.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead><tr className="bg-gray-100 dark:bg-slate-700 border-b-2 border-gray-300 dark:border-slate-600">
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">SN</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Bank Name</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Account Name</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Account Number</th>
                                    <th className="px-4 py-2 text-right text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Current Balance</th>
                                </tr></thead>
                                <tbody>
                                    {accounts.map((account, index) => (
                                        <tr key={account.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{index + 1}</td>
                                            <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700">{account.bank_name}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{account.account_name}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 font-mono">{account.account_number}</td>
                                            <td className="px-4 py-2 text-sm text-right font-bold text-blue-600 dark:text-blue-400 border border-gray-200 dark:border-slate-700">Rs. {Number(account.current_balance).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12"><p className="text-gray-500 dark:text-gray-400">No bank accounts found.</p></div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}