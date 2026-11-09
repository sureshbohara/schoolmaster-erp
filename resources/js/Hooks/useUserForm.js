import { useState, useRef } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { USER_INITIAL_VALUES, mapUserToFormData, validateImage } from '@/Services/userService';

export function useUserForm(user, isEdit = false) {
    const { flash } = usePage().props;
    const fileInputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(user?.image_url || null);

    const { data, setData, post, processing, errors, reset } = useForm(
        isEdit ? mapUserToFormData(user) : USER_INITIAL_VALUES
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

        const url = isEdit ? route('users.update', user.id) : route('users.store');

        post(url, {
            onSuccess: () => {
                reset('password', 'password_confirmation', 'image');
                if (!isEdit) {
                    reset(); 
                }
            },
            onError: (errors) => {
                const firstError = Object.values(errors)[0];
                toast.error(firstError || `Failed to ${isEdit ? 'update' : 'create'} user`, {
                    duration: 4000,
                    icon: '❌',
                });
            },
            preserveScroll: true,
        });
    };

    return {
        data, setData, processing, errors, reset,
        previewImage, fileInputRef,
        handleImageChange, removeImage, submit, flash,
    };
}