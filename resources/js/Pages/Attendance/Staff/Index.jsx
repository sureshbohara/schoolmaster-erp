import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Calendar, Users, Save, Search, RotateCcw, CheckCircle, XCircle, Coffee, Loader2, Inbox, Briefcase } from 'lucide-react';

export default function StaffAttendanceIndex({ attendances, filters, departments }) {
    const [departmentId, setDepartmentId] = useState(filters?.department_id || '');
    const [date, setDate] = useState(filters?.date || new Date().toISOString().split('T')[0]);
    const [records, setRecords] = useState(attendances || []);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setRecords(attendances || []);
    }, [attendances]);

    const loadStaff = () => {
        if (!departmentId) {
            toast.error('Please select a Department');
            return;
        }
        router.get(route('attendance.staff.index'), { department_id: departmentId, date }, { preserveState: true, preserveScroll: true });
    };

    const handleReset = () => {
        setDepartmentId('');
        setDate(new Date().toISOString().split('T')[0]);
        setRecords([]);
        router.get(route('attendance.staff.index'), {}, { preserveState: true, preserveScroll: true });
    };

    const updateStatus = (employeeId, status) => {
        setRecords(prev => prev.map(r => r.employee_id === employeeId ? { ...r, status } : r));
    };

    const updateRemarks = (employeeId, remarks) => {
        setRecords(prev => prev.map(r => r.employee_id === employeeId ? { ...r, remarks } : r));
    };

    const handleSave = () => {
        setIsSaving(true);
        router.post(route('attendance.staff.store'), { attendances: records }, {
            onSuccess: () => {
                setIsSaving(false);
            },
            onError: () => {
                setIsSaving(false);
            },
            preserveScroll: true,
        });
    };

    const hasLoadedData = records.length > 0;

    return (
        <AppLayout title="Staff Attendance">
            <Head title="Mark Staff Attendance" />
            <div className="space-y-4">
                <Breadcrumb title="Attendance" subTitle="Mark Staff Attendance" breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }, { label: 'Attendance', href: '#' }]} />

          
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">

                  
                        <div className="flex flex-col w-full">
                            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1.5">
                                Department
                            </label>
                            <select
                                value={departmentId}
                                onChange={(e) => setDepartmentId(e.target.value)}
                                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg dark:text-white outline-none text-sm"
                            >
                                <option value="">Select Department</option>
                                {departments?.map(d => (
                                    <option key={d.id} value={d.id}>{d.name}</option>
                                ))}
                            </select>
                        </div>

                   
                        <div className="flex flex-col w-full">
                            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1.5">
                                Date
                            </label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg dark:text-white outline-none text-sm"
                            />
                        </div>

                    
                        <div className="flex flex-col w-full">
                            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1.5">
                                Actions
                            </label>

                            <div className="grid grid-cols-2 gap-2 w-full">
                                <button
                                    onClick={loadStaff}
                                    className="w-full px-3 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg text-sm flex items-center justify-center"
                                >
                                    <Search className="w-4 h-4 mr-1.5" />
                                    Load Staff
                                </button>

                                <button
                                    onClick={handleReset}
                                    className="w-full px-3 py-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg text-sm flex items-center justify-center"
                                >
                                    <RotateCcw className="w-4 h-4 mr-1.5" />
                                    Reset
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

              
                {hasLoadedData ? (
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-sm">
                        <div className="p-4 border-b border-gray-200 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-gray-50/50 dark:bg-slate-800/50">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <Users className="w-5 h-5 text-emerald-600" /> Staff List
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {records.length} staff members found for this department.
                                </p>
                            </div>

                            <button 
                                onClick={handleSave} 
                                disabled={isSaving}
                                className="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium rounded-lg transition-all text-sm flex items-center shadow-sm hover:shadow-md active:scale-95 disabled:cursor-not-allowed"
                            >
                                {isSaving ? (
                                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
                                ) : (
                                    <><Save className="w-4 h-4 mr-2" /> Save Attendance</>
                                )}
                            </button>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Employee ID</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Employee Name</th>
                                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Remarks</th>
                                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                                    {records.map((record) => (
                                        <tr key={record.employee_id} className="hover:bg-emerald-50/30 dark:hover:bg-slate-700/30 transition-colors group">
                                            <td className="px-4 py-3 text-sm font-mono text-gray-600 dark:text-gray-400">{record.employee_code}</td>
                                            <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">{record.full_name}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button onClick={() => updateStatus(record.employee_id, 'present')} className={`p-2 rounded-lg border transition-all duration-200 ${record.status === 'present' ? 'bg-green-100 border-green-300 text-green-700 ring-2 ring-green-500/20 dark:bg-green-900/30 dark:border-green-700 dark:text-green-300 dark:ring-green-500/20' : 'bg-white border-gray-200 text-gray-400 hover:border-green-300 hover:text-green-600 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-green-700'}`} title="Present">
                                                        <CheckCircle className="w-5 h-5" />
                                                    </button>
                                                    <button onClick={() => updateStatus(record.employee_id, 'absent')} className={`p-2 rounded-lg border transition-all duration-200 ${record.status === 'absent' ? 'bg-red-100 border-red-300 text-red-700 ring-2 ring-red-500/20 dark:bg-red-900/30 dark:border-red-700 dark:text-red-300 dark:ring-red-500/20' : 'bg-white border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-600 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-red-700'}`} title="Absent">
                                                        <XCircle className="w-5 h-5" />
                                                    </button>
                                                    <button onClick={() => updateStatus(record.employee_id, 'leave')} className={`p-2 rounded-lg border transition-all duration-200 ${record.status === 'leave' ? 'bg-amber-100 border-amber-300 text-amber-700 ring-2 ring-amber-500/20 dark:bg-amber-900/30 dark:border-amber-700 dark:text-amber-300 dark:ring-amber-500/20' : 'bg-white border-gray-200 text-gray-400 hover:border-amber-300 hover:text-amber-600 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-amber-700'}`} title="Leave">
                                                        <Briefcase className="w-5 h-5" />
                                                    </button>
                                                    <button onClick={() => updateStatus(record.employee_id, 'half_day')} className={`p-2 rounded-lg border transition-all duration-200 ${record.status === 'half_day' ? 'bg-blue-100 border-blue-300 text-blue-700 ring-2 ring-blue-500/20 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-300 dark:ring-blue-500/20' : 'bg-white border-gray-200 text-gray-400 hover:border-blue-300 hover:text-blue-600 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-blue-700'}`} title="Half Day">
                                                        <Coffee className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <input 
                                                    type="text" 
                                                    value={record.remarks || ''} 
                                                    onChange={(e) => updateRemarks(record.employee_id, e.target.value)}
                                                    placeholder="Add remarks..." 
                                                    className="w-full px-3 py-2 text-sm bg-transparent border border-transparent rounded-md focus:bg-white dark:focus:bg-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:text-white outline-none transition-all placeholder:text-gray-400"
                                                />
                                            </td>

                                            <td className="px-4 py-3 text-center">
                                                <Link 
                                                    href={route('attendance.staff.report', record.employee_id)}
                                                    className="inline-flex items-center px-4 py-2 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800 transition-colors"
                                                >
                                                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                                                    View Report
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-12 text-center shadow-sm py-6">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Inbox className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No Staff Loaded</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                            Please select a Department and Date, then click "Load" to mark attendance.
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}