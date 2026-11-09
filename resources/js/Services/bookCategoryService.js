export const BOOK_CATEGORY_INITIAL_VALUES = {
    name: '',
    status: 'active',
    _method: 'POST',
};

export const STATUS_OPTIONS = [
    { value: 'active', label: '🟢 Active' },
    { value: 'inactive', label: '🟡 Inactive' },
];

export const mapCategoryToFormData = (category) => ({
    name: category?.name || '',
    status: category?.status || 'active',
    _method: 'PUT',
});