import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import Button from '@/Components/Button';
import { useState } from 'react';
import { MapPin, Plus, Pencil, Trash2, Search, X, Bus } from 'lucide-react';

export default function RoutesIndex({ routes }) {
    const routeList = routes?.data || [];
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id, name) => {
        if (confirm(`Delete route "${name}"? This will also delete its stops and assignments.`)) {
            router.delete(route('transport.routes.destroy', id), { preserveScroll: true });
        }
    };

    const filteredRoutes = routeList.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <AppLayout title="Routes & Stops">
            <Head title="Routes & Stops" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb title="Transport" subTitle="Routes & Stops" breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }]} />
                    <Link href={route('transport.routes.create')}>

                        <Button variant="primary" size="md">
                            <Plus className="w-4 h-4 mr-1.5" /> Add Route
                        </Button>
                        
                    </Link>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <div className="relative max-w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search route name..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            className="w-full pl-10 pr-10 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:text-white outline-none text-sm" 
                        />
                        {searchTerm && (
                            <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-gray-200 dark:border-slate-700">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Route Name</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Assigned Vehicle</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Total Stops</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Base Fare</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Status</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                         
                            {filteredRoutes.map((routeItem) => (
                                <tr key={routeItem.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">

                                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                                         {routeItem.name}
                                    </td>

                                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                                        {routeItem.vehicle?.vehicle_no || 'Unassigned'}
                                    </td>

                                    <td className="px-4 py-3 text-center">
                                        <span className="inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                            {routeItem.stops_count || routeItem.stops?.length || 0}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 dark:text-white">Rs. {routeItem.base_fare}</td>

                                    <td className="px-4 py-3 text-center">
                                        <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${routeItem.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                                            {routeItem.status}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end space-x-1">

                                            <Link href={route('transport.routes.edit', routeItem.id)} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800 transition-colors">
                                                <Pencil className="w-3.5 h-3.5" />
                                            </Link>
                                            <button onClick={() => handleDelete(routeItem.id, routeItem.name)} className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded border border-red-200 dark:border-red-800 transition-colors">
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                            {filteredRoutes.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                        No routes found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}