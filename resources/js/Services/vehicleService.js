export const VEHICLE_INITIAL_VALUES = {
    vehicle_type_id: '',
    vehicle_no: '',
    model: '',
    capacity: '',
    driver_name: '',
    driver_phone: '',
    status: 'active',
    _method: 'POST',
};

export const STATUS_OPTIONS = [
    { value: 'active', label: '🟢 Active' },
    { value: 'inactive', label: '🟡 Inactive' },
    { value: 'maintenance', label: '🔧 Maintenance' },
];

export const mapVehicleToFormData = (vehicle) => ({
    vehicle_type_id: vehicle?.vehicle_type?.id || '',
    vehicle_no: vehicle?.vehicle_no || '',
    model: vehicle?.model || '',
    capacity: vehicle?.capacity || '',
    driver_name: vehicle?.driver_name || '',
    driver_phone: vehicle?.driver_phone || '',
    status: vehicle?.status || 'active',
    _method: 'PUT',
});