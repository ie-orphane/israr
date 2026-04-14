import AppLayout from '@/layouts/app-layout';
import TransText from '@components/TransText';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, BadgeInfo, CalendarDays, Download, FileText, Handshake, MapPin, Users } from 'lucide-react';

const statusLabels = {
    active: { fr: 'En cours', ar: 'جاري' },
    closed: { fr: 'Clôturé', ar: 'مختتم' },
};

export default function ProgrammeShow({ programme }) {
    return (
        <AppLayout>
            <Head title={programme.title_fr} />

            <div className="bg-white/85 backdrop-blur-sm dark:bg-neutral-950/80">
                <section className="bg-[var(--color-alpha)] py-10 text-white md:py-14">
                    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6">
                        <div className="max-w-3xl">
                            <span className="mb-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-white/90 uppercase">
                                <TransText
                                    fr={statusLabels[programme.status]?.fr ?? programme.status}
                                    ar={statusLabels[programme.status]?.ar ?? programme.status}
                                />
                            </span>
                            <h1 className="text-3xl font-bold md:text-5xl">
                                <TransText fr={programme.title_fr} ar={programme.title_ar} />
                            </h1>
                            <p className="mt-4 max-w-2xl text-base text-white/80 md:text-lg">
                                <TransText fr={programme.summary_fr} ar={programme.summary_ar} />
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[1.5fr_1fr]">
                    <div className="space-y-6">
                        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-neutral-200 dark:bg-neutral-900 dark:ring-neutral-700">
                            <img
                                src={programme.image}
                                alt={programme.title_fr}
                                className="h-72 w-full object-cover md:h-[420px]"
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=800&fit=crop';
                                }}
                            />
                            <div className="grid gap-4 p-6 md:grid-cols-3">
                                {programme.beneficiaires && (
                                    <div className="rounded-2xl bg-[var(--color-beta)]/10 p-4">
                                        <div className="mb-2 inline-flex rounded-xl bg-white p-2 text-[var(--color-alpha)] shadow-sm">
                                            <Users className="h-5 w-5" />
                                        </div>
                                        <p className="text-2xl font-bold text-[var(--color-alpha)]">
                                            {programme.beneficiaires.toLocaleString('fr-FR')}
                                        </p>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                            <TransText fr="Bénéficiaires" ar="المستفيدات" />
                                        </p>
                                    </div>
                                )}
                                {programme.region_fr && (
                                    <div className="rounded-2xl bg-[var(--color-beta)]/10 p-4">
                                        <div className="mb-2 inline-flex rounded-xl bg-white p-2 text-[var(--color-alpha)] shadow-sm">
                                            <MapPin className="h-5 w-5" />
                                        </div>
                                        <p className="text-base font-semibold text-[var(--color-alpha)]">
                                            <TransText fr={programme.region_fr} ar={programme.region_ar ?? programme.region_fr} />
                                        </p>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                            <TransText fr="Zone d'intervention" ar="مجال التدخل" />
                                        </p>
                                    </div>
                                )}
                                {programme.budget && (
                                    <div className="rounded-2xl bg-[var(--color-beta)]/10 p-4">
                                        <div className="mb-2 inline-flex rounded-xl bg-white p-2 text-[var(--color-alpha)] shadow-sm">
                                            <BadgeInfo className="h-5 w-5" />
                                        </div>
                                        <p className="text-base font-semibold text-[var(--color-alpha)]">{programme.budget}</p>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                            <TransText fr="Budget" ar="الميزانية" />
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-200 dark:bg-neutral-900 dark:ring-neutral-700">
                            <h2 className="mb-4 text-xl font-bold text-[var(--color-alpha)]">
                                <TransText fr="Présentation du programme" ar="تقديم البرنامج" />
                            </h2>
                            <p className="text-sm leading-7 text-neutral-600 md:text-base dark:text-neutral-300">
                                <TransText fr={programme.summary_fr} ar={programme.summary_ar} />
                            </p>
                        </div>
                    </div>

                    <aside className="space-y-6">
                        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-200 dark:bg-neutral-900 dark:ring-neutral-700">
                            <h2 className="mb-4 text-lg font-bold text-[var(--color-alpha)]">
                                <TransText fr="Informations rapides" ar="معلومات سريعة" />
                            </h2>
                            <div className="space-y-4 text-sm">
                                <div className="flex items-start gap-3">
                                    <CalendarDays className="mt-0.5 h-4 w-4 text-[var(--color-beta)]" />
                                    <div>
                                        <p className="font-medium text-[var(--color-alpha)]">
                                            <TransText fr="Statut" ar="الحالة" />
                                        </p>
                                        <p className="text-neutral-600 dark:text-neutral-300">
                                            <TransText fr={statusLabels[programme.status]?.fr ?? programme.status} ar={statusLabels[programme.status]?.ar ?? programme.status} />
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="mt-0.5 h-4 w-4 text-[var(--color-beta)]" />
                                    <div>
                                        <p className="font-medium text-[var(--color-alpha)]">
                                            <TransText fr="Région" ar="الجهة" />
                                        </p>
                                        <p className="text-neutral-600 dark:text-neutral-300">
                                            <TransText fr={programme.region_fr ?? '-'} ar={programme.region_ar ?? programme.region_fr ?? '-'} />
                                        </p>
                                    </div>
                                </div>
                                {programme.partenaires?.length > 0 && (
                                    <div className="flex items-start gap-3">
                                        <Handshake className="mt-0.5 h-4 w-4 text-[var(--color-beta)]" />
                                        <div>
                                            <p className="font-medium text-[var(--color-alpha)]">
                                                <TransText fr="Partenaires" ar="الشركاء" />
                                            </p>
                                            <p className="text-neutral-600 dark:text-neutral-300">{programme.partenaires.join(', ')}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {programme.project_file_url && (
                            <div className="rounded-3xl bg-[var(--color-alpha)] p-6 text-white shadow-sm">
                                <h2 className="mb-3 text-lg font-bold">
                                    <TransText fr="Fiche projet" ar="ملف المشروع" />
                                </h2>
                                <p className="mb-4 text-sm text-white/80">
                                    <TransText fr="Téléchargez le document détaillé du programme." ar="حمّل الوثيقة التفصيلية للبرنامج." />
                                </p>
                                <a
                                    href={programme.project_file_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-alpha)] transition hover:bg-white/90"
                                >
                                    <Download className="h-4 w-4" />
                                    <TransText fr="Télécharger" ar="تحميل" en="Download" />
                                </a>
                            </div>
                        )}

                        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-200 dark:bg-neutral-900 dark:ring-neutral-700">
                            <h2 className="mb-4 text-lg font-bold text-[var(--color-alpha)]">
                                <TransText fr="Actions" ar="إجراءات" />
                            </h2>
                            <div className="space-y-3">
                                <Link
                                    href="/programmes"
                                    className="flex items-center justify-center gap-2 rounded-lg border border-[var(--color-alpha)]/20 px-4 py-2.5 text-sm font-medium text-[var(--color-alpha)] transition hover:bg-[var(--color-alpha)] hover:text-white"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    <TransText fr="Retour à la liste" ar="العودة إلى اللائحة" />
                                </Link>
                                <Link
                                    href="/contact"
                                    className="flex items-center justify-center gap-2 rounded-lg bg-[var(--color-alpha)] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--color-alpha)]/90"
                                >
                                    <FileText className="h-4 w-4" />
                                    <TransText fr="Nous contacter" ar="اتصلوا بنا" />
                                </Link>
                            </div>
                        </div>
                    </aside>
                </section>
            </div>
        </AppLayout>
    );
}
