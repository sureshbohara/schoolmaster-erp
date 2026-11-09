import { useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { SALARY_STRUCTURE_INITIAL_VALUES, mapSalaryStructureToFormData } from '@/Services/salaryStructureService';

export function useSalaryStructureForm(structure, isEdit = false) {
    const { data, setData, post, processing, errors, reset } = useForm(
        isEdit ? mapSalaryStructureToFormData(structure) : SALARY_STRUCTURE_INITIAL_VALUES
    );

    const submit = (e) => {
        e.preventDefault();
        const url = isEdit 
            ? route('hr.salary-structures.update', structure.id) 
            : route('hr.salary-structures.store');

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