import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { VEHICLE_INITIAL_VALUES, mapVehicleToFormData } from '@/Services/vehicleService';

export function useVehicleForm(vehicle, isEdit = false, onSuccessCallback = null) {
    const form = useForm(
        isEdit ? mapVehicleToFormData(vehicle) : VEHICLE_INITIAL_VALUES
    );
    useEffect(() => {
        if (isEdit && vehicle) {
            form.setData(mapVehicleToFormData(vehicle));
        } else {
            form.reset();
        }
    }, [vehicle, isEdit]);

    const submit = (e) => {
        e.preventDefault();
        const url = isEdit ? route('transport.vehicles.update', vehicle.id) : route('transport.vehicles.store');

        form.post(url, {
            onSuccess: () => {
                if (!isEdit) form.reset();
                if (onSuccessCallback) onSuccessCallback();
            },
            onError: (errors) => toast.error(Object.values(errors)[0] || 'Failed to save', { icon: '❌' }),
            preserveScroll: true,
        });
    };

    return { ...form, submit };
}