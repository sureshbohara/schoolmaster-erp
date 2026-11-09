import { useState, useRef } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { STUDENT_INITIAL_VALUES, mapStudentToFormData } from '@/Services/studentService';

export function useStudentForm(student, isEdit = false) {
    const fileInputRef = useRef(null);
    const [previewPhoto, setPreviewPhoto] = useState(student?.photo_url || null);

    const { data, setData, post, processing, errors, reset } = useForm(
        isEdit ? mapStudentToFormData(student) : STUDENT_INITIAL_VALUES
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

    const removePhoto = () => {
        setData('photo', null);
        setPreviewPhoto(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const submit = (e) => {
        e.preventDefault();
        const url = isEdit ? route('students.update', student.id) : route('students.store');

        post(url, {
            onSuccess: () => {
                reset('photo');
                if (!isEdit) reset();
            },
            onError: (errors) => {
                toast.error(Object.values(errors)[0] || 'Failed to save student', { icon: '❌' });
            },
            preserveScroll: true,
        });
    };

    return { data, setData, processing, errors, reset, previewPhoto, fileInputRef, handlePhotoChange, removePhoto, submit };
}