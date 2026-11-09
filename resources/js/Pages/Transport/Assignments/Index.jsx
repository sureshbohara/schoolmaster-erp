import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import Modal from '@/Components/Modal';
import FormInput from '@/Components/Form/FormInput';
import Button from '@/Components/Button';
import { UserCheck, Plus, Pencil, Trash2, Search, X } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useAssignmentForm } from '@/Hooks/useAssignmentForm';
import { STATUS_OPTIONS } from '@/Services/assignmentService';

export default function AssignmentsIndex({ assignments, filters, students, routes, academicYears }) {
    const assignmentList = assignments?.data || [];
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAssignment, setEditingAssignment] = useState(null);

    const { data, setData, processing, errors, submit, reset } = useAssignmentForm(
        editingAssignment,
        !!editingAssignment,
        () => { setIsModalOpen(false); setEditingAssignment(null); }
    );

    const openCreateModal = () => {
        setEditingAssignment(null);
        setIsModalOpen(true);
    };

    const openEditModal = (assignment) => {
        setEditingAssignment(assignment);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingAssignment(null);
        reset();
    };

    const handleRouteChange = (value) => {
        setData('route_id', value);
        setData('stop_id', '');
    };

    const handleDelete = (id, studentName) => {
        if (confirm(`Remove transport assignment for "${studentName}"?`)) {
            router.delete(route('transport.assignments.destroy', id), { preserveScroll: true });
        }
    };

    const selectedRouteStops = useMemo(() => {
        const selectedRoute = routes?.find(r => String(r.id) === String(data.route_id));
        return selectedRoute?.stops || [];
    }, [routes, data.route_id]);

    const filteredAssignments = assignmentList.filter(a => 
        a.student?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.route?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AppLayout title="Transport Assignments">
            <Head title="Transport Assignments" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Transport" subTitle="Assignments" breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }]} />
                    <Button variant="primary" size="md" onClick={openCreateModal}>
                        <Plus className="w-4 h-4 mr-1.5" /> Assign Transport
                    </Button>
                </div>

              
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <div className="relative max-w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search by student or route..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            className="w-full pl-10 pr-10 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm" 
                        />
                        {searchTerm && (
                            <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

             
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-gray-200 dark:border-slate-700">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Student</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Academic Year</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Route & Stop</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Monthly Fee</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Status</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                            {filteredAssignments.map((assignment) => (
                                <tr key={assignment.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="font-medium text-gray-900 dark:text-white">{assignment.student?.full_name}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">{assignment.student?.admission_no}</div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{assignment.academic_year?.title || 'N/A'}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                                        <div>{assignment.route?.name || 'N/A'}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Stop: {assignment.stop?.stop_name || 'N/A'}</div>
                                    </td>
                                    <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 dark:text-white">Rs. {assignment.monthly_fee}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${
                                            assignment.status === 'active' 
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                        }`}>
                                            {assignment.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end space-x-1">
                                            <button onClick={() => openEditModal(assignment)} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800 transition-colors" title="Edit">
                                                <Pencil className="w-3.5 h-3.5" />
                                            </button>
                                            <button onClick={() => handleDelete(assignment.id, assignment.student?.full_name)} className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded border border-red-200 dark:border-red-800 transition-colors" title="Delete">
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredAssignments.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                        No assignments found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

          
            <Modal 
                key={editingAssignment ? `edit-${editingAssignment.id}` : 'new'} 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                title={editingAssignment ? 'Edit Assignment' : 'Assign Transport'} 
                size="lg"
            >
                <form onSubmit={submit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput 
                            label="Academic Year" 
                            type="select" 
                            value={data.academic_year_id} 
                            onChange={(v) => setData('academic_year_id', v)} 
                            error={errors.academic_year_id} 
                            options={[
                                { value: '', label: '-- Select Year --' }, 
                                ...(academicYears?.map(y => ({ value: y.id, label: y.title })) || [])
                            ]} 
                            required 
                        />
                        
                        <FormInput 
                            label="Student" 
                            type="select" 
                            value={data.student_id} 
                            onChange={(v) => setData('student_id', v)} 
                            error={errors.student_id} 
                            options={[
                                { value: '', label: '-- Select Student --' }, 
                                ...(students?.map(s => ({ 
                                    value: s.id, 
                                    label: `${s.first_name} ${s.last_name} (${s.admission_no})` 
                                })) || [])
                            ]} 
                            required 
                        />

                        <FormInput 
                            label="Route" 
                            type="select" 
                            value={data.route_id} 
                            onChange={handleRouteChange} 
                            error={errors.route_id} 
                            options={[
                                { value: '', label: '-- Select Route --' }, 
                                ...(routes?.map(r => ({ value: r.id, label: r.name })) || [])
                            ]} 
                            required 
                        />

                        <FormInput 
                            label="Stop (Pickup/Drop)" 
                            type="select" 
                            value={data.stop_id} 
                            onChange={(v) => setData('stop_id', v)} 
                            error={errors.stop_id} 
                            options={[
                                { value: '', label: '-- Select Stop --' }, 
                                ...selectedRouteStops.map(s => ({ value: s.id, label: `#${s.sequence} - ${s.stop_name}` }))
                            ]} 
                            required 
                            disabled={!data.route_id}
                        />

                        <FormInput 
                            label="Monthly Fee (Rs.)" 
                            type="number" 
                            value={data.monthly_fee} 
                            onChange={(v) => setData('monthly_fee', v)} 
                            error={errors.monthly_fee} 
                            placeholder="0.00" 
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

                        <FormInput 
                            label="Pickup Point (Optional)" 
                            value={data.pickup_point} 
                            onChange={(v) => setData('pickup_point', v)} 
                            error={errors.pickup_point} 
                            placeholder="e.g., Near Bus Stop" 
                        />

                        <FormInput 
                            label="Drop Point (Optional)" 
                            value={data.drop_point} 
                            onChange={(v) => setData('drop_point', v)} 
                            error={errors.drop_point} 
                            placeholder="e.g., School Gate" 
                        />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-200 dark:border-slate-700">
                        <Button type="button" variant="secondary" onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" disabled={processing}>
                            {processing ? 'Saving...' : (editingAssignment ? 'Update Assignment' : 'Assign Transport')}
                        </Button>
                    </div>
                </form>
            </Modal>
        </AppLayout>
    );
}