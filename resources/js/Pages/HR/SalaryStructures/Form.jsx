import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import { useSalaryStructureForm } from '@/Hooks/useSalaryStructureForm';
import { calculateGross } from '@/Services/salaryStructureService';
import { Wallet, Save, ArrowLeft } from 'lucide-react';

export default function SalaryStructureForm({ structure, dropdownData }) {
    const isEdit = !!structure;
    const { data, setData, processing, errors, submit } = useSalaryStructureForm(structure, isEdit);

    const breadcrumbItems = [{ label: 'Dashboard', href: route('dashboard') }, { label: 'HR', href: route('hr.salary-structures.index') }];

    const grossSalary = calculateGross(data);
    const formatCurrency = (amount) => new Intl.NumberFormat('en-NP', { maximumFractionDigits: 2 }).format(amount || 0);

    return (
        <AppLayout title={isEdit ? 'Edit Salary Structure' : 'Create Salary Structure'}>
            <Head title={isEdit ? 'Edit Salary Structure' : 'Create Salary Structure'} />
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Breadcrumb title="Human Resource" subTitle={isEdit ? 'Edit Salary Structure' : 'Create Salary Structure'} breadcrumbItems={breadcrumbItems} />
                    <Link href={route('hr.salary-structures.index')} className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to List
                    </Link>
                </div>
                
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        {/* Left: Salary Components */}
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                    <Wallet className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Salary Components
                                </h2>
                                <div className="space-y-5">
                                    <FormInput 
                                        label="Designation" 
                                        type="select" 
                                        value={data.designation_id} 
                                        onChange={(v) => setData('designation_id', v)} 
                                        error={errors.designation_id} 
                                        options={[{ value: '', label: '-- Select Designation --' }, ...(dropdownData?.designations?.map(d => ({ value: d.id, label: d.name })) || [])]} 
                                        required 
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormInput label="Basic Salary" type="number" value={data.basic} onChange={(v) => setData('basic', v)} error={errors.basic} placeholder="0.00" required />
                                        <FormInput label="Allowance" type="number" value={data.allowance} onChange={(v) => setData('allowance', v)} error={errors.allowance} placeholder="0.00" />
                                        <FormInput label="Medical Allowance" type="number" value={data.medical} onChange={(v) => setData('medical', v)} error={errors.medical} placeholder="0.00" />
                                        <FormInput label="Housing Allowance" type="number" value={data.housing} onChange={(v) => setData('housing', v)} error={errors.housing} placeholder="0.00" />
                                        <FormInput label="Transport Allowance" type="number" value={data.transport} onChange={(v) => setData('transport', v)} error={errors.transport} placeholder="0.00" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Summary & Submit */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6 sticky top-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700">Summary</h2>
                                
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Basic</span>
                                        <span className="font-mono text-gray-900 dark:text-white">{formatCurrency(data.basic)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Allowance</span>
                                        <span className="font-mono text-gray-900 dark:text-white">{formatCurrency(data.allowance)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Medical</span>
                                        <span className="font-mono text-gray-900 dark:text-white">{formatCurrency(data.medical)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Housing</span>
                                        <span className="font-mono text-gray-900 dark:text-white">{formatCurrency(data.housing)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Transport</span>
                                        <span className="font-mono text-gray-900 dark:text-white">{formatCurrency(data.transport)}</span>
                                    </div>
                                    <div className="pt-3 border-t border-gray-200 dark:border-slate-700 flex justify-between">
                                        <span className="text-base font-semibold text-gray-900 dark:text-white">Gross Salary</span>
                                        <span className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">{formatCurrency(grossSalary)}</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                                    <button type="submit" disabled={processing} className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:cursor-not-allowed">
                                        {processing ? 'Processing...' : <><Save className="w-5 h-5 mr-2" /> {isEdit ? 'Update Structure' : 'Create Structure'}</>}
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