import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import Modal from '@/Components/Modal';
import FormInput from '@/Components/Form/FormInput';
import { useState } from 'react';
import { Bus, Plus, Pencil, Trash2, Search, X } from 'lucide-react';
import { useVehicleForm } from '@/Hooks/useVehicleForm';
import { STATUS_OPTIONS } from '@/Services/vehicleService';

export default function VehiclesIndex({ vehicles, vehicleTypes }) {
    const vehicleList = vehicles?.data || [];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const { data, setData, processing, errors, submit, reset } = useVehicleForm(
        editingVehicle,
        !!editingVehicle,
        () => { setIsModalOpen(false); setEditingVehicle(null); }
    );

    const openCreateModal = () => {
        setEditingVehicle(null);
        setIsModalOpen(true);
    };

    const openEditModal = (vehicle) => {
        setEditingVehicle(vehicle);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingVehicle(null);
        reset();
    };

    const handleDelete = (id, vehicleNo) => {
        if (confirm(`Delete vehicle "${vehicleNo}"?`)) {
            router.delete(route('transport.vehicles.destroy', id), { preserveScroll: true });
        }
    };

    const filteredVehicles = vehicleList.filter(v => 
        v.vehicle_no.toLowerCase().includes(searchTerm.toLowerCase()) || 
        v.model?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusBadge = (status) => {
        const styles = {
            active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
            inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
            maintenance: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
        };
        const style = styles[status] || styles.inactive;
        const displayStatus = status.charAt(0).toUpperCase() + status.slice(1);
        
        return (
            <span className={`inline-flex items-center justify-center px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${style}`}>
                {displayStatus}
            </span>
        );
    };

    return (
        <AppLayout title="Vehicles">
            <Head title="Vehicles" />
            <div className="space-y-3">
        
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Transport" subTitle="Vehicles" breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }]} />
                    <button onClick={openCreateModal} className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                        <Plus className="w-4 h-4 mr-1.5" /> Add Vehicle
                    </button>
                </div>

        
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <div className="relative max-w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search by vehicle no or model..." 
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

                {/* Table */}
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-gray-200 dark:border-slate-700">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Vehicle No</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Type</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Model</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Capacity</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Driver</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Status</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                                {filteredVehicles.map((vehicle) => (
                                    <tr key={vehicle.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{vehicle.vehicle_no}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{vehicle.vehicle_type?.name || 'N/A'}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{vehicle.model || 'N/A'}</td>
                                        <td className="px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-300">{vehicle.capacity}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{vehicle.driver_name || 'N/A'}</td>
                                        
                                        {/* ✅ Improved Status Badge */}
                                        <td className="px-4 py-3 text-center">
                                            {getStatusBadge(vehicle.status)}
                                        </td>

                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end space-x-1">
                                                <button onClick={() => openEditModal(vehicle)} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800 transition-colors" title="Edit">
                                                    <Pencil className="w-3.5 h-3.5" />
                                                </button>
                                                <button onClick={() => handleDelete(vehicle.id, vehicle.vehicle_no)} className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded border border-red-200 dark:border-red-800 transition-colors" title="Delete">
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredVehicles.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                            No vehicles found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            <Modal 
                key={editingVehicle ? `edit-${editingVehicle.id}` : 'new'} 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                title={editingVehicle ? 'Edit Vehicle' : 'Add Vehicle'} 
                size="lg" 
            >
                <form onSubmit={submit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput 
                            label="Vehicle Type" 
                            type="select" 
                            value={data.vehicle_type_id} 
                            onChange={(v) => setData('vehicle_type_id', v)} 
                            error={errors.vehicle_type_id} 
                            options={[{ value: '', label: '-- Select Type --' }, ...(vehicleTypes?.map(t => ({ value: t.id, label: t.name })) || [])]} 
                            required 
                        />
                        <FormInput 
                            label="Vehicle No / Plate" 
                            value={data.vehicle_no} 
                            onChange={(v) => setData('vehicle_no', v)} 
                            error={errors.vehicle_no} 
                            placeholder="e.g., BA 1 J 1234" 
                            required 
                        />
                        <FormInput 
                            label="Model" 
                            value={data.model} 
                            onChange={(v) => setData('model', v)} 
                            error={errors.model} 
                            placeholder="e.g., 2020" 
                        />
                        <FormInput 
                            label="Capacity (Seats)" 
                            type="number" 
                            value={data.capacity} 
                            onChange={(v) => setData('capacity', v)} 
                            error={errors.capacity} 
                            placeholder="0" 
                            required 
                        />
                        <FormInput 
                            label="Driver Name" 
                            value={data.driver_name} 
                            onChange={(v) => setData('driver_name', v)} 
                            error={errors.driver_name} 
                            placeholder="Full Name" 
                        />
                        <FormInput 
                            label="Driver Phone" 
                            value={data.driver_phone} 
                            onChange={(v) => setData('driver_phone', v)} 
                            error={errors.driver_phone} 
                            placeholder="98XXXXXXXX" 
                        />
                        <div className="md:col-span-2">
                            <FormInput 
                                label="Status" 
                                type="select" 
                                value={data.status} 
                                onChange={(v) => setData('status', v)} 
                                error={errors.status} 
                                options={STATUS_OPTIONS} 
                                required 
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-200 dark:border-slate-700">
                        <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg text-sm">
                            Cancel
                        </button>
                        <button type="submit" disabled={processing} className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium rounded-lg text-sm shadow-sm disabled:cursor-not-allowed">
                            {processing ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </Modal>
        </AppLayout>
    );
}