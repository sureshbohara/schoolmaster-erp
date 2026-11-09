import { useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { FEE_TYPE_INITIAL_VALUES, mapFeeTypeToFormData } from '@/Services/feeTypeService';

export function useFeeTypeForm(type, isEdit = false) {
    const { data, setData, post, processing, errors, reset } = useForm(
        isEdit ? mapFeeTypeToFormData(type) : FEE_TYPE_INITIAL_VALUES
    );

    const submit = (e) => {
        e.preventDefault();
        const url = isEdit ? route('fees.types.update', type.id) : route('fees.types.store');

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