import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
    User, Plus, Pencil, Trash2, Search, X, Phone, Building2,
    Briefcase
} from 'lucide-react';

export default function EmployeesIndex({ employees, dropdownData, filters }) {
    const employeeList = employees?.data || [];
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [filterDepartment, setFilterDepartment] = useState(filters?.department_id || '');
    const [filterStatus, setFilterStatus] = useState(filters?.status || '');
    const [filterStaffType, setFilterStaffType] = useState(filters?.is_teaching_staff || '');

    const breadcrumbItems = [{ label: 'Dashboard', href: route('dashboard') }, { label: 'HR', href: '#' }];

    const handleReset = () => {
        setSearchTerm('');
        setFilterDepartment('');
        setFilterStatus('');
        setFilterStaffType('');
        router.get(route('hr.employees.index'), {}, { preserveState: true, preserveScroll: true });
    };

    const handleFilterChange = (key, value) => {
        if (key === 'search') setSearchTerm(value);
        if (key === 'department_id') setFilterDepartment(value);
        if (key === 'status') setFilterStatus(value);
        if (key === 'is_teaching_staff') setFilterStaffType(value);
        
        router.get(route('hr.employees.index'), { 
            search: searchTerm, 
            department_id: filterDepartment, 
            status: filterStatus,
            is_teaching_staff: filterStaffType,
            [key]: value 
        }, { preserveState: true, preserveScroll: true });
    };


    const handleStatusChange = (employeeId, newStatus) => {
        router.post(route('hr.employees.status', employeeId), { status: newStatus }, { 
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handleDelete = (employeeId, employeeName) => {
        if (confirm(`Are you sure you want to delete "${employeeName}"?`)) {
            router.delete(route('hr.employees.destroy', employeeId), { preserveScroll: true });
        }
    };

    return (
        <AppLayout title="Employees">
            <Head title="Employee Management" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Human Resource" subTitle="Employees" breadcrumbItems={breadcrumbItems} />
                    <Link href={route('hr.employees.create')} className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                        <Plus className="w-4 h-4 mr-1.5" /> Add Employee
                    </Link>
                </div>

           
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <div className="grid grid-cols-4 gap-3">

                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Search by name or employee ID..." 
                                value={searchTerm} 
                                onChange={(e) => handleFilterChange('search', e.target.value)} 
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm" 
                            />
                        </div>
                        
                        <div className="relative">
                        <select 
                            value={filterDepartment} 
                            onChange={(e) => handleFilterChange('department_id', e.target.value)} 
                            className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm appearance-none cursor-pointer"
                        >
                            <option value="">All Departments</option>
                            {dropdownData?.departments?.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>
                        </div>

                        <div className="relative">
                        <select 
                            value={filterStaffType} 
                            onChange={(e) => handleFilterChange('is_teaching_staff', e.target.value)} 
                            className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm appearance-none cursor-pointer"
                        >
                            <option value="">All Staff Types</option>
                            <option value="1">Teaching Staff</option>
                            <option value="0">Non-Teaching Staff</option>
                        </select>
                    </div>
                    <div className="relative">

                        <button onClick={handleReset} className="w-full px-4 py-2 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg transition-colors text-sm flex items-center justify-center">
                            <X className="w-4 h-4 mr-1.5" /> Reset
                        </button>
                    </div>
                    </div>
                </div>

            
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-gray-200 dark:border-slate-700">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Employee</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Department</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Designation</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Contact</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Joining Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Status</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                                {employeeList.map((emp) => (
                                    <tr key={emp.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                {emp.photo_url ? (
                                                    <img src={emp.photo_url} alt={emp.first_name} className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-slate-600" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                                        <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-white">{emp.first_name} {emp.last_name}</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">{emp.employee_id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                                                <Building2 className="w-3.5 h-3.5 text-gray-400" />
                                                {emp.department?.name || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                                                <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                                                {emp.designation?.name || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                                <Phone className="w-3.5 h-3.5 mr-1.5 text-gray-400" />{emp.phone || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{emp.joining_date || 'N/A'}</td>
                                        
                           
                                        <td className="px-4 py-3">
                                            <select 
                                                value={emp.status}
                                                onChange={(e) => handleStatusChange(emp.id, e.target.value)}
                                                className={`px-2.5 py-1 text-xs font-semibold rounded-full border-0 cursor-pointer focus:ring-2 focus:ring-offset-1 focus:ring-emerald-500/30 outline-none transition-all appearance-none ${
                                                    emp.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 
                                                    emp.status === 'inactive' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' : 
                                                    emp.status === 'resigned' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : 
                                                    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                                }`}
                                            >
                                                <option value="active">🟢 Active</option>
                                                <option value="inactive">🟡 Inactive</option>
                                                <option value="resigned">📤 Resigned</option>
                                                <option value="terminated">🔴 Terminated</option>
                                            </select>
                                        </td>
                                        
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end space-x-1">
                                                <Link href={route('hr.employees.edit', emp.id)} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800 transition-colors">
                                                    <Pencil className="w-3.5 h-3.5" />
                                                </Link>
                                                <button onClick={() => handleDelete(emp.id, `${emp.first_name} ${emp.last_name}`)} className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded border border-red-200 dark:border-red-800 transition-colors">
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {employeeList.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                            <User className="w-12 h-12 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                                            <p className="text-sm">No employees found</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}