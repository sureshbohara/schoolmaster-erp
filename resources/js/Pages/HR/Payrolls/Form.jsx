import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import { usePayrollForm } from '@/Hooks/usePayrollForm';
import { MONTH_OPTIONS, calculateNetPay } from '@/Services/payrollService';
import { Wallet, Save, ArrowLeft, Calculator, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function PayrollForm({ payroll, dropdownData }) {
    const isEdit = !!payroll;
    const { data, setData, processing, errors, submit } = usePayrollForm(payroll, isEdit);
    const [isFetching, setIsFetching] = useState(false);

    const breadcrumbItems = [{ label: 'Dashboard', href: route('dashboard') }, { label: 'HR', href: route('hr.payrolls.index') }];

    const netPay = calculateNetPay(data);
    const formatCurrency = (amount) => new Intl.NumberFormat('en-NP', { maximumFractionDigits: 2 }).format(amount || 0);

    const handleEmployeeChange = async (employeeId) => {
        setData('employee_id', employeeId);
        
        if (!employeeId) {
            setData('salary_structure_id', null); 
            setData('basic', ''); 
            setData('allowances', '');
            return;
        }

        setIsFetching(true);
        try {
            const response = await fetch(route('hr.payrolls.salary-structure', employeeId));
            const structure = await response.json();
            
            if (structure) {
                setData('salary_structure_id', structure.id);
                setData('basic', structure.basic);
                setData('allowances', (parseFloat(structure.allowance) || 0) + (parseFloat(structure.medical) || 0) + (parseFloat(structure.housing) || 0) + (parseFloat(structure.transport) || 0));
            } else {
                setData('salary_structure_id', null);
                setData('basic', ''); 
                setData('allowances', '');
            }
        } catch (error) {
            console.error('Failed to fetch salary structure');
            setData('salary_structure_id', null);
        } finally {
            setIsFetching(false);
        }
    };

    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: 10 }, (_, i) => ({
        value: String(currentYear - 5 + i),
        label: String(currentYear - 5 + i)
    }));

    return (
        <AppLayout title={isEdit ? 'Edit Payroll' : 'Generate Payroll'}>
            <Head title={isEdit ? 'Edit Payroll' : 'Generate Payroll'} />
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Breadcrumb title="Human Resource" subTitle={isEdit ? 'Edit Payroll' : 'Generate Payroll'} breadcrumbItems={breadcrumbItems} />
                    <Link href={route('hr.payrolls.index')} className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to List
                    </Link>
                </div>
                
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        {/* Left: Payroll Details */}
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                    <Wallet className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Payroll Details
                                </h2>
                                <div className="space-y-5">
                                    
                                    {/* Employee Dropdown with Loading Indicator */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Employee <span className="text-red-500">*</span>
                                            </label>
                                            {isFetching && (
                                                <div className="flex items-center gap-1.5 text-xs text-primary-600 dark:text-primary-400">
                                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                    Fetching salary...
                                                </div>
                                            )}
                                        </div>
                                        <select 
                                            value={data.employee_id} 
                                            onChange={(e) => handleEmployeeChange(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white transition-all outline-none"
                                        >
                                            <option value="">-- Select Employee --</option>
                                            {dropdownData?.employees?.map(e => (
                                                <option key={e.id} value={e.id}>
                                                    {e.first_name} {e.last_name} ({e.employee_id})
                                                </option>
                                            ))}
                                        </select>
                                        {errors.employee_id && (
                                            <p className="text-xs text-red-500 mt-1.5">{errors.employee_id}</p>
                                        )}
                                    </div>

                                    {/* Month & Year */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormInput 
                                            label="Month" 
                                            type="select" 
                                            value={data.month} 
                                            onChange={(v) => setData('month', v)} 
                                            error={errors.month} 
                                            options={MONTH_OPTIONS} 
                                            required 
                                        />
                                        <FormInput 
                                            label="Year" 
                                            type="select" 
                                            value={data.year} 
                                            onChange={(v) => setData('year', v)} 
                                            error={errors.year} 
                                            options={yearOptions} 
                                            required 
                                        />
                                    </div>

                                    {/* Salary Components */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormInput label="Basic Salary" type="number" value={data.basic} onChange={(v) => setData('basic', v)} error={errors.basic} placeholder="0.00" required />
                                        <FormInput label="Allowances" type="number" value={data.allowances} onChange={(v) => setData('allowances', v)} error={errors.allowances} placeholder="0.00" />
                                        <FormInput label="Deductions" type="number" value={data.deductions} onChange={(v) => setData('deductions', v)} error={errors.deductions} placeholder="0.00" />
                                        <FormInput label="Tax" type="number" value={data.tax} onChange={(v) => setData('tax', v)} error={errors.tax} placeholder="0.00" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Summary & Submit */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6 sticky top-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                    <Calculator className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Summary
                                </h2>
                                
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Basic</span>
                                        <span className="font-mono text-gray-900 dark:text-white">+ {formatCurrency(data.basic)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Allowances</span>
                                        <span className="font-mono text-gray-900 dark:text-white">+ {formatCurrency(data.allowances)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Deductions</span>
                                        <span className="font-mono text-red-600 dark:text-red-400">- {formatCurrency(data.deductions)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Tax</span>
                                        <span className="font-mono text-red-600 dark:text-red-400">- {formatCurrency(data.tax)}</span>
                                    </div>
                                    <div className="pt-3 border-t border-gray-200 dark:border-slate-700 flex justify-between">
                                        <span className="text-base font-semibold text-gray-900 dark:text-white">Net Pay</span>
                                        <span className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">{formatCurrency(netPay)}</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                                    <button type="submit" disabled={processing} className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:cursor-not-allowed">
                                        {processing ? 'Processing...' : <><Save className="w-5 h-5 mr-2" /> {isEdit ? 'Update Payroll' : 'Generate Payroll'}</>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}