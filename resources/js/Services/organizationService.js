export const ORGANIZATION_INITIAL_VALUES = {
    name: '',
    email: '',
    phone: '',
    website: '',
    established_date: '',
    address: '',
    status: 'active',
    logo: null,
    _method: 'POST',
};

export const STATUS_OPTIONS = [
    { value: 'active', label: '🟢 Active' },
    { value: 'inactive', label: '🟡 Inactive' },
];

export const mapOrganizationToFormData = (org) => ({
    name: org?.name || '',
    email: org?.email || '',
    phone: org?.phone || '',
    website: org?.website || '',
    established_date: org?.established_date 
        ? new Date(org.established_date).toISOString().split('T')[0] 
        : '',
    address: org?.address || '',
    status: org?.status || 'active',
    logo: null,
    _method: 'PUT',
});

export const validateLogo = (file) => {
    if (!file) return { valid: false, message: 'No file selected' };
    
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
        return { valid: false, message: 'Only JPG, PNG, WEBP, or GIF allowed' };
    }
    
    if (file.size > 2 * 1024 * 1024) {
        return { valid: false, message: 'Logo size must be less than 2MB' };
    }
    
    return { valid: true };
};