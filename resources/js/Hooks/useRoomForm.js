import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { ROOM_INITIAL_VALUES, mapRoomToFormData } from '@/Services/roomService';

export function useRoomForm(room, isEdit = false, onSuccessCallback = null) {
    const form = useForm(
        isEdit ? mapRoomToFormData(room) : ROOM_INITIAL_VALUES
    );

    useEffect(() => {
        if (isEdit && room) {
            form.setData(mapRoomToFormData(room));
        } else {
            form.reset();
        }
    }, [room, isEdit]);

    const submit = (e) => {
        e.preventDefault();
        const url = isEdit ? route('hostels.rooms.update', room.id) : route('hostels.rooms.store');

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