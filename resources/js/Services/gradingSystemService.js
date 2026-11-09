export const GRADING_SYSTEM_INITIAL_VALUES = {
    name: '',
    min_mark: '',
    max_mark: '',
    grade_point: '',
    grade: '',
    remark: '',
    _method: 'POST',
};

export const mapGradingSystemToFormData = (system) => ({
    name: system?.name || '',
    min_mark: system?.min_mark || '',
    max_mark: system?.max_mark || '',
    grade_point: system?.grade_point || '',
    grade: system?.grade || '',
    remark: system?.remark || '',
    _method: 'PUT',
});