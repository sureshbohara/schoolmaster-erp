import { useForm, usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { STUDENT_CATEGORY_INITIAL_VALUES, mapStudentCategoryToFormData } from '@/Services/studentCategoryService';

export function useStudentCategoryForm(category, isEdit = false) {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm(
        isEdit ? mapStudentCategoryToFormData(category) : STUDENT_CATEGORY_INITIAL_VALUES
    );

    const submit = (e) => {
        e.preventDefault();
        const url = isEdit 
            ? route('academic.student-categories.update', category.id) 
            : route('academic.student-categories.store');

        post(url, {
            onSuccess: () => {
                if (!isEdit) reset();
            },
            onError: (errors) => {
                const firstError = Object.values(errors)[0];
                toast.error(firstError || `Failed to ${isEdit ? 'update' : 'create'} category`, {
                    duration: 4000,
                    icon: '❌',
                });
            },
            preserveScroll: true,
        });
    };

    return { data, setData, processing, errors, reset, submit, flash };
}