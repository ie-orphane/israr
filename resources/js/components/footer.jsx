import logo from '../../../public/assets/images/logo_white.png';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import TransText from "@components/TransText";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

function XIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M18.244 2H21.5l-7.114 8.13L22.75 22h-6.547l-5.131-6.708L5.2 22H1.94l7.607-8.695L1.5 2h6.713l4.638 6.13L18.244 2Zm-1.144 18h1.802L7.228 3.894H5.3L17.1 20Z" />
        </svg>
    );
}

export default function Footer() {
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
        <footer className="border-t border-white/10 bg-alpha text-[var(--color-light)] dark:bg-beta dark:text-white" dir={isArabic ? 'rtl' : 'ltr'}>
            <div className="mx-auto max-w-7xl px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* ISRAR Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <img src={logo} alt="ISRAR" className="h-20 w-auto" />
                        </div>
                        <h3 className="font-semibold">
                            <TransText ar="ISRAR" fr="ISRAR" en="ISRAR" />
                        </h3>
                        <nav className="flex flex-col space-y-2 text-sm">
                            <Link href="/a-propos" className="opacity-80 transition-colors hover:text-[var(--color-beta)] hover:opacity-100">
                                <TransText ar="من نحن" fr="À propos" en="About" />
                            </Link>
                            <Link href="/programmes" className="opacity-80 transition-colors hover:text-[var(--color-beta)] hover:opacity-100">
                                <TransText ar="برامجنا" fr="Programmes" en="Programmes" />
                            </Link>
                            <Link href="/partenaires" className="opacity-80 transition-colors hover:text-[var(--color-beta)] hover:opacity-100">
                                <TransText ar="الشركاء" fr="Partenaires" en="Partners" />
                            </Link>
                        </nav>
                    </div>

                    {/* Ressources Section */}
                    <div className="space-y-4">
                        <h3 className="font-semibold">
                            <TransText ar="الموارد" fr="Ressources" en="Resources" />
                        </h3>
                        <nav className="flex flex-col space-y-2 text-sm">
                            <Link href="/publications" className="opacity-80 transition-colors hover:text-[var(--color-beta)] hover:opacity-100">
                                <TransText ar="المنشورات" fr="Publications" en="Publications" />
                            </Link>
                            <Link href="/aide/base-juridique" className="opacity-80 transition-colors hover:text-[var(--color-beta)] hover:opacity-100">
                                <TransText ar="القاعدة الوثائقية" fr="Base documentaire" en="Documentary base" />
                            </Link>
                            <Link href="/aide/base-juridique?type=guides" className="opacity-80 transition-colors hover:text-[var(--color-beta)] hover:opacity-100">
                                <TransText ar="الدلائل" fr="Guides" en="Guides" />
                            </Link>
                        </nav>
                    </div>

                    {/* Campagnes Section */}
                    <div className="space-y-4">
                        <h3 className="font-semibold">
                            <TransText ar="الحملات" fr="Campagnes" en="Campaigns" />
                        </h3>
                        <nav className="flex flex-col space-y-2 text-sm">
                            <Link href="/campagnes/houqouq-wa-mousawat" className="opacity-80 transition-colors hover:text-[var(--color-beta)] hover:opacity-100">
                                <TransText ar="حقوق ومساواة" fr="Houqouq wa Mousawat" en="Houqouq wa Mousawat" />
                            </Link>
                            <Link href="/campagnes/violences-numeriques" className="opacity-80 transition-colors hover:text-[var(--color-beta)] hover:opacity-100">
                                <TransText ar="العنف الرقمي" fr="Violences numériques" en="Digital violence" />
                            </Link>
                        </nav>
                    </div>

                    {/* Contact Section */}
                    <div className="space-y-4">
                        <h3 className="font-semibold">
                            <TransText ar="اتصل بنا" fr="Contact" en="Contact" />
                        </h3>
                        <div className="flex flex-col space-y-3 text-sm">
                            <div className="flex items-start gap-2 opacity-80">
                                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <div>
                                    <div>coalitionisrar@gmail.com</div>
                                    <div>projets.coalition.israr@gmail.com</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2 opacity-80">
                                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <span>
                                    <TransText ar="المغرب" fr="Maroc" en="Morocco" />
                                </span>
                            </div>
                            <div className="flex items-center gap-4 pt-2">
                                <a href="#" className="opacity-80 transition-colors hover:text-[var(--color-beta)] hover:opacity-100" aria-label="Facebook">
                                    <Facebook className="h-5 w-5" />
                                </a>
                                <a href="https://x.com/coalitionisrar" target="_blank" rel="noreferrer" className="opacity-80 transition-colors hover:text-[var(--color-beta)] hover:opacity-100" aria-label="X">
                                    <XIcon className="h-5 w-5" />
                                </a>
                                <a href="#" className="opacity-80 transition-colors hover:text-[var(--color-beta)] hover:opacity-100" aria-label="Instagram">
                                    <Instagram className="h-5 w-5" />
                                </a>
                                <a href="#" className="opacity-80 transition-colors hover:text-[var(--color-beta)] hover:opacity-100" aria-label="LinkedIn">
                                    <Linkedin className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-8">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <span className="text-sm opacity-80">
                            © {new Date().getFullYear()} <TransText ar="تحالف إصرار للتمكين والمساواة" fr="Coalition ISRAR pour l'Égalité et l'Empowerment" en="ISRAR Coalition for Equality and Empowerment" />. <TransText ar="جميع الحقوق محفوظة" fr="Tous droits réservés" en="All rights reserved" />.
                        </span>
                        <nav className="flex items-center gap-4 text-sm">
                            <Link href="/mentions-legales" className="opacity-80 transition-colors hover:text-[var(--color-beta)] hover:opacity-100">
                                <TransText ar="البيانات القانونية" fr="Mentions légales" en="Legal notice" />
                            </Link>
                            <Link href="/confidentialite" className="opacity-80 transition-colors hover:text-[var(--color-beta)] hover:opacity-100">
                                <TransText ar="الخصوصية" fr="Confidentialité" en="Privacy" />
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
}


