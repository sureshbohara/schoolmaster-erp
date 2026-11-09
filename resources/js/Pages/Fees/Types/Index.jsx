import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import Modal from '@/Components/Modal';
import FormInput from '@/Components/Form/FormInput';
import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { FileText, Plus, Pencil, Trash2, Search, Save, Loader2 } from 'lucide-react';

const STATUS_OPTIONS = [
    { value: 'active', label: '🟢 Active' },
    { value: 'inactive', label: '🟡 Inactive' },
];

export default function FeeTypesIndex({ types }) {
    const typeList = types?.data || [];
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingType, setEditingType] = useState(null);

    const isEdit = !!editingType;

   
    const { data, setData, processing, errors, reset, post } = useForm({
        name: '',
        description: '',
        status: 'active',
        _method: 'POST',
    });

  
    useEffect(() => {
        if (editingType) {
            setData({
                name: editingType.name || '',
                description: editingType.description || '',
                status: editingType.status || 'active',
                _method: 'PUT',
            });
        } else {
            reset();
            setData('status', 'active');
            setData('_method', 'POST');
        }
    }, [editingType]);

    const filteredTypes = typeList.filter(t => 
        t.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openCreateModal = () => {
        setEditingType(null);
        setIsModalOpen(true);
    };

    const openEditModal = (type) => {
        setEditingType(type);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingType(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEdit 
            ? route('fees.types.update', editingType.id) 
            : route('fees.types.store');

        post(url, {
            onSuccess: () => {
                closeModal();
            },
            onError: (errors) => {
                toast.error(Object.values(errors)[0] || 'Failed to save', { icon: '❌' });
            },
            preserveScroll: true,
        });
    };

    const handleDelete = (id, name) => {
        if (confirm(`Are you sure you want to delete "${name}"? This may affect existing fee structures.`)) {
            router.delete(route('fees.types.destroy', id), { 
                preserveScroll: true,
            
            });
        }
    };

    return (
        <AppLayout title="Fee Types">
            <Head title="Fee Type Management" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Finance & Fees" subTitle="Fee Types" breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }, { label: 'Finance & Fees', href: '#' }]} />
                    <button 
                        onClick={openCreateModal}
                        className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm"
                    >
                        <Plus className="w-4 h-4 mr-1.5" /> Create Fee Type
                    </button>
                </div>

              
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <div className="relative max-w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search by fee type name..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm" 
                        />
                    </div>
                </div>

           
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-gray-200 dark:border-slate-700">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Fee Type Name</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Description</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Status</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                                {filteredTypes.map((type) => (
                                    <tr key={type.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-gray-400" />
                                                <span className="font-medium text-gray-900 dark:text-white">{type.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 max-w-md truncate">
                                            {type.description || <span className="text-gray-400 italic">No description</span>}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${
                                                type.status === 'active' 
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                            }`}>
                                                {type.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end space-x-1">
                                                <button 
                                                    onClick={() => openEditModal(type)}
                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800 transition-colors"
                                                    title="Edit"
                                                >
                                                    <Pencil className="w-3.5 h-3.5" />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(type.id, type.name)} 
                                                    className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded border border-red-200 dark:border-red-800 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredTypes.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                            <FileText className="w-12 h-12 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                                            <p className="text-sm">No fee types found</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            
            <Modal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                title={isEdit ? 'Edit Fee Type' : 'Create Fee Type'}
                size="md"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormInput 
                        label="Fee Type Name" 
                        value={data.name} 
                        onChange={(v) => setData('name', v)} 
                        error={errors.name} 
                        placeholder="e.g., Admission Fee, Monthly Tuition" 
                        required 
                    />
                    <FormInput 
                        label="Description" 
                        type="textarea" 
                        value={data.description} 
                        onChange={(v) => setData('description', v)} 
                        error={errors.description} 
                        placeholder="Brief description of what this fee covers..." 
                        rows={3} 
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
                        <button 
                            type="button" 
                            onClick={closeModal}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg transition-colors text-sm"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium rounded-lg transition-colors text-sm shadow-sm disabled:cursor-not-allowed"
                        >
                            {processing ? (
                                <><Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> Saving...</>
                            ) : (
                                <><Save className="w-4 h-4 mr-1.5" /> {isEdit ? 'Update' : 'Create'}</>
                            )}
                        </button>
                    </div>
                </form>
            </Modal>
        </AppLayout>
    );
}