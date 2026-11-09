import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import Button from '@/Components/Button';
import { useState } from 'react';
import { Search, FileText, Phone, Users, RotateCcw } from 'lucide-react';


const TableHeader = ({ totalContacts }) => (
    <div className="mb-4 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary-600" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Student Contact List</h2>
        </div>
        <div className="flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-lg">
            <Users className="w-4 h-4" />
            <span className="font-semibold">Total: {totalContacts}</span>
        </div>
    </div>
);


const EmptyState = () => (
    <div className="text-center py-12">
        <FileText className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
        <p className="text-gray-500 dark:text-gray-400">
            No students found. Please adjust filters and generate report.
        </p>
    </div>
);


const InitialState = () => (
    <div className="text-center py-12">
        <FileText className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
        <p className="text-gray-500 dark:text-gray-400">
            Please select filters and click "Generate Report" to view student contact list.
        </p>
    </div>
);


const StudentTable = ({ students }) => {
    const columns = [
        { key: 'sn', label: 'SN', render: (_, index) => index + 1 },
        { key: 'admission_no', label: 'Admission No', render: (s) => s.admission_no },
        { key: 'name', label: 'Student Name', render: (s) => `${s.first_name} ${s.last_name}`, bold: true },
        { key: 'class_section', label: 'Class / Section', render: (s) => `${s.class_name} - ${s.section_name}` },
        { key: 'father_name', label: "Father's Name", render: (s) => s.father_name || 'N/A' },
        { key: 'contact', label: 'Contact No', render: (s) => s.contact_number || 'N/A', highlight: 'blue' },
        { key: 'emergency', label: 'Emergency', render: (s) => s.emergency_contact || 'N/A' }
    ];

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100 dark:bg-slate-700 border-b-2 border-gray-300 dark:border-slate-600">
                        {columns.map(col => (
                            <th
                                key={col.key}
                                className="px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase border border-gray-300 dark:border-slate-600"
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                            {columns.map(col => (
                                <td
                                    key={col.key}
                                    className={`px-4 py-2 text-sm border border-gray-200 dark:border-slate-700 ${
                                        col.bold ? 'font-medium text-gray-900 dark:text-white' :
                                        col.highlight === 'blue' ? 'font-medium text-blue-600 dark:text-blue-400' :
                                        'text-gray-700 dark:text-gray-300'
                                    }`}
                                >
                                    {col.render(student, index)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


const FilterSection = ({ search, classId, sectionId, onSearchChange, onClassChange, onSectionChange, onGenerate, onReset, classes, availableSections }) => (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <Search className="w-4 h-4" /> Filter Data
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <FormInput
                label="Search (Name / Admission No / Phone)"
                type="text"
                value={search}
                onChange={onSearchChange}
                placeholder="Type to search..."
            />
            <FormInput
                label="Class"
                type="select"
                value={classId}
                onChange={onClassChange}
                options={[{ value: '', label: '-- All Classes --' }, ...(classes?.map(c => ({ value: c.id, label: c.name })) || [])]}
            />
            <FormInput
                label="Section"
                type="select"
                value={sectionId}
                onChange={onSectionChange}
                options={[{ value: '', label: '-- All Sections --' }, ...(availableSections.map(s => ({ value: s.id, label: s.name })))]}
                disabled={!classId}
            />
            <div className="flex items-end gap-2">
                <Button variant="primary" size="lg" onClick={onGenerate} className="flex-1">
                    <Search className="w-4 h-4 mr-1.5" /> Report
                </Button>
                <Button variant="outline" size="lg" onClick={onReset} className="flex items-center gap-1.5">
                    <RotateCcw className="w-4 h-4" /> Reset
                </Button>
            </div>
        </div>
    </div>
);

export default function StudentContactList({ classes, students, totalContacts, filters }) {
    const [classId, setClassId] = useState(filters?.class_id || '');
    const [sectionId, setSectionId] = useState(filters?.section_id || '');
    const [search, setSearch] = useState(filters?.search || '');
    const [reportGenerated, setReportGenerated] = useState(!!(filters?.class_id || filters?.section_id || filters?.search));

    const handleGenerate = () => {
        router.get(route('reports.students.contact-list'), {
            class_id: classId,
            section_id: sectionId,
            search: search
        }, { preserveState: true });
        setReportGenerated(true);
    };

    const handleReset = () => {
        setClassId('');
        setSectionId('');
        setSearch('');
        setReportGenerated(false);
        router.get(route('reports.students.contact-list'), {}, { preserveState: false });
    };

    const availableSections = classId
        ? classes.find(c => c.id == classId)?.sections || []
        : [];

    return (
        <AppLayout title="Student Contact List">
            <Head title="Student Contact List" />
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb
                        title="Student Reports"
                        subTitle="Contact List"
                        breadcrumbItems={[
                            { label: 'Dashboard', href: route('dashboard') },
                            { label: 'Reports', href: route('reports.index') },
                            { label: 'Students', href: route('reports.students.index') }
                        ]}
                    />
                </div>

                <FilterSection
                    search={search}
                    classId={classId}
                    sectionId={sectionId}
                    onSearchChange={setSearch}
                    onClassChange={(v) => { setClassId(v); setSectionId(''); }}
                    onSectionChange={setSectionId}
                    onGenerate={handleGenerate}
                    onReset={handleReset}
                    classes={classes}
                    availableSections={availableSections}
                />

                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
                    {!reportGenerated ? (
                        <InitialState />
                    ) : students.length > 0 ? (
                        <>
                            <TableHeader totalContacts={totalContacts} />
                            <StudentTable students={students} />
                        </>
                    ) : (
                        <EmptyState />
                    )}
                </div>
            </div>
        </AppLayout>
    );
}