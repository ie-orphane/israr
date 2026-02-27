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

export default function Welcome() {
    const carouselSlides = [
        {
            src: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92eee?auto=format&fit=crop&w=1600&q=80',
            alt: 'Women collaborating in a meeting',
            caption: {
                fr: 'Accompagner les femmes et leurs proches avec une \u00e9coute d\u00e9di\u00e9e.',
                ar: '\u0645\u0648\u0627\u0643\u0628\u0629 \u0627\u0644\u0646\u0633\u0627\u0621 \u0648\u0627\u0644\u0645\u062d\u064a\u0637\u064a\u0646 \u0628\u0647\u0646 \u0645\u0646 \u062e\u0644\u0627\u0644 \u0641\u0636\u0627\u0621 \u0644\u0644\u0625\u0635\u063a\u0627\u0621.',
                en: 'Providing attentive support for women and their families.',
            },
        },
        {
            src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80',
            alt: 'Community meeting discussing rights',
            caption: {
                fr: 'Sensibiliser et informer pour renforcer la citoyennet\u00e9.',
                ar: '\u0627\u0644\u062a\u0648\u0639\u064a\u0629 \u0648\u0627\u0644\u0625\u062e\u0628\u0627\u0631 \u0644\u062a\u0639\u0632\u064a\u0632 \u0627\u0644\u0645\u0648\u0627\u0637\u0646\u0629.',
                en: 'Raising awareness and informing to strengthen citizenship.',
            },
        },
        {
            src: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80',
            alt: 'Hands joined in solidarity',
            caption: {
                fr: "Mobiliser un r\u00e9seau d'expertes et de partenaires solidaires.",
                ar: '\u062a\u0639\u0628\u0626\u0629 \u0634\u0628\u0643\u0629 \u0645\u0646 \u0627\u0644\u062e\u0628\u064a\u0631\u0627\u062a \u0648\u0627\u0644\u0634\u0631\u0643\u0627\u0621 \u0627\u0644\u0645\u062a\u0636\u0627\u0645\u0646\u064a\u0646.',
                en: 'Mobilising a network of experts and committed partners.',
            },
        },
        {
            src: 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=1600&q=80',
            alt: 'Workshop led by women advocates',
            caption: {
                fr: 'Former et renforcer les capacit\u00e9s des actrices locales contre les violences.',
                ar: '\u062a\u0643\u0648\u064a\u0646 \u0648\u062a\u0642\u0648\u064a\u0629 \u0642\u062f\u0631\u0627\u062a \u0627\u0644\u0641\u0627\u0639\u0644\u0627\u062a \u0627\u0644\u0645\u062d\u0644\u064a\u0627\u062a \u0644\u0645\u062d\u0627\u0631\u0628\u0629 \u0627\u0644\u0639\u0646\u0641.',
                en: 'Training local actors to prevent and respond to violence.',
            },
        },
    ];

    const missionItems = [
        {
            fr: 'Sensibiliser les citoyen\u00b7nes sur leurs droits.',
            ar: '\u062a\u0648\u0639\u064a\u0629 \u0627\u0644\u0645\u0648\u0627\u0637\u0646\u0627\u062a \u0648\u0627\u0644\u0645\u0648\u0627\u0637\u0646\u064a\u0646 \u0628\u062d\u0642\u0648\u0642\u0647\u0645.',
            en: 'Raise awareness among citizens about their rights.',
        },
        {
            fr: 'Documenter les lois et jurisprudences relatives \u00e0 la lutte contre les violences faites aux femmes.',
            ar: '\u062a\u0648\u062b\u064a\u0642 \u0627\u0644\u0642\u0648\u0627\u0646\u064a\u0646 \u0648\u0627\u0644\u0627\u062c\u062a\u0647\u0627\u062f\u0627\u062a \u0627\u0644\u0642\u0636\u0627\u0626\u064a\u0629 \u0627\u0644\u0645\u062a\u0639\u0644\u0642\u0629 \u0628\u0645\u062d\u0627\u0631\u0628\u0629 \u0627\u0644\u0639\u0646\u0641 \u0636\u062f \u0627\u0644\u0646\u0633\u0627\u0621.',
            en: 'Document laws and case law related to combating violence against women.',
        },
        {
            fr: "Offrir un guichet num\u00e9rique d'\u00e9coute et d'accompagnement.",
            ar: '\u062a\u0648\u0641\u064a\u0631 \u0634\u0628\u0627\u0643 \u0631\u0642\u0645\u064a \u0644\u0644\u0627\u0633\u062a\u0645\u0627\u0639 \u0648\u0627\u0644\u0645\u0648\u0627\u0643\u0628\u0629.',
            en: 'Offer a digital listening and support desk.',
        },
    ];

    const impactCounters = [
        { value: 15000, prefix: '+', label: { fr: 'B\u00e9n\u00e9ficiaires accompagn\u00e9es', ar: '\u0645\u0633\u062a\u0641\u064a\u062f\u0629 \u062a\u0645\u062a \u0645\u0648\u0627\u0643\u0628\u062a\u0647\u0627', en: 'Beneficiaries supported' }, icon: Users },
        { value: 8, prefix: '', label: { fr: 'R\u00e9gions couvertes', ar: '\u062c\u0647\u0627\u062a \u0645\u063a\u0637\u0627\u0629', en: 'Regions covered' }, icon: Globe },
        { value: 19, prefix: '', label: { fr: 'Associations membres', ar: '\u062c\u0645\u0639\u064a\u0629 \u0639\u0636\u0648', en: 'Member associations' }, icon: Handshake },
        { value: 12, prefix: '', label: { fr: 'Partenaires institutionnels', ar: '\u0634\u0631\u064a\u0643 \u0645\u0624\u0633\u0633\u0627\u062a\u064a', en: 'Institutional partners' }, icon: ShieldCheck },
    ];

    const partners = [
        'AFD', 'ONU Femmes', 'UNFPA', 'Union Europ\u00e9enne',
        'Minist\u00e8re de la Solidarit\u00e9', 'GIZ', 'Fondation Friedrich Ebert',
        'Ambassade des Pays-Bas', 'Oxfam', 'USAID',
    ];

    const testimonials = [
        {
            quote: {
                fr: "Gr\u00e2ce \u00e0 l'accompagnement de la coalition, j'ai pu conna\u00eetre mes droits et entamer les d\u00e9marches juridiques n\u00e9cessaires. Je me sens enfin soutenue.",
                ar: "\u0628\u0641\u0636\u0644 \u0645\u0648\u0627\u0643\u0628\u0629 \u0627\u0644\u062a\u062d\u0627\u0644\u0641\u060c \u062a\u0645\u0643\u0646\u062a \u0645\u0646 \u0645\u0639\u0631\u0641\u0629 \u062d\u0642\u0648\u0642\u064a \u0648\u0627\u0644\u0628\u062f\u0621 \u0641\u064a \u0627\u0644\u0625\u062c\u0631\u0627\u0621\u0627\u062a \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064a\u0629 \u0627\u0644\u0644\u0627\u0632\u0645\u0629. \u0623\u0634\u0639\u0631 \u0623\u062e\u064a\u0631\u064b\u0627 \u0628\u0627\u0644\u062f\u0639\u0645.",
                en: "Thanks to the coalition's support, I was able to learn about my rights and start the necessary legal procedures. I finally feel supported.",
            },
            name: { fr: 'Fatima Z.', ar: '\u0641\u0627\u0637\u0645\u0629 \u0632.', en: 'Fatima Z.' },
            region: { fr: 'R\u00e9gion Casablanca-Settat', ar: '\u062c\u0647\u0629 \u0627\u0644\u062f\u0627\u0631 \u0627\u0644\u0628\u064a\u0636\u0627\u0621-\u0633\u0637\u0627\u062a', en: 'Casablanca-Settat Region' },
        },
        {
            quote: {
                fr: "Les formations que j'ai suivies m'ont permis de devenir relais communautaire dans mon quartier. Aujourd'hui, je sensibilise d'autres femmes.",
                ar: "\u0645\u0643\u0651\u0646\u062a\u0646\u064a \u0627\u0644\u062a\u0643\u0648\u064a\u0646\u0627\u062a \u0627\u0644\u062a\u064a \u062e\u0636\u0639\u062a \u0644\u0647\u0627 \u0645\u0646 \u0623\u0646 \u0623\u0635\u0628\u062d \u0648\u0633\u064a\u0637\u0629 \u0645\u062c\u062a\u0645\u0639\u064a\u0629 \u0641\u064a \u062d\u064a\u064a. \u0627\u0644\u064a\u0648\u0645\u060c \u0623\u0642\u0648\u0645 \u0628\u062a\u0648\u0639\u064a\u0629 \u0646\u0633\u0627\u0621 \u0623\u062e\u0631\u064a\u0627\u062a.",
                en: "The training I received allowed me to become a community relay in my neighborhood. Today, I raise awareness among other women.",
            },
            name: { fr: 'Khadija M.', ar: '\u062e\u062f\u064a\u062c\u0629 \u0645.', en: 'Khadija M.' },
            region: { fr: 'R\u00e9gion Marrakech-Safi', ar: '\u062c\u0647\u0629 \u0645\u0631\u0627\u0643\u0634-\u0622\u0633\u0641\u064a', en: 'Marrakech-Safi Region' },
        },
        {
            quote: {
                fr: "La plateforme num\u00e9rique m'a donn\u00e9 acc\u00e8s \u00e0 des informations juridiques que je n'aurais jamais trouv\u00e9es seule. Un outil indispensable.",
                ar: "\u0623\u062a\u0627\u062d\u062a \u0644\u064a \u0627\u0644\u0645\u0646\u0635\u0629 \u0627\u0644\u0631\u0642\u0645\u064a\u0629 \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0642\u0627\u0646\u0648\u0646\u064a\u0629 \u0645\u0627 \u0643\u0646\u062a \u0644\u0623\u062c\u062f\u0647\u0627 \u0648\u062d\u062f\u064a. \u0623\u062f\u0627\u0629 \u0644\u0627 \u063a\u0646\u0649 \u0639\u0646\u0647\u0627.",
                en: "The digital platform gave me access to legal information I would never have found on my own. An indispensable tool.",
            },
            name: { fr: 'Amina B.', ar: '\u0623\u0645\u064a\u0646\u0629 \u0628.', en: 'Amina B.' },
            region: { fr: 'R\u00e9gion F\u00e8s-Mekn\u00e8s', ar: '\u062c\u0647\u0629 \u0641\u0627\u0633-\u0645\u0643\u0646\u0627\u0633', en: 'F\u00e8s-Mekn\u00e8s Region' },
        },
    ];

    const highlightCards = [
        {
            icon: ShieldCheck,
            title: {
                fr: 'Un espace fiable et s\u00e9curis\u00e9',
                ar: '\u0641\u0636\u0627\u0621 \u0645\u0648\u062b\u0648\u0642 \u0648\u0622\u0645\u0646',
                en: 'A reliable and secure space',
            },
            description: {
                fr: 'Protection des donn\u00e9es sensibles et parcours confidentiel pour chaque personne accompagn\u00e9e.',
                ar: '\u062d\u0645\u0627\u064a\u0629 \u0644\u0644\u0645\u0639\u0637\u064a\u0627\u062a \u0627\u0644\u062d\u0633\u0627\u0633\u0629 \u0648\u0645\u0633\u0627\u0631 \u0633\u0631\u064a \u0644\u0643\u0644 \u0634\u062e\u0635 \u062a\u062a\u0645 \u0645\u0648\u0627\u0643\u0628\u062a\u0647.',
                en: 'Protecting sensitive data and offering a confidential path for every person supported.',
            },
        },
        {
            icon: MessageCircle,
            title: {
                fr: '\u00c9coute active et accompagnement',
                ar: '\u0625\u0635\u063a\u0627\u0621 \u0641\u0639\u0627\u0644 \u0648\u0645\u0648\u0627\u0643\u0628\u0629',
                en: 'Active listening and support',
            },
            description: {
                fr: "Des conseill\u00e8res expertes, form\u00e9es pour r\u00e9pondre aux besoins juridiques et psychosociaux.",
                ar: '\u0645\u0633\u062a\u0634\u0627\u0631\u0627\u062a \u062e\u0628\u064a\u0631\u0627\u062a \u0645\u0643\u0648\u0651\u0646\u0627\u062a \u0644\u062a\u0644\u0628\u064a\u0629 \u0627\u0644\u0627\u062d\u062a\u064a\u0627\u062c\u0627\u062a \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064a\u0629 \u0648\u0627\u0644\u0646\u0641\u0633\u064a\u0629 \u0627\u0644\u0627\u062c\u062a\u0645\u0627\u0639\u064a\u0629.',
                en: 'Expert counsellors trained to respond to legal and psychosocial needs.',
            },
        },
        {
            icon: BarChart3,
            title: {
                fr: 'Vision data-driven',
                ar: '\u0631\u0624\u064a\u0629 \u0645\u0628\u0646\u064a\u0629 \u0639\u0644\u0649 \u0627\u0644\u0645\u0639\u0637\u064a\u0627\u062a',
                en: 'Data-driven insight',
            },
            description: {
                fr: "Tableaux de bord dynamiques pour suivre l'impact et guider les actions futures.",
                ar: '\u0644\u0648\u062d\u0627\u062a \u0642\u064a\u0627\u0633 \u062f\u064a\u0646\u0627\u0645\u064a\u0643\u064a\u0629 \u0644\u0645\u062a\u0627\u0628\u0639\u0629 \u0627\u0644\u0623\u062b\u0631 \u0648\u062a\u0648\u062c\u064a\u0647 \u0627\u0644\u062e\u0637\u0648\u0627\u062a \u0627\u0644\u0645\u0642\u0628\u0644\u0629.',
                en: 'Dynamic dashboards to monitor impact and guide future action.',
            },
        },
    ];

    const initiatives = [
        {
            icon: Megaphone,
            title: {
                fr: 'Campagnes nationales de sensibilisation',
                ar: '\u062d\u0645\u0644\u0627\u062a \u062a\u062d\u0633\u064a\u0633\u064a\u0629 \u0648\u0637\u0646\u064a\u0629',
                en: 'National awareness campaigns',
            },
            description: {
                fr: "Actions digitales et terrain pour vulgariser les recommandations de l'Examen P\u00e9riodique Universel et promouvoir la r\u00e9forme du Code de la famille.",
                ar: '\u062d\u0645\u0644\u0627\u062a \u0631\u0642\u0645\u064a\u0629 \u0648\u0645\u064a\u062f\u0627\u0646\u064a\u0629 \u0644\u0646\u0634\u0631 \u062a\u0648\u0635\u064a\u0627\u062a \u0627\u0644\u0627\u0633\u062a\u0639\u0631\u0627\u0636 \u0627\u0644\u062f\u0648\u0631\u064a \u0627\u0644\u0634\u0627\u0645\u0644 \u0648\u0627\u0644\u062f\u0639\u0648\u0629 \u0644\u0625\u0635\u0644\u0627\u062d \u0645\u062f\u0648\u0646\u0629 \u0627\u0644\u0623\u0633\u0631\u0629.',
                en: 'Digital and field campaigns to promote Universal Periodic Review recommendations and family code reforms.',
            },
            link: 'https://tanmia.ma/02-11-2023/60506/',
        },
        {
            icon: FileText,
            title: {
                fr: 'Plaidoyer pour une r\u00e9forme juridique',
                ar: '\u0645\u0631\u0627\u0641\u0639\u0629 \u0645\u0646 \u0623\u062c\u0644 \u0625\u0635\u0644\u0627\u062d \u0642\u0627\u0646\u0648\u0646\u064a',
                en: 'Advocacy for legal reform',
            },
            description: {
                fr: "Identification et publication des incoh\u00e9rences du Code de la famille marocain pour garantir une \u00e9galit\u00e9 r\u00e9elle.",
                ar: '\u0631\u0635\u062f \u0648\u0646\u0634\u0631 \u0627\u0644\u0627\u062e\u062a\u0644\u0627\u0644\u0627\u062a \u0641\u064a \u0645\u062f\u0648\u0646\u0629 \u0627\u0644\u0623\u0633\u0631\u0629 \u0627\u0644\u0645\u063a\u0631\u0628\u064a\u0629 \u0644\u0636\u0645\u0627\u0646 \u0645\u0633\u0627\u0648\u0627\u0629 \u0641\u0639\u0644\u064a\u0629.',
                en: 'Highlighting inconsistencies in the Moroccan family code to ensure real equality.',
            },
            link: 'https://fr.hespress.com/294400-promotion-de-legalite-la-coalition-israr-devoile-les-incoherences-presentes-dans-le-code-de-la-famille.html',
        },
        {
            icon: MapPin,
            title: {
                fr: 'Projet r\u00e9gional SaMMa',
                ar: '\u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0627\u0644\u0625\u0642\u0644\u064a\u0645\u064a "\u0633\u0645\u0649"',
                en: 'SaMMa regional project',
            },
            description: {
                fr: "Initiative cofinanc\u00e9e par l'AFD pour lutter contre les violences bas\u00e9es sur le genre dans plusieurs r\u00e9gions du Maroc.",
                ar: '\u0645\u0628\u0627\u062f\u0631\u0629 \u0645\u0645\u0648\u0644\u0629 \u0628\u0634\u0631\u0627\u0643\u0629 \u0645\u0639 \u0627\u0644\u0648\u0643\u0627\u0644\u0629 \u0627\u0644\u0641\u0631\u0646\u0633\u064a\u0629 \u0644\u0644\u062a\u0646\u0645\u064a\u0629 \u0644\u0645\u062d\u0627\u0631\u0628\u0629 \u0627\u0644\u0639\u0646\u0641 \u0627\u0644\u0645\u0628\u0646\u064a \u0639\u0644\u0649 \u0627\u0644\u0646\u0648\u0639 \u0641\u064a \u0639\u062f\u0629 \u062c\u0647\u0627\u062a \u0628\u0627\u0644\u0645\u063a\u0631\u0628.',
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
                ar: '\u0627\u0633\u062a\u0634\u0627\u0631\u0627\u062a \u0648\u0637\u0644\u0628\u0627\u062a 2025',
                en: '2025 consultations & calls',
            },
            description: {
                fr: "Recrutement d'expert\u00b7es en communication, accompagnement psychologique et analyse d'impact post-s\u00e9isme.",
                ar: '\u062a\u0648\u0638\u064a\u0641 \u062e\u0628\u0631\u0627\u0621 \u0641\u064a \u0627\u0644\u062a\u0648\u0627\u0635\u0644\u060c \u0627\u0644\u0645\u0648\u0627\u0643\u0628\u0629 \u0627\u0644\u0646\u0641\u0633\u064a\u0629 \u0648\u062a\u062d\u0644\u064a\u0644 \u0627\u0644\u0623\u062b\u0631 \u0628\u0639\u062f \u0627\u0644\u0632\u0644\u0632\u0627\u0644.',
                en: 'Recruiting experts in communication, psychosocial support, and post-earthquake impact analysis.',
            },
            link: 'https://tanmia.ma/07-05-2025/76657/',
        },
        {
            icon: Mail,
            title: {
                fr: 'Contact & partenariats',
                ar: '\u0627\u0644\u0627\u062a\u0635\u0627\u0644 \u0648\u0627\u0644\u0634\u0631\u0627\u0643\u0627\u062a',
                en: 'Contact & partnerships',
            },
            description: {
                fr: '\u00c9crivez-nous : coalitionisrar@gmail.com | projets.coalition.israr@gmail.com',
                ar: '\u0631\u0627\u0633\u0644\u0648\u0646\u0627: coalitionisrar@gmail.com | projets.coalition.israr@gmail.com',
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
                                    ar="\u0623\u0643\u062b\u0631 \u0645\u0646 \u0639\u0634\u0631 \u0633\u0646\u0648\u0627\u062a \u0641\u064a \u062e\u062f\u0645\u0629 \u062d\u0642\u0648\u0642 \u0627\u0644\u0646\u0633\u0627\u0621"
                                    en="Over 10 years championing women's rights"
                                />
                            </span>

                            <h1 className="text-3xl font-bold text-[var(--color-alpha)] md:text-5xl">
                                <TransText
                                    fr="Une plateforme engag\u00e9e pour l'\u00e9galit\u00e9 et l'empowerment"
                                    ar="\u0645\u0646\u0635\u0629 \u0645\u0644\u062a\u0632\u0645\u0629 \u0628\u0627\u0644\u0645\u0633\u0627\u0648\u0627\u0629 \u0648\u0627\u0644\u062a\u0645\u0643\u064a\u0646"
                                    en="A platform committed to equality and empowerment"
                                />
                            </h1>
                            <p className="max-w-xl text-sm text-neutral-600 dark:text-neutral-300 md:text-base">
                                <TransText
                                    fr="R\u00e9seau national de 19 associations, la Coalition ISRAR agit dans 8 r\u00e9gions du Maroc pour l'\u00e9limination des violences fond\u00e9es sur le genre."
                                    ar="\u0634\u0628\u0643\u0629 \u0648\u0637\u0646\u064a\u0629 \u062a\u0636\u0645 19 \u062c\u0645\u0639\u064a\u0629\u060c \u064a\u0639\u0645\u0644 \u062a\u062d\u0627\u0644\u0641 \u0625\u0635\u0631\u0627\u0631 \u0641\u064a 8 \u062c\u0647\u0627\u062a \u0628\u0627\u0644\u0645\u063a\u0631\u0628 \u0645\u0646 \u0623\u062c\u0644 \u0627\u0644\u0642\u0636\u0627\u0621 \u0639\u0644\u0649 \u0627\u0644\u0639\u0646\u0641 \u0627\u0644\u0645\u0628\u0646\u064a \u0639\u0644\u0649 \u0627\u0644\u0646\u0648\u0639 \u0627\u0644\u0627\u062c\u062a\u0645\u0627\u0639\u064a."
                                    en="A national network of 19 associations, the ISRAR Coalition operates across 8 regions of Morocco to eliminate gender-based violence."
                                />
                            </p>

                            <div className="flex flex-wrap items-center gap-4">
                                <Button asChild className="bg-[var(--color-beta)] text-white hover:bg-[var(--color-beta)]/90">
                                    <Link href="/a-propos">
                                        <TransText
                                            fr="D\u00e9couvrir la coalition"
                                            ar="\u0627\u0643\u062a\u0634\u0641 \u0627\u0644\u062a\u062d\u0627\u0644\u0641"
                                            en="Discover the coalition"
                                        />
                                    </Link>
                                </Button>
                                <Link href="/login" className="text-sm font-medium text-[var(--color-alpha)] underline underline-offset-4 hover:text-[var(--color-beta)]">
                                    <TransText
                                        fr="Se connecter"
                                        ar="\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644"
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
                                    ar="\u0644\u0645\u0627\u0630\u0627 \u062a\u062b\u0642 \u0628\u0646\u0627 \u0622\u0644\u0627\u0641 \u0627\u0644\u0646\u0633\u0627\u0621"
                                    en="Why thousands of women trust us"
                                />
                            </h2>
                            <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300 md:text-base">
                                <TransText
                                    fr="Nous combinons expertise juridique, \u00e9coute psychosociale et gouvernance num\u00e9rique pour garantir des parcours s\u00e9curis\u00e9s."
                                    ar="\u0646\u062c\u0645\u0639 \u0628\u064a\u0646 \u0627\u0644\u062e\u0628\u0631\u0629 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064a\u0629\u060c \u0627\u0644\u0625\u0635\u063a\u0627\u0621 \u0627\u0644\u0646\u0641\u0633\u0627\u0646\u064a \u0627\u0644\u0627\u062c\u062a\u0645\u0627\u0639\u064a \u0648\u0627\u0644\u062d\u0643\u0627\u0645\u0629 \u0627\u0644\u0631\u0642\u0645\u064a\u0629 \u0644\u0636\u0645\u0627\u0646 \u0645\u0633\u0627\u0631\u0627\u062a \u0622\u0645\u0646\u0629."
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
                                    ar="\u0645\u0647\u0627\u0645\u0646\u0627"
                                    en="Our missions"
                                />
                            </h2>
                        </div>
                        <div className="mx-auto max-w-2xl">
                            <article className="rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ring-white/50 backdrop-blur dark:bg-neutral-900/60 dark:ring-white/10">
                                <h2 className="mb-4 text-xl font-semibold text-[var(--color-alpha)]">
                                    <TransText
                                        fr="Une plateforme de r\u00e9f\u00e9rence pour :"
                                        ar="\u0645\u0646\u0635\u0629 \u0645\u0631\u062c\u0639\u064a\u0629 \u0645\u0646 \u0623\u062c\u0644:"
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
                                        ar="\u0628\u0631\u0627\u0645\u062c \u0648\u0645\u0631\u0627\u0641\u0639\u0627\u062a \u0639\u0644\u0649 \u0623\u0631\u0636 \u0627\u0644\u0648\u0627\u0642\u0639"
                                        en="Programs and advocacy in action"
                                    />
                                </h2>
                                <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300 md:text-base">
                                    <TransText
                                        fr="Une pr\u00e9sence nationale et maghr\u00e9bine \u00e0 travers des projets cofinanc\u00e9s, des campagnes de communication et un plaidoyer continu pour la r\u00e9forme des lois."
                                        ar="\u062d\u0636\u0648\u0631 \u0648\u0637\u0646\u064a \u0648\u0645\u063a\u0627\u0631\u0628\u064a \u0639\u0628\u0631 \u0645\u0634\u0627\u0631\u064a\u0639 \u0645\u0645\u0648\u0644\u0629\u060c \u062d\u0645\u0644\u0627\u062a \u062a\u0648\u0627\u0635\u0644 \u0648\u0645\u0631\u0627\u0641\u0639\u0629 \u0645\u0633\u062a\u0645\u0631\u0629 \u0644\u0625\u0635\u0644\u0627\u062d \u0627\u0644\u0642\u0648\u0627\u0646\u064a\u0646."
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
                                                <TransText fr="En savoir plus" ar="\u0627\u0643\u062a\u0634\u0641 \u0627\u0644\u0645\u0632\u064a\u062f" en="Learn more" />
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
                                    fr="T\u00e9moignages du terrain"
                                    ar="\u0634\u0647\u0627\u062f\u0627\u062a \u0645\u0646 \u0627\u0644\u0645\u064a\u062f\u0627\u0646"
                                    en="Testimonials from the field"
                                />
                            </h2>
                            <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300 md:text-base">
                                <TransText
                                    fr="Des voix qui t\u00e9moignent de l'impact de notre action collective."
                                    ar="\u0623\u0635\u0648\u0627\u062a \u062a\u0634\u0647\u062f \u0639\u0644\u0649 \u0623\u062b\u0631 \u0639\u0645\u0644\u0646\u0627 \u0627\u0644\u062c\u0645\u0627\u0639\u064a."
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
                    <section className="border-y border-[var(--color-alpha)]/10 bg-neutral-50 py-12 dark:bg-neutral-900/40">
                        <div className="mx-auto max-w-6xl px-6">
                            <h2 className="mb-8 text-center text-xl font-bold text-[var(--color-alpha)] md:text-2xl">
                                <TransText
                                    fr="Nos partenaires institutionnels"
                                    ar="\u0634\u0631\u0643\u0627\u0624\u0646\u0627 \u0627\u0644\u0645\u0624\u0633\u0633\u0627\u062a\u064a\u0648\u0646"
                                    en="Our institutional partners"
                                />
                            </h2>
                            <div className="relative overflow-hidden">
                                <div className="animate-marquee flex gap-12 whitespace-nowrap">
                                    {[...partners, ...partners].map((name, idx) => (
                                        <div
                                            key={idx}
                                            className="flex h-16 min-w-[160px] items-center justify-center rounded-lg bg-white px-6 shadow-sm ring-1 ring-neutral-200 dark:bg-neutral-800 dark:ring-neutral-700"
                                        >
                                            <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-300">{name}</span>
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

                    {/* Opportunities & CTA */}
                    <section className="mx-auto max-w-6xl px-6 py-16">
                        <div className="grid gap-8 md:grid-cols-2">
                            <div className="rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ring-white/50 dark:bg-neutral-900/60 dark:ring-white/10">
                                <h2 className="mb-4 text-xl font-semibold text-[var(--color-alpha)]">
                                    <TransText
                                        fr="Opportunit\u00e9s & collaborations"
                                        ar="\u0641\u0631\u0635 \u0648\u062a\u0639\u0627\u0648\u0646"
                                        en="Opportunities & collaborations"
                                    />
                                </h2>
                                <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-200">
                                    <TransText
                                        fr="Participez \u00e0 notre dynamique : appels \u00e0 projets, recrutements, partenariats institutionnels et appui aux initiatives locales."
                                        ar="\u0627\u0646\u062e\u0631\u0637\u0648\u0627 \u0641\u064a \u062f\u064a\u0646\u0627\u0645\u064a\u062a\u0646\u0627: \u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639\u060c \u0627\u0644\u062a\u0648\u0638\u064a\u0641\u060c \u0627\u0644\u0634\u0631\u0627\u0643\u0627\u062a \u0627\u0644\u0645\u0624\u0633\u0633\u0627\u062a\u064a\u0629 \u0648\u062f\u0639\u0645 \u0627\u0644\u0645\u0628\u0627\u062f\u0631\u0627\u062a \u0627\u0644\u0645\u062d\u0644\u064a\u0629."
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
                                                        <TransText fr="Voir l'annonce" ar="\u0639\u0631\u0636 \u0627\u0644\u062a\u0641\u0627\u0635\u064a\u0644" en="View details" />
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
                                            fr="Ensemble, cr\u00e9ons une plateforme plus inclusive"
                                            ar="\u0645\u0639\u064b\u0627\u060c \u0644\u0646\u062e\u0644\u0642 \u0645\u0646\u0635\u0629 \u0623\u0643\u062b\u0631 \u0634\u0645\u0648\u0644\u0627\u064b"
                                            en="Together, let's build a more inclusive platform"
                                        />
                                    </h2>
                                    <p className="mt-4 text-sm text-white/90 md:text-base">
                                        <TransText
                                            fr="Vous disposez de ressources, d'histoires \u00e0 raconter ou souhaitez contribuer techniquement ? Partagez votre vision et co-construisons la prochaine version de la plateforme ISRAR."
                                            ar="\u0644\u062f\u064a\u0643\u0645 \u0645\u0648\u0627\u0631\u062f\u060c \u0642\u0635\u0635 \u0644\u062a\u0642\u0627\u0633\u0645\u0647\u0627 \u0623\u0648 \u062a\u0631\u063a\u0628\u0648\u0646 \u0641\u064a \u0627\u0644\u0645\u0633\u0627\u0647\u0645\u0629 \u0627\u0644\u062a\u0642\u0646\u064a\u0629\u061f \u0634\u0627\u0631\u0643\u0648\u0646\u0627 \u0631\u0624\u064a\u062a\u0643\u0645 \u0648\u0644\u0646\u0628\u0646\u064a \u0627\u0644\u0646\u0633\u062e\u0629 \u0627\u0644\u0642\u0627\u062f\u0645\u0629 \u0645\u0646 \u0645\u0646\u0635\u0629 \u0625\u0635\u0631\u0627\u0631."
                                            en="Have resources, stories to share, or want to contribute technically? Share your vision and co-build the next version of ISRAR's platform."
                                        />
                                    </p>
                                </div>
                                <div className="mt-6">
                                    <Button asChild className="bg-white text-[var(--color-alpha)] hover:bg-white/90">
                                        <Link href="/contact#partenariats">
                                            <TransText fr="Devenir partenaire" ar="\u0643\u0646 \u0634\u0631\u064a\u0643\u064b\u0627" en="Become a partner" />
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
