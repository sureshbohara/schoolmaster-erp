import { useForm, usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { BOOK_ISSUE_INITIAL_VALUES, mapBookIssueToFormData } from '@/Services/bookIssueService';

export function useBookIssueForm(issue, isEdit = false, onSuccessCallback = null) {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm(
        isEdit ? mapBookIssueToFormData(issue) : BOOK_ISSUE_INITIAL_VALUES
    );

    const submit = (e) => {
        e.preventDefault();

        const url = isEdit 
            ? route('library.issues.update', issue.id) 
            : route('library.issues.store');

        post(url, {
            onSuccess: () => {
                if (!isEdit) reset();
                if (onSuccessCallback) onSuccessCallback();
            },
            onError: (errors) => {
                const firstError = Object.values(errors)[0];
                toast.error(firstError || `Failed to ${isEdit ? 'update' : 'issue'} book`, {
                    duration: 4000,
                    icon: '❌',
                });
            },
            preserveScroll: true,
        });
    };

    return {
        data, setData, processing, errors, reset,
        submit, flash,
    };
}