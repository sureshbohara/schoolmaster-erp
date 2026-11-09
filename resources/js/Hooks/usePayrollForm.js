import { useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { PAYROLL_INITIAL_VALUES, mapPayrollToFormData } from '@/Services/payrollService';

export function usePayrollForm(payroll, isEdit = false) {
    const { data, setData, post, processing, errors, reset } = useForm(
        isEdit ? mapPayrollToFormData(payroll) : PAYROLL_INITIAL_VALUES
    );

    const submit = (e) => {
        e.preventDefault();
        const url = isEdit 
            ? route('hr.payrolls.update', payroll.id) 
            : route('hr.payrolls.store');

        post(url, {
            onSuccess: () => { if (!isEdit) reset(); },
            onError: (errors) => {
                toast.error(Object.values(errors)[0] || 'Failed to generate payroll', { icon: '❌' });
            },
            preserveScroll: true,
        });
    };

    return { data, setData, processing, errors, reset, submit };
}