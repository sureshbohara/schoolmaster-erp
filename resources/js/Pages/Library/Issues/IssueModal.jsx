import Modal from '@/Components/Modal';
import FormInput from '@/Components/Form/FormInput';
import { useBookIssueForm } from '@/Hooks/useBookIssueForm';
import { Save, Loader2 } from 'lucide-react';

export default function IssueModal({ isOpen, onClose, books, students, employees, isEdit = false, issueData = null }) {
    const { data, setData, processing, errors, reset, submit } = useBookIssueForm(
        issueData, 
        isEdit, 
        onClose 
    );

    const handleMemberTypeChange = (type) => {
        setData({ ...data, member_type: type, member_id: '' });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit Issue' : 'Issue Book'} size="md">
            <form onSubmit={submit} className="space-y-4">
                <FormInput 
                    label="Select Book" 
                    type="select" 
                    value={data.book_id} 
                    onChange={(v) => setData('book_id', v)} 
                    error={errors.book_id} 
                    options={[
                        { value: '', label: '-- Choose Book --' }, 
                        ...(books?.map(b => ({ value: b.id, label: `${b.title} (${b.book_no})` })) || [])
                    ]} 
                    required 
                />

                <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Member Type</label>
                    <div className="grid grid-cols-2 gap-2">
                        <button 
                            type="button" 
                            onClick={() => handleMemberTypeChange('student')} 
                            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                                data.member_type === 'student' 
                                ? 'bg-emerald-600 text-white border-emerald-600' 
                                : 'bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-slate-600'
                            }`}
                        >
                            Student
                        </button>
                        <button 
                            type="button" 
                            onClick={() => handleMemberTypeChange('employee')} 
                            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                                data.member_type === 'employee' 
                                ? 'bg-emerald-600 text-white border-emerald-600' 
                                : 'bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-slate-600'
                            }`}
                        >
                            Employee
                        </button>
                    </div>
                </div>

                <FormInput 
                    label={data.member_type === 'student' ? 'Select Student' : 'Select Employee'} 
                    type="select" 
                    value={data.member_id} 
                    onChange={(v) => setData('member_id', v)} 
                    error={errors.member_id} 
                    options={[
                        { value: '', label: `-- Choose ${data.member_type === 'student' ? 'Student' : 'Employee'} --` }, 
                        ...(data.member_type === 'student' 
                            ? students?.map(s => ({ value: s.id, label: `${s.first_name} ${s.last_name} (${s.admission_no})` })) 
                            : employees?.map(e => ({ value: e.id, label: `${e.first_name} ${e.last_name} (${e.employee_id})` }))
                        ) || []
                    ]} 
                    required 
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormInput label="Issue Date" type="date" value={data.issue_date} onChange={(v) => setData('issue_date', v)} error={errors.issue_date} required />
                    <FormInput label="Due Date" type="date" value={data.due_date} onChange={(v) => setData('due_date', v)} error={errors.due_date} required />
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-200 dark:border-slate-700">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg text-sm">Cancel</button>
                    <button type="submit" disabled={processing} className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium rounded-lg text-sm shadow-sm disabled:cursor-not-allowed">
                        {processing ? <><Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> Processing...</> : <><Save className="w-4 h-4 mr-1.5" /> {isEdit ? 'Update' : 'Issue Book'}</>}
                    </button>
                </div>
            </form>
        </Modal>
    );
}