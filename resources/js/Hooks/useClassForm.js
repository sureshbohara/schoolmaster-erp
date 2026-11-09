import { useForm, usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { CLASS_INITIAL_VALUES, mapClassToFormData } from '@/Services/classService';

export function useClassForm(cls, isEdit = false) {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm(
        isEdit ? mapClassToFormData(cls) : CLASS_INITIAL_VALUES
    );

    const submit = (e) => {
        e.preventDefault();
        const url = isEdit ? route('academic.classes.update', cls.id) : route('academic.classes.store');

        post(url, {
            onSuccess: () => {
                if (!isEdit) reset();
            },
            onError: (errors) => {
                const firstError = Object.values(errors)[0];
                toast.error(firstError || `Failed to ${isEdit ? 'update' : 'create'} class`, {
                    duration: 4000,
                    icon: '❌',
                });
            },
            preserveScroll: true,
        });
    };

    return { data, setData, processing, errors, reset, submit, flash };
}