import AppHeaderLayout from '@/layouts/app/app-header-layout';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const isAuthenticated = Boolean(auth && auth.user);
    const usesSidebarLayout = ['/dashboard', '/settings'].some((prefix) => page.url.startsWith(prefix));

    const LayoutComponent = isAuthenticated && usesSidebarLayout ? AppSidebarLayout : AppHeaderLayout;

    return (
        <LayoutComponent breadcrumbs={breadcrumbs} {...props}>
            {children}
        </LayoutComponent>
    );
}
