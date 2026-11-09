import { useState, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { LEAVE_INITIAL_VALUES, mapLeaveToFormData } from '@/Services/leaveApplicationService';

export function useLeaveApplicationForm(leave, isEdit = false) {
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState(leave?.attachment_url ? 'File attached' : 'No file chosen');

    const { data, setData, post, processing, errors, reset } = useForm(
        isEdit ? mapLeaveToFormData(leave) : LEAVE_INITIAL_VALUES
    );

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error('Attachment size must be less than 2MB');
                return;
            }
            setData('attachment', file);
            setFileName(file.name);
        }
    };

    const removeFile = () => {
        setData('attachment', null);
        setFileName('No file chosen');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const submit = (e) => {
        e.preventDefault();
        const url = isEdit ? route('hr.leaves.update', leave.id) : route('hr.leaves.store');

        post(url, {
            onSuccess: () => {
                reset('attachment');
                if (!isEdit) reset();
            },
            onError: (errors) => {
                toast.error(Object.values(errors)[0] || 'Failed to save', { icon: '❌' });
            },
            preserveScroll: true,
        });
    };

    return { data, setData, processing, errors, reset, fileName, fileInputRef, handleFileChange, removeFile, submit };
}