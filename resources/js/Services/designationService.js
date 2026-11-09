export const DESIGNATION_INITIAL_VALUES = {
    department_id: '',
    name: '',
    description: '',
    status: 'active',
    _method: 'POST',
};

export const STATUS_OPTIONS = [
    { value: 'active', label: '🟢 Active' },
    { value: 'inactive', label: '🟡 Inactive' },
];

export const mapDesignationToFormData = (designation) => ({
    department_id: designation?.department?.id || '',
    name: designation?.name || '',
    description: designation?.description || '',
    status: designation?.status || 'active',
    _method: 'PUT',
});