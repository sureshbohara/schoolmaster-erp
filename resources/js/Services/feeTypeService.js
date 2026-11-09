export const FEE_TYPE_INITIAL_VALUES = {
    name: '',
    description: '',
    status: 'active',
    _method: 'POST',
};

export const STATUS_OPTIONS = [
    { value: 'active', label: '🟢 Active' },
    { value: 'inactive', label: '🟡 Inactive' },
];

export const mapFeeTypeToFormData = (type) => ({
    name: type?.name || '',
    description: type?.description || '',
    status: type?.status || 'active',
    _method: 'PUT',
});