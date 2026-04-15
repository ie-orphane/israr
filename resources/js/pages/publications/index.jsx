import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import TransText from '@components/TransText';
import { FileText, Download, Filter } from 'lucide-react';
import { useEffect, useState } from 'react';

const categories = [
    { key: 'all', label: { fr: 'Toutes', ar: 'الكل', en: 'All' } },
    { key: 'rapport', label: { fr: 'Rapports', ar: 'التقارير', en: 'Reports' } },
    { key: 'plaidoyer', label: { fr: 'Notes de plaidoyer', ar: 'مذكرات المرافعة', en: 'Advocacy briefs' } },
    { key: 'communique', label: { fr: 'Communiqués de presse', ar: 'بيانات صحفية', en: 'Press releases' } },
    { key: 'guide', label: { fr: 'Guides pratiques', ar: 'دلائل عملية', en: 'Practical guides' } },
];

const categoryColors = {
    rapport: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    plaidoyer: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    communique: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    guide: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
};

const categoryLabels = {
    rapport: { fr: 'Rapport', ar: 'تقرير', en: 'Report' },
    plaidoyer: { fr: 'Plaidoyer', ar: 'مرافعة', en: 'Advocacy' },
    communique: { fr: 'Communiqué', ar: 'بيان صحفي', en: 'Press release' },
    guide: { fr: 'Guide', ar: 'دليل', en: 'Guide' },
};

export default function Publications({ publications = [] }) {
    const [activeCategory, setActiveCategory] = useState('all');
    const [lang, setLang] = useState('fr');

    useEffect(() => {
        const readLang = () => {
            if (typeof window === 'undefined') return 'fr';
            const saved = window.localStorage.getItem('lang');
            return saved === 'ar' || saved === 'en' ? saved : 'fr';
        };

        const onLangChange = () => setLang(readLang());

        setLang(readLang());
        window.addEventListener('language:change', onLangChange);
        window.addEventListener('storage', onLangChange);

        return () => {
            window.removeEventListener('language:change', onLangChange);
            window.removeEventListener('storage', onLangChange);
        };
    }, []);

    const localeByLang = {
        fr: 'fr-FR',
        ar: 'ar-MA',
        en: 'en-US',
    };

    const filtered = activeCategory === 'all'
        ? publications
        : publications.filter(p => p.category === activeCategory);

    return (
        <AppLayout>
            <Head title="Publications & Ressources" />
            <div className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f7f4fb_45%,#ffffff_100%)]">
                <section className="mx-auto max-w-6xl px-4 pb-4 pt-8 sm:px-6 lg:px-8 lg:pt-12">
                    <div className="overflow-hidden rounded-3xl border border-[var(--color-alpha)]/15 bg-white shadow-sm">
                        <div className="relative p-7 sm:p-10">
                            <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[var(--color-beta)]/15 blur-2xl" />
                            <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-[var(--color-alpha)]/15 blur-2xl" />
                            <div className="relative">
                                <span className="inline-flex items-center rounded-full border border-[var(--color-alpha)]/20 bg-[var(--color-alpha)]/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-alpha)]">
                                    <TransText fr="Bibliothèque ISRAR" ar="مكتبة إصرار" en="ISRAR Library" />
                                </span>
                                <h1 className="mt-4 text-3xl font-bold tracking-tight text-[var(--color-alpha)] md:text-4xl">
                                    <TransText fr="Publications & Ressources" ar="المنشورات والموارد" en="Publications & Resources" />
                                </h1>
                                <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-600 md:text-base">
                                    <TransText
                                        fr="Consultez et téléchargez nos rapports, notes de plaidoyer, communiqués et guides pratiques."
                                        ar="اطلعوا على تقاريرنا ومذكرات المرافعة والبيانات الصحفية والدلائل العملية وحمّلوها."
                                        en="Browse and download our reports, advocacy briefs, press releases, and practical guides."
                                    />
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Filters */}
                <section className="sticky top-0 z-20 border-b border-neutral-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                    <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2 px-4 py-4 sm:px-6 lg:px-8">
                        <Filter className="mr-2 hidden h-4 w-4 text-neutral-500 sm:block" />
                        {categories.map(({ key, label }) => (
                            <button
                                key={key}
                                onClick={() => setActiveCategory(key)}
                                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                                    activeCategory === key
                                        ? 'bg-[var(--color-alpha)] text-white shadow-md'
                                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                                }`}
                            >
                                <TransText fr={label.fr} ar={label.ar} en={label.en} />
                            </button>
                        ))}
                    </div>
                </section>

                {/* Publications Grid */}
                <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                    <p className="mb-6 text-center text-sm text-neutral-500">
                        <TransText
                            fr={`${filtered.length} publication${filtered.length > 1 ? 's' : ''}`}
                            ar={`${filtered.length} ${filtered.length > 1 ? 'منشورات' : 'منشور'}`}
                            en={`${filtered.length} publication${filtered.length > 1 ? 's' : ''}`}
                        />
                    </p>
                    {filtered.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {filtered.map((pub) => (
                                <div
                                    key={pub.id}
                                    className="flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200 transition hover:-translate-y-0.5 hover:shadow-md dark:bg-neutral-900 dark:ring-neutral-700"
                                >
                                    <div className="mb-3 flex items-center justify-between">
                                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${categoryColors[pub.category] ?? 'bg-neutral-100 text-neutral-700'}`}>
                                            <TransText
                                                fr={categoryLabels[pub.category]?.fr ?? pub.category}
                                                ar={categoryLabels[pub.category]?.ar ?? pub.category}
                                                en={categoryLabels[pub.category]?.en ?? pub.category}
                                            />
                                        </span>
                                        <time className="text-xs text-neutral-500">
                                            {pub.date ? new Date(pub.date).toLocaleDateString(localeByLang[lang], {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            }) : '-'}
                                        </time>
                                    </div>
                                    <h3 className="mb-2 text-base font-semibold text-[var(--color-alpha)] line-clamp-2">
                                        <TransText fr={pub.title_fr} ar={pub.title_ar} en={pub.title_en} />
                                    </h3>
                                    <p className="mb-4 flex-1 text-sm text-neutral-600 line-clamp-3 dark:text-neutral-300">
                                        <TransText fr={pub.description_fr} ar={pub.description_ar} en={pub.description_en} />
                                    </p>
                                    {pub.file_url ? (
                                        <a
                                            href={pub.file_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="mt-auto flex items-center justify-center gap-2 rounded-lg border border-[var(--color-alpha)]/20 px-4 py-2.5 text-sm font-medium text-[var(--color-alpha)] transition hover:bg-[var(--color-alpha)] hover:text-white"
                                        >
                                            <Download className="h-4 w-4" />
                                            <TransText fr="Télécharger" ar="تحميل" en="Download" />
                                        </a>
                                    ) : (
                                        <button
                                            type="button"
                                            disabled
                                            className="mt-auto flex items-center justify-center gap-2 rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-400"
                                        >
                                            <Download className="h-4 w-4" />
                                            <TransText fr="Indisponible" ar="غير متاح" en="Unavailable" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-16 text-center">
                            <FileText className="mx-auto mb-4 h-12 w-12 text-neutral-300" />
                            <p className="text-neutral-500">
                                <TransText
                                    fr="Aucune publication trouvée pour cette catégorie."
                                    ar="لا توجد منشورات لهذا التصنيف."
                                    en="No publications found for this category."
                                />
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </AppLayout>
    );
}
