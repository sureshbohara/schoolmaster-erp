export const STUDENT_CATEGORY_INITIAL_VALUES = {
    name: '',
    discount_percentage: '',
    status: 'active',
    _method: 'POST',
};

export const STATUS_OPTIONS = [
    { value: 'active', label: '🟢 Active' },
    { value: 'inactive', label: '🟡 Inactive' },
];

export const mapStudentCategoryToFormData = (category) => ({
    name: category?.name || '',
    discount_percentage: category?.discount_percentage || '',
    status: category?.status || 'active',
    _method: 'PUT',
});