import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { useState } from 'react';
import { 
    GraduationCap, Users, Briefcase, DollarSign, 
    Award, BookOpen, Bus, Bed, Search, ArrowRight 
} from 'lucide-react';

export default function ReportsIndex() {
    const [searchTerm, setSearchTerm] = useState('');


    const reportCategories = [
        {
            title: 'Academic Reports',
            description: 'Class-wise lists, subject summaries, and academic year statistics.',
            icon: GraduationCap,
            color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
            href: route('reports.academic.index')
        },
        {
            title: 'Student Reports',
            description: 'Attendance, fee status, profiles, and admission registers.',
            icon: Users,
            color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
            href: route('reports.students.index')
        },
        {
            title: 'Staff & HR Reports',
            description: 'Payroll, staff attendance, leave summaries, and department lists.',
            icon: Briefcase,
            color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
            href: route('reports.staff.index')
        },
        {
            title: 'Finance & Fee Reports',
            description: 'Fee collection, due reports, income, expense, and bank statements.',
            icon: DollarSign,
            color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
            href: route('reports.finance.index')
        },
        {
            title: 'Examination Reports',
            description: 'Report cards, result analysis, grade distribution, and merit lists.',
            icon: Award,
            color: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
            href: route('reports.examinations.index')
        },
        {
            title: 'Library Reports',
            description: 'Book issues, overdue books, lost books, and stock summaries.',
            icon: BookOpen,
            color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
            href: route('reports.library.index')
        },
        {
            title: 'Transport Reports',
            description: 'Route-wise students, vehicle assignments, and transport fees.',
            icon: Bus,
            color: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400',
            href: route('reports.transport.index')
        },
        {
            title: 'Hostel Reports',
            description: 'Room occupancy, vacant rooms, and hostel fee collections.',
            icon: Bed,
            color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
            href: route('reports.hostel.index')
        }
    ];

   
    const filteredCategories = reportCategories.filter(category => 
        category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AppLayout title="Reports Dashboard">
            <Head title="Reports Dashboard" />
            <div className="space-y-6">
                

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb 
                        title="Reports" 
                        subTitle="Reports Dashboard" 
                        breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }]} 
                    />
                </div>

           
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <div className="relative max-w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search reports..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white outline-none text-sm transition-all" 
                        />
                    </div>
                </div>

              
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredCategories.map((category, index) => (
                        <Link 
                            key={index} 
                            href={category.href}
                            className="group bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-lg ${category.color}`}>
                                    <category.icon className="w-6 h-6" />
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                            </div>
                            
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                                {category.title}
                            </h3>
                            
                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-grow">
                                {category.description}
                            </p>
                        </Link>
                    ))}

                
                    {filteredCategories.length === 0 && (
                        <div className="col-span-full py-12 text-center">
                            <Search className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                            <p className="text-gray-500 dark:text-gray-400">No reports found matching "{searchTerm}"</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}