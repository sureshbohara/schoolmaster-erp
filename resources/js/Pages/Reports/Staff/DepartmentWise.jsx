import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import Button from '@/Components/Button'; 
import { useState } from 'react';
import { Search, FileText, Building2, Users } from 'lucide-react';

export default function StaffDepartmentWise({ departments, employees, totalEmployees, filters }) {
    const [departmentId, setDepartmentId] = useState(filters?.department_id || '');

    const handleGenerate = () => {
        router.get(route('reports.staff.department-wise'), { 
            department_id: departmentId
        }, { preserveState: true });
    };

    const selectedDept = departments?.find(d => d.id == departmentId);

    return (
        <AppLayout title="Department-wise Staff Report">
            <Head title="Department-wise Staff Report" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb 
                        title="Staff Reports" 
                        subTitle="Department-wise Staff" 
                        breadcrumbItems={[
                            { label: 'Dashboard', href: route('dashboard') }, 
                            { label: 'Reports', href: route('reports.index') },
                            { label: 'Staff', href: route('reports.staff.index') }
                        ]} 
                    />
                </div>

       
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {departments?.map((dept) => (
                        <div 
                            key={dept.id}
                            onClick={() => { setDepartmentId(dept.id); handleGenerate(); }}
                            className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-all"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="p-2 rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">
                                    <Building2 className="w-5 h-5" />
                                </div>
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">{dept.employees_count}</span>
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{dept.name}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Total Employees</p>
                        </div>
                    ))}
                </div>

           
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                        <Search className="w-4 h-4" /> Filter Department
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <FormInput 
                            label="Department" 
                            type="select" 
                            value={departmentId} 
                            onChange={(v) => setDepartmentId(v)} 
                            options={[{ value: '', label: '-- Select Department --' }, ...(departments?.map(d => ({ value: d.id, label: `${d.name} (${d.employees_count})` })) || [])]} 
                        />

                        <div className="flex items-end">
                            <Button variant="primary" size="lg" onClick={handleGenerate} className="w-full">
                                <Search className="w-4 h-4 mr-1.5" /> View Employees
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
                    {employees.length > 0 && (
                        <div className="mb-4 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-primary-600" />
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Employees in {selectedDept?.name || 'Selected Department'}
                                </h2>
                            </div>
                            <div className="flex items-center gap-2 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 px-4 py-2 rounded-lg">
                                <Users className="w-4 h-4" />
                                <span className="font-semibold">Total: {totalEmployees}</span>
                            </div>
                        </div>
                    )}

                    {employees.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-slate-700 border-b-2 border-gray-300 dark:border-slate-600">
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">SN</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Employee ID</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Name</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Designation</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Phone</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Joining Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((emp, index) => (
                                        <tr key={emp.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{index + 1}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{emp.employee_id}</td>
                                            <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700">{emp.first_name} {emp.last_name}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 font-medium">{emp.designation_name}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{emp.phone || 'N/A'}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">
                                                {emp.joining_date ? new Date(emp.joining_date).toLocaleDateString() : 'N/A'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <FileText className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                            <p className="text-gray-500 dark:text-gray-400">Select a department to view employees.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}