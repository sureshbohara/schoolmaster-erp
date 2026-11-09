export const SECTION_INITIAL_VALUES = {
    class_id: '',
    name: '',
    room_no: '',
    capacity: '',
    status: 'active',
    _method: 'POST',
};

export const STATUS_OPTIONS = [
    { value: 'active', label: '🟢 Active' },
    { value: 'inactive', label: '🟡 Inactive' },
];

export const mapSectionToFormData = (section) => ({
    class_id: section?.class?.id || '',
    name: section?.name || '',
    room_no: section?.room_no || '',
    capacity: section?.capacity || '',
    status: section?.status || 'active',
    _method: 'PUT',
});