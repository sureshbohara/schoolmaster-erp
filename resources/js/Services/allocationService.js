export const ALLOCATION_INITIAL_VALUES = { 
    student_id: '', 
    hostel_id: '', 
    room_id: '', 
    bed_no: '', 
    allocation_date: new Date().toISOString().split('T')[0], 
    monthly_fee: '', 
    status: 'active', 
    _method: 'POST' 
};


export const STATUS_OPTIONS = [
    { value: 'active', label: '🟢 Active' }, 
    { value: 'discharged', label: '🔴 Discharged' }
];

export const mapAllocationToFormData = (a) => ({
    student_id: a?.student?.id || '', 
    hostel_id: a?.hostel?.id || '', 
    room_id: a?.room?.id || '',
    bed_no: a?.bed_no || '', 
    allocation_date: a?.allocation_date || new Date().toISOString().split('T')[0],
    monthly_fee: a?.monthly_fee || '', 
    status: a?.status || 'active', 
    _method: 'PUT'
});