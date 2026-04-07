import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import TransText from '@components/TransText';
import { FileText, Download, Filter } from 'lucide-react';
import { useState } from 'react';

const categories = [
    { key: 'all', label: { fr: 'Toutes', ar: 'الكل', en: 'All' } },
    { key: 'rapport', label: { fr: 'Rapports', ar: 'التقارير', en: 'Reports' } },
    { key: 'plaidoyer', label: { fr: 'Notes de plaidoyer', ar: 'مذكرات المرافعة', en: 'Advocacy briefs' } },
    { key: 'communique', label: { fr: 'Communiqués de presse', ar: 'بيانات صحفية', en: 'Press releases' } },
    { key: 'guide', label: { fr: 'Guides pratiques', ar: 'دلائل عملية', en: 'Practical guides' } },
];

const publications = [
    {
        id: 1,
        title: { fr: 'Rapport annuel 2024 de la Coalition ISRAR', ar: 'التقرير السنوي 2024 لتحالف إصرار', en: 'ISRAR Coalition Annual Report 2024' },
        category: 'rapport',
        date: '2025-03-15',
        description: {
            fr: "Bilan complet des activités, réalisations et perspectives de la coalition pour l'année 2024.",
            ar: 'حصيلة شاملة لأنشطة وإنجازات وآفاق التحالف لسنة 2024.',
            en: "Complete review of the coalition's activities, achievements, and outlook for 2024.",
        },
    },
    {
        id: 2,
        title: { fr: 'Note de plaidoyer : Réforme du Code de la famille', ar: 'مذكرة مرافعة: إصلاح مدونة الأسرة', en: 'Advocacy Brief: Family Code Reform' },
        category: 'plaidoyer',
        date: '2024-11-20',
        description: {
            fr: "Analyse des incohérences du Code de la famille et recommandations pour une réforme égalitaire.",
            ar: 'تحليل اختلالات مدونة الأسرة وتوصيات لإصلاح مبني على المساواة.',
            en: "Analysis of family code inconsistencies and recommendations for egalitarian reform.",
        },
    },
    {
        id: 3,
        title: { fr: "Communiqué : Journée internationale pour l'élimination de la violence", ar: 'بيان: اليوم الدولي للقضاء على العنف', en: 'Press Release: International Day for the Elimination of Violence' },
        category: 'communique',
        date: '2024-11-25',
        description: {
            fr: "Déclaration officielle de la Coalition ISRAR à l'occasion du 25 novembre.",
            ar: 'بيان رسمي لتحالف إصرار بمناسبة 25 نونبر.',
            en: "Official statement from the ISRAR Coalition on the occasion of November 25th.",
        },
    },
    {
        id: 4,
        title: { fr: "Guide pratique : Accompagnement des femmes victimes de violence", ar: 'دليل عملي: مواكبة النساء ضحايا العنف', en: 'Practical Guide: Supporting Women Victims of Violence' },
        category: 'guide',
        date: '2024-06-10',
        description: {
            fr: "Guide destiné aux écoutantes et conseillères pour l'accompagnement juridique et psychosocial.",
            ar: 'دليل موجه للمستمعات والمستشارات للمواكبة القانونية والنفسية الاجتماعية.',
            en: "Guide for listeners and counsellors for legal and psychosocial support.",
        },
    },
    {
        id: 5,
        title: { fr: 'Rapport annuel 2023 de la Coalition ISRAR', ar: 'التقرير السنوي 2023 لتحالف إصرار', en: 'ISRAR Coalition Annual Report 2023' },
        category: 'rapport',
        date: '2024-03-20',
        description: {
            fr: "Synthèse des actions menées et des résultats obtenus au cours de l'année 2023.",
            ar: 'ملخص الإجراءات المنجزة والنتائج المحققة خلال سنة 2023.',
            en: "Summary of actions taken and results achieved during 2023.",
        },
    },
    {
        id: 6,
        title: { fr: 'Note de plaidoyer : Examen Périodique Universel', ar: 'مذكرة مرافعة: الاستعراض الدوري الشامل', en: 'Advocacy Brief: Universal Periodic Review' },
        category: 'plaidoyer',
        date: '2023-09-15',
        description: {
            fr: "Recommandations de la coalition pour le 4ème cycle de l'EPU du Maroc.",
            ar: 'توصيات التحالف للدورة الرابعة من الاستعراض الدوري الشامل للمغرب.',
            en: "Coalition recommendations for Morocco's 4th UPR cycle.",
        },
    },
    {
        id: 7,
        title: { fr: "Guide : Violences numériques contre les femmes", ar: 'دليل: العنف الرقمي ضد النساء', en: 'Guide: Digital Violence Against Women' },
        category: 'guide',
        date: '2023-06-01',
        description: {
            fr: "Outils et ressources pour identifier, documenter et agir contre les violences numériques.",
            ar: 'أدوات وموارد لتحديد وتوثيق ومكافحة العنف الرقمي.',
            en: "Tools and resources to identify, document, and act against digital violence.",
        },
    },
    {
        id: 8,
        title: { fr: "Communiqué : Lancement du projet SaMMa", ar: 'بيان: إطلاق مشروع سمى', en: 'Press Release: Launch of the SaMMa Project' },
        category: 'communique',
        date: '2023-03-10',
        description: {
            fr: "Annonce du lancement du projet régional SaMMa cofinancé par l'AFD.",
            ar: 'إعلان إطلاق مشروع سمى الجهوي بتمويل مشترك مع الوكالة الفرنسية للتنمية.',
            en: "Announcement of the launch of the SaMMa regional project co-funded by AFD.",
        },
    },
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

export default function Publications() {
    const [activeCategory, setActiveCategory] = useState('all');

    const filtered = activeCategory === 'all'
        ? publications
        : publications.filter(p => p.category === activeCategory);

    return (
        <AppLayout>
            <Head title="Publications & Ressources" />
            <div className="bg-white/85 backdrop-blur-sm dark:bg-neutral-950/80">
                {/* Hero */}
                <section className="bg-[var(--color-alpha)] py-16 text-white md:py-24">
                    <div className="mx-auto max-w-6xl px-6 text-center">
                        <h1 className="text-3xl font-bold md:text-5xl">
                            <TransText fr="Publications & Ressources" ar="المنشورات والموارد" en="Publications & Resources" />
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
                            <TransText
                                fr="Consultez et téléchargez nos rapports, notes de plaidoyer, communiqués et guides pratiques."
                                ar="اطلعوا على تقاريرنا ومذكرات المرافعة والبيانات الصحفية والدلائل العملية وحمّلوها."
                                en="Browse and download our reports, advocacy briefs, press releases, and practical guides."
                            />
                        </p>
                    </div>
                </section>

                {/* Filters */}
                <section className="sticky top-0 z-20 border-b border-neutral-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                    <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2 px-6 py-4">
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
                <section className="mx-auto max-w-6xl px-6 py-12">
                    <p className="mb-6 text-center text-sm text-neutral-500">
                        {filtered.length} publication{filtered.length > 1 ? 's' : ''}
                    </p>
                    {filtered.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {filtered.map((pub) => (
                                <div
                                    key={pub.id}
                                    className="flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200 transition hover:-translate-y-0.5 hover:shadow-md dark:bg-neutral-900 dark:ring-neutral-700"
                                >
                                    <div className="mb-3 flex items-center justify-between">
                                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${categoryColors[pub.category]}`}>
                                            <TransText
                                                fr={categoryLabels[pub.category].fr}
                                                ar={categoryLabels[pub.category].ar}
                                                en={categoryLabels[pub.category].en}
                                            />
                                        </span>
                                        <time className="text-xs text-neutral-500">{new Date(pub.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' })}</time>
                                    </div>
                                    <h3 className="mb-2 text-base font-semibold text-[var(--color-alpha)] line-clamp-2">
                                        <TransText fr={pub.title.fr} ar={pub.title.ar} en={pub.title.en} />
                                    </h3>
                                    <p className="mb-4 flex-1 text-sm text-neutral-600 line-clamp-3 dark:text-neutral-300">
                                        <TransText fr={pub.description.fr} ar={pub.description.ar} en={pub.description.en} />
                                    </p>
                                    <button className="mt-auto flex items-center justify-center gap-2 rounded-lg border border-[var(--color-alpha)]/20 px-4 py-2.5 text-sm font-medium text-[var(--color-alpha)] transition hover:bg-[var(--color-alpha)] hover:text-white">
                                        <Download className="h-4 w-4" />
                                        <TransText fr="Télécharger" ar="تحميل" en="Download" />
                                    </button>
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
