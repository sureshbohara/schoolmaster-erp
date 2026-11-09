import { useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { FEE_STRUCTURE_INITIAL_VALUES, mapFeeStructureToFormData } from '@/Services/feeStructureService';

export function useFeeStructureForm(structure, isEdit = false) {
    const { data, setData, post, processing, errors, reset } = useForm(
        isEdit ? mapFeeStructureToFormData(structure) : FEE_STRUCTURE_INITIAL_VALUES
    );

    const submit = (e) => {
        e.preventDefault();
        const url = isEdit 
            ? route('fees.structures.update', structure.id) 
            : route('fees.structures.store');

        post(url, {
            onSuccess: () => { if (!isEdit) reset(); },
            onError: (errors) => {
                toast.error(Object.values(errors)[0] || 'Failed to save', { icon: '❌' });
            },
            preserveScroll: true,
        });
    };

    return { data, setData, processing, errors, reset, submit };
}