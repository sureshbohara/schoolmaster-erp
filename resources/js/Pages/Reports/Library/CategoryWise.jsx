import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { Layers, BookOpen, Package, DollarSign } from 'lucide-react';

export default function CategoryWise({ categoryData, grandTotalBooks, grandTotalQuantity, grandTotalValue }) {
    return (
        <AppLayout title="Category-wise Books">
            <Head title="Category-wise Books" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Library Reports" subTitle="Category-wise Books" breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }, { label: 'Reports', href: route('reports.index') }, { label: 'Library', href: route('reports.library.index') }]} />
                </div>

                {/* Grand Total Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"><BookOpen className="w-6 h-6" /></div>
                        <div><p className="text-sm text-gray-500 dark:text-gray-400">Total Unique Books</p><p className="text-2xl font-bold text-gray-900 dark:text-white">{grandTotalBooks}</p></div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"><Package className="w-6 h-6" /></div>
                        <div><p className="text-sm text-gray-500 dark:text-gray-400">Total Quantity</p><p className="text-2xl font-bold text-gray-900 dark:text-white">{grandTotalQuantity}</p></div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"><DollarSign className="w-6 h-6" /></div>
                        <div><p className="text-sm text-gray-500 dark:text-gray-400">Total Value</p><p className="text-2xl font-bold text-amber-600 dark:text-amber-400">Rs. {Number(grandTotalValue).toLocaleString()}</p></div>
                    </div>
                </div>

                {/* Category Table */}
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
                    <div className="mb-4 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-primary-600" />
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Category-wise Distribution</h2>
                    </div>
                    {categoryData.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead><tr className="bg-gray-100 dark:bg-slate-700 border-b-2 border-gray-300 dark:border-slate-600">
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">SN</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Category</th>
                                    <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Unique Books</th>
                                    <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Total Qty</th>
                                    <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Available</th>
                                    <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Issued</th>
                                    <th className="px-4 py-2 text-right text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Total Value</th>
                                </tr></thead>
                                <tbody>
                                    {categoryData.map((cat, index) => (
                                        <tr key={cat.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{index + 1}</td>
                                            <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700">{cat.name}</td>
                                            <td className="px-4 py-2 text-sm text-center text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{cat.total_books}</td>
                                            <td className="px-4 py-2 text-sm text-center text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{cat.total_quantity}</td>
                                            <td className="px-4 py-2 text-sm text-center font-bold text-emerald-600 dark:text-emerald-400 border border-gray-200 dark:border-slate-700">{cat.available_quantity}</td>
                                            <td className="px-4 py-2 text-sm text-center font-bold text-red-600 dark:text-red-400 border border-gray-200 dark:border-slate-700">{cat.issued_quantity}</td>
                                            <td className="px-4 py-2 text-sm text-right font-medium text-amber-600 dark:text-amber-400 border border-gray-200 dark:border-slate-700">Rs. {Number(cat.total_value).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12"><p className="text-gray-500 dark:text-gray-400">No category data found.</p></div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}