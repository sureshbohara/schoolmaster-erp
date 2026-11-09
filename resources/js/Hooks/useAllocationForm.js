import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { ALLOCATION_INITIAL_VALUES, mapAllocationToFormData } from '@/Services/allocationService';

export function useAllocationForm(allocation, isEdit = false, onSuccessCallback = null) {
    const form = useForm(
        isEdit ? mapAllocationToFormData(allocation) : ALLOCATION_INITIAL_VALUES
    );

    useEffect(() => {
        if (isEdit && allocation) {
            form.setData(mapAllocationToFormData(allocation));
        } else {
            form.reset();
        }
    }, [allocation, isEdit]);

    const submit = (e) => {
        e.preventDefault();
        const url = isEdit ? route('hostels.allocations.update', allocation.id) : route('hostels.allocations.store');

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