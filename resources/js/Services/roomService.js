export const ROOM_INITIAL_VALUES = { 
    hostel_id: '', 
    room_no: '', 
    room_type: 'single', 
    cost_per_bed: '', 
    no_of_beds: '', 
    description: '', 
    status: 'active', 
    _method: 'POST' 
};

export const ROOM_TYPE_OPTIONS = [
    { value: 'single', label: 'Single' }, 
    { value: 'double', label: 'Double' }, 
    { value: 'triple', label: 'Triple' }, 
    { value: 'dormitory', label: 'Dormitory' }
];


export const STATUS_OPTIONS = [
    { value: 'active', label: '🟢 Active' }, 
    { value: 'inactive', label: '🟡 Inactive' },
    { value: 'full', label: '🔴 Full' }
];

export const mapRoomToFormData = (r) => ({ 
    hostel_id: r?.hostel_id || r?.hostel?.id || '', 
    room_no: r?.room_no || '', 
    room_type: r?.room_type || 'single', 
    cost_per_bed: r?.cost_per_bed || '', 
    no_of_beds: r?.no_of_beds || '', 
    description: r?.description || '', 
    status: r?.status || 'active', 
    _method: 'PUT' 
});