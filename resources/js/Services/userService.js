export const USER_INITIAL_VALUES = {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    phone: '',
    password: '',
    password_confirmation: '',
    role_id: '',
    branch_id: '',
    organization_id: '',
    gender: 'male',
    bio: '',
    status: 'active',
    image: null,
    _method: 'POST',
};

export const GENDER_OPTIONS = [
    { value: 'male', label: '👨 Male' },
    { value: 'female', label: '👩 Female' },
    { value: 'other', label: '🧑 Other' },
];



export const mapUserToFormData = (user) => ({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    username: user?.username || '',
    phone: user?.phone || '',
    password: '',
    password_confirmation: '',
    role_id: user?.role?.id || '',
    branch_id: user?.branch?.id || '',
    organization_id: user?.organization?.id || '',
    gender: user?.gender || 'male',
    bio: user?.bio || '',
    status: user?.status || 'active',
    image: null,
    _method: 'PUT',
});

export const validateImage = (file) => {
    if (!file) return { valid: false, message: 'No file selected' };
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
        return { valid: false, message: 'Only JPG, PNG, WEBP, or GIF allowed' };
    }
    if (file.size > 2 * 1024 * 1024) {
        return { valid: false, message: 'Image size must be less than 2MB' };
    }
    return { valid: true };
};