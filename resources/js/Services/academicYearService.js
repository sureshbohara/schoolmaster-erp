export const ACADEMIC_YEAR_INITIAL_VALUES = {
    title: '',
    start_date: '',
    end_date: '',
    is_active: '0', 
    status: 'active',
    _method: 'POST',
};

export const STATUS_OPTIONS = [
    { value: 'active', label: '🟢 Active' },
    { value: 'inactive', label: '🟡 Inactive' },
];

export const IS_ACTIVE_OPTIONS = [
    { value: '1', label: '✅ Yes (Set as Current Year)' },
    { value: '0', label: '❌ No' },
];

export const mapAcademicYearToFormData = (year) => ({
    title: year?.title || '',
    start_date: year?.start_date || '',
    end_date: year?.end_date || '',
    is_active: year?.is_active ? '1' : '0',
    status: year?.status || 'active',
    _method: 'PUT',
});