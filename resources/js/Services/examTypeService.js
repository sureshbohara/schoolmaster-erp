export const EXAM_TYPE_INITIAL_VALUES = {
    name: '',
    status: 'active',
    _method: 'POST',
};

export const STATUS_OPTIONS = [
    { value: 'active', label: '🟢 Active' },
    { value: 'inactive', label: '🟡 Inactive' },
];

export const mapExamTypeToFormData = (type) => ({
    name: type?.name || '',
    status: type?.status || 'active',
    _method: 'PUT',
});