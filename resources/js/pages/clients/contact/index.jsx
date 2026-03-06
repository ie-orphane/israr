import AppLayout from '@/layouts/app-layout';
import TransText from '@components/TransText';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Clock,
    Mail,
    MapPin,
    MessageCircleHeart,
    Phone,
    ShieldCheck,
    Users,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs = [
    {
        title: 'Contact',
        href: '/contact',
    },
];

const heroHighlights = [
    {
        icon: ShieldCheck,
        title: {
            fr: 'Accompagnement sécurisé',
            ar: 'مواكبة آمنة',
            en: 'Secure support',
        },
        description: {
            fr: 'Confidentialité totale et suivi personnalisé pour chaque situation signalée.',
            ar: 'سرية تامة ومتابعة شخصية لكل حالة يتم التبليغ عنها.',
            en: 'Full confidentiality and dedicated follow-up for every reported case.',
        },
    },
    {
        icon: MessageCircleHeart,
        title: {
            fr: 'Écoute pluridisciplinaire',
            ar: 'إنصات متعدد التخصصات',
            en: 'Multidisciplinary listening',
        },
        description: {
            fr: 'Juristes, psychologues et médiatrices mobilisées au service des survivantes.',
            ar: 'خبراء قانونيون، أخصائيات نفسانيات ووسيطات في خدمة الناجيات.',
            en: 'Legal experts, psychologists, and mediators dedicated to survivors.',
        },
    },
    {
        icon: Users,
        title: {
            fr: 'Réseau national',
            ar: 'شبكة وطنية',
            en: 'National network',
        },
        description: {
            fr: 'Présence dans plusieurs régions du Maroc via nos partenaires ISRAR.',
            ar: 'حضور في عدة جهات بالمغرب بفضل شركائنا في تحالف إصرار.',
            en: 'Presence across Morocco through the ISRAR partner network.',
        },
    },
];

const contactMethods = [
    {
        icon: Phone,
        title: {
            fr: 'Ligne d’écoute d’urgence',
            ar: 'خط الاستماع المستعجل',
            en: 'Emergency listening line',
        },
        description: {
            fr: 'Notre équipe répond 7j/7 pour orienter et sécuriser les survivantes.',
            ar: 'فريقنا يستجيب طيلة أيام الأسبوع لتوجيه الناجيات وضمان حمايتهن.',
            en: 'Our team answers 7 days a week to guide and protect survivors.',
        },
        actions: [
            {
                type: 'link',
                href: 'tel:+212537000012',
                label: {
                    fr: 'Appelez le +212 5 37 00 00 12',
                    ar: 'اتصلوا على +212 5 37 00 00 12',
                    en: 'Call +212 5 37 00 00 12',
                },
            },
            {
                type: 'text',
                label: {
                    fr: 'Disponible de 9h à 22h, avec astreinte de nuit si besoin.',
                    ar: 'متاح من التاسعة صباحاً إلى العاشرة ليلاً، مع المداومة ليلاً عند الحاجة.',
                    en: 'Available 9am–10pm with night duty when needed.',
                },
            },
        ],
    },
    {
        icon: Mail,
        title: {
            fr: 'Contacts électroniques',
            ar: 'التواصل الإلكتروني',
            en: 'Digital contact',
        },
        description: {
            fr: 'Écrivez-nous pour toute demande d’information, de partenariat ou de service.',
            ar: 'راسلونا لأي طلب معلومات، شراكة أو دعم مباشر.',
            en: 'Write to us for information, partnerships, or direct support.',
        },
        actions: [
            {
                type: 'link',
                href: 'mailto:coalitionisrar@gmail.com',
                label: {
                    fr: 'coalitionisrar@gmail.com',
                    ar: 'coalitionisrar@gmail.com',
                    en: 'coalitionisrar@gmail.com',
                },
            },
            {
                type: 'link',
                href: 'mailto:projets.coalition.israr@gmail.com',
                label: {
                    fr: 'projets.coalition.israr@gmail.com',
                    ar: 'projets.coalition.israr@gmail.com',
                    en: 'projets.coalition.israr@gmail.com',
                },
            },
        ],
    },
    {
        icon: MapPin,
        title: {
            fr: 'Maison ISRAR Rabat',
            ar: 'دار إصرار بالرباط',
            en: 'ISRAR House Rabat',
        },
        description: {
            fr: 'Espace d’accueil, de formation et de mobilisation pour l’égalité.',
            ar: 'فضاء للاستقبال، التكوين والتعبئة من أجل المساواة.',
            en: 'Welcoming, training, and mobilisation hub for equality.',
        },
        actions: [
            {
                type: 'text',
                label: {
                    fr: '10 Avenue Allal Ben Abdellah, Quartier Hassan, Rabat 10000',
                    ar: '10 شارع علال بن عبد الله، حي حسان، الرباط 10000',
                    en: '10 Avenue Allal Ben Abdellah, Hassan District, Rabat 10000',
                },
            },
            {
                type: 'text',
                label: {
                    fr: 'Accueil du lundi au vendredi, 9h00 – 17h30.',
                    ar: 'الاستقبال من الاثنين إلى الجمعة، 9:00 – 17:30.',
                    en: 'Open Monday to Friday, 9:00am – 5:30pm.',
                },
                icon: Clock,
            },
        ],
    },
];

const commitments = [
    {
        title: {
            fr: 'Réponse sous 24h',
            ar: 'رد في أقل من 24 ساعة',
            en: 'Answer within 24h',
        },
        description: {
            fr: 'Chaque message reçoit un accusé et une orientation prioritaire.',
            ar: 'كل رسالة تتلقى تأكيداً وتوجيهاً ذا أولوية.',
            en: 'Every message receives an acknowledgement and priority guidance.',
        },
    },
    {
        title: {
            fr: 'Suivi pluri-acteur',
            ar: 'تتبع متعدد الفاعلين',
            en: 'Multi-actor follow-up',
        },
        description: {
            fr: 'Coordination avec avocats, psychologues, et partenaires territoriaux.',
            ar: 'تنسيق مع محامين، أخصائيات نفسانيات وشركاء جهويين.',
            en: 'Coordination with lawyers, psychologists, and local partners.',
        },
    },
    {
        title: {
            fr: 'Protection des données',
            ar: 'حماية المعطيات',
            en: 'Data protection',
        },
        description: {
            fr: 'Traçabilité et stockage sécurisés conformes aux standards internationaux.',
            ar: 'تتبع وتخزين آمن مطابق للمعايير الدولية.',
            en: 'Traceability and secure storage aligned with international standards.',
        },
    },
];

const Contact = () => {
    const [status, setStatus] = useState('idle');

    const handleSubmit = (event) => {
        event.preventDefault();
        setStatus('success');
        event.currentTarget.reset();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contact" />
            <div className="w-full bg-light_gray pb-24">
                {/* Simple banner header (programmes style) */}
                <div className="bg-[var(--color-alpha)] text-white">
                    <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
                        <div className="text-center space-y-3">
                            <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
                                <TransText fr="Contact" ar="اتصال" en="Contact" />
                            </h1>
                            <p className="text-sm text-white/90 md:text-base">
                                <TransText
                                    fr="Échangeons simplement : un message, un appel ou une visite."
                                    ar="فلنتواصل ببساطة: رسالة، اتصال أو زيارة."
                                    en="Reach out easily: a message, a call, or a visit."
                                />
                            </p>
                        </div>
                    </div>
                </div>

                <section className="mx-auto -mt-16 max-w-6xl space-y-8 px-6 md:-mt-20">
                    <div className="grid gap-6 md:grid-cols-3">
                        {contactMethods.map(({ icon: Icon, title, description, actions }) => (
                            <div
                                key={title.en}
                                className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-[var(--color-alpha)]/10 transition hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-[var(--color-beta)]/15 text-[var(--color-alpha)]">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-semibold text-[var(--color-alpha)]">
                                    <TransText fr={title.fr} ar={title.ar} en={title.en} />
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                                    <TransText fr={description.fr} ar={description.ar} en={description.en} />
                                </p>
                                <div className="mt-4 space-y-2 text-sm font-medium text-neutral-800">
                                    {actions.map((action, index) => {
                                        const content = (
                                            <TransText key={index} fr={action.label.fr} ar={action.label.ar} en={action.label.en} />
                                        );

                                        if (action.type === 'link') {
                                            return (
                                                <Link
                                                    key={action.label.en}
                                                    href={action.href}
                                                    className="flex items-center gap-2 text-[var(--color-alpha)] underline underline-offset-4 hover:text-[var(--color-beta)]"
                                                >
                                                    {content}
                                                </Link>
                                            );
                                        }

                                        return (
                                            <p key={action.label.en} className="flex items-center gap-2 text-neutral-600">
                                                {action.icon ? <action.icon className="h-4 w-4 text-[var(--color-alpha)]" /> : null}
                                                {content}
                                            </p>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mx-auto mt-16 max-w-6xl px-6">
                    <div className="grid gap-8 rounded-3xl bg-white p-8 shadow-lg ring-1 ring-[var(--color-alpha)]/10 md:grid-cols-2">
                        <div className="space-y-4">
                            <span className="inline-flex items-center rounded-full bg-[var(--color-beta)]/15 px-4 py-1 text-sm font-semibold text-[var(--color-alpha)]">
                                <TransText fr="Nos engagements" ar="التزاماتنا" en="Our commitments" />
                            </span>
                            <h2 className="text-2xl font-bold text-[var(--color-alpha)] md:text-3xl">
                                <TransText
                                    fr="Une réponse holistique, humaine et coordonnée"
                                    ar="استجابة شمولية وإنسانية ومنسقة"
                                    en="Holistic, human, and coordinated response"
                                />
                            </h2>
                            <p className="text-sm text-neutral-600 md:text-base">
                                <TransText
                                    fr="Nous plaçons chaque survivante au centre, avec un accompagnement juridique, psychosocial et communautaire adapté à sa réalité."
                                    ar="نضع كل ناجية في صلب الاهتمام، بمواكبة قانونية ونفسية ومجتمعية ملائمة لواقعها."
                                    en="We place every survivor at the center, providing legal, psychosocial, and community support tailored to her reality."
                                />
                            </p>
                            <div className="space-y-4">
                                {commitments.map(({ title, description }) => (
                                    <div key={title.en} className="rounded-2xl border border-[var(--color-beta)]/20 bg-[var(--color-beta)]/10 p-4">
                                        <h3 className="text-base font-semibold text-[var(--color-alpha)]">
                                            <TransText fr={title.fr} ar={title.ar} en={title.en} />
                                        </h3>
                                        <p className="mt-1 text-sm text-neutral-700">
                                            <TransText fr={description.fr} ar={description.ar} en={description.en} />
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-3xl border border-dashed border-[var(--color-alpha)]/30 bg-[var(--color-alpha)]/5 p-6">
                            <h3 className="text-lg font-semibold text-[var(--color-alpha)]">
                                <TransText
                                    fr="Prendre soin de chaque demande"
                                    ar="العناية بكل طلب"
                                    en="Caring for every request"
                                />
                            </h3>
                            <ul className="mt-4 space-y-3 text-sm text-neutral-700">
                                <li className="flex items-start gap-3">
                                    <span className="mt-1 inline-block size-2 rounded-full bg-[var(--color-beta)]" />
                                    <TransText
                                        fr="Première analyse effectuée dans la journée pour prioriser les urgences."
                                        ar="يتم تحليل أولي خلال اليوم لتحديد الأولويات المستعجلة."
                                        en="Initial analysis performed the same day to prioritise emergencies."
                                    />
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1 inline-block size-2 rounded-full bg-[var(--color-beta)]" />
                                    <TransText
                                        fr="Coordination avec les cellules provinciales de lutte contre les violences faites aux femmes."
                                        ar="تنسيق مع الخلايا الإقليمية لمحاربة العنف ضد النساء."
                                        en="Coordination with provincial units working against violence toward women."
                                    />
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1 inline-block size-2 rounded-full bg-[var(--color-beta)]" />
                                    <TransText
                                        fr="Orientation vers des ressources partenaires : refuges, soutien économique, ateliers de reconstruction."
                                        ar="توجيه نحو موارد شركائنا: مراكز إيواء، دعم اقتصادي، ورشات إعادة البناء."
                                        en="Orientation toward partner resources: shelters, economic support, and recovery workshops."
                                    />
                                </li>
                            </ul>
                            <div className="mt-6 rounded-2xl bg-white p-4 text-sm text-neutral-700 shadow-inner">
                                <p>
                                    <TransText
                                        fr="Besoin d’une intervention rapide ? Utilisez la ligne téléphonique pour une prise en charge immédiate. Pour les partenariats, précisez votre structure et vos besoins dans le formulaire."
                                        ar="تحتاجون إلى تدخل سريع؟ استعملوا الخط الهاتفي للتكفل الفوري. بالنسبة للشراكات، يرجى ذكر هيئتكم واحتياجاتكم في الاستمارة."
                                        en="Need rapid intervention? Use the hotline for immediate support. For partnerships, please detail your organisation and needs in the form."
                                    />
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto mt-16 max-w-6xl px-6">
                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-[var(--color-alpha)]/10">
                            <h2 className="text-2xl font-bold text-[var(--color-alpha)]">
                                <TransText fr="Envoyez-nous un message" ar="أرسلوا لنا رسالة" en="Send us a message" />
                            </h2>
                            <p className="mt-2 text-sm text-neutral-600">
                                <TransText
                                    fr="Renseignez les informations ci-dessous ; notre équipe vous répond sous 24 heures ouvrées."
                                    ar="املؤوا المعلومات أدناه، سيتواصل فريقنا معكم في أقل من 24 ساعة عمل."
                                    en="Fill in the information below; our team will get back to you within one business day."
                                />
                            </p>
                            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullname">
                                            <TransText fr="Nom complet" ar="الاسم الكامل" en="Full name" />
                                        </Label>
                                        <Input id="fullname" name="fullname" placeholder="Aïcha Benali" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">
                                            <TransText fr="Adresse e-mail" ar="البريد الإلكتروني" en="Email address" />
                                        </Label>
                                        <Input id="email" name="email" type="email" placeholder="vous@example.com" required />
                                    </div>
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">
                                            <TransText fr="Téléphone" ar="الهاتف" en="Phone" />
                                        </Label>
                                        <Input id="phone" name="phone" type="tel" placeholder="+212 6 00 00 00 00" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subject">
                                            <TransText fr="Sujet" ar="الموضوع" en="Subject" />
                                        </Label>
                                        <Input id="subject" name="subject" placeholder="Demande d’accompagnement juridique" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message">
                                        <TransText fr="Message" ar="الرسالة" en="Message" />
                                    </Label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        required
                                        placeholder="Décrivez votre besoin ou la situation à traiter..."
                                        className="border-input placeholder:text-muted-foreground selection:bg-[var(--color-alpha)]/10 selection:text-[var(--color-alpha)] focus-visible:border-[var(--color-beta)] focus-visible:ring-[var(--color-beta)]/40 focus-visible:ring-[3px] dark:selection:bg-[var(--color-alpha)]/30 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-colors outline-none"
                                    />
                                </div>
                                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                    <p className="text-xs text-neutral-500">
                                        <TransText
                                            fr="En envoyant ce message, vous acceptez que nous traitions vos données pour vous répondre."
                                            ar="بإرسالكم لهذه الرسالة، توافقون على معالجة معطياتكم للرد عليكم."
                                            en="By sending this message, you agree to our processing of your data to respond."
                                        />
                                    </p>
                                    <Button type="submit" className="bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90">
                                        <TransText fr="Envoyer le message" ar="إرسال الرسالة" en="Send message" />
                                    </Button>
                                </div>
                                {status === 'success' ? (
                                    <div className="rounded-md border border-[var(--color-alpha)]/20 bg-[var(--color-alpha)]/10 px-4 py-3 text-sm text-[var(--color-alpha)]">
                                        <TransText
                                            fr="Merci pour votre message. Une conseillère ISRAR vous contactera très prochainement."
                                            ar="شكراً على رسالتكم. ستتواصل معكم مستشارة من إصرار في أقرب وقت."
                                            en="Thank you for your message. An ISRAR counsellor will reach out shortly."
                                        />
                                    </div>
                                ) : null}
                            </form>
                        </div>
                        <div className="relative h-[480px] overflow-hidden rounded-3xl shadow-lg">
                            <iframe
                                title="Coalition ISRAR location"
                                src="https://maps.google.com/maps?q=Rabat%20Morocco&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                className="h-full w-full border-0"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--color-alpha)]/10 via-transparent to-black/5" />
                        </div>
                    </div>
                </section>

                <section className="mx-auto mt-16 max-w-6xl px-6">
                    <div className="relative overflow-hidden rounded-3xl bg-[var(--color-alpha)] text-white">
                        <div className="absolute inset-0 zlij opacity-40" />
                        <div className="relative flex flex-col gap-6 px-8 py-10 md:flex-row md:items-center md:justify-between md:py-14">
                            <div className="max-w-3xl space-y-3">
                                <h2 className="text-2xl font-bold md:text-3xl">
                                    <TransText
                                        fr="Vous représentez une institution ou un collectif ?"
                                        ar="تمثلون مؤسسة أو شبكة جمعوية؟"
                                        en="Representing an institution or collective?"
                                    />
                                </h2>
                                <p className="text-sm text-white/85 md:text-base">
                                    <TransText
                                        fr="Co-créons des programmes, ateliers ou observatoires pour amplifier la voix des femmes et rendre visibles les violences basées sur le genre."
                                        ar="لنبن معاً برامج، ورشات أو مراصد لتعزيز صوت النساء وكشف العنف المبني على النوع."
                                        en="Let’s co-create programmes, workshops, and observatories to amplify women’s voices and make gender-based violence visible."
                                    />
                                </p>
                            </div>
                            <Button
                                asChild
                                className="bg-white text-[var(--color-alpha)] hover:bg-white/90"
                            >
                                <Link href="mailto:projets.coalition.israr@gmail.com">
                                    <TransText fr="Proposer une collaboration" ar="اقترحوا تعاونا" en="Propose a collaboration" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
};

export default Contact;