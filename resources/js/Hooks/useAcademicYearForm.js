import { useForm, usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { ACADEMIC_YEAR_INITIAL_VALUES, mapAcademicYearToFormData } from '@/Services/academicYearService';

export function useAcademicYearForm(year, isEdit = false) {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm(
        isEdit ? mapAcademicYearToFormData(year) : ACADEMIC_YEAR_INITIAL_VALUES
    );

    const submit = (e) => {
        e.preventDefault();
        const url = isEdit ? route('academic.years.update', year.id) : route('academic.years.store');

        post(url, {
            onSuccess: () => {
                if (!isEdit) reset();
            },
            onError: (errors) => {
                const firstError = Object.values(errors)[0];
                toast.error(firstError || `Failed to ${isEdit ? 'update' : 'create'} academic year`, {
                    duration: 4000,
                    icon: '❌',
                });
            },
            preserveScroll: true,
        });
    };

    return { data, setData, processing, errors, reset, submit, flash };
}