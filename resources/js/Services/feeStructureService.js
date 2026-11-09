export const FEE_STRUCTURE_INITIAL_VALUES = {
    academic_year_id: '',
    class_id: '',
    fee_type_id: '',
    amount: '',
    due_date: '',
    status: 'active',
    _method: 'POST',
};

export const STATUS_OPTIONS = [
    { value: 'active', label: '🟢 Active' },
    { value: 'inactive', label: '🟡 Inactive' },
];

export const mapFeeStructureToFormData = (structure) => ({
    academic_year_id: structure?.academic_year?.id || '',
    class_id: structure?.class?.id || '',
    fee_type_id: structure?.fee_type?.id || '',
    amount: structure?.amount || '',
    due_date: structure?.due_date || '',
    status: structure?.status || 'active',
    _method: 'PUT',
});