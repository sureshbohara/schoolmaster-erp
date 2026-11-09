import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { 
    Users, DollarSign, TrendingUp, TrendingDown, Percent,
    GraduationCap, Calendar, Bell, ClipboardList, Receipt, Briefcase,
    BookOpen, Bus, Bed, AlertTriangle, Award, Building2,
    ArrowUpRight, ArrowDownRight, Minus, CheckCircle2, Clock,
    UserPlus, FileText, Wallet, TrendingDown as TrendDown
} from 'lucide-react';

export default function Dashboard({ 
    auth,
    totalStudents, totalStaff, totalClasses, totalDepartments,
    totalExpectedFee, thisMonthCollection, totalCollection, pendingDues,
    attendancePercentage, todayPresent, todayTotalAttendance, staffPresent,
    overdueBooks,
    transportStudents, hostelStudents, totalRoutes, totalHostels,
    recentFeePayments, recentAdmissions,
    monthlyCollection, classWiseStudents,
    upcomingExams, pendingLeaves,
    newStudentsThisMonth, newStaffThisMonth
}) {
    const currentDate = new Date().toLocaleDateString('en-US', { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    const formatCurrency = (amount) => {
        return 'Rs. ' + Number(amount || 0).toLocaleString();
    };

    const primaryStats = [
        { 
            name: 'Total Students', 
            value: totalStudents, 
            subtitle: `+${newStudentsThisMonth} this month`,
            icon: Users, 
            color: 'from-blue-500 to-blue-600',
            trend: newStudentsThisMonth > 0 ? 'up' : 'neutral',
            trendValue: newStudentsThisMonth > 0 ? `+${newStudentsThisMonth}` : '0'
        },
        { 
            name: 'Total Staff', 
            value: totalStaff, 
            subtitle: `${staffPresent} present today`,
            icon: GraduationCap, 
            color: 'from-indigo-500 to-indigo-600',
            trend: newStaffThisMonth > 0 ? 'up' : 'neutral',
            trendValue: newStaffThisMonth > 0 ? `+${newStaffThisMonth}` : '0'
        },
        { 
            name: 'Today\'s Attendance', 
            value: `${attendancePercentage}%`, 
            subtitle: `${todayPresent}/${todayTotalAttendance} students`,
            icon: Percent, 
            color: 'from-purple-500 to-purple-600',
            trend: attendancePercentage >= 80 ? 'up' : attendancePercentage >= 50 ? 'neutral' : 'down',
            trendValue: `${attendancePercentage}%`
        },
        { 
            name: 'Classes & Sections', 
            value: totalClasses, 
            subtitle: `${totalDepartments} departments`,
            icon: Building2, 
            color: 'from-cyan-500 to-cyan-600',
            trend: 'neutral',
            trendValue: ''
        },
    ];

    const financialStats = [
        { name: 'This Month Collection', value: formatCurrency(thisMonthCollection), icon: Wallet, color: 'from-emerald-500 to-emerald-600' },
        { name: 'Total Collection', value: formatCurrency(totalCollection), icon: DollarSign, color: 'from-green-500 to-green-600' },
        { name: 'Pending Dues', value: formatCurrency(pendingDues), icon: TrendDown, color: 'from-red-500 to-red-600' },
        { name: 'Expected Fee', value: formatCurrency(totalExpectedFee), icon: Receipt, color: 'from-amber-500 to-amber-600' },
    ];

    const facilityStats = [
        { name: 'Transport Users', value: transportStudents, subtitle: `${totalRoutes} routes`, icon: Bus, color: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400' },
        { name: 'Hostel Students', value: hostelStudents, subtitle: `${totalHostels} hostels`, icon: Bed, color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' },
        { name: 'Overdue Books', value: overdueBooks, subtitle: 'Library alerts', icon: BookOpen, color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' },
        { name: 'Pending Leaves', value: pendingLeaves, subtitle: 'Awaiting approval', icon: Clock, color: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' },
    ];


    const maxMonthlyAmount = Math.max(...monthlyCollection.map(m => Number(m.amount) || 0), 1);

    return (
        <AppLayout title="Dashboard">
            <Head title="Dashboard - SchoolMaster ERP" />
            
            <div className="space-y-6">
                
          
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {getGreeting()}, {auth.user.full_name}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Here's what's happening at your school — {currentDate}
                        </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <Link href={route('reports.index')} className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center transition-colors">
                            <FileText className="w-4 h-4 mr-2" />
                            View Reports
                        </Link>
                        <div className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-sm text-white font-medium shadow-sm">
                            <span className="font-semibold">{totalStudents}</span> Active Students
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {primaryStats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="relative overflow-hidden bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 hover:shadow-lg transition-all">
                                <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-gradient-to-br opacity-10" style={{background: `linear-gradient(135deg, var(--tw-gradient-stops))`}}></div>
                                
                                <div className="flex items-center justify-between mb-3">
                                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    {stat.trend !== 'neutral' && stat.trendValue && (
                                        <div className={`flex items-center text-xs font-semibold px-2 py-1 rounded-lg ${
                                            stat.trend === 'up' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                                            stat.trend === 'down' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                            'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                                        }`}>
                                            {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : 
                                             stat.trend === 'down' ? <ArrowDownRight className="w-3 h-3 mr-0.5" /> :
                                             <Minus className="w-3 h-3 mr-0.5" />}
                                            {stat.trendValue}
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1">{stat.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{stat.subtitle}</p>
                            </div>
                        );
                    })}
                </div>

          
                <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-emerald-600" />
                        Financial Overview
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {financialStats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div key={index} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 hover:shadow-md transition-all">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className={`p-2.5 rounded-lg bg-gradient-to-br ${stat.color} shadow-md`}>
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</h3>
                                </div>
                            );
                        })}
                    </div>
                </div>

       
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
             
                    <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Monthly Fee Collection</h2>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Last 6 months overview</p>
                            </div>
                            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                                <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                        </div>
                        
                
                        <div className="relative" style={{ height: '280px' }}>
                            <div className="absolute inset-0 flex items-end justify-between gap-3 pb-10">
                                {monthlyCollection.map((item, index) => {
                                    const amount = Number(item.amount) || 0;
                                    const heightPx = maxMonthlyAmount > 0 ? (amount / maxMonthlyAmount) * 200 : 0;
                                    const finalHeight = Math.max(heightPx, 4); 
                                    
                                    return (
                                        <div key={index} className="flex-1 flex flex-col items-center justify-end h-full relative group">
                                            
                                       
                                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                                <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs font-semibold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                                                    Rs. {amount.toLocaleString()}
                                                </div>
                                                <div className="w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45 mx-auto -mt-1"></div>
                                            </div>
                                            
                                   
                                            {amount > 0 && (
                                                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                                                    {amount >= 1000 ? `${(amount / 1000).toFixed(1)}k` : amount}
                                                </div>
                                            )}
                                            
                                 
                                            <div 
                                                className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 hover:from-emerald-700 hover:to-emerald-500 rounded-t-lg transition-all cursor-pointer shadow-md relative overflow-hidden"
                                                style={{ height: `${finalHeight}px`, minHeight: '4px' }}
                                                title={`${item.month}: Rs. ${amount.toLocaleString()}`}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                            </div>
                                            
                                            {/* Month label */}
                                            <div className="absolute -bottom-0 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                                {item.month}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {/* Y-axis baseline */}
                            <div className="absolute bottom-10 left-0 right-0 h-px bg-gray-200 dark:bg-slate-700"></div>
                        </div>
                        
                        {/* Summary below chart */}
                        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-slate-700 grid grid-cols-3 gap-4">
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Total (6 months)</p>
                                <p className="text-lg font-bold text-gray-900 dark:text-white">
                                    Rs. {monthlyCollection.reduce((sum, m) => sum + (Number(m.amount) || 0), 0).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Average / Month</p>
                                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                                    Rs. {Math.round(monthlyCollection.reduce((sum, m) => sum + (Number(m.amount) || 0), 0) / Math.max(monthlyCollection.length, 1)).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Best Month</p>
                                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                    Rs. {Math.max(...monthlyCollection.map(m => Number(m.amount) || 0)).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Live Activity */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Live Activity</h2>
                            <span className="flex items-center text-xs text-green-600 dark:text-green-400">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                                Real-time
                            </span>
                        </div>
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                            {recentFeePayments.length > 0 ? (
                                recentFeePayments.map((payment) => (
                                    <div key={payment.id} className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                                        <div className="p-1.5 rounded-lg bg-green-500">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-200 truncate">
                                                {payment.student?.first_name} {payment.student?.last_name}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                Paid {formatCurrency(payment.net_amount)} • {payment.payment_method}
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                                {new Date(payment.payment_date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <Wallet className="w-10 h-10 mx-auto text-gray-300 dark:text-gray-600 mb-2" />
                                    <p className="text-sm text-gray-500 dark:text-gray-400">No recent payments</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

           
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-primary-600" />
                            Facility Overview
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            {facilityStats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <div key={index} className="p-4 rounded-xl border border-gray-200 dark:border-slate-700 hover:shadow-md transition-all">
                                        <div className={`inline-flex p-2 rounded-lg ${stat.color} mb-2`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mt-0.5">{stat.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{stat.subtitle}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Users className="w-5 h-5 text-blue-600" />
                                Class-wise Student Distribution
                            </h2>
                            <Link href={route('reports.academic.index')} className="text-xs text-primary-600 hover:text-primary-700 font-medium">
                                View All →
                            </Link>
                        </div>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {classWiseStudents.length > 0 ? (
                                classWiseStudents.map((cls, index) => {
                                    const maxCount = Math.max(...classWiseStudents.map(c => c.count), 1);
                                    const widthPercent = (cls.count / maxCount) * 100;
                                    return (
                                        <div key={index} className="flex items-center gap-3">
                                            <div className="w-24 text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{cls.name}</div>
                                            <div className="flex-1 bg-gray-100 dark:bg-slate-700 rounded-full h-6 overflow-hidden">
                                                <div 
                                                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full flex items-center justify-end pr-2 transition-all"
                                                    style={{ width: `${Math.max(widthPercent, 5)}%` }}
                                                >
                                                    <span className="text-xs font-bold text-white">{cls.count}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-8">
                                    <Users className="w-10 h-10 mx-auto text-gray-300 dark:text-gray-600 mb-2" />
                                    <p className="text-sm text-gray-500 dark:text-gray-400">No class data available</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Quick Actions */}
                    <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            <Link href={route('students.create')} className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/30 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-900/30 dark:hover:to-blue-900/40 border border-blue-200 dark:border-blue-900/50 rounded-xl text-left transition-all group">
                                <UserPlus className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                                <h3 className="font-semibold text-blue-900 dark:text-blue-300 text-sm">Add Student</h3>
                                <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">New admission</p>
                            </Link>
                            
                            <Link href={route('fees.payments.index')} className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/30 hover:from-green-100 hover:to-green-200 dark:hover:from-green-900/30 dark:hover:to-green-900/40 border border-green-200 dark:border-green-900/50 rounded-xl text-left transition-all group">
                                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400 mb-2 group-hover:scale-110 transition-transform" />
                                <h3 className="font-semibold text-green-900 dark:text-green-300 text-sm">Collect Fee</h3>
                                <p className="text-xs text-green-700 dark:text-green-400 mt-1">Receive payment</p>
                            </Link>

                            <Link href={route('attendance.students.index')} className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/30 hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-900/30 dark:hover:to-purple-900/40 border border-purple-200 dark:border-purple-900/50 rounded-xl text-left transition-all group">
                                <ClipboardList className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                                <h3 className="font-semibold text-purple-900 dark:text-purple-300 text-sm">Mark Attendance</h3>
                                <p className="text-xs text-purple-700 dark:text-purple-400 mt-1">Daily attendance</p>
                            </Link>

                            <Link href={route('exams.index')} className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-900/30 hover:from-orange-100 hover:to-orange-200 dark:hover:from-orange-900/30 dark:hover:to-orange-900/40 border border-orange-200 dark:border-orange-900/50 rounded-xl text-left transition-all group">
                                <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400 mb-2 group-hover:scale-110 transition-transform" />
                                <h3 className="font-semibold text-orange-900 dark:text-orange-300 text-sm">Schedule Exam</h3>
                                <p className="text-xs text-orange-700 dark:text-orange-400 mt-1">Create timetable</p>
                            </Link>

                            <Link href={route('accounting.expenses.index')} className="p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/30 hover:from-red-100 hover:to-red-200 dark:hover:from-red-900/30 dark:hover:to-red-900/40 border border-red-200 dark:border-red-900/50 rounded-xl text-left transition-all group">
                                <Receipt className="w-6 h-6 text-red-600 dark:text-red-400 mb-2 group-hover:scale-110 transition-transform" />
                                <h3 className="font-semibold text-red-900 dark:text-red-300 text-sm">Add Expense</h3>
                                <p className="text-xs text-red-700 dark:text-red-400 mt-1">Record expense</p>
                            </Link>

                            <Link href={route('hr.employees.create')} className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-900/30 hover:from-indigo-100 hover:to-indigo-200 dark:hover:from-indigo-900/30 dark:hover:to-indigo-900/40 border border-indigo-200 dark:border-indigo-900/50 rounded-xl text-left transition-all group">
                                <Briefcase className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
                                <h3 className="font-semibold text-indigo-900 dark:text-indigo-300 text-sm">Add Employee</h3>
                                <p className="text-xs text-indigo-700 dark:text-indigo-400 mt-1">New staff hiring</p>
                            </Link>
                        </div>
                    </div>

           
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <UserPlus className="w-5 h-5 text-blue-600" />
                                Recent Admissions
                            </h2>
                        </div>
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                            {recentAdmissions.length > 0 ? (
                                recentAdmissions.map((student) => (
                                    <div key={student.id} className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                        <div className="p-1.5 rounded-lg bg-blue-500">
                                            <UserPlus className="w-3.5 h-3.5 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-200 truncate">
                                                {student.first_name} {student.last_name}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                {student.admission_no} • {student.class_name}
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                                {new Date(student.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <UserPlus className="w-10 h-10 mx-auto text-gray-300 dark:text-gray-600 mb-2" />
                                    <p className="text-sm text-gray-500 dark:text-gray-400">No recent admissions</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

             
                {upcomingExams.length > 0 && (
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Award className="w-5 h-5 text-amber-600" />
                                Upcoming Examinations
                            </h2>
                            <Link href={route('exams.index')} className="text-xs text-primary-600 hover:text-primary-700 font-medium">
                                View All →
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {upcomingExams.map((exam) => (
                                <div key={exam.id} className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/30 border border-amber-200 dark:border-amber-900/50 rounded-xl">
                                    <div className="flex items-start justify-between mb-2">
                                        <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                        <span className="text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-200 dark:bg-amber-900/50 px-2 py-0.5 rounded">
                                            Upcoming
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-amber-900 dark:text-amber-200 text-sm">{exam.name}</h3>
                                    <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                                        {new Date(exam.start_date).toLocaleDateString()} - {new Date(exam.end_date).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}