import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import TransText from '@components/TransText';
import { type PropsWithChildren, type ReactNode } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: ReactNode;
    description?: ReactNode;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="min-h-svh bg-[var(--color-light_gray)]">
            <div className="mx-auto flex min-h-svh max-w-6xl items-center justify-center px-6 py-12">
                <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-neutral-200 md:grid-cols-2">
                    <div className="hidden flex-col justify-between bg-[var(--color-alpha)] p-8 text-white md:flex">
                        <div>
                            <Link href={home()} className="inline-flex items-center gap-2">
                                <AppLogoIcon className="size-8 fill-current text-white" />
                                <span className="text-sm font-semibold tracking-wide">ISRAR</span>
                            </Link>
                            <h2 className="mt-6 text-2xl font-bold leading-tight">
                                <TransText
                                    fr="Plateforme nationale de soutien, ressources et plaidoyer"
                                    ar="منصة وطنية للدعم والموارد والمرافعة"
                                    en="National platform for support, resources, and advocacy"
                                />
                            </h2>
                        </div>
                        <p className="text-sm text-white/80">
                            <TransText
                                fr="Accédez à votre espace sécurisé pour gérer vos actions et votre profil."
                                ar="ولوج آمن إلى فضائكم لتدبير أنشطتكم وملفكم الشخصي."
                                en="Access your secure space to manage your actions and profile."
                            />
                        </p>
                    </div>

                    <div className="p-6 sm:p-8 md:p-10">
                        <div className="mx-auto w-full max-w-sm">
                            <div className="mb-8 flex flex-col items-center gap-4 text-center md:items-start md:text-left">
                                <Link href={home()} className="flex items-center gap-2 font-medium md:hidden">
                                    <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md bg-[var(--color-alpha)]/10">
                                        <AppLogoIcon className="size-8 fill-current text-[var(--color-alpha)]" />
                                    </div>
                                </Link>
                                <div className="space-y-2">
                                    <h1 className="text-2xl font-semibold text-[var(--color-alpha)]">{title}</h1>
                                    <p className="text-sm text-neutral-600">{description}</p>
                                </div>
                            </div>

                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
