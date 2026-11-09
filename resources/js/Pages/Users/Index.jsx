import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { useState } from 'react';
import { 
    User as UserIcon, Plus, Pencil, Trash2, Search, 
    X, ChevronDown, Image as ImageIcon, Phone, Mail
} from 'lucide-react';

export default function UsersIndex({ users }) {
    const userList = users?.data || [];

    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    const breadcrumbItems = [
        { label: 'Dashboard', href: route('dashboard') },
        { label: 'Administration', href: '#' },
    ];

    const roles = [...new Set(userList.map(u => u.role?.name).filter(Boolean))];
    const statuses = [...new Set(userList.map(u => u.status))];

    const filteredUsers = userList.filter(user => {
        const matchesSearch = 
            user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phone?.includes(searchTerm);
        
        const matchesRole = !filterRole || user.role?.name === filterRole;
        const matchesStatus = !filterStatus || user.status === filterStatus;

        return matchesSearch && matchesRole && matchesStatus;
    });

    const handleReset = () => {
        setSearchTerm('');
        setFilterRole('');
        setFilterStatus('');
    };

    const handleStatusToggle = (userId, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        
        router.post(route('users.status', userId), {
            status: newStatus,
        }, {
            preserveScroll: true,
        });
    };

    const handleDelete = (userId, userName) => {
        if (confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
            router.delete(route('users.destroy', userId), {
                preserveScroll: true,
                onSuccess: () => {
                },
                onError: (errors) => {
                    toast.error(Object.values(errors)[0] || 'Failed to delete user', {
                        duration: 4000,
                        icon: '❌',
                    });
                },
            });
        }
    };

    return (
        <AppLayout title="Users">
            <Head title="User Management" />

            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Admins" subTitle="Admin List" breadcrumbItems={breadcrumbItems} />
                    <Link
                        href={route('users.create')}
                        className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm"
                    >
                        <Plus className="w-4 h-4 mr-1.5" />
                        Create New
                    </Link>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <div className="grid grid-cols-4 gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm"
                            />
                        </div>

                        <div className="relative">
                            <select
                                value={filterRole}
                                onChange={(e) => setFilterRole(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm appearance-none cursor-pointer"
                            >
                                <option value="">All Roles</option>
                                {roles.map(role => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>

                        <div className="relative">
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm appearance-none cursor-pointer"
                            >
                                <option value="">All Status</option>
                                {statuses.map(status => (
                                    <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>

                        <button
                            onClick={handleReset}
                            className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors text-sm flex items-center justify-center"
                        >
                            <X className="w-4 h-4 mr-1.5" />
                            Reset
                        </button>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-gray-200 dark:border-slate-700">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Image</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Email</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Role</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                                        {/* Image */}
                                        <td className="px-4 py-3">
                                            {user.image_url && user.image_url !== '/default/noimage.png' ? (
                                                <img 
                                                    src={user.image_url} 
                                                    alt={user.first_name}
                                                    className="w-10 h-10 rounded-lg object-cover border border-gray-200 dark:border-slate-600"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                                    <ImageIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                                </div>
                                            )}
                                        </td>

                                        {/* Name & Phone */}
                                        <td className="px-4 py-3">
                                            <div className="font-medium text-gray-900 dark:text-white">
                                                {user.first_name} {user.last_name}
                                            </div>
                                            {user.phone && (
                                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                    <Phone className="w-3 h-3 mr-1" />
                                                    {user.phone}
                                                </div>
                                            )}
                                        </td>

                                        {/* Email */}
                                        <td className="px-4 py-3">
                                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                                <Mail className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                                                {user.email}
                                            </div>
                                        </td>

                                        {/* Role Badge */}
                                        <td className="px-4 py-3">
                                            <span className="inline-flex px-2.5 py-1 text-xs font-semibold rounded-md bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                                                {user.role?.name || 'N/A'}
                                            </span>
                                        </td>

                                        {/* Status Toggle */}
                                        <td className="px-4 py-3">
                                            <div className="flex items-center">
                                                <button
                                                    onClick={() => handleStatusToggle(user.id, user.status)}
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                                        user.status === 'active' ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-gray-600'
                                                    }`}
                                                >
                                                    <span
                                                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                                                            user.status === 'active' ? 'translate-x-6' : 'translate-x-1'
                                                        }`}
                                                    />
                                                </button>
                                            </div>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end space-x-1">
                                                <Link
                                                    href={route('users.edit', user.id)}
                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800 transition-colors"
                                                    title="Edit"
                                                >
                                                    <Pencil className="w-3.5 h-3.5" />
                                                </Link>
                                          
                                                <button
                                                    onClick={() => handleDelete(user.id, `${user.first_name} ${user.last_name}`)}
                                                    className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded border border-red-200 dark:border-red-800 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                            <UserIcon className="w-12 h-12 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                                            <p className="text-sm">No users found</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="text-sm text-gray-600 dark:text-gray-400">
                    Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredUsers.length}</span> of <span className="font-semibold text-gray-900 dark:text-white">{userList.length}</span> users
                </div>
            </div>
        </AppLayout>
    );
}