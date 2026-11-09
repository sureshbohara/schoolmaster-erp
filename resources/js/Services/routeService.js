export const ROUTE_INITIAL_VALUES = {
    name: '',
    vehicle_id: '',
    base_fare: '',
    status: 'active',
    stops: [{ stop_name: '', sequence: 1, pickup_time: '', drop_time: '', fare: '' }],
    _method: 'POST',
};

export const STATUS_OPTIONS = [
    { value: 'active', label: '🟢 Active' },
    { value: 'inactive', label: '🟡 Inactive' },
];

const formatTime = (time) => {
    if (!time) return '';
    return time.includes(':') ? time.substring(0, 5) : time;
};

export const mapRouteToFormData = (route) => ({
    name: route?.name || '',
    vehicle_id: route?.vehicle_id || route?.vehicle?.id || '',
    base_fare: route?.base_fare || '',
    status: route?.status || 'active',
    stops: route?.stops?.length > 0 
        ? route.stops.map(stop => ({
            id: stop.id || null,
            stop_name: stop.stop_name || '',
            sequence: stop.sequence || 1,
            pickup_time: formatTime(stop.pickup_time),
            drop_time: formatTime(stop.drop_time),
            fare: stop.fare || '',
        }))
        : [{ stop_name: '', sequence: 1, pickup_time: '', drop_time: '', fare: '' }],
    _method: 'PUT',
});