import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { ROUTE_INITIAL_VALUES, mapRouteToFormData } from '@/Services/routeService';

export function useRouteForm(routeData, isEdit = false) {
    const form = useForm(
        isEdit ? mapRouteToFormData(routeData) : ROUTE_INITIAL_VALUES
    );

    useEffect(() => {
        if (isEdit && routeData) {
            form.setData(mapRouteToFormData(routeData));
        } else {
            form.reset();
        }
    }, [routeData, isEdit]);

    const addStop = () => {
        const newStops = [...form.data.stops, { stop_name: '', sequence: form.data.stops.length + 1, pickup_time: '', drop_time: '', fare: '' }];
        form.setData('stops', newStops);
    };

    const removeStop = (index) => {
        if (form.data.stops.length > 1) {
            const newStops = form.data.stops.filter((_, i) => i !== index);
            const resequenced = newStops.map((stop, i) => ({ ...stop, sequence: i + 1 }));
            form.setData('stops', resequenced);
        } else {
            toast.error('At least one stop is required', { icon: '❌' });
        }
    };

    const updateStop = (index, field, value) => {
        const newStops = [...form.data.stops];
        newStops[index][field] = value;
        form.setData('stops', newStops);
    };

    const submit = (e) => {
        e.preventDefault();
        const url = isEdit ? route('transport.routes.update', routeData.id) : route('transport.routes.store');

        form.post(url, {
            onSuccess: () => {
            },
            onError: (errors) => toast.error(Object.values(errors)[0] || 'Failed to save', { icon: '❌' }),
            preserveScroll: true,
        });
    };

    return { ...form, submit, addStop, removeStop, updateStop };
}