export const ASSIGNMENT_INITIAL_VALUES = {
    student_id: '',
    route_id: '',
    stop_id: '',
    academic_year_id: '',
    pickup_point: '',
    drop_point: '',
    monthly_fee: '',
    status: 'active',
    _method: 'POST',
};

export const STATUS_OPTIONS = [
    { value: 'active', label: '🟢 Active' },
    { value: 'inactive', label: '🟡 Inactive' },
];

export const mapAssignmentToFormData = (assignment) => ({
    student_id: assignment?.student?.id || '',
    route_id: assignment?.route?.id || '',
    stop_id: assignment?.stop?.id || '',
    academic_year_id: assignment?.academic_year?.id || '',
    pickup_point: assignment?.pickup_point || '',
    drop_point: assignment?.drop_point || '',
    monthly_fee: assignment?.monthly_fee || '',
    status: assignment?.status || 'active',
    _method: 'PUT',
});