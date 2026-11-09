export const CLASS_INITIAL_VALUES = {
    academic_year_id: '',
    name: '',
    numeric_value: '',
    order: '',
    status: 'active',
    _method: 'POST',
};

export const STATUS_OPTIONS = [
    { value: 'active', label: '🟢 Active' },
    { value: 'inactive', label: '🟡 Inactive' },
];

export const mapClassToFormData = (cls) => ({
    academic_year_id: cls?.academic_year?.id || '',
    name: cls?.name || '',
    numeric_value: cls?.numeric_value || '',
    order: cls?.order || '',
    status: cls?.status || 'active',
    _method: 'PUT',
});