import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, FileText, Handshake, Inbox, LayoutGrid } from 'lucide-react';
import AppLogo from '../../../public/assets/images/logo_purple.png';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: "Reponses d'aide",
        href: '/admin/aide-requests',
        icon: FileText,
    },
    {
        title: 'Partenaires',
        href: '/admin/partners',
        icon: Handshake,
    },
    {
        title: 'Publications',
        href: '/admin/publications',
        icon: BookOpen,
    },
    {
        title: 'Messages',
        href: '/admin/messages',
        icon: Inbox,
    },
];



export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                 <img src={AppLogo} alt="ISRAR" className="h-28 w-auto" />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
