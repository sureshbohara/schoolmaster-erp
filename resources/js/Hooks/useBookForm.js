import { useForm } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { BOOK_INITIAL_VALUES, mapBookToFormData } from '@/Services/bookService';

export function useBookForm(book, isEdit = false) {
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(book?.cover_image_url || null);
    const [fileName, setFileName] = useState(book?.cover_image ? 'Current file attached' : 'No file chosen');

    const { data, setData, post, processing, errors } = useForm(
        isEdit ? mapBookToFormData(book) : BOOK_INITIAL_VALUES
    );

    useEffect(() => {
        if (data.cover_image instanceof File) {
            setPreview(URL.createObjectURL(data.cover_image));
            setFileName(data.cover_image.name);
        }
    }, [data.cover_image]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error('Image size must be less than 2MB', { icon: '❌' });
                fileInputRef.current.value = '';
                return;
            }
            setData('cover_image', file);
        }
    };

    const removeImage = () => {
        setData('cover_image', null);
        setPreview(book?.cover_image_url || null);
        setFileName(book?.cover_image ? 'Current file attached' : 'No file chosen');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const submit = (e) => {
        e.preventDefault();
        const url = isEdit ? route('library.books.update', book.id) : route('library.books.store');

        post(url, {
            forceFormData: true, 
            onSuccess: () => {
            },
            onError: (errors) => {
               
            },
            preserveScroll: true,
        });
    };

    return {
        data, setData, processing, errors,
        preview, fileName, fileInputRef,
        handleFileChange, removeImage, submit
    };
}