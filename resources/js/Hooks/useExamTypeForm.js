import { useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { EXAM_TYPE_INITIAL_VALUES, mapExamTypeToFormData } from '@/Services/examTypeService';

export function useExamTypeForm(type, isEdit = false) {
    const { data, setData, post, processing, errors, reset } = useForm(
        isEdit ? mapExamTypeToFormData(type) : EXAM_TYPE_INITIAL_VALUES
    );

    const submit = (e) => {
        e.preventDefault();
        const url = isEdit 
            ? route('exams.types.update', type.id) 
            : route('exams.types.store');

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