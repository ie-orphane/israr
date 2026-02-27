import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import TransText from '@components/TransText';
import { FileText, Download, Filter } from 'lucide-react';
import { useState } from 'react';

const categories = [
    { key: 'all', label: { fr: 'Toutes', ar: '\u0627\u0644\u0643\u0644', en: 'All' } },
    { key: 'rapport', label: { fr: 'Rapports', ar: '\u0627\u0644\u062a\u0642\u0627\u0631\u064a\u0631', en: 'Reports' } },
    { key: 'plaidoyer', label: { fr: 'Notes de plaidoyer', ar: '\u0645\u0630\u0643\u0631\u0627\u062a \u0627\u0644\u0645\u0631\u0627\u0641\u0639\u0629', en: 'Advocacy briefs' } },
    { key: 'communique', label: { fr: 'Communiqu\u00e9s de presse', ar: '\u0628\u064a\u0627\u0646\u0627\u062a \u0635\u062d\u0641\u064a\u0629', en: 'Press releases' } },
    { key: 'guide', label: { fr: 'Guides pratiques', ar: '\u062f\u0644\u0627\u0626\u0644 \u0639\u0645\u0644\u064a\u0629', en: 'Practical guides' } },
];

const publications = [
    {
        id: 1,
        title: { fr: 'Rapport annuel 2024 de la Coalition ISRAR', ar: '\u0627\u0644\u062a\u0642\u0631\u064a\u0631 \u0627\u0644\u0633\u0646\u0648\u064a 2024 \u0644\u062a\u062d\u0627\u0644\u0641 \u0625\u0635\u0631\u0627\u0631', en: 'ISRAR Coalition Annual Report 2024' },
        category: 'rapport',
        date: '2025-03-15',
        description: {
            fr: "Bilan complet des activit\u00e9s, r\u00e9alisations et perspectives de la coalition pour l'ann\u00e9e 2024.",
            ar: '\u062d\u0635\u064a\u0644\u0629 \u0634\u0627\u0645\u0644\u0629 \u0644\u0623\u0646\u0634\u0637\u0629 \u0648\u0625\u0646\u062c\u0627\u0632\u0627\u062a \u0648\u0622\u0641\u0627\u0642 \u0627\u0644\u062a\u062d\u0627\u0644\u0641 \u0644\u0633\u0646\u0629 2024.',
            en: "Complete review of the coalition's activities, achievements, and outlook for 2024.",
        },
    },
    {
        id: 2,
        title: { fr: 'Note de plaidoyer : R\u00e9forme du Code de la famille', ar: '\u0645\u0630\u0643\u0631\u0629 \u0645\u0631\u0627\u0641\u0639\u0629: \u0625\u0635\u0644\u0627\u062d \u0645\u062f\u0648\u0646\u0629 \u0627\u0644\u0623\u0633\u0631\u0629', en: 'Advocacy Brief: Family Code Reform' },
        category: 'plaidoyer',
        date: '2024-11-20',
        description: {
            fr: "Analyse des incoh\u00e9rences du Code de la famille et recommandations pour une r\u00e9forme \u00e9galitaire.",
            ar: '\u062a\u062d\u0644\u064a\u0644 \u0627\u062e\u062a\u0644\u0627\u0644\u0627\u062a \u0645\u062f\u0648\u0646\u0629 \u0627\u0644\u0623\u0633\u0631\u0629 \u0648\u062a\u0648\u0635\u064a\u0627\u062a \u0644\u0625\u0635\u0644\u0627\u062d \u0645\u0628\u0646\u064a \u0639\u0644\u0649 \u0627\u0644\u0645\u0633\u0627\u0648\u0627\u0629.',
            en: "Analysis of family code inconsistencies and recommendations for egalitarian reform.",
        },
    },
    {
        id: 3,
        title: { fr: "Communiqu\u00e9 : Journ\u00e9e internationale pour l'\u00e9limination de la violence", ar: '\u0628\u064a\u0627\u0646: \u0627\u0644\u064a\u0648\u0645 \u0627\u0644\u062f\u0648\u0644\u064a \u0644\u0644\u0642\u0636\u0627\u0621 \u0639\u0644\u0649 \u0627\u0644\u0639\u0646\u0641', en: 'Press Release: International Day for the Elimination of Violence' },
        category: 'communique',
        date: '2024-11-25',
        description: {
            fr: "D\u00e9claration officielle de la Coalition ISRAR \u00e0 l'occasion du 25 novembre.",
            ar: '\u0628\u064a\u0627\u0646 \u0631\u0633\u0645\u064a \u0644\u062a\u062d\u0627\u0644\u0641 \u0625\u0635\u0631\u0627\u0631 \u0628\u0645\u0646\u0627\u0633\u0628\u0629 25 \u0646\u0648\u0646\u0628\u0631.',
            en: "Official statement from the ISRAR Coalition on the occasion of November 25th.",
        },
    },
    {
        id: 4,
        title: { fr: "Guide pratique : Accompagnement des femmes victimes de violence", ar: '\u062f\u0644\u064a\u0644 \u0639\u0645\u0644\u064a: \u0645\u0648\u0627\u0643\u0628\u0629 \u0627\u0644\u0646\u0633\u0627\u0621 \u0636\u062d\u0627\u064a\u0627 \u0627\u0644\u0639\u0646\u0641', en: 'Practical Guide: Supporting Women Victims of Violence' },
        category: 'guide',
        date: '2024-06-10',
        description: {
            fr: "Guide destin\u00e9 aux \u00e9coutantes et conseill\u00e8res pour l'accompagnement juridique et psychosocial.",
            ar: '\u062f\u0644\u064a\u0644 \u0645\u0648\u062c\u0647 \u0644\u0644\u0645\u0633\u062a\u0645\u0639\u0627\u062a \u0648\u0627\u0644\u0645\u0633\u062a\u0634\u0627\u0631\u0627\u062a \u0644\u0644\u0645\u0648\u0627\u0643\u0628\u0629 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064a\u0629 \u0648\u0627\u0644\u0646\u0641\u0633\u064a\u0629 \u0627\u0644\u0627\u062c\u062a\u0645\u0627\u0639\u064a\u0629.',
            en: "Guide for listeners and counsellors for legal and psychosocial support.",
        },
    },
    {
        id: 5,
        title: { fr: 'Rapport annuel 2023 de la Coalition ISRAR', ar: '\u0627\u0644\u062a\u0642\u0631\u064a\u0631 \u0627\u0644\u0633\u0646\u0648\u064a 2023 \u0644\u062a\u062d\u0627\u0644\u0641 \u0625\u0635\u0631\u0627\u0631', en: 'ISRAR Coalition Annual Report 2023' },
        category: 'rapport',
        date: '2024-03-20',
        description: {
            fr: "Synth\u00e8se des actions men\u00e9es et des r\u00e9sultats obtenus au cours de l'ann\u00e9e 2023.",
            ar: '\u0645\u0644\u062e\u0635 \u0627\u0644\u0625\u062c\u0631\u0627\u0621\u0627\u062a \u0627\u0644\u0645\u0646\u062c\u0632\u0629 \u0648\u0627\u0644\u0646\u062a\u0627\u0626\u062c \u0627\u0644\u0645\u062d\u0642\u0642\u0629 \u062e\u0644\u0627\u0644 \u0633\u0646\u0629 2023.',
            en: "Summary of actions taken and results achieved during 2023.",
        },
    },
    {
        id: 6,
        title: { fr: 'Note de plaidoyer : Examen P\u00e9riodique Universel', ar: '\u0645\u0630\u0643\u0631\u0629 \u0645\u0631\u0627\u0641\u0639\u0629: \u0627\u0644\u0627\u0633\u062a\u0639\u0631\u0627\u0636 \u0627\u0644\u062f\u0648\u0631\u064a \u0627\u0644\u0634\u0627\u0645\u0644', en: 'Advocacy Brief: Universal Periodic Review' },
        category: 'plaidoyer',
        date: '2023-09-15',
        description: {
            fr: "Recommandations de la coalition pour le 4\u00e8me cycle de l'EPU du Maroc.",
            ar: '\u062a\u0648\u0635\u064a\u0627\u062a \u0627\u0644\u062a\u062d\u0627\u0644\u0641 \u0644\u0644\u062f\u0648\u0631\u0629 \u0627\u0644\u0631\u0627\u0628\u0639\u0629 \u0645\u0646 \u0627\u0644\u0627\u0633\u062a\u0639\u0631\u0627\u0636 \u0627\u0644\u062f\u0648\u0631\u064a \u0627\u0644\u0634\u0627\u0645\u0644 \u0644\u0644\u0645\u063a\u0631\u0628.',
            en: "Coalition recommendations for Morocco's 4th UPR cycle.",
        },
    },
    {
        id: 7,
        title: { fr: "Guide : Violences num\u00e9riques contre les femmes", ar: '\u062f\u0644\u064a\u0644: \u0627\u0644\u0639\u0646\u0641 \u0627\u0644\u0631\u0642\u0645\u064a \u0636\u062f \u0627\u0644\u0646\u0633\u0627\u0621', en: 'Guide: Digital Violence Against Women' },
        category: 'guide',
        date: '2023-06-01',
        description: {
            fr: "Outils et ressources pour identifier, documenter et agir contre les violences num\u00e9riques.",
            ar: '\u0623\u062f\u0648\u0627\u062a \u0648\u0645\u0648\u0627\u0631\u062f \u0644\u062a\u062d\u062f\u064a\u062f \u0648\u062a\u0648\u062b\u064a\u0642 \u0648\u0645\u0643\u0627\u0641\u062d\u0629 \u0627\u0644\u0639\u0646\u0641 \u0627\u0644\u0631\u0642\u0645\u064a.',
            en: "Tools and resources to identify, document, and act against digital violence.",
        },
    },
    {
        id: 8,
        title: { fr: "Communiqu\u00e9 : Lancement du projet SaMMa", ar: '\u0628\u064a\u0627\u0646: \u0625\u0637\u0644\u0627\u0642 \u0645\u0634\u0631\u0648\u0639 \u0633\u0645\u0649', en: 'Press Release: Launch of the SaMMa Project' },
        category: 'communique',
        date: '2023-03-10',
        description: {
            fr: "Annonce du lancement du projet r\u00e9gional SaMMa cofinanc\u00e9 par l'AFD.",
            ar: '\u0625\u0639\u0644\u0627\u0646 \u0625\u0637\u0644\u0627\u0642 \u0645\u0634\u0631\u0648\u0639 \u0633\u0645\u0649 \u0627\u0644\u062c\u0647\u0648\u064a \u0628\u062a\u0645\u0648\u064a\u0644 \u0645\u0634\u062a\u0631\u0643 \u0645\u0639 \u0627\u0644\u0648\u0643\u0627\u0644\u0629 \u0627\u0644\u0641\u0631\u0646\u0633\u064a\u0629 \u0644\u0644\u062a\u0646\u0645\u064a\u0629.',
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
    rapport: { fr: 'Rapport', ar: '\u062a\u0642\u0631\u064a\u0631', en: 'Report' },
    plaidoyer: { fr: 'Plaidoyer', ar: '\u0645\u0631\u0627\u0641\u0639\u0629', en: 'Advocacy' },
    communique: { fr: 'Communiqu\u00e9', ar: '\u0628\u064a\u0627\u0646 \u0635\u062d\u0641\u064a', en: 'Press release' },
    guide: { fr: 'Guide', ar: '\u062f\u0644\u064a\u0644', en: 'Guide' },
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
                            <TransText fr="Publications & Ressources" ar="\u0627\u0644\u0645\u0646\u0634\u0648\u0631\u0627\u062a \u0648\u0627\u0644\u0645\u0648\u0627\u0631\u062f" en="Publications & Resources" />
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
                            <TransText
                                fr="Consultez et t\u00e9l\u00e9chargez nos rapports, notes de plaidoyer, communiqu\u00e9s et guides pratiques."
                                ar="\u0627\u0637\u0644\u0639\u0648\u0627 \u0639\u0644\u0649 \u062a\u0642\u0627\u0631\u064a\u0631\u0646\u0627 \u0648\u0645\u0630\u0643\u0631\u0627\u062a \u0627\u0644\u0645\u0631\u0627\u0641\u0639\u0629 \u0648\u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0635\u062d\u0641\u064a\u0629 \u0648\u0627\u0644\u062f\u0644\u0627\u0626\u0644 \u0627\u0644\u0639\u0645\u0644\u064a\u0629 \u0648\u062d\u0645\u0651\u0644\u0648\u0647\u0627."
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
                                        <TransText fr="T\u00e9l\u00e9charger" ar="\u062a\u062d\u0645\u064a\u0644" en="Download" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-16 text-center">
                            <FileText className="mx-auto mb-4 h-12 w-12 text-neutral-300" />
                            <p className="text-neutral-500">
                                <TransText
                                    fr="Aucune publication trouv\u00e9e pour cette cat\u00e9gorie."
                                    ar="\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u0646\u0634\u0648\u0631\u0627\u062a \u0644\u0647\u0630\u0627 \u0627\u0644\u062a\u0635\u0646\u064a\u0641."
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
