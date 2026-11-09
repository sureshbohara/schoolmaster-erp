export const ROLE_INITIAL_VALUES = {
    name: '',
    guard_name: 'web',
    permissions: [],
    _method: 'POST',
};

export const mapRoleToFormData = (role) => ({
    name: role?.name || '',
    guard_name: role?.guard_name || 'web',
    permissions: role?.permissions?.map(p => p.id) || [],
    _method: 'PUT',
});