import { Link } from '@inertiajs/react';
import React from 'react';

export default function Breadcrumb({ title, subTitle, breadcrumbItems }) {
    return (
        <div className="flex items-center">
            <nav aria-label="breadcrumb">
                <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 list-none p-0 m-0">
                    {breadcrumbItems.map((item, index) => (
                        <React.Fragment key={index}>
                            <li className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                                {item.href ? (
                                    <Link href={item.href} className="hover:text-primary-600 dark:hover:text-primary-400">
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span>{item.label}</span>
                                )}
                            </li>
                            {index < breadcrumbItems.length - 1 && (
                                <li className="text-gray-400 dark:text-gray-600">›</li>
                            )}
                        </React.Fragment>
                    ))}
                    {subTitle && (
                        <>
                            <li className="text-gray-400 dark:text-gray-600">›</li>
                            <li className="text-emerald-600 dark:text-emerald-400 font-medium" aria-current="page">
                                {subTitle}
                            </li>
                        </>
                    )}
                </ol>
            </nav>
        </div>
    );
}