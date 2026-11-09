import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import { useRoleForm } from '@/Hooks/useRoleForm';
import { Shield, Save, ArrowLeft, Check, CheckSquare, Square, MinusSquare } from 'lucide-react';

export default function RoleForm({ role, groupedPermissions }) {
    const isEdit = !!role;
    const { data, setData, processing, errors, togglePermission, toggleModule, submit } = useRoleForm(role, isEdit);

    const breadcrumbItems = [
        { label: 'Dashboard', href: route('dashboard') },
        { label: 'Administration', href: route('roles.index') },
    ];

    const guardOptions = [
        { value: 'web', label: 'Web' },
        { value: 'api', label: 'API' },
    ];


    const handleModuleHeaderClick = (permissions) => {
        toggleModule(permissions);
    };

    return (
        <AppLayout title={isEdit ? 'Edit Role' : 'Create Role'}>
            <Head title={isEdit ? 'Edit Role' : 'Create Role'} />
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Breadcrumb title="Administration" subTitle={isEdit ? 'Edit Role' : 'Create Role'} breadcrumbItems={breadcrumbItems} />
                    <Link href={route('roles.index')} className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to List
                    </Link>
                </div>
                
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
               
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6 sticky top-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                    <Shield className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Role Details
                                </h2>
                                <div className="space-y-5">
                                    <FormInput label="Role Name" value={data.name} onChange={(v) => setData('name', v)} error={errors.name} placeholder="e.g., Manager" required />
                                    <FormInput label="Guard" type="select" value={data.guard_name} onChange={(v) => setData('guard_name', v)} error={errors.guard_name} options={guardOptions} required />
                                    
                                    <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                                        <button type="submit" disabled={processing} className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:cursor-not-allowed">
                                            {processing ? 'Processing...' : <><Save className="w-5 h-5 mr-2" /> {isEdit ? 'Update Role' : 'Create Role'}</>}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                    <Check className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Assign Permissions
                                </h2>
                                
                                <div className="space-y-6">
                                    {Object.entries(groupedPermissions || {}).map(([module, permissions]) => {
                                        const moduleIds = permissions.map(p => p.id);
                                        const current = data.permissions || [];
                                        const allSelected = moduleIds.length > 0 && moduleIds.every(id => current.includes(id));
                                        const someSelected = moduleIds.some(id => current.includes(id)) && !allSelected;

                                        return (
                                            <div key={module} className="bg-gray-50 dark:bg-slate-900/50 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
                                            
                                                <div 
                                                    onClick={() => handleModuleHeaderClick(permissions)}
                                                    className="flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-slate-800 cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                                                >
                                                    <div className="flex items-center gap-3">
                                                    
                                                        {allSelected ? (
                                                            <CheckSquare className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                                                        ) : someSelected ? (
                                                            <MinusSquare className="w-5 h-5 text-amber-500" />
                                                        ) : (
                                                            <Square className="w-5 h-5 text-gray-400" />
                                                        )}
                                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                                                            {module.replace(/_/g, ' ')}
                                                        </h3>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                                            ({current.filter(id => moduleIds.includes(id)).length}/{moduleIds.length})
                                                        </span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium flex items-center gap-1"
                                                    >
                                                        {allSelected ? 'Deselect All' : 'Select All'}
                                                    </button>
                                                </div>

                                                {/* Permissions Grid */}
                                                <div className="p-4">
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                                        {permissions.map((perm) => (
                                                            <label key={perm.id} className="flex items-center space-x-2 cursor-pointer group">
                                                                <div className="relative flex items-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={current.includes(perm.id)}
                                                                        onChange={() => togglePermission(perm.id)}
                                                                        className="peer w-4 h-4 text-primary-600 border-gray-300 dark:border-slate-600 rounded focus:ring-primary-500 dark:bg-slate-800"
                                                                    />
                                                                </div>
                                                                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white capitalize transition-colors">
                                                                    {perm.name.replace(/_/g, ' ')}
                                                                </span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}