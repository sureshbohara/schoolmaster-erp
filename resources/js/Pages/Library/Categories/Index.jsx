import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import Modal from '@/Components/Modal';
import FormInput from '@/Components/Form/FormInput';
import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { BookOpen, Plus, Pencil, Trash2, Save, Loader2, Search, X } from 'lucide-react';
import { BOOK_CATEGORY_INITIAL_VALUES, STATUS_OPTIONS, mapCategoryToFormData } from '@/Services/bookCategoryService';

export default function BookCategoriesIndex({ categories }) {
    const categoryList = categories?.data || [];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); 
    
    const isEdit = !!editingCategory;

    const { data, setData, processing, errors, reset, post } = useForm(BOOK_CATEGORY_INITIAL_VALUES);

    useEffect(() => {
        if (editingCategory) {
            setData(mapCategoryToFormData(editingCategory));
        } else {
            reset();
            setData(BOOK_CATEGORY_INITIAL_VALUES);
        }
    }, [editingCategory]);

    const openCreateModal = () => { setEditingCategory(null); setIsModalOpen(true); };
    const openEditModal = (category) => { setEditingCategory(category); setIsModalOpen(true); };
    const closeModal = () => { setIsModalOpen(false); setEditingCategory(null); reset(); };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEdit ? route('library.categories.update', editingCategory.id) : route('library.categories.store');
        post(url, {
            onSuccess: () => { 
                closeModal(); 
            },
            onError: (errors) => toast.error(Object.values(errors)[0] || 'Failed', { icon: '❌' }),
            preserveScroll: true,
        });
    };

    const handleDelete = (id, name) => {
        if (confirm(`Delete "${name}"? This will affect associated books.`)) {
            router.delete(route('library.categories.destroy', id), { 
                preserveScroll: true,
            });
        }
    };

    const handleReset = () => {
        setSearchTerm('');
    };

    const filteredCategories = categoryList.filter(cat => 
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AppLayout title="Book Categories">
            <Head title="Book Categories" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Library" subTitle="Book Categories" breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }]} />
                    <button onClick={openCreateModal} className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                        <Plus className="w-4 h-4 mr-1.5" /> Add Category
                    </button>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <div className="relative max-w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search by category name..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            className="w-full pl-10 pr-10 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm" 
                        />
                        {searchTerm && (
                            <button 
                                onClick={handleReset}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-gray-200 dark:border-slate-700">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Category Name</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Total Books</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Status</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                            {filteredCategories.map((cat) => (
                                <tr key={cat.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="w-4 h-4 text-gray-400" />
                                            <span className="font-medium text-gray-900 dark:text-white">{cat.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span className="inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                            {cat.books_count || 0}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${
                                            cat.status === 'active' 
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                        }`}>
                                            {cat.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end space-x-1">
                                            <button onClick={() => openEditModal(cat)} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800 transition-colors" title="Edit">
                                                <Pencil className="w-3.5 h-3.5" />
                                            </button>
                                            <button onClick={() => handleDelete(cat.id, cat.name)} className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded border border-red-200 dark:border-red-800 transition-colors" title="Delete">
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            
                            {filteredCategories.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                        <BookOpen className="w-12 h-12 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                                        <p className="text-sm">{searchTerm ? `No categories found matching "${searchTerm}"` : 'No categories found'}</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} title={isEdit ? 'Edit Category' : 'Add Category'} size="md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormInput 
                        label="Category Name" 
                        value={data.name} 
                        onChange={(v) => setData('name', v)} 
                        error={errors.name} 
                        placeholder="e.g., Science Fiction, Reference" 
                        required 
                    />
                    <FormInput 
                        label="Status" 
                        type="select" 
                        value={data.status} 
                        onChange={(v) => setData('status', v)} 
                        error={errors.status} 
                        options={STATUS_OPTIONS} 
                        required 
                    />
                    <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-200 dark:border-slate-700">
                        <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg text-sm">
                            Cancel
                        </button>
                        <button type="submit" disabled={processing} className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium rounded-lg text-sm shadow-sm disabled:cursor-not-allowed">
                            {processing ? <><Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> Saving...</> : <><Save className="w-4 h-4 mr-1.5" /> {isEdit ? 'Update' : 'Create'}</>}
                        </button>
                    </div>
                </form>
            </Modal>
        </AppLayout>
    );
}