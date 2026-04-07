import AppLogo from '@/components/app-logo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Icon } from '@/components/icon';
import LanguageSwitch from '@/components/language-switch';
import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types';
import TransText from '@components/TransText';
import { Link, usePage } from '@inertiajs/react';
import { FileText, HelpCircle, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import logoPurple from '../../../public/assets/images/logo_purple.png';

const mainNavItems: NavItem[] = [
    {
        title: <TransText ar="الرئيسية" fr="Accueil" en="Home" />,
        href: '/',
        icon: null,
    },
    {
        title: <TransText ar="من نحن" fr="À propos" en="About" />,
        href: '/a-propos',
        icon: null,
    },
    {
        title: <TransText ar="برامجنا" fr="Programmes" en="Programmes" />,
        href: '/programmes',
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

    const getAideChildMeta = (href: string) => {
        if (href.includes('/aide/formulaire')) {
            return {
                icon: HelpCircle,
                description: {
                    fr: "Demande d'accompagnement confidentielle",
                    ar: 'طلب مواكبة بسرية تامة',
                    en: 'Confidential support request',
                },
            };
        }

        return {
            icon: FileText,
            description: {
                fr: 'Recherche de lois, jurisprudences et guides',
                ar: 'البحث في القوانين والاجتهادات والدلائل',
                en: 'Search laws, case law, and guides',
            },
        };
    };

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
                <div className={`mx-auto flex items-center px-4 md:max-w-7xl`}>
                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="mr-2 h-[34px] w-[34px] text-[var(--color-light)]">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="flex h-full w-64 flex-col items-stretch justify-between bg-[var(--color-alpha)] text-[var(--color-light)] dark:bg-[var(--color-alpha)] dark:text-white"
                            >
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
                                                            <Link
                                                                href={item.href}
                                                                className="flex items-center space-x-2 font-medium hover:text-[var(--color-beta)]"
                                                            >
                                                                {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                                                                <span>{item.title}</span>
                                                            </Link>
                                                            <div className="ml-6 flex flex-col space-y-1 rounded-lg border border-white/15 bg-white/5 p-2">
                                                                {item.children.map((child, childIdx) => (
                                                                    <Link
                                                                        key={childIdx}
                                                                        href={child.href}
                                                                        className="rounded-md px-3 py-2 text-sm font-medium text-white/90 transition"
                                                                    >
                                                                        {child.title}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <Link
                                                            href={item.href}
                                                            className="flex items-center space-x-2 font-medium hover:text-[var(--color-beta)]"
                                                        >
                                                            {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                                                            <span>{item.title}</span>
                                                        </Link>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <Button asChild className="w-full bg-[var(--color-beta)] text-white hover:bg-[var(--color-beta)]/90">
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
                    <div className="ml-6 hidden h-full items-center space-x-6 lg:flex">
                        <NavigationMenu viewport={false} className="flex h-full items-stretch" dir={isArabic ? 'rtl' : 'ltr'}>
                            <NavigationMenuList className="flex h-full items-stretch space-x-2">
                                {mainNavItems.map((item, index) => (
                                    <NavigationMenuItem key={index} className="relative flex h-full items-center">
                                        {item.children && item.children.length > 0 ? (
                                            <>
                                                <NavigationMenuTrigger
                                                    className={cn(
                                                        'h-9 cursor-pointer bg-transparent! px-3 text-[var(--color-light)] hover:bg-transparent hover:text-[var(--color-beta)] focus:bg-transparent focus:text-current focus-visible:ring-0 focus-visible:outline-none',
                                                        page.url === (typeof item.href === 'string' ? item.href : item.href.url) && activeItemStyles,
                                                    )}
                                                >
                                                    {item.icon && <Icon iconNode={item.icon} className="mr-2 h-4 w-4" />}
                                                    <span>{item.title}</span>
                                                </NavigationMenuTrigger>
                                                <NavigationMenuContent className="z-50 border border-neutral-200 bg-white text-neutral-900 shadow-lg group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:bottom-auto group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:mb-0">
                                                    <ul className="w-[320px] space-y-1 p-2">
                                                        {item.children.map((child, childIndex) => (
                                                            <li key={childIndex}>
                                                                <NavigationMenuLink asChild>
                                                                    <Link
                                                                        href={child.href}
                                                                        className="group flex flex-row items-start gap-3 rounded-lg px-3 py-2.5 text-neutral-900 transition-colors hover:bg-neutral-100 hover:text-[var(--color-alpha)]"
                                                                    >
                                                                        {(() => {
                                                                            const ChildIcon = getAideChildMeta(
                                                                                typeof child.href === 'string' ? child.href : '',
                                                                            ).icon;
                                                                            return (
                                                                                <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 text-neutral-700 transition group-hover:border-[var(--color-beta)]/40 group-hover:text-[var(--color-alpha)]">
                                                                                    <ChildIcon className="h-4 w-4" />
                                                                                </span>
                                                                            );
                                                                        })()}
                                                                        <span className="min-w-0">
                                                                            <span className="block text-sm font-semibold text-neutral-900">
                                                                                {child.title}
                                                                            </span>
                                                                            <span className="mt-0.5 block text-xs text-neutral-500">
                                                                                <TransText
                                                                                    fr={
                                                                                        getAideChildMeta(
                                                                                            typeof child.href === 'string' ? child.href : '',
                                                                                        ).description.fr
                                                                                    }
                                                                                    ar={
                                                                                        getAideChildMeta(
                                                                                            typeof child.href === 'string' ? child.href : '',
                                                                                        ).description.ar
                                                                                    }
                                                                                    en={
                                                                                        getAideChildMeta(
                                                                                            typeof child.href === 'string' ? child.href : '',
                                                                                        ).description.en
                                                                                    }
                                                                                />
                                                                            </span>
                                                                        </span>
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
                                                        'h-9 cursor-pointer bg-transparent px-3 text-[var(--color-light)] hover:bg-transparent hover:text-[var(--color-beta)] focus:bg-transparent focus:text-current focus-visible:ring-0 focus-visible:outline-none',
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
                        <Button asChild className="bg-[var(--color-beta)] text-white hover:bg-[var(--color-beta)]/90">
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
                <div
                    className="flex w-full bg-[var(--color-alpha)] text-[var(--color-light)] dark:bg-[var(--color-alpha)] dark:text-white"
                    dir={isArabic ? 'rtl' : 'ltr'}
                >
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
