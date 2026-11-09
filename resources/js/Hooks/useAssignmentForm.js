import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { ASSIGNMENT_INITIAL_VALUES, mapAssignmentToFormData } from '@/Services/assignmentService';

export function useAssignmentForm(assignment, isEdit = false, onSuccessCallback = null) {
    const form = useForm(
        isEdit ? mapAssignmentToFormData(assignment) : ASSIGNMENT_INITIAL_VALUES
    );

    useEffect(() => {
        if (isEdit && assignment) {
            form.setData(mapAssignmentToFormData(assignment));
        } else {
            form.reset();
        }
    }, [assignment, isEdit]);

    const submit = (e) => {
        e.preventDefault();
        const url = isEdit 
            ? route('transport.assignments.update', assignment.id) 
            : route('transport.assignments.store');

        form.post(url, {
            onSuccess: () => {
                if (onSuccessCallback) onSuccessCallback();
            },
            onError: (errors) => toast.error(Object.values(errors)[0] || 'Failed to save', { icon: '❌' }),
            preserveScroll: true,
        });
    };

    return { ...form, submit };
}