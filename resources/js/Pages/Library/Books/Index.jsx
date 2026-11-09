import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { useState } from 'react';
import { BookOpen, Plus, Pencil, Trash2, Search, X, Image as ImageIcon } from 'lucide-react';

export default function BooksIndex({ books, filters }) {
    const bookList = books?.data || [];
    const [search, setSearch] = useState(filters?.search || '');
    const [categoryId, setCategoryId] = useState(filters?.category_id || '');
    const [availableOnly, setAvailableOnly] = useState(filters?.available || '');

    const handleFilter = () => {
        router.get(route('library.books.index'), { search, category_id: categoryId, available: availableOnly }, { preserveState: true, preserveScroll: true });
    };
    const handleReset = () => {
        setSearch(''); setCategoryId(''); setAvailableOnly('');
        router.get(route('library.books.index'), {}, { preserveState: true, preserveScroll: true });
    };

    const handleDelete = (id, title) => {
        if (confirm(`Delete book "${title}"?`)) router.delete(route('library.books.destroy', id), { preserveScroll: true });
    };

     const breadcrumbItems = [
        { label: 'Dashboard', href: route('dashboard') },
        { label: 'Library', href: '#' },
    ];


    return (
        <AppLayout title="Books List">
            <Head title="Books List" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    
                    <Breadcrumb title="Library" subTitle="Books List" breadcrumbItems={breadcrumbItems} />
 
                    <Link href={route('library.books.create')} className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                        <Plus className="w-4 h-4 mr-1.5" /> Add Book
                    </Link>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type="text" placeholder="Search title, author, ISBN..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm" />
                        </div>
                        <select value={availableOnly} onChange={(e) => setAvailableOnly(e.target.value)} className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm">
                            <option value="">All Books</option>
                            <option value="1">Available Only</option>
                        </select>
                        <button onClick={handleFilter} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg text-sm flex items-center justify-center"><Search className="w-4 h-4 mr-1.5" /> Filter</button>
                        <button onClick={handleReset} className="px-4 py-2 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg text-sm flex items-center justify-center"><X className="w-4 h-4 mr-1.5" /> Reset</button>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-gray-200 dark:border-slate-700">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Cover</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Book Details</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Category</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Qty (Avail/Total)</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                                {bookList.map((book) => (
                                    <tr key={book.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="px-4 py-3">
                                            {book.cover_image_url ? (
                                                <img src={book.cover_image_url} alt={book.title} className="w-10 h-14 object-cover rounded border border-gray-200 dark:border-slate-600" />
                                            ) : (
                                                <div className="w-10 h-14 rounded bg-gray-100 dark:bg-slate-700 flex items-center justify-center"><ImageIcon className="w-5 h-5 text-gray-400" /></div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="font-medium text-gray-900 dark:text-white">{book.title}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">By {book.author || 'Unknown'} • {book.book_no}</div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{book.category?.name || 'N/A'}</td>
                                        <td className="px-4 py-3 text-center">
                                            <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-md ${book.available_quantity > 0 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`}>
                                                {book.available_quantity} / {book.total_quantity}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end space-x-1">
                                                <Link href={route('library.books.edit', book.id)} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800"><Pencil className="w-3.5 h-3.5" /></Link>
                                                <button onClick={() => handleDelete(book.id, book.title)} className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded border border-red-200 dark:border-red-800"><Trash2 className="w-3.5 h-3.5" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {bookList.length === 0 && <tr><td colSpan="5" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">No books found</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}