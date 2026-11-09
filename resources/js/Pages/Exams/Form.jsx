import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Calendar, Save, ArrowLeft, Plus, Trash2, BookOpen, Settings, Loader2 } from 'lucide-react';
import { EXAM_INITIAL_VALUES, STATUS_OPTIONS, mapExamToFormData } from '@/Services/examService';

export default function ExamForm({ exam, dropdownData }) {
    const isEdit = !!exam;
    const { data, setData, post, processing, errors } = useForm(
        isEdit ? mapExamToFormData(exam) : EXAM_INITIAL_VALUES
    );

    const breadcrumbItems = [{ label: 'Dashboard', href: route('dashboard') }, { label: 'Examinations', href: route('exams.index') }];


    const availableSubjects = dropdownData?.subjects || [];

    const addSchedule = () => {
        setData('schedules', [...data.schedules, {
            subject_id: '',
            date: '',
            start_time: '',
            end_time: '',
            full_mark: '',
            pass_mark: '',
        }]);
    };

        const removeSchedule = (index) => {
            const newSchedules = [...data.schedules];
            newSchedules.splice(index, 1);
            setData('schedules', newSchedules);
        };

        const updateSchedule = (index, field, value) => {
            const newSchedules = [...data.schedules];
            newSchedules[index][field] = value;
            setData('schedules', newSchedules);
        };


        const getDuration = () => {
            if (data.start_date && data.end_date) {
                const start = new Date(data.start_date);
                const end = new Date(data.end_date);
                const diffTime = Math.abs(end - start);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                return `${diffDays} Days`;
            }
            return '—';
        };

       const submit = (e) => {
        e.preventDefault();
        const cleanSchedules = data.schedules.map(schedule => ({
            ...schedule,
            start_time: schedule.start_time === '' ? null : schedule.start_time,
            end_time: schedule.end_time === '' ? null : schedule.end_time,
        }));
        const payload = {
            ...data,
            schedules: cleanSchedules
        };
        const url = isEdit ? route('exams.update', exam.id) : route('exams.store');
        post(url, payload, {
            onSuccess: () => {
            },
            onError: (errors) => {
                toast.error(Object.values(errors)[0] || 'Failed to save', { icon: '❌' });
            },
            preserveScroll: true,
        });
    };
    return (
        <AppLayout title={isEdit ? 'Edit Exam' : 'Create Exam'}>
            <Head title={isEdit ? 'Edit Exam' : 'Create Exam'} />
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Breadcrumb title="Examinations" subTitle={isEdit ? 'Edit Exam' : 'Create Exam'} breadcrumbItems={breadcrumbItems} />
                    <Link href={route('exams.index')} className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to List
                    </Link>
                </div>
                
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        
                        <div className="lg:col-span-2 space-y-6">
                            
                         
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                    <Calendar className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Exam Details
                                </h2>
                                <div className="space-y-5">
                                    <FormInput 
                                        label="Exam Name" 
                                        value={data.name} 
                                        onChange={(v) => setData('name', v)} 
                                        error={errors.name} 
                                        placeholder="e.g., First Terminal Examination 2026" 
                                        required 
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormInput 
                                            label="Class" 
                                            type="select" 
                                            value={data.class_id} 
                                            onChange={(v) => { setData('class_id', v); setData('schedules', []); }} 
                                            error={errors.class_id} 
                                            options={[
                                                { value: '', label: '-- Select Class --' },
                                                ...(dropdownData?.classes?.map(c => ({ value: c.id, label: c.name })) || [])
                                            ]} 
                                            required 
                                        />
                                        <FormInput 
                                            label="Academic Year" 
                                            type="select" 
                                            value={data.academic_year_id} 
                                            onChange={(v) => setData('academic_year_id', v)} 
                                            error={errors.academic_year_id} 
                                            options={[
                                                { value: '', label: '-- Select Academic Year --' },
                                                ...(dropdownData?.academicYears?.map(y => ({ value: y.id, label: y.title })) || [])
                                            ]} 
                                            required 
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormInput 
                                            label="Exam Type" 
                                            type="select" 
                                            value={data.exam_type_id} 
                                            onChange={(v) => setData('exam_type_id', v)} 
                                            error={errors.exam_type_id} 
                                            options={[
                                                { value: '', label: '-- Select Exam Type --' },
                                                ...(dropdownData?.examTypes?.map(t => ({ value: t.id, label: t.name })) || [])
                                            ]} 
                                            required 
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <FormInput 
                                                label="Start Date" 
                                                type="date" 
                                                value={data.start_date} 
                                                onChange={(v) => setData('start_date', v)} 
                                                error={errors.start_date} 
                                                required 
                                            />
                                            <FormInput 
                                                label="End Date" 
                                                type="date" 
                                                value={data.end_date} 
                                                onChange={(v) => setData('end_date', v)} 
                                                error={errors.end_date} 
                                                required 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
                                <div className="flex items-center justify-between mb-5 pb-2 border-b border-gray-200 dark:border-slate-700">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                        <BookOpen className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Subject Schedules
                                    </h2>
                                    <button 
                                        type="button" 
                                        onClick={addSchedule}
                                        className="inline-flex items-center px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
                                    >
                                        <Plus className="w-4 h-4 mr-1" /> Add Subject
                                    </button>
                                </div>

                                {data.schedules.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-900/50 rounded-lg border border-dashed border-gray-300 dark:border-slate-700">
                                        <BookOpen className="w-12 h-12 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                                        <p className="text-sm">No subjects added yet. Click "Add Subject" to create schedules.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {data.schedules.map((schedule, index) => (
                                            <div key={index} className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 relative group">
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Subject #{index + 1}</span>
                                                    <button 
                                                        type="button" 
                                                        onClick={() => removeSchedule(index)}
                                                        className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded border border-red-200 dark:border-red-800 transition-colors"
                                                        title="Remove Subject"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <div className="md:col-span-2">
                                                        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Subject</label>
                                                        <select 
                                                            value={schedule.subject_id} 
                                                            onChange={(e) => updateSchedule(index, 'subject_id', e.target.value)}
                                                            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white outline-none text-sm"
                                                        >
                                                            <option value="">-- Select Subject --</option>
                                                            {availableSubjects.map(s => (
                                                                <option key={s.id} value={s.id}>{s.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Date</label>
                                                        <input 
                                                            type="date" 
                                                            value={schedule.date} 
                                                            onChange={(e) => updateSchedule(index, 'date', e.target.value)}
                                                            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white outline-none text-sm"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div>
                                                            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Start</label>
                                                            <input 
                                                                type="time" 
                                                                value={schedule.start_time} 
                                                                onChange={(e) => updateSchedule(index, 'start_time', e.target.value)}
                                                                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white outline-none text-sm"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">End</label>
                                                            <input 
                                                                type="time" 
                                                                value={schedule.end_time} 
                                                                onChange={(e) => updateSchedule(index, 'end_time', e.target.value)}
                                                                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white outline-none text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Full Mark</label>
                                                        <input 
                                                            type="number" 
                                                            value={schedule.full_mark} 
                                                            onChange={(e) => updateSchedule(index, 'full_mark', e.target.value)}
                                                            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white outline-none text-sm"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Pass Mark</label>
                                                        <input 
                                                            type="number" 
                                                            value={schedule.pass_mark} 
                                                            onChange={(e) => updateSchedule(index, 'pass_mark', e.target.value)}
                                                            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white outline-none text-sm"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                    
                        <div className="lg:col-span-1 space-y-6">
                            
                      
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6 sticky top-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                    <Settings className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Settings & Summary
                                </h2>
                                
                                <div className="space-y-5">
                                    <FormInput 
                                        label="Status" 
                                        type="select" 
                                        value={data.status} 
                                        onChange={(v) => setData('status', v)} 
                                        error={errors.status} 
                                        options={STATUS_OPTIONS} 
                                        required 
                                    />

                            
                                    <div className="pt-4 border-t border-gray-200 dark:border-slate-700 space-y-3">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
                                                <BookOpen className="w-4 h-4" /> Total Subjects
                                            </span>
                                            <span className="font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded">
                                                {data.schedules.length}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4" /> Duration
                                            </span>
                                            <span className="font-semibold text-gray-900 dark:text-white">
                                                {getDuration()}
                                            </span>
                                        </div>
                                    </div>

                                   
                                    <div className="pt-4 border-t border-gray-200 dark:border-slate-700 mt-6">
                                        <button 
                                            type="submit" 
                                            disabled={processing} 
                                            className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:cursor-not-allowed"
                                        >
                                            {processing ? (
                                                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</>
                                            ) : (
                                                <><Save className="w-5 h-5 mr-2" /> {isEdit ? 'Update Exam' : 'Create Exam'}</>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}