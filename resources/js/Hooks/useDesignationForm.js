import { useForm, usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { DESIGNATION_INITIAL_VALUES, mapDesignationToFormData } from '@/Services/designationService';

export function useDesignationForm(designation, isEdit = false) {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm(
        isEdit ? mapDesignationToFormData(designation) : DESIGNATION_INITIAL_VALUES
    );

    const submit = (e) => {
        e.preventDefault();
        const url = isEdit 
            ? route('hr.designations.update', designation.id) 
            : route('hr.designations.store');

        post(url, {
            onSuccess: () => {
                if (!isEdit) reset();
            },
            onError: (errors) => {
                const firstError = Object.values(errors)[0];
                toast.error(firstError || `Failed to ${isEdit ? 'update' : 'create'} designation`, {
                    duration: 4000,
                    icon: '❌',
                });
            },
            preserveScroll: true,
        });
    };

    return { data, setData, processing, errors, reset, submit, flash };
}