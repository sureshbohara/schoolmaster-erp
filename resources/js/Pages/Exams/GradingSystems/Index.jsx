import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import Modal from '@/Components/Modal';
import FormInput from '@/Components/Form/FormInput';
import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { Award, Plus, Pencil, Trash2, Save, Loader2 } from 'lucide-react';

import { 
    GRADING_SYSTEM_INITIAL_VALUES, 
    mapGradingSystemToFormData 
} from '@/Services/gradingSystemService';

export default function GradingSystemsIndex({ systems }) {
    const systemList = systems?.data || [];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSystem, setEditingSystem] = useState(null);

    const isEdit = !!editingSystem;

    const { data, setData, processing, errors, reset, post } = useForm(GRADING_SYSTEM_INITIAL_VALUES);

    useEffect(() => {
        if (editingSystem) {
            setData(mapGradingSystemToFormData(editingSystem));
        } else {
            reset();
            setData(GRADING_SYSTEM_INITIAL_VALUES);
        }
    }, [editingSystem]);

    const openCreateModal = () => {
        setEditingSystem(null);
        setIsModalOpen(true);
    };

    const openEditModal = (system) => {
        setEditingSystem(system);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingSystem(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEdit 
            ? route('exams.grading-systems.update', editingSystem.id) 
            : route('exams.grading-systems.store');

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
        if (confirm(`Are you sure you want to delete "${name}"?`)) {
            router.delete(route('exams.grading-systems.destroy', id), { 
                preserveScroll: true,
            });
        }
    };

    const getGradeColor = (gradePoint) => {
        if (gradePoint >= 3.6) return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
        if (gradePoint >= 3.0) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
        if (gradePoint >= 2.5) return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300';
        if (gradePoint >= 2.0) return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
        if (gradePoint >= 1.0) return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    };

    return (
        <AppLayout title="Grading Systems">
            <Head title="Grading System Management" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Examinations" subTitle="Grading Systems" breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }, { label: 'Examinations', href: '#' }]} />
                    <button 
                        onClick={openCreateModal}
                        className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm"
                    >
                        <Plus className="w-4 h-4 mr-1.5" /> Add Grade
                    </button>
                </div>

        
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3">
                    <Award className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                        <p className="font-semibold mb-1">Grading System Configuration</p>
                        <p className="text-xs">Define grade boundaries based on marks range. Each grade has a mark range (min-max), grade point (0-4), and a letter grade (A+, A, B+, etc.).</p>
                    </div>
                </div>

           
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-gray-200 dark:border-slate-700">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Grade Name</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Marks Range</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Grade Point</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Grade</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Remark</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                                {systemList.map((system) => (
                                    <tr key={system.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <Award className="w-4 h-4 text-gray-400" />
                                                <span className="font-medium text-gray-900 dark:text-white">{system.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className="inline-flex items-center px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300">
                                                {system.min_mark} - {system.max_mark}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-md ${getGradeColor(parseFloat(system.grade_point))}`}>
                                                {system.grade_point}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className="inline-flex items-center px-3 py-1 text-sm font-bold rounded-md bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800">
                                                {system.grade}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                                            {system.remark || <span className="text-gray-400 italic">—</span>}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end space-x-1">
                                                <button 
                                                    onClick={() => openEditModal(system)}
                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800 transition-colors"
                                                    title="Edit"
                                                >
                                                    <Pencil className="w-3.5 h-3.5" />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(system.id, system.name)} 
                                                    className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded border border-red-200 dark:border-red-800 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {systemList.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                            <Award className="w-12 h-12 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                                            <p className="text-sm">No grading systems found</p>
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
                title={isEdit ? 'Edit Grade' : 'Add New Grade'}
                size="md"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormInput 
                        label="Grade Name" 
                        value={data.name} 
                        onChange={(v) => setData('name', v)} 
                        error={errors.name} 
                        placeholder="e.g., Excellent, Very Good, Good" 
                        required 
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormInput 
                            label="Min Mark" 
                            type="number" 
                            value={data.min_mark} 
                            onChange={(v) => setData('min_mark', v)} 
                            error={errors.min_mark} 
                            placeholder="0" 
                            required 
                        />
                        <FormInput 
                            label="Max Mark" 
                            type="number" 
                            value={data.max_mark} 
                            onChange={(v) => setData('max_mark', v)} 
                            error={errors.max_mark} 
                            placeholder="100" 
                            required 
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <FormInput 
                            label="Grade Point (0-4)" 
                            type="number" 
                            value={data.grade_point} 
                            onChange={(v) => setData('grade_point', v)} 
                            error={errors.grade_point} 
                            placeholder="4.0" 
                            step="0.01"
                            required 
                        />
                        <FormInput 
                            label="Grade Letter" 
                            value={data.grade} 
                            onChange={(v) => setData('grade', v)} 
                            error={errors.grade} 
                            placeholder="e.g., A+, A, B+" 
                            required 
                        />
                    </div>

                    <FormInput 
                        label="Remark (Optional)" 
                        value={data.remark} 
                        onChange={(v) => setData('remark', v)} 
                        error={errors.remark} 
                        placeholder="e.g., Outstanding performance" 
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