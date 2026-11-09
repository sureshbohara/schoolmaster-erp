import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import Button from '@/Components/Button';
import { 
    Settings, Save, Image as ImageIcon, CheckCircle2, 
    School, CreditCard, MessageSquare, Link as LinkIcon, Mail 
} from 'lucide-react';
import { useState } from 'react';

export default function SystemSettings({ settings, academicYears }) {
    const { flash } = usePage().props;
    const [activeTab, setActiveTab] = useState('general');

    const { data, setData, post, processing, errors } = useForm({
        ...settings,
        system_logo: null,
        report_logo: null,
        favicon: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('settings.update'), { preserveScroll: true });
    };

    const handleFileChange = (field, file) => {
        setData(field, file);
    };

    const tabs = [
        { id: 'general', name: 'General', subtitle: 'Basic Info & Contact', icon: Settings },
        { id: 'branding', name: 'Media', subtitle: 'Logos & Images', icon: ImageIcon },
        { id: 'social', name: 'Social Links', subtitle: 'Profile URLs', icon: LinkIcon },
        { id: 'academic', name: 'Academic', subtitle: 'Years & Preferences', icon: School },
        { id: 'finance', name: 'Finance', subtitle: 'Fee & Payment', icon: CreditCard },
        { id: 'communication', name: 'SMTP / Mail', subtitle: 'Email & SMS Config', icon: Mail },
    ];

    return (
        <AppLayout title="System Settings">
            <Head title="System Settings" />
            
    
            <div className="space-y-3">

             
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Breadcrumb 
                        title="Settings" 
                        subTitle="System Configuration" 
                        breadcrumbItems={[{ label: 'Dashboard', href: route('dashboard') }]} 
                    />
                </div>

         
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
                    
                
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden sticky top-4">
                            <div className="p-4 border-b border-gray-200 dark:border-slate-700">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Configuration</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Manage system preferences</p>
                            </div>
                            <nav className="p-2 space-y-1">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-start gap-3 px-3 py-2.5 text-left rounded-md transition-all duration-200 ${
                                                isActive 
                                                    ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
                                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700/50'
                                            }`}
                                        >
                                            <div className={`p-1.5 rounded-md shrink-0 ${isActive ? 'bg-emerald-100 dark:bg-emerald-900/40' : 'bg-gray-100 dark:bg-slate-700'}`}>
                                                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className={`text-sm font-medium truncate ${isActive ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-700 dark:text-gray-300'}`}>
                                                    {tab.name}
                                                </div>
                                                <div className={`text-xs mt-0.5 truncate ${isActive ? 'text-emerald-600/80 dark:text-emerald-400/80' : 'text-gray-500 dark:text-gray-500'}`}>
                                                    {tab.subtitle}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>

                   
                    <div className="lg:col-span-3">
                        <form onSubmit={handleSubmit} className="space-y-3">
                            
                         
                            {activeTab === 'general' && (
                                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                                    <div className="mb-4 pb-3 border-b border-gray-200 dark:border-slate-700">
                                        <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                            <Settings className="w-4 h-4 text-emerald-600" />
                                            General Information
                                        </h2>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Update basic contact details (Shows on Contact Us Page & Footer).</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <FormInput label="System Name" value={data.system_name} onChange={(v) => setData('system_name', v)} error={errors.system_name} required />
                                        <FormInput label="School Name" value={data.school_name} onChange={(v) => setData('school_name', v)} error={errors.school_name} required />
                                        <FormInput label="Primary Email" type="email" value={data.system_email} onChange={(v) => setData('system_email', v)} error={errors.system_email} required />
                                        <FormInput label="Secondary Email" type="email" value={data.secondary_email || ''} onChange={(v) => setData('secondary_email', v)} error={errors.secondary_email} />
                                        <FormInput label="Primary Phone" value={data.system_phone} onChange={(v) => setData('system_phone', v)} error={errors.system_phone} required />
                                        <FormInput label="Secondary Phone" value={data.secondary_phone || ''} onChange={(v) => setData('secondary_phone', v)} error={errors.secondary_phone} />
                                        <div className="md:col-span-2">
                                            <FormInput label="Full Address" value={data.system_address} onChange={(v) => setData('system_address', v)} error={errors.system_address} required />
                                        </div>
                                        <FormInput label="Opening Hours" value={data.opening_hours || ''} onChange={(v) => setData('opening_hours', v)} error={errors.opening_hours} placeholder="Mon - Fri: 9:00 AM - 5:00 PM" />
                                        <FormInput label="Website" value={data.website || ''} onChange={(v) => setData('website', v)} error={errors.website} placeholder="https://" />
                                    </div>
                                </div>
                            )}

                          
                            {activeTab === 'branding' && (
                                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                                    <div className="mb-4 pb-3 border-b border-gray-200 dark:border-slate-700">
                                        <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                            <ImageIcon className="w-4 h-4 text-emerald-600" />
                                            Branding & Media
                                        </h2>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Upload logos and configure appearance settings.</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {['system_logo', 'report_logo', 'favicon'].map((field) => (
                                            <div key={field} className="space-y-2">
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 capitalize">{field.replace('_', ' ')}</label>
                                                <div className="w-full h-32 bg-gray-50 dark:bg-slate-900 rounded-lg border-2 border-dashed border-gray-200 dark:border-slate-700 flex items-center justify-center overflow-hidden relative group hover:border-emerald-400 transition-colors">
                                                    {data[field] instanceof File ? (
                                                        <img src={URL.createObjectURL(data[field])} alt="Preview" className="w-full h-full object-contain p-2" />
                                                    ) : settings[field] ? (
                                                        <img src={`/storage/${settings[field]}`} alt="Current" className="w-full h-full object-contain p-2" />
                                                    ) : (
                                                        <ImageIcon className="w-8 h-8 text-gray-400" />
                                                    )}
                                                    <input type="file" accept={field === 'favicon' ? 'image/png,image/x-icon' : 'image/*'} onChange={(e) => handleFileChange(field, e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                                </div>
                                                {errors[field] && <p className="text-xs text-red-500">{errors[field]}</p>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                          
                            {activeTab === 'social' && (
                                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                                    <div className="mb-4 pb-3 border-b border-gray-200 dark:border-slate-700">
                                        <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                            <LinkIcon className="w-4 h-4 text-emerald-600" />
                                            Social Links
                                        </h2>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Add your school's social media profile URLs.</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
                                        <FormInput label="Facebook URL" value={data.facebook_url || ''} onChange={(v) => setData('facebook_url', v)} placeholder="https://facebook.com/yourpage" />
                                        <FormInput label="Twitter / X URL" value={data.twitter_url || ''} onChange={(v) => setData('twitter_url', v)} placeholder="https://twitter.com/yourhandle" />
                                        <FormInput label="Instagram URL" value={data.instagram_url || ''} onChange={(v) => setData('instagram_url', v)} placeholder="https://instagram.com/yourhandle" />
                                        <FormInput label="LinkedIn URL" value={data.linkedin_url || ''} onChange={(v) => setData('linkedin_url', v)} placeholder="https://linkedin.com/company/yourpage" />
                                        <FormInput label="YouTube URL" value={data.youtube_url || ''} onChange={(v) => setData('youtube_url', v)} placeholder="https://youtube.com/@yourchannel" />
                                    </div>
                                </div>
                            )}

               
                            {activeTab === 'academic' && (
                                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                                    <div className="mb-4 pb-3 border-b border-gray-200 dark:border-slate-700">
                                        <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                            <School className="w-4 h-4 text-emerald-600" />
                                            Academic Settings
                                        </h2>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Configure academic years and system preferences.</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
                                        <FormInput label="Default Academic Year" type="select" value={data.default_academic_year_id} onChange={(v) => setData('default_academic_year_id', v)} options={[{ value: '', label: '-- Select Year --' }, ...(academicYears?.map(y => ({ value: y.id, label: y.title })) || [])]} />
                                        <FormInput label="Date Format" type="select" value={data.date_format} onChange={(v) => setData('date_format', v)} options={[{ value: 'Y-m-d', label: 'YYYY-MM-DD' }, { value: 'd-m-Y', label: 'DD-MM-YYYY' }, { value: 'm/d/Y', label: 'MM/DD/YYYY' }]} />
                                        <FormInput label="Timezone" type="select" value={data.timezone} onChange={(v) => setData('timezone', v)} options={[{ value: 'Asia/Kathmandu', label: 'Asia/Kathmandu (NPT)' }, { value: 'UTC', label: 'UTC' }]} />
                                        <FormInput label="Currency" type="select" value={data.currency} onChange={(v) => setData('currency', v)} options={[{ value: 'NPR', label: 'NPR (Rs.)' }, { value: 'USD', label: 'USD ($)' }, { value: 'INR', label: 'INR (₹)' }]} />
                                    </div>
                                </div>
                            )}

                           
                            {activeTab === 'finance' && (
                                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                                    <div className="mb-4 pb-3 border-b border-gray-200 dark:border-slate-700">
                                        <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                            <CreditCard className="w-4 h-4 text-emerald-600" />
                                            Finance Settings
                                        </h2>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Configure fee collection and payment rules.</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <FormInput label="Tax / VAT Percentage (%)" type="number" value={data.tax_percentage} onChange={(v) => setData('tax_percentage', v)} error={errors.tax_percentage} />
                                        <FormInput label="Late Fee Type" type="select" value={data.late_fee_type} onChange={(v) => setData('late_fee_type', v)} options={[{ value: 'fixed', label: 'Fixed Amount' }, { value: 'percentage', label: 'Percentage (%)' }]} />
                                        <FormInput label="Late Fee Amount / %" type="number" value={data.late_fee_amount} onChange={(v) => setData('late_fee_amount', v)} error={errors.late_fee_amount} />
                                        <div className="md:col-span-3">
                                            <FormInput label="Receipt Footer Text" type="textarea" value={data.receipt_footer} onChange={(v) => setData('receipt_footer', v)} error={errors.receipt_footer} rows={3} placeholder="e.g., This is a computer-generated receipt and does not require a signature." />
                                        </div>
                                    </div>
                                </div>
                            )}

         
                            {activeTab === 'communication' && (
                                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                                    <div className="mb-4 pb-3 border-b border-gray-200 dark:border-slate-700">
                                        <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-emerald-600" />
                                            Communication Settings
                                        </h2>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Configure SMS and Email notifications.</p>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2 uppercase tracking-wide">
                                                <MessageSquare className="w-3.5 h-3.5" /> SMS Configuration
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                <FormInput label="SMS API URL" value={data.sms_api_url} onChange={(v) => setData('sms_api_url', v)} placeholder="https://api.sparrowsms.com/v2/send/" />
                                                <FormInput label="SMS API Key" type="password" value={data.sms_api_key} onChange={(v) => setData('sms_api_key', v)} />
                                                <FormInput label="SMS Sender ID" value={data.sms_sender_id} onChange={(v) => setData('sms_sender_id', v)} placeholder="SCHOOL" />
                                            </div>
                                        </div>
                                        <div className="border-t border-gray-200 dark:border-slate-700 pt-4">
                                            <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2 uppercase tracking-wide">
                                                <Mail className="w-3.5 h-3.5" /> SMTP Email Configuration
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <FormInput label="SMTP Host" value={data.smtp_host} onChange={(v) => setData('smtp_host', v)} placeholder="smtp.gmail.com" />
                                                <FormInput label="SMTP Port" value={data.smtp_port} onChange={(v) => setData('smtp_port', v)} placeholder="587" />
                                                <FormInput label="SMTP Username" value={data.smtp_username} onChange={(v) => setData('smtp_username', v)} />
                                                <FormInput label="SMTP Password" type="password" value={data.smtp_password} onChange={(v) => setData('smtp_password', v)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

   
                            <div className="flex justify-end pt-2">
                                <Button type="submit" variant="primary" disabled={processing} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                                    <Save className="w-4 h-4" />
                                    {processing ? 'Saving Settings...' : 'Save All Settings'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}