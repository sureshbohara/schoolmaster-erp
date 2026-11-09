import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import Button from '@/Components/Button'; 
import { useRouteForm } from '@/Hooks/useRouteForm';
import { STATUS_OPTIONS } from '@/Services/routeService';
import { MapPin, Save, ArrowLeft, Plus, Trash2 } from 'lucide-react';

export default function RouteForm({ routeData, vehicles }) {
    const isEdit = !!routeData;
    const { data, setData, processing, errors, submit, addStop, removeStop, updateStop } = useRouteForm(routeData, isEdit);

    return (
        <AppLayout title={isEdit ? 'Edit Route' : 'Add Route'}>
            <Head title={isEdit ? 'Edit Route' : 'Add Route'} />
            <div className="space-y-3">
                
          
                <div className="flex items-center justify-between">
                    <Breadcrumb title="Transport" subTitle={isEdit ? 'Edit Route' : 'Add Route'} breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }, { label: 'Routes', href: route('transport.routes.index') }]} />
                    

                    <Link href={route('transport.routes.index')}>
                        <Button variant="primary" size="md">
                            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to List
                        </Button>
                    </Link>
                </div>
                
                <form onSubmit={submit}>
                    <div className="max-w-5xl mx-auto space-y-6">
                       
                    
                        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                <MapPin className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Route Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <FormInput label="Route Name" value={data.name} onChange={(v) => setData('name', v)} error={errors.name} placeholder="e.g., Kathmandu - Bhaktapur" required />
                                <FormInput label="Assigned Vehicle" type="select" value={data.vehicle_id} onChange={(v) => setData('vehicle_id', v)} error={errors.vehicle_id} options={[{ value: '', label: '-- Select Vehicle --' }, ...(vehicles?.map(v => ({ value: v.id, label: `${v.vehicle_no} (${v.model})` })) || [])]} />
                                <FormInput label="Base Fare (Rs.)" type="number" value={data.base_fare} onChange={(v) => setData('base_fare', v)} error={errors.base_fare} placeholder="0.00" />
                                <FormInput label="Status" type="select" value={data.status} onChange={(v) => setData('status', v)} error={errors.status} options={STATUS_OPTIONS} required />
                            </div>
                        </div>

                   
                        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
                            <div className="flex items-center justify-between mb-5 pb-2 border-b border-gray-200 dark:border-slate-700">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                    <MapPin className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Route Stops
                                </h2>
                                
                           
                                <Button type="button" variant="primary" size="md" onClick={addStop}>
                                    <Plus className="w-4 h-4 mr-1.5" /> Add Stop
                                </Button>
                            </div>

                            <div className="space-y-4">
                                {data.stops.map((stop, index) => (
                                    <div key={index} className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 relative group">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Stop #{stop.sequence}</span>
                                            {data.stops.length > 1 && (
    
                                                <Button type="button" variant="danger" size="sm" onClick={() => removeStop(index)} title="Remove Stop">
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
    
                                            <div className="md:col-span-2">
                                                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Stop Name</label>
                                                <input type="text" value={stop.stop_name} onChange={(e) => updateStop(index, 'stop_name', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white outline-none text-sm" placeholder="e.g., Koteshwor" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Pickup Time</label>
                                                <input type="time" value={stop.pickup_time} onChange={(e) => updateStop(index, 'pickup_time', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white outline-none text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Drop Time</label>
                                                <input type="time" value={stop.drop_time} onChange={(e) => updateStop(index, 'drop_time', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white outline-none text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Fare (Rs.)</label>
                                                <input type="number" value={stop.fare} onChange={(e) => updateStop(index, 'fare', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white outline-none text-sm" placeholder="0.00" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end pt-2">
                             <Button type="submit" variant="primary" size="md" disabled={processing}>
                                {processing ? 'Processing...' : <><Save className="w-4 h-4 mr-1.5" /> {isEdit ? 'Update Route' : 'Save Route'}</>}
                             </Button>
                          </div>

                        </div>

 
                        
                      
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}