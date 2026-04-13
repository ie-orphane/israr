import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import TransText from '@components/TransText';
import ImageCarousel from '@components/image-carousel';
import { Button } from '@/components/ui/button';
import { MessageCircle, ShieldCheck, BarChart3, Megaphone, FileText, MapPin, CalendarDays, Mail, Users, Globe, Handshake, Quote } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

function AnimatedCounter({ target, prefix = '' }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const duration = 2000;
                    const steps = 60;
                    const increment = target / steps;
                    let current = 0;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            setCount(target);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(current));
                        }
                    }, duration / steps);
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target]);

    const formatted = count >= 1000 ? `${(count / 1000).toFixed(count >= target ? 0 : 1).replace(/\.0$/, '')} 000` : count;
    return <span ref={ref}>{prefix}{formatted}</span>;
}

export default function Welcome({ partners = [] }) {
    const carouselSlides = [
        {
            src: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92eee?auto=format&fit=crop&w=1600&q=80',
            alt: 'Women collaborating in a meeting',
            caption: {
                fr: 'Accompagner les femmes et leurs proches avec une écoute dédiée.',
                ar: 'مواكبة النساء والمحيطين بهن من خلال فضاء للإصغاء.',
                en: 'Providing attentive support for women and their families.',
            },
        },
        {
            src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80',
            alt: 'Community meeting discussing rights',
            caption: {
                fr: 'Sensibiliser et informer pour renforcer la citoyenneté.',
                ar: 'التوعية والإخبار لتعزيز المواطنة.',
                en: 'Raising awareness and informing to strengthen citizenship.',
            },
        },
        {
            src: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80',
            alt: 'Hands joined in solidarity',
            caption: {
                fr: "Mobiliser un réseau d'expertes et de partenaires solidaires.",
                ar: 'تعبئة شبكة من الخبيرات والشركاء المتضامنين.',
                en: 'Mobilising a network of experts and committed partners.',
            },
        },
        {
            src: 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=1600&q=80',
            alt: 'Workshop led by women advocates',
            caption: {
                fr: 'Former et renforcer les capacités des actrices locales contre les violences.',
                ar: 'تكوين وتقوية قدرات الفاعلات المحليات لمحاربة العنف.',
                en: 'Training local actors to prevent and respond to violence.',
            },
        },
    ];

    const missionItems = [
        {
            fr: 'Sensibiliser les citoyen·nes sur leurs droits.',
            ar: 'توعية المواطنات والمواطنين بحقوقهم.',
            en: 'Raise awareness among citizens about their rights.',
        },
        {
            fr: 'Documenter les lois et jurisprudences relatives à la lutte contre les violences faites aux femmes.',
            ar: 'توثيق القوانين والاجتهادات القضائية المتعلقة بمحاربة العنف ضد النساء.',
            en: 'Document laws and case law related to combating violence against women.',
        },
        {
            fr: "Offrir un guichet numérique d'écoute et d'accompagnement.",
            ar: 'توفير شباك رقمي للاستماع والمواكبة.',
            en: 'Offer a digital listening and support desk.',
        },
    ];

    const impactCounters = [
        { value: 15000, prefix: '+', label: { fr: 'Bénéficiaires accompagnées', ar: 'مستفيدة تمت مواكبتها', en: 'Beneficiaries supported' }, icon: Users },
        { value: 8, prefix: '', label: { fr: 'Régions couvertes', ar: 'جهات مغطاة', en: 'Regions covered' }, icon: Globe },
        { value: 19, prefix: '', label: { fr: 'Associations membres', ar: 'جمعية عضو', en: 'Member associations' }, icon: Handshake },
        { value: partners.length, prefix: '', label: { fr: 'Partenaires institutionnels', ar: 'شريك مؤسساتي', en: 'Institutional partners' }, icon: ShieldCheck },
    ];

    const displayedPartners = partners;

    const testimonials = [
        {
            quote: {
                fr: "Grâce à l'accompagnement de la coalition, j'ai pu connaître mes droits et entamer les démarches juridiques nécessaires. Je me sens enfin soutenue.",
                ar: "بفضل مواكبة التحالف، تمكنت من معرفة حقوقي والبدء في الإجراءات القانونية اللازمة. أشعر أخيرًا بالدعم.",
                en: "Thanks to the coalition's support, I was able to learn about my rights and start the necessary legal procedures. I finally feel supported.",
            },
            name: { fr: 'Fatima Z.', ar: 'فاطمة ز.', en: 'Fatima Z.' },
            region: { fr: 'Région Casablanca-Settat', ar: 'جهة الدار البيضاء-سطات', en: 'Casablanca-Settat Region' },
        },
        {
            quote: {
                fr: "Les formations que j'ai suivies m'ont permis de devenir relais communautaire dans mon quartier. Aujourd'hui, je sensibilise d'autres femmes.",
                ar: "مكّنتني التكوينات التي خضعت لها من أن أصبح وسيطة مجتمعية في حيي. اليوم، أقوم بتوعية نساء أخريات.",
                en: "The training I received allowed me to become a community relay in my neighborhood. Today, I raise awareness among other women.",
            },
            name: { fr: 'Khadija M.', ar: 'خديجة م.', en: 'Khadija M.' },
            region: { fr: 'Région Marrakech-Safi', ar: 'جهة مراكش-آسفي', en: 'Marrakech-Safi Region' },
        },
        {
            quote: {
                fr: "La plateforme numérique m'a donné accès à des informations juridiques que je n'aurais jamais trouvées seule. Un outil indispensable.",
                ar: "أتاحت لي المنصة الرقمية الوصول إلى معلومات قانونية ما كنت لأجدها وحدي. أداة لا غنى عنها.",
                en: "The digital platform gave me access to legal information I would never have found on my own. An indispensable tool.",
            },
            name: { fr: 'Amina B.', ar: 'أمينة ب.', en: 'Amina B.' },
            region: { fr: 'Région Fès-Meknès', ar: 'جهة فاس-مكناس', en: 'Fès-Meknès Region' },
        },
    ];

    const highlightCards = [
        {
            icon: ShieldCheck,
            title: {
                fr: 'Un espace fiable et sécurisé',
                ar: 'فضاء موثوق وآمن',
                en: 'A reliable and secure space',
            },
            description: {
                fr: 'Protection des données sensibles et parcours confidentiel pour chaque personne accompagnée.',
                ar: 'حماية للمعطيات الحساسة ومسار سري لكل شخص تتم مواكبته.',
                en: 'Protecting sensitive data and offering a confidential path for every person supported.',
            },
        },
        {
            icon: MessageCircle,
            title: {
                fr: 'Écoute active et accompagnement',
                ar: 'إصغاء فعال ومواكبة',
                en: 'Active listening and support',
            },
            description: {
                fr: "Des conseillères expertes, formées pour répondre aux besoins juridiques et psychosociaux.",
                ar: 'مستشارات خبيرات مكوّنات لتلبية الاحتياجات القانونية والنفسية الاجتماعية.',
                en: 'Expert counsellors trained to respond to legal and psychosocial needs.',
            },
        },
        {
            icon: BarChart3,
            title: {
                fr: 'Vision data-driven',
                ar: 'رؤية مبنية على المعطيات',
                en: 'Data-driven insight',
            },
            description: {
                fr: "Tableaux de bord dynamiques pour suivre l'impact et guider les actions futures.",
                ar: 'لوحات قياس ديناميكية لمتابعة الأثر وتوجيه الخطوات المقبلة.',
                en: 'Dynamic dashboards to monitor impact and guide future action.',
            },
        },
    ];

    const initiatives = [
        {
            icon: Megaphone,
            title: {
                fr: 'Campagnes nationales de sensibilisation',
                ar: 'حملات تحسيسية وطنية',
                en: 'National awareness campaigns',
            },
            description: {
                fr: "Actions digitales et terrain pour vulgariser les recommandations de l'Examen Périodique Universel et promouvoir la réforme du Code de la famille.",
                ar: 'حملات رقمية وميدانية لنشر توصيات الاستعراض الدوري الشامل والدعوة لإصلاح مدونة الأسرة.',
                en: 'Digital and field campaigns to promote Universal Periodic Review recommendations and family code reforms.',
            },
            link: 'https://tanmia.ma/02-11-2023/60506/',
        },
        {
            icon: FileText,
            title: {
                fr: 'Plaidoyer pour une réforme juridique',
                ar: 'مرافعة من أجل إصلاح قانوني',
                en: 'Advocacy for legal reform',
            },
            description: {
                fr: "Identification et publication des incohérences du Code de la famille marocain pour garantir une égalité réelle.",
                ar: 'رصد ونشر الاختلالات في مدونة الأسرة المغربية لضمان مساواة فعلية.',
                en: 'Highlighting inconsistencies in the Moroccan family code to ensure real equality.',
            },
            link: 'https://fr.hespress.com/294400-promotion-de-legalite-la-coalition-israr-devoile-les-incoherences-presentes-dans-le-code-de-la-famille.html',
        },
        {
            icon: MapPin,
            title: {
                fr: 'Projet régional SaMMa',
                ar: 'المشروع الإقليمي "سمى"',
                en: 'SaMMa regional project',
            },
            description: {
                fr: "Initiative cofinancée par l'AFD pour lutter contre les violences basées sur le genre dans plusieurs régions du Maroc.",
                ar: 'مبادرة ممولة بشراكة مع الوكالة الفرنسية للتنمية لمحاربة العنف المبني على النوع في عدة جهات بالمغرب.',
                en: 'AFD-backed initiative combating gender-based violence across multiple Moroccan regions.',
            },
            link: 'https://tanmia.ma/21-06-2023/56637/',
        },
    ];

    const opportunities = [
        {
            icon: CalendarDays,
            title: {
                fr: 'Consultations et appels 2025',
                ar: 'استشارات وطلبات 2025',
                en: '2025 consultations & calls',
            },
            description: {
                fr: "Recrutement d'expert·es en communication, accompagnement psychologique et analyse d'impact post-séisme.",
                ar: 'توظيف خبراء في التواصل، المواكبة النفسية وتحليل الأثر بعد الزلزال.',
                en: 'Recruiting experts in communication, psychosocial support, and post-earthquake impact analysis.',
            },
            link: 'https://tanmia.ma/07-05-2025/76657/',
        },
        {
            icon: Mail,
            title: {
                fr: 'Contact & partenariats',
                ar: 'الاتصال والشراكات',
                en: 'Contact & partnerships',
            },
            description: {
                fr: 'Écrivez-nous : coalitionisrar@gmail.com | projets.coalition.israr@gmail.com',
                ar: 'راسلونا: coalitionisrar@gmail.com | projets.coalition.israr@gmail.com',
                en: 'Reach us at: coalitionisrar@gmail.com | projets.coalition.israr@gmail.com',
            },
        },
    ];

    return (
        <AppLayout>
            <Head title="Bienvenue" />
            <div>
                <div className="bg-white/85 backdrop-blur-sm dark:bg-neutral-950/80">
                    {/* Hero Section */}
                    <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 md:flex-row md:items-center md:justify-between md:py-20">
                        <div className="flex-1 space-y-6">
                            <span className="inline-flex items-center rounded-full bg-[var(--color-beta)]/20 px-4 py-1 text-sm font-semibold text-[var(--color-alpha)]">
                                <TransText
                                    fr="Depuis plus de 10 ans au service des droits des femmes"
                                    ar="أكثر من عشر سنوات في خدمة حقوق النساء"
                                    en="Over 10 years championing women's rights"
                                />
                            </span>

                            <h1 className="text-3xl font-bold text-[var(--color-alpha)] md:text-5xl">
                                <TransText
                                    fr="Une plateforme engagée pour l'égalité et l'empowerment"
                                    ar="منصة ملتزمة بالمساواة والتمكين"
                                    en="A platform committed to equality and empowerment"
                                />
                            </h1>
                            <p className="max-w-xl text-sm text-neutral-600 dark:text-neutral-300 md:text-base">
                                <TransText
                                    fr="Réseau national de 19 associations, la Coalition ISRAR agit dans 8 régions du Maroc pour l'élimination des violences fondées sur le genre."
                                    ar="شبكة وطنية تضم 19 جمعية، يعمل تحالف إصرار في 8 جهات بالمغرب من أجل القضاء على العنف المبني على النوع الاجتماعي."
                                    en="A national network of 19 associations, the ISRAR Coalition operates across 8 regions of Morocco to eliminate gender-based violence."
                                />
                            </p>

                            <div className="flex flex-wrap items-center gap-4">
                                <Button asChild className="bg-[var(--color-beta)] text-white hover:bg-[var(--color-beta)]/90">
                                    <Link href="/a-propos">
                                        <TransText
                                            fr="Découvrir la coalition"
                                            ar="اكتشف التحالف"
                                            en="Discover the coalition"
                                        />
                                    </Link>
                                </Button>
                                <Link href="/login" className="text-sm font-medium text-[var(--color-alpha)] underline underline-offset-4 hover:text-[var(--color-beta)]">
                                    <TransText
                                        fr="Se connecter"
                                        ar="تسجيل الدخول"
                                        en="Sign in"
                                    />
                                </Link>
                            </div>
                        </div>

                        <div className="flex-1 md:max-w-xl">
                            <ImageCarousel slides={carouselSlides} />
                        </div>
                    </section>

                    {/* Impact Counters Section */}
                    <section className="border-y border-[var(--color-alpha)]/10 bg-[var(--color-alpha)]/5 py-12 dark:bg-[var(--color-alpha)]/10">
                        <div className="mx-auto max-w-6xl px-6">
                            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                                {impactCounters.map(({ value, prefix, label, icon: Icon }) => (
                                    <div key={label.en} className="text-center">
                                        <div className="mx-auto mb-3 inline-flex rounded-xl bg-[var(--color-beta)]/15 p-3 text-[var(--color-beta)]">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <div className="text-3xl font-extrabold text-[var(--color-alpha)] md:text-4xl">
                                            <AnimatedCounter target={value} prefix={prefix} />
                                        </div>
                                        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                                            <TransText fr={label.fr} ar={label.ar} en={label.en} />
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Why trust us */}
                    <section className="mx-auto max-w-6xl px-6 py-16">
                        <div className="mx-auto mb-10 max-w-3xl text-center">
                            <h2 className="text-2xl font-bold text-[var(--color-alpha)] md:text-3xl">
                                <TransText
                                    fr="Pourquoi des milliers de femmes nous font confiance"
                                    ar="لماذا تثق بنا آلاف النساء"
                                    en="Why thousands of women trust us"
                                />
                            </h2>
                            <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300 md:text-base">
                                <TransText
                                    fr="Nous combinons expertise juridique, écoute psychosociale et gouvernance numérique pour garantir des parcours sécurisés."
                                    ar="نجمع بين الخبرة القانونية، الإصغاء النفساني الاجتماعي والحكامة الرقمية لضمان مسارات آمنة."
                                    en="We combine legal expertise, psychosocial listening, and digital governance to ensure safe pathways."
                                />
                            </p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-3">
                            {highlightCards.map(({ icon: Icon, title, description }) => (
                                <div key={title.en} className="rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ring-white/50 transition hover:-translate-y-1 hover:shadow-lg dark:bg-neutral-900/60 dark:ring-white/10">
                                    <div className="mb-4 inline-flex rounded-xl bg-[var(--color-beta)]/15 p-3 text-[var(--color-beta)]">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="mb-2 text-lg font-semibold text-[var(--color-alpha)]">
                                        <TransText fr={title.fr} ar={title.ar} en={title.en} />
                                    </h3>
                                    <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-200">
                                        <TransText fr={description.fr} ar={description.ar} en={description.en} />
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Missions (without Constats) */}
                    <section className="mx-auto max-w-6xl px-6 pb-20">
                        <div className="mx-auto mb-10 max-w-3xl text-center">
                            <h2 className="text-2xl font-bold text-[var(--color-alpha)] md:text-3xl">
                                <TransText
                                    fr="Nos missions"
                                    ar="مهامنا"
                                    en="Our missions"
                                />
                            </h2>
                        </div>
                        <div className="mx-auto max-w-2xl">
                            <article className="rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ring-white/50 backdrop-blur dark:bg-neutral-900/60 dark:ring-white/10">
                                <h2 className="mb-4 text-xl font-semibold text-[var(--color-alpha)]">
                                    <TransText
                                        fr="Une plateforme de référence pour :"
                                        ar="منصة مرجعية من أجل:"
                                        en="A reference platform to:"
                                    />
                                </h2>
                                <ul className="space-y-3 text-neutral-800 dark:text-neutral-100">
                                    {missionItems.map((item) => (
                                        <li key={item.en} className="flex items-start gap-3">
                                            <span className="mt-1 inline-block size-2 rounded-full bg-[var(--color-beta)]" />
                                            <span className="text-sm font-medium md:text-base">
                                                <TransText fr={item.fr} ar={item.ar} en={item.en} />
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        </div>
                    </section>

                    {/* Programmes & Advocacy */}
                    <section className="bg-white/90 py-16 dark:bg-neutral-950/70">
                        <div className="mx-auto max-w-6xl px-6">
                            <div className="mx-auto mb-10 max-w-3xl text-center">
                                <h2 className="text-2xl font-bold text-[var(--color-alpha)] md:text-3xl">
                                    <TransText
                                        fr="Programmes et plaidoyers en action"
                                        ar="برامج ومرافعات على أرض الواقع"
                                        en="Programs and advocacy in action"
                                    />
                                </h2>
                                <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300 md:text-base">
                                    <TransText
                                        fr="Une présence nationale et maghrébine à travers des projets cofinancés, des campagnes de communication et un plaidoyer continu pour la réforme des lois."
                                        ar="حضور وطني ومغاربي عبر مشاريع ممولة، حملات تواصل ومرافعة مستمرة لإصلاح القوانين."
                                        en="A national and Maghreb-wide presence through co-funded projects, communication campaigns, and sustained legal advocacy."
                                    />
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-3">
                                {initiatives.map(({ icon: Icon, title, description, link }) => (
                                    <div key={title.en} className="flex h-full flex-col rounded-2xl bg-[var(--color-alpha)]/10 p-6 shadow-sm ring-1 ring-[var(--color-alpha)]/20 transition hover:-translate-y-1 hover:shadow-lg dark:bg-[var(--color-alpha)]/20">
                                        <div className="mb-4 inline-flex rounded-xl bg-[var(--color-alpha)]/15 p-3 text-[var(--color-alpha)]">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="mb-2 text-lg font-semibold text-[var(--color-alpha)]">
                                            <TransText fr={title.fr} ar={title.ar} en={title.en} />
                                        </h3>
                                        <p className="flex-1 text-sm leading-relaxed text-neutral-700 dark:text-neutral-100">
                                            <TransText fr={description.fr} ar={description.ar} en={description.en} />
                                        </p>
                                        {link && (
                                            <Link
                                                href={link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="mt-4 inline-flex items-center text-sm font-semibold text-[var(--color-alpha)] underline underline-offset-4"
                                            >
                                                <TransText fr="En savoir plus" ar="اكتشف المزيد" en="Learn more" />
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Testimonials Section */}
                    <section className="mx-auto max-w-6xl px-6 py-16">
                        <div className="mx-auto mb-10 max-w-3xl text-center">
                            <h2 className="text-2xl font-bold text-[var(--color-alpha)] md:text-3xl">
                                <TransText
                                    fr="Témoignages du terrain"
                                    ar="شهادات من الميدان"
                                    en="Testimonials from the field"
                                />
                            </h2>
                            <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300 md:text-base">
                                <TransText
                                    fr="Des voix qui témoignent de l'impact de notre action collective."
                                    ar="أصوات تشهد على أثر عملنا الجماعي."
                                    en="Voices that testify to the impact of our collective action."
                                />
                            </p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-3">
                            {testimonials.map((t, idx) => (
                                <div key={idx} className="flex flex-col rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ring-white/50 dark:bg-neutral-900/60 dark:ring-white/10">
                                    <Quote className="mb-3 h-8 w-8 text-[var(--color-beta)]/40" />
                                    <p className="flex-1 text-sm italic leading-relaxed text-neutral-700 dark:text-neutral-200">
                                        <TransText fr={t.quote.fr} ar={t.quote.ar} en={t.quote.en} />
                                    </p>
                                    <div className="mt-4 flex items-center gap-3 border-t border-neutral-200 pt-4 dark:border-neutral-700">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-alpha)]/10 text-sm font-bold text-[var(--color-alpha)]">
                                            {t.name.fr.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-[var(--color-alpha)]">
                                                <TransText fr={t.name.fr} ar={t.name.ar} en={t.name.en} />
                                            </p>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                                <TransText fr={t.region.fr} ar={t.region.ar} en={t.region.en} />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Institutional Partners Carousel */}
                    {displayedPartners.length > 0 && (
                        <section className="border-y border-[var(--color-alpha)]/10 bg-neutral-50 py-12 dark:bg-neutral-900/40">
                            <div className="mx-auto max-w-6xl px-6">
                                <h2 className="mb-8 text-center text-xl font-bold text-[var(--color-alpha)] md:text-2xl">
                                    <TransText
                                        fr="Nos partenaires institutionnels"
                                        ar="شركاؤنا المؤسساتيون"
                                        en="Our institutional partners"
                                    />
                                </h2>
                                <div className="relative overflow-hidden">
                                    <div className="animate-marquee flex gap-12 whitespace-nowrap">
                                        {[...displayedPartners, ...displayedPartners].map((partner, idx) => (
                                            <div
                                                key={`${partner.id}-${idx}`}
                                                className="flex h-16 min-w-[160px] items-center justify-center rounded-lg bg-white px-6 shadow-sm ring-1 ring-neutral-200 dark:bg-neutral-800 dark:ring-neutral-700"
                                            >
                                                {partner.logo_url ? (
                                                    <img src={partner.logo_url} alt={partner.name} className="h-10 max-w-[130px] object-contain" />
                                                ) : partner.website_url ? (
                                                    <a
                                                        href={partner.website_url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-sm font-semibold text-neutral-600 underline underline-offset-2 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
                                                    >
                                                        {partner.name}
                                                    </a>
                                                ) : (
                                                    <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-300">{partner.name}</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <style>{`
                                @keyframes marquee {
                                    0% { transform: translateX(0); }
                                    100% { transform: translateX(-50%); }
                                }
                                .animate-marquee {
                                    animation: marquee 30s linear infinite;
                                }
                                .animate-marquee:hover {
                                    animation-play-state: paused;
                                }
                            `}</style>
                        </section>
                    )}

                    {/* Opportunities & CTA */}
                    <section className="mx-auto max-w-6xl px-6 py-16">
                        <div className="grid gap-8 md:grid-cols-2">
                            <div className="rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ring-white/50 dark:bg-neutral-900/60 dark:ring-white/10">
                                <h2 className="mb-4 text-xl font-semibold text-[var(--color-alpha)]">
                                    <TransText
                                        fr="Opportunités & collaborations"
                                        ar="فرص وتعاون"
                                        en="Opportunities & collaborations"
                                    />
                                </h2>
                                <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-200">
                                    <TransText
                                        fr="Participez à notre dynamique : appels à projets, recrutements, partenariats institutionnels et appui aux initiatives locales."
                                        ar="انخرطوا في ديناميتنا: طلبات المشاريع، التوظيف، الشراكات المؤسساتية ودعم المبادرات المحلية."
                                        en="Join our momentum: project calls, recruitment, institutional partnerships, and support for local initiatives."
                                    />
                                </p>
                                <div className="space-y-4">
                                    {opportunities.map(({ icon: Icon, title, description, link }) => (
                                        <div key={title.en} className="flex items-start gap-3 rounded-xl bg-[var(--color-beta)]/15 p-4 text-[var(--color-alpha)]">
                                            <Icon className="mt-1 h-5 w-5" />
                                            <div>
                                                <h3 className="text-sm font-semibold md:text-base">
                                                    <TransText fr={title.fr} ar={title.ar} en={title.en} />
                                                </h3>
                                                <p className="text-xs text-neutral-700 dark:text-neutral-100 md:text-sm">
                                                    <TransText fr={description.fr} ar={description.ar} en={description.en} />
                                                </p>
                                                {link && (
                                                    <Link
                                                        href={link}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="mt-1 inline-flex text-xs font-semibold text-[var(--color-alpha)] underline underline-offset-4"
                                                    >
                                                        <TransText fr="Voir l'annonce" ar="عرض التفاصيل" en="View details" />
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col justify-between rounded-2xl bg-[var(--color-alpha)]/90 p-6 text-white shadow-lg">
                                <div>
                                    <h2 className="text-xl font-semibold md:text-2xl">
                                        <TransText
                                            fr="Ensemble, créons une plateforme plus inclusive"
                                            ar="معًا، لنخلق منصة أكثر شمولاً"
                                            en="Together, let's build a more inclusive platform"
                                        />
                                    </h2>
                                    <p className="mt-4 text-sm text-white/90 md:text-base">
                                        <TransText
                                            fr="Vous disposez de ressources, d'histoires à raconter ou souhaitez contribuer techniquement ? Partagez votre vision et co-construisons la prochaine version de la plateforme ISRAR."
                                            ar="لديكم موارد، قصص لتقاسمها أو ترغبون في المساهمة التقنية؟ شاركونا رؤيتكم ولنبني النسخة القادمة من منصة إصرار."
                                            en="Have resources, stories to share, or want to contribute technically? Share your vision and co-build the next version of ISRAR's platform."
                                        />
                                    </p>
                                </div>
                                <div className="mt-6">
                                    <Button asChild className="bg-white text-[var(--color-alpha)] hover:bg-white/90">
                                        <Link href="/contact#partenariats">
                                            <TransText fr="Devenir partenaire" ar="كن شريكًا" en="Become a partner" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
