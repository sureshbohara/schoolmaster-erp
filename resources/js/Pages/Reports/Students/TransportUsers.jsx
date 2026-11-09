import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import Button from '@/Components/Button'; 
import { useState } from 'react';
import { Search, FileText, Bus, Users } from 'lucide-react';

export default function TransportUsers({ classes, routes, students, totalStudents, filters }) {
    const [classId, setClassId] = useState(filters?.class_id || '');
    const [sectionId, setSectionId] = useState(filters?.section_id || '');
    const [routeId, setRouteId] = useState(filters?.route_id || '');

    const handleGenerate = () => {
        router.get(route('reports.students.transport-users'), { 
            class_id: classId, 
            section_id: sectionId,
            route_id: routeId
        }, { preserveState: true });
    };

    const availableSections = classId 
        ? classes.find(c => c.id == classId)?.sections || [] 
        : [];

    return (
        <AppLayout title="Transport User Report">
            <Head title="Transport User Report" />
            <div className="space-y-3">
                
         
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb 
                        title="Student Reports" 
                        subTitle="Transport Users" 
                        breadcrumbItems={[
                            { label: 'Dashboard', href: route('dashboard') }, 
                            { label: 'Reports', href: route('reports.index') },
                            { label: 'Students', href: route('reports.students.index') }
                        ]} 
                    />
                </div>


                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                        <Search className="w-4 h-4" /> Filter Data
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <FormInput 
                            label="Class" 
                            type="select" 
                            value={classId} 
                            onChange={(v) => { setClassId(v); setSectionId(''); }} 
                            options={[{ value: '', label: '-- All Classes --' }, ...(classes?.map(c => ({ value: c.id, label: c.name })) || [])]} 
                        />
                        <FormInput 
                            label="Section" 
                            type="select" 
                            value={sectionId} 
                            onChange={(v) => setSectionId(v)} 
                            options={[{ value: '', label: '-- All Sections --' }, ...(availableSections.map(s => ({ value: s.id, label: s.name })))]} 
                            disabled={!classId}
                        />
                        <FormInput 
                            label="Route" 
                            type="select" 
                            value={routeId} 
                            onChange={(v) => setRouteId(v)} 
                            options={[{ value: '', label: '-- All Routes --' }, ...(routes?.map(r => ({ value: r.id, label: r.name })) || [])]} 
                        />
                        <div className="flex items-end">
                            <Button variant="primary" size="lg" onClick={handleGenerate} className="w-full">
                                <Search className="w-4 h-4 mr-1.5" /> Generate Report
                            </Button>
                        </div>
                    </div>
                </div>

                
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
                    
              
                    {students.length > 0 && (
                        <div className="mb-4 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Bus className="w-5 h-5 text-primary-600" />
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Transport Users List</h2>
                            </div>
                            <div className="flex items-center gap-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 px-4 py-2 rounded-lg">
                                <Users className="w-4 h-4" />
                                <span className="font-semibold">Total Users: {totalStudents}</span>
                            </div>
                        </div>
                    )}

                
                    {students.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-slate-700 border-b-2 border-gray-300 dark:border-slate-600">
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">SN</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Admission No</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Student Name</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Class / Section</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Route Name</th>
                                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Stop Name</th>
                                        <th className="px-4 py-2 text-right text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600">Monthly Fee</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student, index) => (
                                        <tr key={student.admission_no + student.route_name} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{index + 1}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{student.admission_no}</td>
                                            <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700">{student.first_name} {student.last_name}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{student.class_name} - {student.section_name}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 font-medium">{student.route_name}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">{student.stop_name}</td>
                                            <td className="px-4 py-2 text-sm text-right font-medium text-cyan-600 dark:text-cyan-400 border border-gray-200 dark:border-slate-700">Rs. {Number(student.monthly_fee).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <FileText className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                            <p className="text-gray-500 dark:text-gray-400">No transport users found. Please adjust filters and generate report.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}