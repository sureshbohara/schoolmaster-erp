import { useForm, usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { DEPARTMENT_INITIAL_VALUES, mapDepartmentToFormData } from '@/Services/departmentService';

export function useDepartmentForm(department, isEdit = false) {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm(
        isEdit ? mapDepartmentToFormData(department) : DEPARTMENT_INITIAL_VALUES
    );

    const submit = (e) => {
        e.preventDefault();
        const url = isEdit 
            ? route('hr.departments.update', department.id) 
            : route('hr.departments.store');

        post(url, {
            onSuccess: () => {
                if (!isEdit) reset();
            },
            onError: (errors) => {
                const firstError = Object.values(errors)[0];
                toast.error(firstError || `Failed to ${isEdit ? 'update' : 'create'} department`, {
                    duration: 4000,
                    icon: '❌',
                });
            },
            preserveScroll: true,
        });
    };

    return { data, setData, processing, errors, reset, submit, flash };
}