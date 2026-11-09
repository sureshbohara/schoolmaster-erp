import { useState, useEffect } from 'react';
import { usePage, Link } from '@inertiajs/react';
import { 
    Menu, 
    Bell, 
    Search, 
    LogOut, 
    User,
    Key,
    Sun,  
    Moon, 
    ChevronDown,
    Globe
} from 'lucide-react';

import GlobalSearchModal from '@/Components/GlobalSearchModal';
export default function Header({ setSidebarOpen }) {
    const { auth } = usePage().props;
    

    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    

    const [isDarkMode, setIsDarkMode] = useState(false);

  
    const toggleTheme = () => {
        const html = document.documentElement;
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            setIsDarkMode(false);
            localStorage.setItem('theme', 'light');
        } else {
            html.classList.add('dark');
            setIsDarkMode(true);
            localStorage.setItem('theme', 'dark');
        }
    };

    // Load theme on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        }
    }, []);

    return (
        <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 shadow-sm transition-colors duration-200">
            <div className="flex items-center justify-between h-16 px-4 lg:px-6">
             
         
                <div className="flex items-center flex-1">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 mr-4 text-gray-600 dark:text-gray-300 rounded-lg lg:hidden hover:bg-gray-100 dark:hover:bg-slate-800"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <GlobalSearchModal />
                </div>

   
                <div className="flex items-center space-x-2 lg:space-x-4">
                    
              
                    <div className="relative">
                        <button 
                            onClick={() => {
                                setShowLanguageMenu(!showLanguageMenu);
                                setShowUserMenu(false);
                                setShowNotifications(false);
                            }}
                            className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            <Globe className="w-4 h-4 mr-2" />
                            <span className="hidden lg:inline">English</span>
                            <ChevronDown className="w-4 h-4 ml-1" />
                        </button>

                        {showLanguageMenu && (
                            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 py-2 z-50">
                                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700">
                                    English
                                </button>
                                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700">
                                    नेपाली (Nepali)
                                </button>
                            </div>
                        )}
                    </div>

             
                    <button
                        onClick={toggleTheme}
                        className="p-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                        title="Toggle Theme"
                    >
                        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>

                 
                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowNotifications(!showNotifications);
                                setShowUserMenu(false);
                                setShowLanguageMenu(false);
                            }}
                            className="relative p-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 py-2 z-50">
                                <div className="px-4 py-2 border-b border-gray-100 dark:border-slate-700">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">New fee payment received</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">2 minutes ago</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

             
                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowUserMenu(!showUserMenu);
                                setShowNotifications(false);
                                setShowLanguageMenu(false);
                            }}
                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                {auth.user.first_name[0]}{auth.user.last_name[0]}
                            </div>
                            <div className="hidden lg:block text-left">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {auth.user.first_name} {auth.user.last_name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{auth.user.role?.name || 'Admin'}</p>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-400 hidden lg:block" />
                        </button>

                        {showUserMenu && (
                            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 py-2 z-50">
                                <Link
                                    href={route('profile.edit')}
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700"
                                >
                                    <User className="w-4 h-4 mr-3" />
                                    Profile Settings
                                </Link>
                                
                        
                                <Link
                                    href={route('profile.password')}
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700"
                                >
                                    <Key className="w-4 h-4 mr-3" />
                                    Change Password
                                </Link>

                                <div className="my-1 border-t border-gray-100 dark:border-slate-700"></div>

                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                    <LogOut className="w-4 h-4 mr-3" />
                                    Logout
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}