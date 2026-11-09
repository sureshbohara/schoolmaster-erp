export const BOOK_ISSUE_INITIAL_VALUES = {
    book_id: '',
    member_id: '',
    member_type: 'student',
    issue_date: new Date().toISOString().split('T')[0],
    due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], 
    _method: 'POST',
};

export const MEMBER_TYPE_OPTIONS = [
    { value: 'student', label: '👨‍🎓 Student' },
    { value: 'employee', label: '👨‍💼 Employee' },
];

export const mapBookIssueToFormData = (issue) => ({
    book_id: issue?.book_id || '',
    member_id: issue?.member_id || '',
    member_type: issue?.member_type || 'student',
    issue_date: issue?.issue_date || new Date().toISOString().split('T')[0],
    due_date: issue?.due_date || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    _method: 'PUT',
});