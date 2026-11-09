import { useState, useRef } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { EMPLOYEE_INITIAL_VALUES, mapEmployeeToFormData } from '@/Services/employeeService';

export function useEmployeeForm(employee, isEdit = false) {
    const photoInputRef = useRef(null);
    const signatureInputRef = useRef(null);
    const [previewPhoto, setPreviewPhoto] = useState(employee?.photo_url || null);
    const [previewSignature, setPreviewSignature] = useState(employee?.signature_url || null);

    const { data, setData, post, processing, errors, reset } = useForm(
        isEdit ? mapEmployeeToFormData(employee) : EMPLOYEE_INITIAL_VALUES
    );

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 2 * 1024 * 1024) {
            toast.error('Photo size must be less than 2MB');
            return;
        }
        setData('photo', file);
        setPreviewPhoto(URL.createObjectURL(file));
    };

    const handleSignatureChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 1024 * 1024) {
            toast.error('Signature size must be less than 1MB');
            return;
        }
        setData('signature', file);
        setPreviewSignature(URL.createObjectURL(file));
    };

    const removePhoto = () => {
        setData('photo', null);
        setPreviewPhoto(null);
        if (photoInputRef.current) photoInputRef.current.value = '';
    };

    const removeSignature = () => {
        setData('signature', null);
        setPreviewSignature(null);
        if (signatureInputRef.current) signatureInputRef.current.value = '';
    };

    const submit = (e) => {
        e.preventDefault();
        const url = isEdit ? route('hr.employees.update', employee.id) : route('hr.employees.store');

        post(url, {
            onSuccess: () => {
                reset('photo', 'signature');
                if (!isEdit) reset();
            },
            onError: (errors) => {
                toast.error(Object.values(errors)[0] || 'Failed to save employee', { icon: '❌' });
            },
            preserveScroll: true,
        });
    };

    return { 
        data, setData, processing, errors, reset, 
        previewPhoto, previewSignature,
        photoInputRef, signatureInputRef,
        handlePhotoChange, handleSignatureChange,
        removePhoto, removeSignature,
        submit 
    };
}