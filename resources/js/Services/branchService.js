export const BRANCH_INITIAL_VALUES = {
    name: '',
    code: '',
    organization_id: '',
    email: '',
    phone: '',
    address: '',
    status: 'active',
    _method: 'POST',
};

export const STATUS_OPTIONS = [
    { value: 'active', label: '🟢 Active' },
    { value: 'inactive', label: '🟡 Inactive' },
];

export const mapBranchToFormData = (branch) => ({
    name: branch?.name || '',
    code: branch?.code || '',
    organization_id: branch?.organization_id || branch?.organization?.id || '',
    email: branch?.email || '',
    phone: branch?.phone || '',
    address: branch?.address || '',
    status: branch?.status || 'active',
    _method: 'PUT',
});