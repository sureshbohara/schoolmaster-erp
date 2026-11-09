export const LEAVE_INITIAL_VALUES = {
    employee_id: '',
    leave_type_id: '',
    start_date: '',
    end_date: '',
    reason: '',
    status: 'pending',
    attachment: null,
    _method: 'POST',
};

export const STATUS_OPTIONS = [
    { value: 'pending', label: '🟡 Pending' },
    { value: 'approved', label: '🟢 Approved' },
    { value: 'rejected', label: '🔴 Rejected' },
];

export const mapLeaveToFormData = (leave) => ({
    employee_id: leave?.employee?.id || '',
    leave_type_id: leave?.leave_type?.id || '',
    start_date: leave?.start_date || '',
    end_date: leave?.end_date || '',
    reason: leave?.reason || '',
    status: leave?.status || 'pending',
    attachment: null,
    _method: 'PUT',
});