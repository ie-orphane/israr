import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import TransText from '@components/TransText';
import {
    Calendar, Award, Users, Building2, FileText, Download,
    Shield, BookOpen, Heart, Globe, Scale, Megaphone
} from 'lucide-react';

const timelineEvents = [
    {
        year: '2012',
        title: { fr: 'Création de la Coalition ISRAR', ar: 'تأسيس تحالف إصرار', en: 'Founding of the ISRAR Coalition' },
        description: {
            fr: 'Naissance de la coalition regroupant des associations engagées contre les violences fondées sur le genre au Maroc.',
            ar: 'ولادة التحالف الذي يجمع جمعيات ملتزمة بمكافحة العنف القائم على النوع في المغرب.',
            en: 'Birth of the coalition bringing together associations committed to fighting gender-based violence in Morocco.',
        },
    },
    {
        year: '2015',
        title: { fr: 'Premier programme régional', ar: 'أول برنامج جهوي', en: 'First regional programme' },
        description: {
            fr: 'Lancement du premier programme de renforcement des capacités des associations membres dans 4 régions.',
            ar: 'إطلاق أول برنامج لتقوية قدرات الجمعيات العضوة في 4 جهات.',
            en: 'Launch of the first capacity-building programme for member associations across 4 regions.',
        },
    },
    {
        year: '2018',
        title: { fr: 'Plaidoyer pour la loi 103-13', ar: 'المرافعة من أجل القانون 103-13', en: 'Advocacy for Law 103-13' },
        description: {
            fr: 'Contribution active au plaidoyer pour l’adoption et la mise en œuvre de la loi relative à la lutte contre les violences faites aux femmes.',
            ar: 'مساهمة فعالة في المرافعة من أجل اعتماد وتنفيذ القانون المتعلق بمكافحة العنف ضد النساء.',
            en: 'Active contribution to advocacy for the adoption and implementation of the law on combating violence against women.',
        },
    },
    {
        year: '2020',
        title: { fr: 'Extension à 8 régions', ar: 'التوسع إلى 8 جهات', en: 'Expansion to 8 regions' },
        description: {
            fr: 'La coalition étend sa couverture géographique à 8 régions du Maroc avec 19 associations membres.',
            ar: 'يوسع التحالف تغطيته الجغرافية إلى 8 جهات بالمغرب مع 19 جمعية عضو.',
            en: 'The coalition expands its geographic coverage to 8 regions of Morocco with 19 member associations.',
        },
    },
    {
        year: '2023',
        title: { fr: 'Lancement du projet SaMMa', ar: 'إطلاق مشروع سمى', en: 'Launch of the SaMMa project' },
        description: {
            fr: 'Démarrage du projet régional SaMMa cofinancé par l’AFD pour lutter contre les VBG à grande échelle.',
            ar: 'انطلاق مشروع سمى الجهوي بتمويل مشترك مع الوكالة الفرنسية للتنمية لمكافحة العنف المبني على النوع على نطاق واسع.',
            en: 'Start of the SaMMa regional project co-funded by AFD to combat GBV at scale.',
        },
    },
    {
        year: '2025',
        title: { fr: 'Plateforme numérique ISRAR', ar: 'المنصة الرقمية إصرار', en: 'ISRAR digital platform' },
        description: {
            fr: 'Lancement de la plateforme numérique intégrée pour l’écoute, l’accompagnement et le plaidoyer.',
            ar: 'إطلاق المنصة الرقمية المتكاملة للإصغاء والمواكبة والمرافعة.',
            en: 'Launch of the integrated digital platform for listening, support, and advocacy.',
        },
    },
];

const achievements = [
    {
        icon: Users,
        title: { fr: '+15 000 bénéficiaires', ar: '+15 000 مستفيدة', en: '+15,000 beneficiaries' },
        description: {
            fr: 'Femmes et familles accompagnées à travers nos programmes d’écoute, de conseil et d’orientation.',
            ar: 'نساء وأسر تمت مواكبتها من خلال برامجنا للإصغاء والإرشاد والتوجيه.',
            en: 'Women and families supported through our listening, counselling, and referral programmes.',
        },
    },
    {
        icon: Scale,
        title: { fr: 'Plaidoyer législatif', ar: 'مرافعة تشريعية', en: 'Legislative advocacy' },
        description: {
            fr: 'Contribution à l’adoption de la loi 103-13 et au plaidoyer pour la réforme du Code de la famille.',
            ar: 'المساهمة في اعتماد القانون 103-13 والمرافعة من أجل إصلاح مدونة الأسرة.',
            en: 'Contribution to the adoption of Law 103-13 and advocacy for family code reform.',
        },
    },
    {
        icon: Megaphone,
        title: { fr: 'Campagnes nationales', ar: 'حملات وطنية', en: 'National campaigns' },
        description: {
            fr: 'Organisation de campagnes de sensibilisation touchées par des milliers de personnes à travers le Maroc.',
            ar: 'تنظيم حملات توعوية وصلت إلى آلاف الأشخاص عبر المغرب.',
            en: 'Organisation of awareness campaigns reaching thousands of people across Morocco.',
        },
    },
    {
        icon: BookOpen,
        title: { fr: 'Publications de référence', ar: 'منشورات مرجعية', en: 'Reference publications' },
        description: {
            fr: 'Rapports, guides juridiques et notes de plaidoyer utilisés par les acteurs institutionnels et associatifs.',
            ar: 'تقارير ودلائل قانونية ومذكرات مرافعة يستخدمها الفاعلون المؤسساتيون والجمعويون.',
            en: 'Reports, legal guides, and advocacy briefs used by institutional and civil society actors.',
        },
    },
    {
        icon: Heart,
        title: { fr: 'Réseau de solidarité', ar: 'شبكة تضامن', en: 'Solidarity network' },
        description: {
            fr: 'Construction d’un réseau de 19 associations offrant un maillage territorial unique au Maroc.',
            ar: 'بناء شبكة من 19 جمعية توفر تغطية ترابية فريدة بالمغرب.',
            en: 'Building a network of 19 associations offering unique territorial coverage in Morocco.',
        },
    },
    {
        icon: Globe,
        title: { fr: 'Partenariats internationaux', ar: 'شراكات دولية', en: 'International partnerships' },
        description: {
            fr: 'Collaborations avec l’AFD, l’ONU Femmes, l’UNFPA et l’Union Européenne.',
            ar: 'تعاون مع الوكالة الفرنسية للتنمية وهيئة الأمم المتحدة للمرأة وصندوق الأمم المتحدة للسكان والاتحاد الأوروبي.',
            en: 'Collaborations with AFD, UN Women, UNFPA, and the European Union.',
        },
    },
];

const governance = [
    {
        title: { fr: 'Assemblée Générale', ar: 'الجمع العام', en: 'General Assembly' },
        description: {
            fr: 'Instance suprême de décision regroupant l’ensemble des 19 associations membres.',
            ar: 'الهيئة العليا للقرار التي تضم جميع الجمعيات العضوة الـ 19.',
            en: 'Supreme decision-making body bringing together all 19 member associations.',
        },
    },
    {
        title: { fr: 'Bureau Exécutif', ar: 'المكتب التنفيذي', en: 'Executive Board' },
        description: {
            fr: 'Organe de gestion stratégique élu par l’AG, chargé de piloter les orientations de la coalition.',
            ar: 'جهاز التدبير الاستراتيجي المنتخب من الجمع العام، المكلف بتوجيه التحالف.',
            en: 'Strategic management body elected by the GA, responsible for steering the coalition’s directions.',
        },
    },
    {
        title: { fr: 'Coordination Nationale', ar: 'التنسيق الوطني', en: 'National Coordination' },
        description: {
            fr: 'Équipe opérationnelle assurant la coordination des programmes, la communication et le suivi des projets.',
            ar: 'فريق عملياتي يضمن تنسيق البرامج والتواصل ومتابعة المشاريع.',
            en: 'Operational team ensuring programme coordination, communication, and project monitoring.',
        },
    },
    {
        title: { fr: 'Commissions thématiques', ar: 'اللجان الموضوعاتية', en: 'Thematic commissions' },
        description: {
            fr: 'Groupes de travail spécialisés : plaidoyer, communication, formation, suivi-évaluation.',
            ar: 'مجموعات عمل متخصصة: المرافعة، التواصل، التكوين، التتبع والتقييم.',
            en: 'Specialised working groups: advocacy, communication, training, monitoring and evaluation.',
        },
    },
];

export default function APropos({ documents = [] }) {
    return (
        <AppLayout>
            <Head title="À propos" />
            <div className="bg-white/85 backdrop-blur-sm dark:bg-neutral-950/80">
                {/* Hero */}
                <section className="bg-[var(--color-alpha)] py-16 text-white md:py-24">
                    <div className="mx-auto max-w-6xl px-6 text-center">
                        <h1 className="text-3xl font-bold md:text-5xl">
                            <TransText fr="À propos de la Coalition ISRAR" ar="حول تحالف إصرار" en="About the ISRAR Coalition" />
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
                            <TransText
                                fr="Réseau national de 19 associations, la Coalition ISRAR agit dans 8 régions du Maroc pour l'élimination des violences fondées sur le genre."
                                ar="شبكة وطنية تضم 19 جمعية، يعمل تحالف إصرار في 8 جهات بالمغرب من أجل القضاء على العنف المبني على النوع الاجتماعي."
                                en="A national network of 19 associations, the ISRAR Coalition operates across 8 regions of Morocco to eliminate gender-based violence."
                            />
                        </p>
                    </div>
                </section>

                {/* Timeline */}
                <section className="mx-auto max-w-4xl px-6 py-16">
                    <h2 className="mb-12 text-center text-2xl font-bold text-[var(--color-alpha)] md:text-3xl">
                        <TransText fr="Notre parcours" ar="مسارنا" en="Our journey" />
                    </h2>
                    <div className="relative">
                        <div className="absolute left-4 top-0 h-full w-0.5 bg-[var(--color-beta)]/30 md:left-1/2 md:-translate-x-px" />
                        {timelineEvents.map((event, idx) => (
                            <div key={event.year} className={`relative mb-10 flex items-start gap-6 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                <div className="hidden md:block md:w-1/2" />
                                <div className="absolute left-4 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-[var(--color-beta)] text-xs font-bold text-white md:left-1/2">
                                    <Calendar className="h-4 w-4" />
                                </div>
                                <div className="ml-10 flex-1 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200 dark:bg-neutral-900 dark:ring-neutral-700 md:ml-0 md:w-1/2">
                                    <span className="mb-1 inline-block rounded-full bg-[var(--color-alpha)]/10 px-3 py-0.5 text-xs font-bold text-[var(--color-alpha)]">{event.year}</span>
                                    <h3 className="text-base font-semibold text-[var(--color-alpha)]">
                                        <TransText fr={event.title.fr} ar={event.title.ar} en={event.title.en} />
                                    </h3>
                                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                                        <TransText fr={event.description.fr} ar={event.description.ar} en={event.description.en} />
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Achievements */}
                <section className="bg-neutral-50 py-16 dark:bg-neutral-900/40">
                    <div className="mx-auto max-w-6xl px-6">
                        <h2 className="mb-10 text-center text-2xl font-bold text-[var(--color-alpha)] md:text-3xl">
                            <TransText fr="Réalisations majeures" ar="الإنجازات الرئيسية" en="Major achievements" />
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {achievements.map(({ icon: Icon, title, description }) => (
                                <div key={title.en} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-200 transition hover:-translate-y-1 hover:shadow-md dark:bg-neutral-800 dark:ring-neutral-700">
                                    <div className="mb-4 inline-flex rounded-xl bg-[var(--color-beta)]/15 p-3 text-[var(--color-beta)]">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="mb-2 text-lg font-semibold text-[var(--color-alpha)]">
                                        <TransText fr={title.fr} ar={title.ar} en={title.en} />
                                    </h3>
                                    <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                                        <TransText fr={description.fr} ar={description.ar} en={description.en} />
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Governance */}
                <section className="mx-auto max-w-6xl px-6 py-16">
                    <h2 className="mb-10 text-center text-2xl font-bold text-[var(--color-alpha)] md:text-3xl">
                        <TransText fr="Gouvernance" ar="الحكامة" en="Governance" />
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2">
                        {governance.map((item, idx) => (
                            <div key={idx} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-200 dark:bg-neutral-900 dark:ring-neutral-700">
                                <div className="mb-3 inline-flex rounded-xl bg-[var(--color-alpha)]/10 p-3 text-[var(--color-alpha)]">
                                    <Building2 className="h-6 w-6" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-[var(--color-alpha)]">
                                    <TransText fr={item.title.fr} ar={item.title.ar} en={item.title.en} />
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                    <TransText fr={item.description.fr} ar={item.description.ar} en={item.description.en} />
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {documents.length > 0 && (
                    <section className="border-t border-neutral-200 bg-neutral-50 py-16 dark:border-neutral-700 dark:bg-neutral-900/40">
                        <div className="mx-auto max-w-4xl px-6">
                            <h2 className="mb-10 text-center text-2xl font-bold text-[var(--color-alpha)] md:text-3xl">
                                <TransText fr="Documents téléchargeables" ar="وثائق قابلة للتحميل" en="Downloadable documents" />
                            </h2>
                            <div className="space-y-3">
                                {documents.map((doc) => (
                                    <a key={doc.id} href={doc.file_url} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm ring-1 ring-neutral-200 transition hover:-translate-y-0.5 hover:shadow-md dark:bg-neutral-800 dark:ring-neutral-700">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                                                <FileText className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-[var(--color-alpha)]">
                                                    <TransText fr={doc.title_fr} ar={doc.title_ar} en={doc.title_en} />
                                                </p>
                                            </div>
                                        </div>
                                        <span className="flex items-center gap-1.5 rounded-lg border border-[var(--color-alpha)]/20 px-3 py-2 text-xs font-medium text-[var(--color-alpha)] transition hover:bg-[var(--color-alpha)]/5">
                                            <Download className="h-3.5 w-3.5" />
                                            <TransText fr="Télécharger" ar="تحميل" en="Download" />
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </AppLayout>
    );
}
