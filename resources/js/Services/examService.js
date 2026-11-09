export const EXAM_INITIAL_VALUES = {
    exam_type_id: '',
    class_id: '',
    academic_year_id: '',
    name: '',
    start_date: '',
    end_date: '',
    status: 'scheduled',
    schedules: [],
    _method: 'POST',
};

export const STATUS_OPTIONS = [
    { value: 'scheduled', label: '📅 Scheduled' },
    { value: 'ongoing', label: '🔄 Ongoing' },
    { value: 'completed', label: '✅ Completed' },
    { value: 'published', label: '📢 Published' },
];

export const mapExamToFormData = (exam) => ({
    exam_type_id: exam?.exam_type?.id || '',
    class_id: exam?.class?.id || '',
    academic_year_id: exam?.academic_year?.id || '',
    name: exam?.name || '',
    start_date: exam?.start_date || '',
    end_date: exam?.end_date || '',
    status: exam?.status || 'scheduled',
    schedules: Array.isArray(exam?.schedules) 
        ? exam.schedules.map(s => ({
            id: s.id || null, 
            subject_id: s.subject_id || (s.subject ? s.subject.id : ''),
            date: s.date || '',
            start_time: s.start_time || '',
            end_time: s.end_time || '',
            full_mark: s.full_mark || '',
            pass_mark: s.pass_mark || '',
        }))
        : [],
    _method: 'PUT',
});