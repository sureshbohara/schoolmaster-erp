export const HOSTEL_INITIAL_VALUES = {
    name: '',
    type: 'boys',
    address: '',
    intro: '',
    status: 'active',
    _method: 'POST',
};

export const HOSTEL_TYPE_OPTIONS = [
    { value: 'boys', label: '👦 Boys' },
    { value: 'girls', label: '👧 Girls' },
    { value: 'unisex', label: '👦👧 Unisex' },
];

export const STATUS_OPTIONS = [
    { value: 'active', label: '🟢 Active' },
    { value: 'inactive', label: '🟡 Inactive' },
];

export const mapHostelToFormData = (h) => ({
    name: h?.name || '',
    type: h?.type || 'boys',
    address: h?.address || '',
    intro: h?.intro || '',
    status: h?.status || 'active',
    _method: 'PUT',
});