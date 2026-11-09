import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { VEHICLE_TYPE_INITIAL_VALUES, mapVehicleTypeToFormData } from '@/Services/vehicleTypeService';

export function useVehicleTypeForm(type, isEdit = false, onSuccessCallback = null) {
    const form = useForm(
        isEdit ? mapVehicleTypeToFormData(type) : VEHICLE_TYPE_INITIAL_VALUES
    );

    useEffect(() => {
        if (isEdit && type) {
            form.setData(mapVehicleTypeToFormData(type));
        } else {
            form.reset();
        }
    }, [type, isEdit]);

    const submit = (e) => {
        e.preventDefault();
        const url = isEdit ? route('transport.vehicle-types.update', type.id) : route('transport.vehicle-types.store');

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