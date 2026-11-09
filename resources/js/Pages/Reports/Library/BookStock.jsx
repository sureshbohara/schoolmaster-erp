import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import Button from '@/Components/Button';
import { useState } from 'react';
import { Search, FileText, Package, BookOpen, AlertCircle } from 'lucide-react';

export default function BookStock({ categories, books, totalBooks, availableBooks, issuedBooks, filters }) {
    const [categoryId, setCategoryId] = useState(filters?.category_id || '');
    const [search, setSearch] = useState(filters?.search || '');
    const [availability, setAvailability] = useState(filters?.availability || '');

    const handleGenerate = () => {
        router.get(route('reports.library.book-stock'), { category_id: categoryId, search: search, availability: availability }, { preserveState: true });
    };

    return (
        <AppLayout title="Book Stock Report">
            <Head title="Book Stock Report" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Library Reports" subTitle="Book Stock" breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }, { label: 'Reports', href: route('reports.index') }, { label: 'Library', href: route('reports.library.index') }]} />
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"><BookOpen className="w-6 h-6" /></div>
                        <div><p className="text-sm text-gray-500 dark:text-gray-400">Total Books</p><p className="text-2xl font-bold text-gray-900 dark:text-white">{totalBooks}</p></div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"><Package className="w-6 h-6" /></div>
                        <div><p className="text-sm text-gray-500 dark:text-gray-400">Available</p><p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{availableBooks}</p></div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"><AlertCircle className="w-6 h-6" /></div>
                        <div><p className="text-sm text-gray-500 dark:text-gray-400">Issued</p><p className="text-2xl font-bold text-red-600 dark:text-red-400">{issuedBooks}</p></div>
                    </div>
                </div>

                {/* Filter */}
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2"><Search className="w-4 h-4" /> Filter Data</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <FormInput label="Search (Title/Author/Book No)" type="text" value={search} onChange={setSearch} placeholder="Type to search..." />
                        <FormInput label="Category" type="select" value={categoryId} onChange={setCategoryId} options={[{ value: '', label: '-- All Categories --' }, ...(categories?.map(c => ({ value: c.id, label: c.name })) || [])]} />
                        <FormInput label="Availability" type="select" value={availability} onChange={setAvailability} options={[{ value: '', label: '-- All --' }, { value: 'available', label: '✅ Available' }, { value: 'unavailable', label: '❌ Unavailable' }]} />
                        <div className="flex items-end"><Button variant="primary" size="lg" onClick={handleGenerate} className="w-full"><Search className="w-4 h-4 mr-1.5" /> Generate Report</Button></div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
                    {books.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead><tr className="bg-gray-100 dark:bg-slate-700 border-b-2 border-gray-300 dark:border-slate-600">
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">SN</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Book No</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Title</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Author</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Category</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Rack</th>
                                    <th className="px-4 py-2 text-right text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Price</th>
                                    <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Total</th>
                                    <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Available</th>
                                    <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Status</th>
                                </tr></thead>
                                <tbody>
                                    {books.map((book, index) => (
                                        <tr key={book.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{index + 1}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 font-mono">{book.book_no}</td>
                                            <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700">{book.title}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{book.author}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{book.category?.name || 'N/A'}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{book.rack_no || 'N/A'}</td>
                                            <td className="px-4 py-2 text-sm text-right text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">Rs. {Number(book.price).toLocaleString()}</td>
                                            <td className="px-4 py-2 text-sm text-center text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{book.total_quantity}</td>
                                            <td className="px-4 py-2 text-sm text-center font-bold text-emerald-600 dark:text-emerald-400 border border-gray-200 dark:border-slate-700">{book.available_quantity}</td>
                                            <td className="px-4 py-2 text-center border border-gray-200 dark:border-slate-700">
                                                <span className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-md ${book.available_quantity > 0 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`}>
                                                    {book.available_quantity > 0 ? 'Available' : 'Unavailable'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (<div className="text-center py-12"><FileText className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" /><p className="text-gray-500 dark:text-gray-400">No books found.</p></div>)}
                </div>
            </div>
        </AppLayout>
    );
}