import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import Button from '@/Components/Button';
import { useState } from 'react';
import { Search, Building2, Layers, BookOpen, Users, Calendar } from 'lucide-react';


const StatCard = ({ icon: Icon, label, value, color = 'blue' }) => {
    const colorClasses = {
        blue: {
            border: 'border-blue-100 dark:border-blue-900/40',
            bg: 'bg-blue-50/50 dark:bg-blue-900/10',
            iconBg: 'bg-blue-100 dark:bg-blue-900/40',
            text: 'text-blue-600 dark:text-blue-400'
        },
        emerald: {
            border: 'border-emerald-100 dark:border-emerald-900/40',
            bg: 'bg-emerald-50/50 dark:bg-emerald-900/10',
            iconBg: 'bg-emerald-100 dark:bg-emerald-900/40',
            text: 'text-emerald-600 dark:text-emerald-400'
        },
        amber: {
            border: 'border-amber-100 dark:border-amber-900/40',
            bg: 'bg-amber-50/50 dark:bg-amber-900/10',
            iconBg: 'bg-amber-100 dark:bg-amber-900/40',
            text: 'text-amber-600 dark:text-amber-400'
        },
        rose: {
            border: 'border-rose-100 dark:border-rose-900/40',
            bg: 'bg-rose-50/50 dark:bg-rose-900/10',
            iconBg: 'bg-rose-100 dark:bg-rose-900/40',
            text: 'text-rose-600 dark:text-rose-400'
        }
    };

    const colors = colorClasses[color];

    return (
        <div className={`group rounded-xl border ${colors.border} ${colors.bg} p-4 hover:shadow-md transition-all duration-200`}>
            <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl ${colors.iconBg} ${colors.text}`}>
                    <Icon className="w-6 h-6" />
                </div>
                <span className={`text-xs font-medium ${colors.text}`}>
                    {label}
                </span>
            </div>

            <div className="mt-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total {label}
                </p>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {value}
                </h3>
            </div>
        </div>
    );
};

const SummaryHeader = ({ yearName }) => (
    <div className="px-5 py-5 sm:px-6 border-b border-gray-100 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-900/30">
                    <Calendar className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        Academic Year Summary
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        Overview for {yearName}
                    </p>
                </div>
            </div>

            <span className="inline-flex items-center w-fit gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                <Calendar className="w-3.5 h-3.5" />
                {yearName}
            </span>
        </div>
    </div>
);

const StatisticsGrid = ({ summary }) => (
    <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={Building2} label="Classes" value={summary.total_classes} color="blue" />
            <StatCard icon={Layers} label="Sections" value={summary.total_sections} color="emerald" />
            <StatCard icon={BookOpen} label="Subjects" value={summary.total_subjects} color="amber" />
            <StatCard icon={Users} label="Students" value={summary.total_students} color="rose" />
        </div>
    </div>
);

const EmptyState = () => (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-12 text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center mb-4">
            <Calendar className="w-7 h-7 text-gray-400" />
        </div>
        <p className="text-base font-semibold text-gray-700 dark:text-gray-200">
            No Summary Available
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Please select an academic year to view the summary.
        </p>
    </div>
);

const FilterSection = ({ yearId, onYearChange, onGenerate, years }) => (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <Search className="w-4 h-4" /> Filter Data
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
                label="Select Academic Year"
                type="select"
                value={yearId}
                onChange={onYearChange}
                options={[
                    { value: '', label: '-- Select Year --' },
                    ...(years?.map(y => ({ value: y.id, label: y.title })) || [])
                ]}
            />
            <div className="flex items-end">
                <Button variant="primary" size="lg" onClick={onGenerate} className="w-full">
                    <Search className="w-4 h-4 mr-1.5" /> Generate Summary
                </Button>
            </div>
        </div>
    </div>
);


const SummaryDisplay = ({ summary }) => (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <SummaryHeader yearName={summary.year_name} />
        <StatisticsGrid summary={summary} />
    </div>
);

export default function AcademicYearSummary({ years, summary, filters }) {
    const [yearId, setYearId] = useState(filters?.year_id || '');

    const handleGenerate = () => {
        router.get(route('reports.academic.year-summary'), { year_id: yearId }, { preserveState: true });
    };

    return (
        <AppLayout title="Academic Year Summary">
            <Head title="Academic Year Summary" />
            
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb
                        title="Academic Reports"
                        subTitle="Academic Year Summary"
                        breadcrumbItems={[
                            { label: 'Dashboard', href: route('dashboard') },
                            { label: 'Reports', href: route('reports.index') },
                            { label: 'Academic', href: route('reports.academic.index') }
                        ]}
                    />
                </div>

                <FilterSection
                    yearId={yearId}
                    onYearChange={setYearId}
                    onGenerate={handleGenerate}
                    years={years}
                />

                {summary ? (
                    <SummaryDisplay summary={summary} />
                ) : (
                    <EmptyState />
                )}
            </div>
        </AppLayout>
    );
}