import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { HOSTEL_INITIAL_VALUES, mapHostelToFormData } from '@/Services/hostelService';

export function useHostelForm(hostel, isEdit = false, onSuccessCallback = null) {
    const form = useForm(
        isEdit ? mapHostelToFormData(hostel) : HOSTEL_INITIAL_VALUES
    );

    useEffect(() => {
        if (isEdit && hostel) {
            form.setData(mapHostelToFormData(hostel));
        } else {
            form.reset();
        }
    }, [hostel, isEdit]);

    const submit = (e) => {
        e.preventDefault();
        const url = isEdit ? route('hostels.update', hostel.id) : route('hostels.store');

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