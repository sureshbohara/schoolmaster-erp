export const SUBJECT_INITIAL_VALUES = {
    name: '',
    code: '',
    type: 'theory',
    status: 'active',
    _method: 'POST',
};

export const SUBJECT_TYPE_OPTIONS = [
    { value: 'theory', label: '📘 Theory' },
    { value: 'practical', label: '🔬 Practical' },
    { value: 'both', label: '📚 Both' },
];

export const STATUS_OPTIONS = [
    { value: 'active', label: '🟢 Active' },
    { value: 'inactive', label: '🟡 Inactive' },
];

export const mapSubjectToFormData = (subject) => ({
    name: subject?.name || '',
    code: subject?.code || '',
    type: subject?.type || 'theory',
    status: subject?.status || 'active',
    _method: 'PUT',
});