import React from 'react';
import TransText from '@components/TransText';
import { Link } from '@inertiajs/react';
import { Users, MapPin, Handshake, Download } from 'lucide-react';

const Main = ({ onLoading, onFilteredProgrammes }) => {
    const getStatusLabel = (status) => {
        if (status === 'active') {
            return { fr: 'En cours', ar: 'جاري', en: 'Active' };
        }

        return { fr: 'Clôturé', ar: 'مختتم', en: 'Closed' };
    };

    return (
        <section className="mx-auto max-w-6xl px-6 py-12">
            {onLoading ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="animate-pulse rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200 dark:bg-neutral-900 dark:ring-neutral-700">
                            <div className="h-40 rounded-xl bg-neutral-200 dark:bg-neutral-700" />
                            <div className="mt-4 space-y-3">
                                <div className="h-5 w-3/4 rounded bg-neutral-200 dark:bg-neutral-700" />
                                <div className="space-y-2">
                                    <div className="h-4 rounded bg-neutral-200 dark:bg-neutral-700" />
                                    <div className="h-4 w-5/6 rounded bg-neutral-200 dark:bg-neutral-700" />
                                </div>
                                <div className="h-9 w-1/3 rounded bg-neutral-200 dark:bg-neutral-700" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : onFilteredProgrammes.length > 0 ? (
                <>
                    <div className="mb-6 text-center">
                        <p className="text-sm text-neutral-500">
                            <TransText
                                fr={`${onFilteredProgrammes.length} programme${onFilteredProgrammes.length > 1 ? 's' : ''} trouvé${onFilteredProgrammes.length > 1 ? 's' : ''}`}
                                ar={`تم العثور على ${onFilteredProgrammes.length} برنامج`}
                                en={`${onFilteredProgrammes.length} program${onFilteredProgrammes.length > 1 ? 's' : ''} found`}
                            />
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {onFilteredProgrammes.map((p) => (
                            <div
                                key={p.id}
                                className="group flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200 transition hover:-translate-y-0.5 hover:shadow-md dark:bg-neutral-900 dark:ring-neutral-700"
                            >
                                <div className="relative mb-4 h-44 overflow-hidden rounded-xl">
                                    <img
                                        src={p.image}
                                        alt={p.title_fr}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop";
                                        }}
                                    />
                                    <div className="absolute left-3 top-3">
                                        <span
                                            className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                p.status === 'active'
                                                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                                                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                                            }`}
                                        >
                                            <TransText
                                                fr={getStatusLabel(p.status).fr}
                                                ar={getStatusLabel(p.status).ar}
                                                en={getStatusLabel(p.status).en}
                                            />
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-1 flex-col">
                                    <h2 className="mb-2 line-clamp-2 text-base font-semibold text-[var(--color-alpha)]">
                                        <TransText fr={p.title_fr} ar={p.title_ar ?? p.title_fr} en={p.title_en ?? p.title_fr} />
                                    </h2>
                                    <p className="mb-4 line-clamp-3 text-sm text-neutral-600 dark:text-neutral-300">
                                        <TransText fr={p.summary_fr} ar={p.summary_ar ?? p.summary_fr} en={p.summary_en ?? p.summary_fr} />
                                    </p>

                                    <div className="mb-4 flex flex-wrap gap-2">
                                        {p.beneficiaires && (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-beta)]/10 px-2.5 py-1 text-xs font-medium text-[var(--color-alpha)]">
                                                <Users className="h-3 w-3" />
                                                {p.beneficiaires.toLocaleString('fr-FR')}
                                            </span>
                                        )}
                                        {p.region && (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-beta)]/10 px-2.5 py-1 text-xs font-medium text-[var(--color-alpha)]">
                                                <MapPin className="h-3 w-3" />
                                                <TransText fr={p.region} ar={p.region_ar ?? p.region} en={p.region_en ?? p.region} />
                                            </span>
                                        )}
                                        {p.partenaires && p.partenaires.length > 0 && (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-beta)]/10 px-2.5 py-1 text-xs font-medium text-[var(--color-alpha)]">
                                                <Handshake className="h-3 w-3" />
                                                {p.partenaires.length}
                                                <TransText fr=" partenaire(s)" ar=" شريك(شركاء)" en=" partner(s)" />
                                            </span>
                                        )}
                                        {p.budget && (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-beta)]/10 px-2.5 py-1 text-xs font-medium text-[var(--color-alpha)]">
                                                {p.budget}
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-auto flex gap-2">
                                        <Link href={`/programmes/${p.id}`} className="flex-1 rounded-lg bg-[var(--color-alpha)] px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-[var(--color-alpha)]/90">
                                            <TransText fr="En savoir plus" ar="معرفة المزيد" en="Learn more" />
                                        </Link>
                                        {
                                            p.project_file_url && (
                                                 <a
                                                    href={p.project_file_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-center justify-center gap-1.5 rounded-lg border border-[var(--color-alpha)]/20 px-3 py-2.5 text-sm font-medium text-[var(--color-alpha)] hover:bg-[var(--color-alpha)] hover:text-white transition"
                                                    title="Télécharger la fiche projet"
                                                >
                                                    <Download className="h-4 w-4" />
                                                    <span className="hidden sm:inline">PDF</span>
                                                </a>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="py-16 text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                        <svg className="h-10 w-10 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-[var(--color-alpha)] sm:text-2xl">
                        <TransText fr="Aucun programme trouvé" ar="لم يتم العثور على برامج" en="No program found" />
                    </h3>
                    <p className="mx-auto mb-6 max-w-md text-sm text-neutral-500 sm:text-base">
                        <TransText
                            fr="Il n'y a pas de programmes disponibles pour ce filtre."
                            ar="لا توجد برامج متاحة لهذا الفلتر."
                            en="No programs are available for this filter."
                        />
                    </p>
                </div>
            )}
        </section>
    );
};

export default Main;
