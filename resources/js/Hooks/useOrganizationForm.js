import { useState, useRef } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { 
    ORGANIZATION_INITIAL_VALUES, 
    mapOrganizationToFormData, 
    validateLogo 
} from '@/Services/organizationService';

export function useOrganizationForm(organization, isEdit = false) {
    const { flash } = usePage().props;
    const fileInputRef = useRef(null);
    const [previewLogo, setPreviewLogo] = useState(organization?.logo_url || null);

    const { data, setData, post, processing, errors, reset } = useForm(
        isEdit ? mapOrganizationToFormData(organization) : ORGANIZATION_INITIAL_VALUES
    );

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        const validation = validateLogo(file);

        if (!validation.valid) {
            toast.error(validation.message);
            return;
        }

        setData('logo', file);
        setPreviewLogo(URL.createObjectURL(file));
    };

    const removeLogo = () => {
        setData('logo', null);
        setPreviewLogo(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const submit = (e) => {
        e.preventDefault();

        const url = isEdit 
            ? route('organizations.update', organization.id) 
            : route('organizations.store');

        post(url, {
            onSuccess: () => {
                reset('logo');
                if (!isEdit) {
                    reset();
                }
            },
            onError: (errors) => {
                const firstError = Object.values(errors)[0];
                toast.error(firstError || `Failed to ${isEdit ? 'update' : 'create'} organization`, {
                    duration: 4000,
                    icon: '❌',
                });
            },
            preserveScroll: true,
        });
    };

    return {
        data,
        setData,
        processing,
        errors,
        reset,
        previewLogo,
        fileInputRef,
        handleLogoChange,
        removeLogo,
        submit,
        flash,
    };
}