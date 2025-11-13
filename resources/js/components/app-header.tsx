import { Breadcrumbs } from '@/components/breadcrumbs';
import { Icon } from '@/components/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { AlignVerticalJustifyStartIcon, BookOpen, Folder, LayoutGrid, Menu, Search, ChevronDown, Info, FileText, Newspaper, HelpCircle, MapPin, Phone } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import logoPurple from '../../../public/assets/images/logo_purple.png';
import LanguageSwitch from '@/components/language-switch';
import TransText from "@components/TransText";
import { useEffect, useState } from 'react';
import { NavigationMenuContent, NavigationMenuTrigger, NavigationMenuLink } from '@/components/ui/navigation-menu';

const mainNavItems: NavItem[] = [
    {
        title: <TransText ar="الرئيسية" fr="Accueil" en="Home" />,
        href: "/",
        icon: null,
    },
    {
        title: <TransText ar="من نحن" fr="À propos" en="About" />,
        href: '/a-propos',
        icon: null,
        children: [
            { title: <TransText ar="التاريخ" fr="Histoire" en="History" />, href: '/a-propos/histoire' },
            { title: <TransText ar="المهمة والقيم" fr="Mission et valeurs" en="Mission and values" />, href: '/a-propos/mission-et-valeurs' },
            { title: <TransText ar="الفريق" fr="Équipe" en="Team" />, href: '/a-propos/equipe' },
            { title: <TransText ar="النظام الأساسي" fr="Statuts" en="Statutes" />, href: '/a-propos/statuts' },
        ],
    },
    {
        title: <TransText ar="برامجنا" fr="Programmes" en="Programmes" />,
        href: '/programmes',
        icon: null,
    },
    {
        title: <TransText ar="الأخبار" fr="Actualités" en="News" />,
        href: '/actualites',
        icon: null,
    },
    {
        title: <TransText ar="المنشورات والموارد" fr="Publications & Ressources" en="Resources" />,
        href: '/publications',
        icon: null,
    },
    {
        title: <TransText ar="المساعدة القانونية" fr="Aide juridique" en="Legal aid" />,
        href: '/aide',
        icon: null,
        children: [
            { title: <TransText ar="نموذج" fr="Formulaire" en="Form" />, href: '/aide/formulaire' },
            { title: <TransText ar="القاعدة الوثائقية" fr="Base documentaire" en="Documentary base" />, href: '/aide/base-juridique' },
            { title: <TransText ar="الخريطة" fr="Carte" en="Map" />, href: '/partenaires/carte' },
        ],
    },
    {
        title: <TransText ar="اتصل بنا" fr="Contact" en="Contact" />,
        href: '/contact',
        icon: null,
    },
];



const activeItemStyles = 'text-white';

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
    const page = usePage<SharedData>();
    const readLang = () => {
        if (typeof window === 'undefined') return 'fr';
        const saved = window.localStorage.getItem('lang');
        return saved === 'ar' ? 'ar' : 'fr';
    };
    const [isArabic, setIsArabic] = useState(readLang() === 'ar');
    useEffect(() => {
        const onChange = () => setIsArabic(readLang() === 'ar');
        window.addEventListener('language:change', onChange);
        window.addEventListener('storage', onChange);
        return () => {
            window.removeEventListener('language:change', onChange);
            window.removeEventListener('storage', onChange);
        };
    }, []);
    return (
        <>
            <div className="bg-alpha text-[var(--color-light)] dark:bg-beta dark:text-white">
                <div className={`mx-auto flex h-16 items-center px-4 md:max-w-7xl`}>
                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="mr-2 h-[34px] w-[34px] text-[var(--color-light)]">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex h-full w-64 flex-col items-stretch justify-between bg-[var(--color-alpha)] text-[var(--color-light)] dark:bg-[var(--color-alpha)] dark:text-white">
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                <SheetHeader className="flex justify-start text-left">
                                    <img src={logoPurple} alt="ISRAR" className="h-6 w-auto" />
                                </SheetHeader>
                                <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                                    <div className="flex h-full flex-col justify-between text-sm">
                                        <div className="flex flex-col space-y-4">
                                            {mainNavItems.map((item, idx) => (
                                                <div key={idx}>
                                                    {item.children && item.children.length > 0 ? (
                                                        <div className="space-y-2">
                                                            <Link href={item.href} className="flex items-center space-x-2 font-medium hover:text-[var(--color-beta)]">
                                                                {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                                                                <span>{item.title}</span>
                                                            </Link>
                                                            <div className="ml-6 flex flex-col space-y-2">
                                                                {item.children.map((child, childIdx) => (
                                                                    <Link key={childIdx} href={child.href} className="text-sm opacity-80 hover:text-[var(--color-beta)] hover:opacity-100">
                                                                        {child.title}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <Link href={item.href} className="flex items-center space-x-2 font-medium hover:text-[var(--color-beta)]">
                                                            {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                                                            <span>{item.title}</span>
                                                        </Link>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <Button
                                            asChild
                                            className="bg-[var(--color-beta)] text-white hover:bg-[var(--color-beta)]/90 w-full"
                                        >
                                            <Link href="/aide/formulaire">
                                                <TransText ar="أحتاج إلى المساعدة" fr="Je cherche de l'aide" en="I need help" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <Link href="/" prefetch className="flex items-center space-x-2">
                        <AppLogo />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="ml-6 hidden h-full items-center space-x-6 lg:flex" >
                        <NavigationMenu className="flex h-full items-stretch" dir={isArabic ? 'rtl' : 'ltr'}>
                            <NavigationMenuList className="flex h-full items-stretch space-x-2">
                                {mainNavItems.map((item, index) => (
                                    <NavigationMenuItem key={index} className="relative flex h-full items-center">
                                        {item.children && item.children.length > 0 ? (
                                            <>
                                                <NavigationMenuTrigger className={cn(
                                                    'h-9 cursor-pointer px-3 hover:text-[var(--color-beta)] bg-transparent hover:bg-transparent focus:bg-transparent focus-visible:ring-0 focus-visible:outline-none text-[var(--color-light)]',
                                                    page.url === (typeof item.href === 'string' ? item.href : item.href.url) && activeItemStyles,
                                                )}>
                                                    {item.icon && <Icon iconNode={item.icon} className="mr-2 h-4 w-4" />}
                                                    <span>{item.title}</span>
                                                </NavigationMenuTrigger>
                                                <NavigationMenuContent className="bg-[var(--color-alpha)] text-[var(--color-light)] border-white/10">
                                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                                        {item.children.map((child, childIndex) => (
                                                            <li key={childIndex}>
                                                                <NavigationMenuLink asChild>
                                                                    <Link
                                                                        href={child.href}
                                                                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-[var(--color-beta)] focus:bg-white/10 focus:text-[var(--color-beta)]"
                                                                    >
                                                                        <div className="text-sm font-medium leading-none">{child.title}</div>
                                                                    </Link>
                                                                </NavigationMenuLink>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </NavigationMenuContent>
                                            </>
                                        ) : (
                                            <>
                                                <Link
                                                    href={item.href}
                                                    className={cn(
                                                        navigationMenuTriggerStyle(),
                                                        page.url === (typeof item.href === 'string' ? item.href : item.href.url) && activeItemStyles,
                                                        'h-9 cursor-pointer px-3 hover:text-[var(--color-beta)] bg-transparent hover:bg-transparent focus:bg-transparent focus-visible:ring-0 focus-visible:outline-none text-[var(--color-light)]',
                                                    )}
                                                >
                                                    {item.icon && <Icon iconNode={item.icon} className="mr-2 h-4 w-4" />}
                                                    <span>{item.title}</span>
                                                </Link>
                                                {page.url === item.href && (
                                                    <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-[var(--color-beta)]"></div>
                                                )}
                                            </>
                                        )}
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/* Help Button */}
                    <div className={`${isArabic ? 'mr-2' : 'ml-2'} hidden lg:block`}>
                        <Button
                            asChild
                            className="bg-[var(--color-beta)] text-white hover:bg-[var(--color-beta)]/90"
                        >
                            <Link href="/aide/formulaire">
                                <TransText ar="أحتاج إلى المساعدة" fr="Je cherche de l'aide" en="I need help" />
                            </Link>
                        </Button>
                    </div>

                    <div className={`${isArabic ? 'mr-auto' : 'ml-auto'} flex items-center gap-3`}>
                        <LanguageSwitch />
                    </div>
                </div>
            </div>
            {breadcrumbs.length > 1 && (
                <div className="flex w-full bg-[var(--color-alpha)] text-[var(--color-light)] dark:bg-[var(--color-alpha)] dark:text-white" dir={isArabic ? 'rtl' : 'ltr'}>
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
