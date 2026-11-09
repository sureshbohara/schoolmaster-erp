import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { useState } from 'react';
import { User, Plus, Pencil, Trash2, Search, X, GraduationCap, Phone, Layers, FileSpreadsheet, Upload, AlertCircle } from 'lucide-react';
import { STATUS_OPTIONS } from '@/Services/studentService';

export default function StudentsIndex({ students, dropdownData, filters }) {
    const { props } = usePage();
    const flash = props.flash || {};
    const pageErrors = props.errors || {};

    const studentList = students?.data || [];
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [filterClass, setFilterClass] = useState(filters?.class_id || '');
    const [filterStatus, setFilterStatus] = useState(filters?.status || '');
    const [showImportModal, setShowImportModal] = useState(false);

    const { data, setData, post, processing, reset, clearErrors } = useForm({
        file: null,
    });

    const breadcrumbItems = [{ label: 'Dashboard', href: route('dashboard') }, { label: 'Students', href: '#' }];

    const handleReset = () => {
        setSearchTerm(''); setFilterClass(''); setFilterStatus('');
        router.get(route('students.index'), {}, { preserveState: true, preserveScroll: true });
    };

    const handleFilterChange = (key, value) => {
        if (key === 'search') setSearchTerm(value);
        if (key === 'class_id') setFilterClass(value);
        if (key === 'status') setFilterStatus(value);
        
        router.get(route('students.index'), { search: searchTerm, class_id: filterClass, status: filterStatus, [key]: value }, { preserveState: true, preserveScroll: true });
    };

    const handleStatusToggle = (studentId, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        router.post(route('students.status', studentId), { status: newStatus }, { preserveScroll: true });
    };

    const handleDelete = (studentId, studentName) => {
        if (confirm(`Are you sure you want to delete "${studentName}"?`)) {
            router.delete(route('students.destroy', studentId), { preserveScroll: true });
        }
    };

   
    const handleExport = () => {
        window.location.href = route('students.export');
    };

 
    const handleImport = (e) => {
        e.preventDefault();
        post(route('students.import'), {
            forceFormData: true,
            onSuccess: () => {
                setShowImportModal(false);
                reset();
                clearErrors();
            },
        });
    };

    return (
        <AppLayout title="Students">
            <Head title="Student Management" />
            <div className="space-y-3">
                
       
             
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Students" subTitle="Admission / List" breadcrumbItems={breadcrumbItems} />
                    
                    <div className="flex flex-wrap items-center gap-2">
                        <button 
                            onClick={handleExport}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm"
                        >
                            <FileSpreadsheet className="w-4 h-4 mr-1.5" /> Export Excel
                        </button>
                        
                        <button 
                            onClick={() => setShowImportModal(true)}
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm"
                        >
                            <Upload className="w-4 h-4 mr-1.5" /> Import Excel
                        </button>

                        <Link href={route('students.create')} className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                            <Plus className="w-4 h-4 mr-1.5" /> New Admission
                        </Link>
                    </div>
                </div>

              
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div className="relative md:col-span-2">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type="text" placeholder="Search by name or admission no..." value={searchTerm} onChange={(e) => handleFilterChange('search', e.target.value)} className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm" />
                        </div>
                        <div className="relative">
                            <select value={filterClass} onChange={(e) => handleFilterChange('class_id', e.target.value)} className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm appearance-none cursor-pointer">
                                <option value="">All Classes</option>
                                {dropdownData?.classes?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div className="flex gap-2">
                            <select value={filterStatus} onChange={(e) => handleFilterChange('status', e.target.value)} className="flex-1 px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm appearance-none cursor-pointer">
                                <option value="">All Status</option>
                                {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                            </select>
                            <button onClick={handleReset} className="px-4 py-2 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg transition-colors text-sm flex items-center justify-center">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

             
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-gray-200 dark:border-slate-700">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Student</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Class / Section</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Admission No</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Contact</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Status</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                                {studentList.map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                {student.photo_url ? (
                                                    <img src={student.photo_url} alt={student.first_name} className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-slate-600" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                                        <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-white">{student.first_name} {student.last_name}</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">{student.gender}, {student.dob}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="text-sm text-gray-900 dark:text-white">{student.class?.name || 'N/A'}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"><Layers className="w-3 h-3" /> {student.section?.name || 'N/A'}</div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 font-mono">{student.admission_no}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                                <Phone className="w-3.5 h-3.5 mr-1.5 text-gray-400" />{student.contact_number || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${
                                                student.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 
                                                student.status === 'graduated' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : 
                                                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                            }`}>
                                                {student.status.replace('_', ' ').toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end space-x-1">
                                                <button onClick={() => handleStatusToggle(student.id, student.status)} className="p-1.5 text-gray-600 hover:bg-gray-100 dark:hover:bg-slate-700 rounded border border-gray-200 dark:border-slate-700 transition-colors" title="Toggle Status">
                                                    <GraduationCap className="w-3.5 h-3.5" />
                                                </button>
                                                <Link href={route('students.edit', student.id)} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800 transition-colors" title="Edit">
                                                    <Pencil className="w-3.5 h-3.5" />
                                                </Link>
                                                <button onClick={() => handleDelete(student.id, `${student.first_name} ${student.last_name}`)} className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded border border-red-200 dark:border-red-800 transition-colors" title="Delete">
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {studentList.length === 0 && (
                                    <tr><td colSpan="6" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"><User className="w-12 h-12 mx-auto mb-2 text-gray-300 dark:text-gray-600" /><p className="text-sm">No students found</p></td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

           
                {showImportModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 w-full max-w-md shadow-2xl">
                            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Import Students from Excel</h3>
                                <button onClick={() => { setShowImportModal(false); reset(); clearErrors(); }} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            
                            <div className="p-4">
                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
                                    <p className="text-xs text-blue-700 dark:text-blue-300">
                                        <strong>Note:</strong> Please ensure your Excel file has the exact headings: <br/>
                                        <code className="block mt-1 bg-blue-100 dark:bg-blue-800 p-1 rounded">admission_no, first_name, last_name, gender, date_of_birth_yyyy_mm_dd, contact_number, class_id, section_id</code>
                                    </p>
                                </div>

                                <form onSubmit={handleImport} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Excel File (.xlsx, .xls, .csv)</label>
                                        <input 
                                            type="file" 
                                            accept=".xlsx,.xls,.csv"
                                            onChange={(e) => setData('file', e.target.files[0])}
                                            className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-slate-700 dark:file:text-gray-300"
                                            required
                                        />
                                        {pageErrors.file && <p className="text-red-500 text-xs mt-1">{pageErrors.file}</p>}
                                    </div>

                                    <div className="flex justify-end gap-3 pt-2">
                                        <button 
                                            type="button" 
                                            onClick={() => { setShowImportModal(false); reset(); clearErrors(); }}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600"
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            type="submit" 
                                            disabled={processing}
                                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center"
                                        >
                                            {processing ? 'Uploading...' : 'Upload & Import'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </AppLayout>
    );
}