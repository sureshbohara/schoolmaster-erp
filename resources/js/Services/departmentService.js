export const DEPARTMENT_INITIAL_VALUES = {
    name: '',
    description: '',
    status: 'active',
    _method: 'POST',
};

export const STATUS_OPTIONS = [
    { value: 'active', label: '🟢 Active' },
    { value: 'inactive', label: '🟡 Inactive' },
];

export const mapDepartmentToFormData = (department) => ({
    name: department?.name || '',
    description: department?.description || '',
    status: department?.status || 'active',
    _method: 'PUT',
});