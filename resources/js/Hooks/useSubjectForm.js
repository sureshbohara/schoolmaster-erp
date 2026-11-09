import { useForm, usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { SUBJECT_INITIAL_VALUES, mapSubjectToFormData } from '@/Services/subjectService';

export function useSubjectForm(subject, isEdit = false) {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm(
        isEdit ? mapSubjectToFormData(subject) : SUBJECT_INITIAL_VALUES
    );

    const submit = (e) => {
        e.preventDefault();
        const url = isEdit ? route('academic.subjects.update', subject.id) : route('academic.subjects.store');

        post(url, {
            onSuccess: () => {
                if (!isEdit) reset();
            },
            onError: (errors) => {
                const firstError = Object.values(errors)[0];
                toast.error(firstError || `Failed to ${isEdit ? 'update' : 'create'} subject`, {
                    duration: 4000,
                    icon: '❌',
                });
            },
            preserveScroll: true,
        });
    };

    return { data, setData, processing, errors, reset, submit, flash };
}