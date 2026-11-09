import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, Menu, GraduationCap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/Utils/cn';
import { menuItems } from '@/Utils/menuConfig';

export default function Sidebar({ isOpen, setIsOpen }) {
    const { url, props } = usePage();
    const [openMenus, setOpenMenus] = useState([]);

 
    const userPermissions = props.auth?.user?.permissions || [];
    const roleName = props.auth?.user?.role?.name || '';
    const isSuperAdmin = roleName === 'Super Admin' || roleName === 'Admin';


    const hasPermission = (permission) => {
        return isSuperAdmin || !permission || userPermissions.includes(permission);
    };

   
    const filterMenu = (items) => {
        return items.reduce((acc, item) => {
            if (item.children) {
                const filteredChildren = filterMenu(item.children);
                if (filteredChildren.length > 0) {
            
                    if (hasPermission(item.permission)) {
                        acc.push({ ...item, children: filteredChildren });
                    }
                }
            } else {
                if (hasPermission(item.permission)) {
                    acc.push(item);
                }
            }
            return acc;
        }, []);
    };

    const accessibleMenuItems = filterMenu(menuItems);

    const getHref = (href) => {
        if (!href || href === '#') return '#';
        return route(href);
    };

    const isActive = (href) => {
        if (!href || href === '#') return false;
        const currentRoute = route(href, {}, false);
        return url === currentRoute || url.startsWith(currentRoute + '?') || url.startsWith(currentRoute + '/');
    };

    const hasActiveChild = (item) => {
        if (!item.children) return false;
        return item.children.some((child) => isActive(child.href));
    };

    useEffect(() => {
        const activeMenus = accessibleMenuItems
            .filter((item) => hasActiveChild(item))
            .map((item) => item.name);
        setOpenMenus((prev) => [...new Set([...prev, ...activeMenus])]);
    }, [url, accessibleMenuItems]);

    const toggleMenu = (menuName) => {
        setOpenMenus((prev) =>
            prev.includes(menuName) ? prev.filter((name) => name !== menuName) : [...prev, menuName]
        );
    };

    const closeSidebar = () => setIsOpen(false);

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={closeSidebar} />
            )}
            <aside className={cn(
                "fixed h-100 top-0 left-0 z-50 bg-slate-900 text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex items-center justify-between h-16 px-4 border-b border-slate-700">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                            <GraduationCap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-bold">SchoolMaster</span>
                    </div>
                    <button type="button" onClick={closeSidebar} className="lg:hidden p-1 hover:bg-slate-800 rounded">
                        <Menu className="w-5 h-5" />
                    </button>
                </div>

                <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100%-4rem)]">
                    {accessibleMenuItems.map((item) => {
                        const parentActive = hasActiveChild(item);
                        const menuOpen = openMenus.includes(item.name);

                        return (
                            <div key={item.name}>
                                {item.children && item.children.length > 0 ? (
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => toggleMenu(item.name)}
                                            className={cn(
                                                "w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors group",
                                                parentActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                            )}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <item.icon className={cn("w-5 h-5", parentActive ? "text-primary-400" : "text-slate-400 group-hover:text-white")} />
                                                <span>{item.name}</span>
                                            </div>
                                            <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform duration-200", menuOpen && "rotate-180")} />
                                        </button>
                                        {menuOpen && (
                                            <div className="mt-1 ml-4 pl-4 border-l border-slate-700 space-y-1">
                                                {item.children.map((child) => {
                                                    const active = isActive(child.href);
                                                    return (
                                                        <Link
                                                            key={child.name}
                                                            href={getHref(child.href)}
                                                            onClick={closeSidebar}
                                                            className={cn(
                                                                "flex items-center px-3 py-2 text-sm rounded-lg transition-colors",
                                                                active ? "text-primary-400 font-semibold" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                                            )}
                                                        >
                                                            <child.icon className="w-4 h-4 mr-3" />
                                                            {child.name}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        href={getHref(item.href)}
                                        onClick={closeSidebar}
                                        className={cn(
                                            "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                                            isActive(item.href) ? "bg-primary-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                        )}
                                    >
                                        <item.icon className="w-5 h-5 mr-3" />
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}