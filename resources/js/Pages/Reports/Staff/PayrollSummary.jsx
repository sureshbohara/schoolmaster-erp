import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import Button from '@/Components/Button'; 
import { useState } from 'react';
import { Search, FileText, Banknote, Users } from 'lucide-react';

export default function StaffPayrollSummary({ departments, payrolls, totalPayrolls, filters }) {
    const [departmentId, setDepartmentId] = useState(filters?.department_id || '');
    const [month, setMonth] = useState(filters?.month || '');
    const [year, setYear] = useState(filters?.year || '');
    const [status, setStatus] = useState(filters?.status || 'all');

    const handleGenerate = () => {
        router.get(route('reports.staff.payroll-summary'), { 
            department_id: departmentId,
            month: month,
            year: year,
            status: status
        }, { preserveState: true });
    };

    const getStatusBadge = (status) => {
        const styles = {
            paid: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
            unpaid: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
            partial: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
        };
        return styles[status?.toLowerCase()] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    };

    const months = [
        { value: '', label: '-- All Months --' },
        { value: '1', label: 'January' }, { value: '2', label: 'February' },
        { value: '3', label: 'March' }, { value: '4', label: 'April' },
        { value: '5', label: 'May' }, { value: '6', label: 'June' },
        { value: '7', label: 'July' }, { value: '8', label: 'August' },
        { value: '9', label: 'September' }, { value: '10', label: 'October' },
        { value: '11', label: 'November' }, { value: '12', label: 'December' },
    ];

    return (
        <AppLayout title="Payroll Summary Report">
            <Head title="Payroll Summary Report" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb 
                        title="Staff Reports" 
                        subTitle="Payroll Summary" 
                        breadcrumbItems={[
                            { label: 'Dashboard', href: route('dashboard') }, 
                            { label: 'Reports', href: route('reports.index') },
                            { label: 'Staff', href: route('reports.staff.index') }
                        ]} 
                    />
                </div>


                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                        <Search className="w-4 h-4" /> Filter Data
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <FormInput 
                            label="Department" 
                            type="select" 
                            value={departmentId} 
                            onChange={(v) => setDepartmentId(v)} 
                            options={[{ value: '', label: '-- All Departments --' }, ...(departments?.map(d => ({ value: d.id, label: d.name })) || [])]} 
                        />
                        <FormInput 
                            label="Month" 
                            type="select" 
                            value={month} 
                            onChange={(v) => setMonth(v)} 
                            options={months} 
                        />
                        <FormInput 
                            label="Year" 
                            type="number" 
                            value={year} 
                            onChange={(v) => setYear(v)} 
                            placeholder="e.g., 2026"
                        />
                        <FormInput 
                            label="Status" 
                            type="select" 
                            value={status} 
                            onChange={(v) => setStatus(v)} 
                            options={[
                                { value: 'all', label: '-- All Status --' },
                                { value: 'paid', label: '✅ Paid' },
                                { value: 'pending', label: '⏳ Pending' },
                                { value: 'unpaid', label: '❌ Unpaid' },
                            ]} 
                        />
                        <div className="flex items-end">
                            <Button variant="primary" size="lg" onClick={handleGenerate} className="w-full">
                                <Search className="w-4 h-4 mr-1.5" /> Generate Report
                            </Button>
                        </div>
                    </div>
                </div>

         
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
                    {payrolls.length > 0 && (
                        <div className="mb-4 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Banknote className="w-5 h-5 text-primary-600" />
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Payroll Records</h2>
                            </div>
                            <div className="flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-lg">
                                <Users className="w-4 h-4" />
                                <span className="font-semibold">Total: {totalPayrolls}</span>
                            </div>
                        </div>
                    )}

                    {payrolls.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-slate-700 border-b-2 border-gray-300 dark:border-slate-600">
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">SN</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Employee ID</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Name</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Department</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Period</th>
                                        <th className="px-4 py-2 text-right text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Basic</th>
                                        <th className="px-4 py-2 text-right text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Deductions</th>
                                        <th className="px-4 py-2 text-right text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Net Pay</th>
                                        <th className="px-4 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payrolls.map((payroll, index) => {
                                
                                        const basic = payroll.basic ?? payroll.basic_salary ?? 0;
                                        const deductions = payroll.deductions ?? 0;
                                        const netPay = payroll.net_pay ?? payroll.net_salary ?? 0;
                                        const period = payroll.month && payroll.year ? `${payroll.month}/${payroll.year}` : (payroll.period || 'N/A');

                                        return (
                                            <tr key={payroll.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{index + 1}</td>
                                                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{payroll.employee?.employee_id || 'N/A'}</td>
                                                <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700">
                                                    {payroll.employee?.first_name} {payroll.employee?.last_name}
                                                </td>
                                                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{payroll.department_name}</td>
                                                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{period}</td>
                                                
                                             
                                                <td className="px-4 py-2 text-sm text-right text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">
                                                    Rs. {Number(basic).toLocaleString()}
                                                </td>
                                                <td className="px-4 py-2 text-sm text-right text-red-600 dark:text-red-400 border border-gray-200 dark:border-slate-700">
                                                    Rs. {Number(deductions).toLocaleString()}
                                                </td>
                                                <td className="px-4 py-2 text-sm text-right font-bold text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700">
                                                    Rs. {Number(netPay).toLocaleString()}
                                                </td>
                                                
                                                <td className="px-4 py-2 text-center border border-gray-200 dark:border-slate-700">
                                                    <span className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-md capitalize ${getStatusBadge(payroll.status)}`}>
                                                        {payroll.status || 'Unknown'}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <FileText className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                            <p className="text-gray-500 dark:text-gray-400">No payroll records found.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}