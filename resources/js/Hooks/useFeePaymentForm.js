import { useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { FEE_PAYMENT_INITIAL_VALUES, mapPaymentToFormData } from '@/Services/feePaymentService';

export function useFeePaymentForm(payment, isEdit = false) {
    const { data, setData, post, processing, errors, reset } = useForm(
        isEdit ? mapPaymentToFormData(payment) : FEE_PAYMENT_INITIAL_VALUES
    );

    const submit = (e) => {
        e.preventDefault();
        const url = isEdit 
            ? route('fees.payments.update', payment.id) 
            : route('fees.payments.store');

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