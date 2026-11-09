import { useForm, usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { BRANCH_INITIAL_VALUES, mapBranchToFormData } from '@/Services/branchService';

export function useBranchForm(branch, isEdit = false) {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm(
        isEdit ? mapBranchToFormData(branch) : BRANCH_INITIAL_VALUES
    );

    const submit = (e) => {
        e.preventDefault();

        const url = isEdit ? route('branches.update', branch.id) : route('branches.store');

        post(url, {
            onSuccess: () => {
                if (!isEdit) reset();
            },
            onError: (errors) => {
                const firstError = Object.values(errors)[0];
                toast.error(firstError || `Failed to ${isEdit ? 'update' : 'create'} branch`, {
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