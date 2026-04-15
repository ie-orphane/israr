import AppLayout from '@/layouts/app-layout';
import InputError from '@/components/input-error';
import { Head, useForm, usePage } from '@inertiajs/react';
import TransText from '@components/TransText';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Facebook, Instagram, Linkedin, Send } from 'lucide-react';

function XIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M18.244 2H21.5l-7.114 8.13L22.75 22h-6.547l-5.131-6.708L5.2 22H1.94l7.607-8.695L1.5 2h6.713l4.638 6.13L18.244 2Zm-1.144 18h1.802L7.228 3.894H5.3L17.1 20Z" />
        </svg>
    );
}

const emailContacts = [
    {
        label: { fr: 'Partenariats', ar: 'الشراكات', en: 'Partnerships' },
        email: 'partenariats@coalitionisrar.org',
        description: {
            fr: 'Pour les demandes de collaboration institutionnelle.',
            ar: 'لطلبات التعاون المؤسساتي.',
            en: 'For institutional collaboration requests.',
        },
    },
    {
        label: { fr: 'Presse', ar: 'الصحافة', en: 'Press' },
        email: 'presse@coalitionisrar.org',
        description: {
            fr: 'Demandes médias et interviews.',
            ar: 'طلبات الإعلام والمقابلات.',
            en: 'Media requests and interviews.',
        },
    },
    {
        label: { fr: 'Volontariat', ar: 'التطوع', en: 'Volunteering' },
        email: 'volontariat@coalitionisrar.org',
        description: {
            fr: 'Rejoindre nos actions en tant que bénévole.',
            ar: 'الانضمام إلى أنشطتنا كمتطوع.',
            en: 'Join our actions as a volunteer.',
        },
    },
    {
        label: { fr: 'Contact général', ar: 'الاتصال العام', en: 'General contact' },
        email: 'coalitionisrar@gmail.com',
        description: {
            fr: 'Pour toute autre demande ou question.',
            ar: 'لأي طلب أو سؤال آخر.',
            en: 'For any other request or question.',
        },
    },
];

const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/coalitionisrar', color: 'hover:bg-blue-600' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/coalitionisrar', color: 'hover:bg-pink-600' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/coalitionisrar', color: 'hover:bg-blue-700' },
    { name: 'X - Twitter', icon: XIcon, href: 'https://x.com/coalitionisrar', color: 'hover:bg-neutral-900' },
];

export default function Contact() {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post('/contact', {
            preserveScroll: true,
            onSuccess: () => reset('subject', 'message'),
        });
    };

    return (
        <AppLayout>
            <Head title="Contact" />
            <div className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f7f4fb_45%,#ffffff_100%)]">
                <section className="mx-auto max-w-6xl px-4 pb-4 pt-8 sm:px-6 lg:px-8 lg:pt-12">
                    <div className="overflow-hidden rounded-3xl border border-[var(--color-alpha)]/15 bg-white shadow-sm">
                        <div className="relative p-7 sm:p-10">
                            <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[var(--color-beta)]/15 blur-2xl" />
                            <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-[var(--color-alpha)]/15 blur-2xl" />
                            <div className="relative">
                                <span className="inline-flex items-center rounded-full border border-[var(--color-alpha)]/20 bg-[var(--color-alpha)]/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-alpha)]">
                                    <TransText fr="Contact ISRAR" ar="تواصل مع إصرار" en="Contact ISRAR" />
                                </span>
                                <h1 className="mt-4 text-3xl font-bold tracking-tight text-[var(--color-alpha)] md:text-4xl">
                                    <TransText fr="Contactez-nous" ar="اتصلوا بنا" en="Contact us" />
                                </h1>
                                <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-600 md:text-base">
                                    <TransText
                                        fr="Nous sommes à votre écoute. Contactez-nous pour toute question, partenariat ou collaboration."
                                        ar="نحن في خدمتكم. تواصلوا معنا لأي سؤال أو شراكة أو تعاون."
                                        en="We are here to listen. Reach out for any question, partnership, or collaboration."
                                    />
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Email Contacts */}
                <section id="partenariats" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
                    <h2 className="mb-8 text-center text-2xl font-bold text-[var(--color-alpha)] md:text-3xl">
                        <TransText fr="Écrivez-nous" ar="راسلونا" en="Write to us" />
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {emailContacts.map((contact, idx) => (
                            <a
                                key={idx}
                                href={`mailto:${contact.email}`}
                                className="group flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200 transition hover:-translate-y-0.5 hover:shadow-md dark:bg-neutral-900 dark:ring-neutral-700"
                            >
                                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--color-beta)]/15 text-[var(--color-beta)]">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-[var(--color-alpha)] group-hover:text-[var(--color-beta)]">
                                        <TransText fr={contact.label.fr} ar={contact.label.ar} en={contact.label.en} />
                                    </h3>
                                    <p className="text-sm font-medium text-[var(--color-beta)]">{contact.email}</p>
                                    <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                                        <TransText fr={contact.description.fr} ar={contact.description.ar} en={contact.description.en} />
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>

                {/* Map + Form */}
                <section className="bg-neutral-50 py-16 dark:bg-neutral-900/40">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-8 lg:grid-cols-2">
                            {/* Map */}
                            <div>
                                <h2 className="mb-4 text-xl font-bold text-[var(--color-alpha)]">
                                    <TransText fr="Notre localisation" ar="موقعنا" en="Our location" />
                                </h2>
                                <div className="overflow-hidden rounded-2xl ring-1 ring-neutral-200 dark:ring-neutral-700">
                                    <iframe
                                        title="ISRAR Location"
                                        src="https://www.openstreetmap.org/export/embed.html?bbox=-7.65%2C33.55%2C-7.55%2C33.61&layer=mapnik&marker=33.5731%2C-7.5898"
                                        width="100%"
                                        height="350"
                                        className="border-0"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="mt-4 flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-beta)]" />
                                    <span>
                                        <TransText
                                            fr="Casablanca, Maroc – Siège de la Coalition ISRAR"
                                            ar="الدار البيضاء، المغرب – مقر تحالف إصرار"
                                            en="Casablanca, Morocco – ISRAR Coalition Headquarters"
                                        />
                                    </span>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div>
                                <h2 className="mb-4 text-xl font-bold text-[var(--color-alpha)]">
                                    <TransText fr="Formulaire de contact" ar="نموذج الاتصال" en="Contact form" />
                                </h2>
                                {flash?.success && (
                                    <p className="mb-4 rounded-md border border-green-300 bg-green-50 px-3 py-2 text-sm text-green-700">
                                        {flash.success}
                                    </p>
                                )}
                                <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-200 dark:bg-neutral-800 dark:ring-neutral-700">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                                                <TransText fr="Nom complet" ar="الاسم الكامل" en="Full name" />
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-[var(--color-beta)] focus:outline-none focus:ring-1 focus:ring-[var(--color-beta)] dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                                                required
                                            />
                                            <InputError message={errors.name} className="mt-1" />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                                                <TransText fr="Email" ar="البريد الإلكتروني" en="Email" />
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-[var(--color-beta)] focus:outline-none focus:ring-1 focus:ring-[var(--color-beta)] dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                                                required
                                            />
                                            <InputError message={errors.email} className="mt-1" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                                            <TransText fr="Sujet" ar="الموضوع" en="Subject" />
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-[var(--color-beta)] focus:outline-none focus:ring-1 focus:ring-[var(--color-beta)] dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                                            required
                                        />
                                        <InputError message={errors.subject} className="mt-1" />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                                            <TransText fr="Message" ar="الرسالة" en="Message" />
                                        </label>
                                        <textarea
                                            name="message"
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            rows={5}
                                            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-[var(--color-beta)] focus:outline-none focus:ring-1 focus:ring-[var(--color-beta)] dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                                            required
                                        />
                                        <InputError message={errors.message} className="mt-1" />
                                    </div>
                                    <Button type="submit" disabled={processing} className="w-full bg-[var(--color-beta)] text-white hover:bg-[var(--color-beta)]/90">
                                        <Send className="mr-2 h-4 w-4" />
                                        <TransText fr={processing ? 'Envoi en cours...' : 'Envoyer le message'} ar={processing ? 'جارٍ الإرسال...' : 'إرسال الرسالة'} en={processing ? 'Sending...' : 'Send message'} />
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Social Media */}
                <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
                    <h2 className="mb-8 text-center text-2xl font-bold text-[var(--color-alpha)] md:text-3xl">
                        <TransText fr="Suivez-nous" ar="تابعونا" en="Follow us" />
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {socialLinks.map(({ name, icon: Icon, href, color }) => (
                            <a
                                key={name}
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                className={`flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow-sm ring-1 ring-neutral-200 transition hover:-translate-y-0.5 hover:text-white hover:shadow-md ${color} dark:bg-neutral-900 dark:ring-neutral-700`}
                            >
                                <Icon className="h-6 w-6" />
                                <span className="text-sm font-semibold">{name}</span>
                            </a>
                        ))}
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
