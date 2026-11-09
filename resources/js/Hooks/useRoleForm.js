import { useForm, usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { ROLE_INITIAL_VALUES, mapRoleToFormData } from '@/Services/roleService';

export function useRoleForm(role, isEdit = false) {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm(
        isEdit ? mapRoleToFormData(role) : ROLE_INITIAL_VALUES
    );


    const togglePermission = (permissionId) => {
        const current = data.permissions || [];
        if (current.includes(permissionId)) {
            setData('permissions', current.filter(id => id !== permissionId));
        } else {
            setData('permissions', [...current, permissionId]);
        }
    };


    const toggleModule = (modulePermissions) => {
        const current = data.permissions || [];
        const moduleIds = modulePermissions.map(p => p.id);
        const allSelected = moduleIds.every(id => current.includes(id));
        
        if (allSelected) {
            setData('permissions', current.filter(id => !moduleIds.includes(id)));
        } else {
            setData('permissions', [...new Set([...current, ...moduleIds])]);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        const url = isEdit ? route('roles.update', role.id) : route('roles.store');

        post(url, {
            onSuccess: () => {
                if (!isEdit) reset();
            },
            onError: (errors) => {
                const firstError = Object.values(errors)[0];
                toast.error(firstError || `Failed to ${isEdit ? 'update' : 'create'} role`, {
                    duration: 4000,
                    icon: '❌',
                });
            },
            preserveScroll: true,
        });
    };

    return {
        data, setData, processing, errors, reset,
        togglePermission, toggleModule, submit, flash,
    };
}