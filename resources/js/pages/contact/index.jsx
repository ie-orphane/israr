import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import TransText from '@components/TransText';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';
import { useState } from 'react';

const emailContacts = [
    {
        label: { fr: 'Partenariats', ar: '\u0627\u0644\u0634\u0631\u0627\u0643\u0627\u062a', en: 'Partnerships' },
        email: 'partenariats@coalitionisrar.org',
        description: {
            fr: 'Pour les demandes de collaboration institutionnelle.',
            ar: '\u0644\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u062a\u0639\u0627\u0648\u0646 \u0627\u0644\u0645\u0624\u0633\u0633\u0627\u062a\u064a.',
            en: 'For institutional collaboration requests.',
        },
    },
    {
        label: { fr: 'Presse', ar: '\u0627\u0644\u0635\u062d\u0627\u0641\u0629', en: 'Press' },
        email: 'presse@coalitionisrar.org',
        description: {
            fr: 'Demandes m\u00e9dias et interviews.',
            ar: '\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0625\u0639\u0644\u0627\u0645 \u0648\u0627\u0644\u0645\u0642\u0627\u0628\u0644\u0627\u062a.',
            en: 'Media requests and interviews.',
        },
    },
    {
        label: { fr: 'Volontariat', ar: '\u0627\u0644\u062a\u0637\u0648\u0639', en: 'Volunteering' },
        email: 'volontariat@coalitionisrar.org',
        description: {
            fr: 'Rejoindre nos actions en tant que b\u00e9n\u00e9vole.',
            ar: '\u0627\u0644\u0627\u0646\u0636\u0645\u0627\u0645 \u0625\u0644\u0649 \u0623\u0646\u0634\u0637\u062a\u0646\u0627 \u0643\u0645\u062a\u0637\u0648\u0639.',
            en: 'Join our actions as a volunteer.',
        },
    },
    {
        label: { fr: 'Contact g\u00e9n\u00e9ral', ar: '\u0627\u0644\u0627\u062a\u0635\u0627\u0644 \u0627\u0644\u0639\u0627\u0645', en: 'General contact' },
        email: 'coalitionisrar@gmail.com',
        description: {
            fr: 'Pour toute autre demande ou question.',
            ar: '\u0644\u0623\u064a \u0637\u0644\u0628 \u0623\u0648 \u0633\u0624\u0627\u0644 \u0622\u062e\u0631.',
            en: 'For any other request or question.',
        },
    },
];

const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/coalitionisrar', color: 'hover:bg-blue-600' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/coalitionisrar', color: 'hover:bg-pink-600' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/coalitionisrar', color: 'hover:bg-blue-700' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/coalitionisrar', color: 'hover:bg-sky-500' },
];

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <AppLayout>
            <Head title="Contact" />
            <div className="bg-white/85 backdrop-blur-sm dark:bg-neutral-950/80">
                {/* Hero */}
                <section className="bg-[var(--color-alpha)] py-16 text-white md:py-24">
                    <div className="mx-auto max-w-6xl px-6 text-center">
                        <h1 className="text-3xl font-bold md:text-5xl">
                            <TransText fr="Contactez-nous" ar="\u0627\u062a\u0635\u0644\u0648\u0627 \u0628\u0646\u0627" en="Contact us" />
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
                            <TransText
                                fr="Nous sommes \u00e0 votre \u00e9coute. N'h\u00e9sitez pas \u00e0 nous contacter pour toute question, partenariat ou collaboration."
                                ar="\u0646\u062d\u0646 \u0641\u064a \u062e\u062f\u0645\u062a\u0643\u0645. \u0644\u0627 \u062a\u062a\u0631\u062f\u062f\u0648\u0627 \u0641\u064a \u0627\u0644\u0627\u062a\u0635\u0627\u0644 \u0628\u0646\u0627 \u0644\u0623\u064a \u0633\u0624\u0627\u0644 \u0623\u0648 \u0634\u0631\u0627\u0643\u0629 \u0623\u0648 \u062a\u0639\u0627\u0648\u0646."
                                en="We are here to listen. Don't hesitate to reach out for any question, partnership, or collaboration."
                            />
                        </p>
                    </div>
                </section>

                {/* Email Contacts */}
                <section id="partenariats" className="mx-auto max-w-6xl px-6 py-16">
                    <h2 className="mb-8 text-center text-2xl font-bold text-[var(--color-alpha)] md:text-3xl">
                        <TransText fr="\u00c9crivez-nous" ar="\u0631\u0627\u0633\u0644\u0648\u0646\u0627" en="Write to us" />
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
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="grid gap-8 lg:grid-cols-2">
                            {/* Map */}
                            <div>
                                <h2 className="mb-4 text-xl font-bold text-[var(--color-alpha)]">
                                    <TransText fr="Notre localisation" ar="\u0645\u0648\u0642\u0639\u0646\u0627" en="Our location" />
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
                                            fr="Casablanca, Maroc \u2013 Si\u00e8ge de la Coalition ISRAR"
                                            ar="\u0627\u0644\u062f\u0627\u0631 \u0627\u0644\u0628\u064a\u0636\u0627\u0621\u060c \u0627\u0644\u0645\u063a\u0631\u0628 \u2013 \u0645\u0642\u0631 \u062a\u062d\u0627\u0644\u0641 \u0625\u0635\u0631\u0627\u0631"
                                            en="Casablanca, Morocco \u2013 ISRAR Coalition Headquarters"
                                        />
                                    </span>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div>
                                <h2 className="mb-4 text-xl font-bold text-[var(--color-alpha)]">
                                    <TransText fr="Formulaire de contact" ar="\u0646\u0645\u0648\u0630\u062c \u0627\u0644\u0627\u062a\u0635\u0627\u0644" en="Contact form" />
                                </h2>
                                <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-200 dark:bg-neutral-800 dark:ring-neutral-700">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                                                <TransText fr="Nom complet" ar="\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644" en="Full name" />
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-[var(--color-beta)] focus:outline-none focus:ring-1 focus:ring-[var(--color-beta)] dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                                                <TransText fr="Email" ar="\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a" en="Email" />
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-[var(--color-beta)] focus:outline-none focus:ring-1 focus:ring-[var(--color-beta)] dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                                            <TransText fr="Sujet" ar="\u0627\u0644\u0645\u0648\u0636\u0648\u0639" en="Subject" />
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-[var(--color-beta)] focus:outline-none focus:ring-1 focus:ring-[var(--color-beta)] dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                                            <TransText fr="Message" ar="\u0627\u0644\u0631\u0633\u0627\u0644\u0629" en="Message" />
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={5}
                                            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-[var(--color-beta)] focus:outline-none focus:ring-1 focus:ring-[var(--color-beta)] dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full bg-[var(--color-beta)] text-white hover:bg-[var(--color-beta)]/90">
                                        <Send className="mr-2 h-4 w-4" />
                                        <TransText fr="Envoyer le message" ar="\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0631\u0633\u0627\u0644\u0629" en="Send message" />
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Social Media */}
                <section className="mx-auto max-w-6xl px-6 py-16">
                    <h2 className="mb-8 text-center text-2xl font-bold text-[var(--color-alpha)] md:text-3xl">
                        <TransText fr="Suivez-nous" ar="\u062a\u0627\u0628\u0639\u0648\u0646\u0627" en="Follow us" />
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
