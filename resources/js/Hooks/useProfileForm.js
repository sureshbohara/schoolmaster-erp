import { useState, useRef } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { mapUserToFormData, validateImage } from '@/Services/profileService';

export function useProfileForm(user) {
    const { flash } = usePage().props;
    const fileInputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(user?.image_url || null);

    const { data, setData, post, processing, errors, reset } = useForm(
        mapUserToFormData(user)
    );

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const validation = validateImage(file);

        if (!validation.valid) {
            toast.error(validation.message);
            return;
        }

        setData('image', file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const removeImage = () => {
        setData('image', null);
        setPreviewImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('profile.update'), {
            onSuccess: () => {
                reset('image');
            },
            onError: (errors) => {
                const firstError = Object.values(errors)[0];
                toast.error(firstError || 'Failed to update profile', {
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
        previewImage,
        fileInputRef,
        handleImageChange,
        removeImage,
        submit,
        flash,
    };
}