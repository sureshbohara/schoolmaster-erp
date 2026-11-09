export const PROFILE_INITIAL_VALUES = {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    phone: '',
    bio: '',
    gender: 'male',
    image: null,
    _method: 'PUT',
};

export const GENDER_OPTIONS = [
    { value: 'male', label: '👨 Male' },
    { value: 'female', label: '👩 Female' },
    { value: 'other', label: '🧑 Other' },
];

export const MAX_IMAGE_SIZE = 2 * 1024 * 1024; 

export const ALLOWED_IMAGE_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
];

export const mapUserToFormData = (user) => ({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    username: user?.username || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    gender: user?.gender || 'male',
    image: null,
    _method: 'PUT',
});

export const validateImage = (file) => {
    if (!file) return { valid: false, message: 'No file selected' };
    
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        return { 
            valid: false, 
            message: 'Only JPG, PNG, WEBP, or GIF allowed' 
        };
    }
    if (file.size > MAX_IMAGE_SIZE) {
        return { 
            valid: false, 
            message: 'Image size must be less than 2MB' 
        };
    }
    return { valid: true };
};