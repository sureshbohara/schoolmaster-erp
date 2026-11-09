import { useForm, usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { SECTION_INITIAL_VALUES, mapSectionToFormData } from '@/Services/sectionService';

export function useSectionForm(section, isEdit = false) {
    const { data, setData, post, processing, errors, reset } = useForm(
        isEdit ? mapSectionToFormData(section) : SECTION_INITIAL_VALUES
    );

    const submit = (e) => {
        e.preventDefault();
        const url = isEdit ? route('academic.sections.update', section.id) : route('academic.sections.store');
        post(url, {
            onSuccess: () => { if (!isEdit) reset(); },
            onError: (errors) => toast.error(Object.values(errors)[0] || 'Failed', { icon: '❌' }),
            preserveScroll: true,
        });
    };
    return { data, setData, processing, errors, reset, submit };
}