import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import TransText from '@components/TransText';
import {
    Calendar, Award, Users, Building2, FileText, Download,
    Shield, BookOpen, Heart, Globe, Scale, Megaphone
} from 'lucide-react';

const timelineEvents = [
    {
        year: '2012',
        title: { fr: 'Cr\u00e9ation de la Coalition ISRAR', ar: '\u062a\u0623\u0633\u064a\u0633 \u062a\u062d\u0627\u0644\u0641 \u0625\u0635\u0631\u0627\u0631', en: 'Founding of the ISRAR Coalition' },
        description: {
            fr: 'Naissance de la coalition regroupant des associations engag\u00e9es contre les violences fond\u00e9es sur le genre au Maroc.',
            ar: '\u0648\u0644\u0627\u062f\u0629 \u0627\u0644\u062a\u062d\u0627\u0644\u0641 \u0627\u0644\u0630\u064a \u064a\u062c\u0645\u0639 \u062c\u0645\u0639\u064a\u0627\u062a \u0645\u0644\u062a\u0632\u0645\u0629 \u0628\u0645\u0643\u0627\u0641\u062d\u0629 \u0627\u0644\u0639\u0646\u0641 \u0627\u0644\u0642\u0627\u0626\u0645 \u0639\u0644\u0649 \u0627\u0644\u0646\u0648\u0639 \u0641\u064a \u0627\u0644\u0645\u063a\u0631\u0628.',
            en: 'Birth of the coalition bringing together associations committed to fighting gender-based violence in Morocco.',
        },
    },
    {
        year: '2015',
        title: { fr: 'Premier programme r\u00e9gional', ar: '\u0623\u0648\u0644 \u0628\u0631\u0646\u0627\u0645\u062c \u062c\u0647\u0648\u064a', en: 'First regional programme' },
        description: {
            fr: 'Lancement du premier programme de renforcement des capacit\u00e9s des associations membres dans 4 r\u00e9gions.',
            ar: '\u0625\u0637\u0644\u0627\u0642 \u0623\u0648\u0644 \u0628\u0631\u0646\u0627\u0645\u062c \u0644\u062a\u0642\u0648\u064a\u0629 \u0642\u062f\u0631\u0627\u062a \u0627\u0644\u062c\u0645\u0639\u064a\u0627\u062a \u0627\u0644\u0639\u0636\u0648\u0629 \u0641\u064a 4 \u062c\u0647\u0627\u062a.',
            en: 'Launch of the first capacity-building programme for member associations across 4 regions.',
        },
    },
    {
        year: '2018',
        title: { fr: 'Plaidoyer pour la loi 103-13', ar: '\u0627\u0644\u0645\u0631\u0627\u0641\u0639\u0629 \u0645\u0646 \u0623\u062c\u0644 \u0627\u0644\u0642\u0627\u0646\u0648\u0646 103-13', en: 'Advocacy for Law 103-13' },
        description: {
            fr: 'Contribution active au plaidoyer pour l\u2019adoption et la mise en \u0153uvre de la loi relative \u00e0 la lutte contre les violences faites aux femmes.',
            ar: '\u0645\u0633\u0627\u0647\u0645\u0629 \u0641\u0639\u0627\u0644\u0629 \u0641\u064a \u0627\u0644\u0645\u0631\u0627\u0641\u0639\u0629 \u0645\u0646 \u0623\u062c\u0644 \u0627\u0639\u062a\u0645\u0627\u062f \u0648\u062a\u0646\u0641\u064a\u0630 \u0627\u0644\u0642\u0627\u0646\u0648\u0646 \u0627\u0644\u0645\u062a\u0639\u0644\u0642 \u0628\u0645\u0643\u0627\u0641\u062d\u0629 \u0627\u0644\u0639\u0646\u0641 \u0636\u062f \u0627\u0644\u0646\u0633\u0627\u0621.',
            en: 'Active contribution to advocacy for the adoption and implementation of the law on combating violence against women.',
        },
    },
    {
        year: '2020',
        title: { fr: 'Extension \u00e0 8 r\u00e9gions', ar: '\u0627\u0644\u062a\u0648\u0633\u0639 \u0625\u0644\u0649 8 \u062c\u0647\u0627\u062a', en: 'Expansion to 8 regions' },
        description: {
            fr: 'La coalition \u00e9tend sa couverture g\u00e9ographique \u00e0 8 r\u00e9gions du Maroc avec 19 associations membres.',
            ar: '\u064a\u0648\u0633\u0639 \u0627\u0644\u062a\u062d\u0627\u0644\u0641 \u062a\u063a\u0637\u064a\u062a\u0647 \u0627\u0644\u062c\u063a\u0631\u0627\u0641\u064a\u0629 \u0625\u0644\u0649 8 \u062c\u0647\u0627\u062a \u0628\u0627\u0644\u0645\u063a\u0631\u0628 \u0645\u0639 19 \u062c\u0645\u0639\u064a\u0629 \u0639\u0636\u0648.',
            en: 'The coalition expands its geographic coverage to 8 regions of Morocco with 19 member associations.',
        },
    },
    {
        year: '2023',
        title: { fr: 'Lancement du projet SaMMa', ar: '\u0625\u0637\u0644\u0627\u0642 \u0645\u0634\u0631\u0648\u0639 \u0633\u0645\u0649', en: 'Launch of the SaMMa project' },
        description: {
            fr: 'D\u00e9marrage du projet r\u00e9gional SaMMa cofinanc\u00e9 par l\u2019AFD pour lutter contre les VBG \u00e0 grande \u00e9chelle.',
            ar: '\u0627\u0646\u0637\u0644\u0627\u0642 \u0645\u0634\u0631\u0648\u0639 \u0633\u0645\u0649 \u0627\u0644\u062c\u0647\u0648\u064a \u0628\u062a\u0645\u0648\u064a\u0644 \u0645\u0634\u062a\u0631\u0643 \u0645\u0639 \u0627\u0644\u0648\u0643\u0627\u0644\u0629 \u0627\u0644\u0641\u0631\u0646\u0633\u064a\u0629 \u0644\u0644\u062a\u0646\u0645\u064a\u0629 \u0644\u0645\u0643\u0627\u0641\u062d\u0629 \u0627\u0644\u0639\u0646\u0641 \u0627\u0644\u0645\u0628\u0646\u064a \u0639\u0644\u0649 \u0627\u0644\u0646\u0648\u0639 \u0639\u0644\u0649 \u0646\u0637\u0627\u0642 \u0648\u0627\u0633\u0639.',
            en: 'Start of the SaMMa regional project co-funded by AFD to combat GBV at scale.',
        },
    },
    {
        year: '2025',
        title: { fr: 'Plateforme num\u00e9rique ISRAR', ar: '\u0627\u0644\u0645\u0646\u0635\u0629 \u0627\u0644\u0631\u0642\u0645\u064a\u0629 \u0625\u0635\u0631\u0627\u0631', en: 'ISRAR digital platform' },
        description: {
            fr: 'Lancement de la plateforme num\u00e9rique int\u00e9gr\u00e9e pour l\u2019\u00e9coute, l\u2019accompagnement et le plaidoyer.',
            ar: '\u0625\u0637\u0644\u0627\u0642 \u0627\u0644\u0645\u0646\u0635\u0629 \u0627\u0644\u0631\u0642\u0645\u064a\u0629 \u0627\u0644\u0645\u062a\u0643\u0627\u0645\u0644\u0629 \u0644\u0644\u0625\u0635\u063a\u0627\u0621 \u0648\u0627\u0644\u0645\u0648\u0627\u0643\u0628\u0629 \u0648\u0627\u0644\u0645\u0631\u0627\u0641\u0639\u0629.',
            en: 'Launch of the integrated digital platform for listening, support, and advocacy.',
        },
    },
];

const achievements = [
    {
        icon: Users,
        title: { fr: '+15 000 b\u00e9n\u00e9ficiaires', ar: '+15 000 \u0645\u0633\u062a\u0641\u064a\u062f\u0629', en: '+15,000 beneficiaries' },
        description: {
            fr: 'Femmes et familles accompagn\u00e9es \u00e0 travers nos programmes d\u2019\u00e9coute, de conseil et d\u2019orientation.',
            ar: '\u0646\u0633\u0627\u0621 \u0648\u0623\u0633\u0631 \u062a\u0645\u062a \u0645\u0648\u0627\u0643\u0628\u062a\u0647\u0627 \u0645\u0646 \u062e\u0644\u0627\u0644 \u0628\u0631\u0627\u0645\u062c\u0646\u0627 \u0644\u0644\u0625\u0635\u063a\u0627\u0621 \u0648\u0627\u0644\u0625\u0631\u0634\u0627\u062f \u0648\u0627\u0644\u062a\u0648\u062c\u064a\u0647.',
            en: 'Women and families supported through our listening, counselling, and referral programmes.',
        },
    },
    {
        icon: Scale,
        title: { fr: 'Plaidoyer l\u00e9gislatif', ar: '\u0645\u0631\u0627\u0641\u0639\u0629 \u062a\u0634\u0631\u064a\u0639\u064a\u0629', en: 'Legislative advocacy' },
        description: {
            fr: 'Contribution \u00e0 l\u2019adoption de la loi 103-13 et au plaidoyer pour la r\u00e9forme du Code de la famille.',
            ar: '\u0627\u0644\u0645\u0633\u0627\u0647\u0645\u0629 \u0641\u064a \u0627\u0639\u062a\u0645\u0627\u062f \u0627\u0644\u0642\u0627\u0646\u0648\u0646 103-13 \u0648\u0627\u0644\u0645\u0631\u0627\u0641\u0639\u0629 \u0645\u0646 \u0623\u062c\u0644 \u0625\u0635\u0644\u0627\u062d \u0645\u062f\u0648\u0646\u0629 \u0627\u0644\u0623\u0633\u0631\u0629.',
            en: 'Contribution to the adoption of Law 103-13 and advocacy for family code reform.',
        },
    },
    {
        icon: Megaphone,
        title: { fr: 'Campagnes nationales', ar: '\u062d\u0645\u0644\u0627\u062a \u0648\u0637\u0646\u064a\u0629', en: 'National campaigns' },
        description: {
            fr: 'Organisation de campagnes de sensibilisation touch\u00e9es par des milliers de personnes \u00e0 travers le Maroc.',
            ar: '\u062a\u0646\u0638\u064a\u0645 \u062d\u0645\u0644\u0627\u062a \u062a\u0648\u0639\u0648\u064a\u0629 \u0648\u0635\u0644\u062a \u0625\u0644\u0649 \u0622\u0644\u0627\u0641 \u0627\u0644\u0623\u0634\u062e\u0627\u0635 \u0639\u0628\u0631 \u0627\u0644\u0645\u063a\u0631\u0628.',
            en: 'Organisation of awareness campaigns reaching thousands of people across Morocco.',
        },
    },
    {
        icon: BookOpen,
        title: { fr: 'Publications de r\u00e9f\u00e9rence', ar: '\u0645\u0646\u0634\u0648\u0631\u0627\u062a \u0645\u0631\u062c\u0639\u064a\u0629', en: 'Reference publications' },
        description: {
            fr: 'Rapports, guides juridiques et notes de plaidoyer utilis\u00e9s par les acteurs institutionnels et associatifs.',
            ar: '\u062a\u0642\u0627\u0631\u064a\u0631 \u0648\u062f\u0644\u0627\u0626\u0644 \u0642\u0627\u0646\u0648\u0646\u064a\u0629 \u0648\u0645\u0630\u0643\u0631\u0627\u062a \u0645\u0631\u0627\u0641\u0639\u0629 \u064a\u0633\u062a\u062e\u062f\u0645\u0647\u0627 \u0627\u0644\u0641\u0627\u0639\u0644\u0648\u0646 \u0627\u0644\u0645\u0624\u0633\u0633\u0627\u062a\u064a\u0648\u0646 \u0648\u0627\u0644\u062c\u0645\u0639\u0648\u064a\u0648\u0646.',
            en: 'Reports, legal guides, and advocacy briefs used by institutional and civil society actors.',
        },
    },
    {
        icon: Heart,
        title: { fr: 'R\u00e9seau de solidarit\u00e9', ar: '\u0634\u0628\u0643\u0629 \u062a\u0636\u0627\u0645\u0646', en: 'Solidarity network' },
        description: {
            fr: 'Construction d\u2019un r\u00e9seau de 19 associations offrant un maillage territorial unique au Maroc.',
            ar: '\u0628\u0646\u0627\u0621 \u0634\u0628\u0643\u0629 \u0645\u0646 19 \u062c\u0645\u0639\u064a\u0629 \u062a\u0648\u0641\u0631 \u062a\u063a\u0637\u064a\u0629 \u062a\u0631\u0627\u0628\u064a\u0629 \u0641\u0631\u064a\u062f\u0629 \u0628\u0627\u0644\u0645\u063a\u0631\u0628.',
            en: 'Building a network of 19 associations offering unique territorial coverage in Morocco.',
        },
    },
    {
        icon: Globe,
        title: { fr: 'Partenariats internationaux', ar: '\u0634\u0631\u0627\u0643\u0627\u062a \u062f\u0648\u0644\u064a\u0629', en: 'International partnerships' },
        description: {
            fr: 'Collaborations avec l\u2019AFD, l\u2019ONU Femmes, l\u2019UNFPA et l\u2019Union Europ\u00e9enne.',
            ar: '\u062a\u0639\u0627\u0648\u0646 \u0645\u0639 \u0627\u0644\u0648\u0643\u0627\u0644\u0629 \u0627\u0644\u0641\u0631\u0646\u0633\u064a\u0629 \u0644\u0644\u062a\u0646\u0645\u064a\u0629 \u0648\u0647\u064a\u0626\u0629 \u0627\u0644\u0623\u0645\u0645 \u0627\u0644\u0645\u062a\u062d\u062f\u0629 \u0644\u0644\u0645\u0631\u0623\u0629 \u0648\u0635\u0646\u062f\u0648\u0642 \u0627\u0644\u0623\u0645\u0645 \u0627\u0644\u0645\u062a\u062d\u062f\u0629 \u0644\u0644\u0633\u0643\u0627\u0646 \u0648\u0627\u0644\u0627\u062a\u062d\u0627\u062f \u0627\u0644\u0623\u0648\u0631\u0648\u0628\u064a.',
            en: 'Collaborations with AFD, UN Women, UNFPA, and the European Union.',
        },
    },
];

const governance = [
    {
        title: { fr: 'Assembl\u00e9e G\u00e9n\u00e9rale', ar: '\u0627\u0644\u062c\u0645\u0639 \u0627\u0644\u0639\u0627\u0645', en: 'General Assembly' },
        description: {
            fr: 'Instance supr\u00eame de d\u00e9cision regroupant l\u2019ensemble des 19 associations membres.',
            ar: '\u0627\u0644\u0647\u064a\u0626\u0629 \u0627\u0644\u0639\u0644\u064a\u0627 \u0644\u0644\u0642\u0631\u0627\u0631 \u0627\u0644\u062a\u064a \u062a\u0636\u0645 \u062c\u0645\u064a\u0639 \u0627\u0644\u062c\u0645\u0639\u064a\u0627\u062a \u0627\u0644\u0639\u0636\u0648\u0629 \u0627\u0644\u0640 19.',
            en: 'Supreme decision-making body bringing together all 19 member associations.',
        },
    },
    {
        title: { fr: 'Bureau Ex\u00e9cutif', ar: '\u0627\u0644\u0645\u0643\u062a\u0628 \u0627\u0644\u062a\u0646\u0641\u064a\u0630\u064a', en: 'Executive Board' },
        description: {
            fr: 'Organe de gestion strat\u00e9gique \u00e9lu par l\u2019AG, charg\u00e9 de piloter les orientations de la coalition.',
            ar: '\u062c\u0647\u0627\u0632 \u0627\u0644\u062a\u062f\u0628\u064a\u0631 \u0627\u0644\u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a \u0627\u0644\u0645\u0646\u062a\u062e\u0628 \u0645\u0646 \u0627\u0644\u062c\u0645\u0639 \u0627\u0644\u0639\u0627\u0645\u060c \u0627\u0644\u0645\u0643\u0644\u0641 \u0628\u062a\u0648\u062c\u064a\u0647 \u0627\u0644\u062a\u062d\u0627\u0644\u0641.',
            en: 'Strategic management body elected by the GA, responsible for steering the coalition\u2019s directions.',
        },
    },
    {
        title: { fr: 'Coordination Nationale', ar: '\u0627\u0644\u062a\u0646\u0633\u064a\u0642 \u0627\u0644\u0648\u0637\u0646\u064a', en: 'National Coordination' },
        description: {
            fr: '\u00c9quipe op\u00e9rationnelle assurant la coordination des programmes, la communication et le suivi des projets.',
            ar: '\u0641\u0631\u064a\u0642 \u0639\u0645\u0644\u064a\u0627\u062a\u064a \u064a\u0636\u0645\u0646 \u062a\u0646\u0633\u064a\u0642 \u0627\u0644\u0628\u0631\u0627\u0645\u062c \u0648\u0627\u0644\u062a\u0648\u0627\u0635\u0644 \u0648\u0645\u062a\u0627\u0628\u0639\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639.',
            en: 'Operational team ensuring programme coordination, communication, and project monitoring.',
        },
    },
    {
        title: { fr: 'Commissions th\u00e9matiques', ar: '\u0627\u0644\u0644\u062c\u0627\u0646 \u0627\u0644\u0645\u0648\u0636\u0648\u0639\u0627\u062a\u064a\u0629', en: 'Thematic commissions' },
        description: {
            fr: 'Groupes de travail sp\u00e9cialis\u00e9s : plaidoyer, communication, formation, suivi-\u00e9valuation.',
            ar: '\u0645\u062c\u0645\u0648\u0639\u0627\u062a \u0639\u0645\u0644 \u0645\u062a\u062e\u0635\u0635\u0629: \u0627\u0644\u0645\u0631\u0627\u0641\u0639\u0629\u060c \u0627\u0644\u062a\u0648\u0627\u0635\u0644\u060c \u0627\u0644\u062a\u0643\u0648\u064a\u0646\u060c \u0627\u0644\u062a\u062a\u0628\u0639 \u0648\u0627\u0644\u062a\u0642\u064a\u064a\u0645.',
            en: 'Specialised working groups: advocacy, communication, training, monitoring and evaluation.',
        },
    },
];

const documents = [
    { title: { fr: 'Statuts de la Coalition ISRAR', ar: '\u0627\u0644\u0646\u0638\u0627\u0645 \u0627\u0644\u0623\u0633\u0627\u0633\u064a \u0644\u062a\u062d\u0627\u0644\u0641 \u0625\u0635\u0631\u0627\u0631', en: 'ISRAR Coalition Statutes' }, type: 'PDF' },
    { title: { fr: 'Rapport annuel 2024', ar: '\u0627\u0644\u062a\u0642\u0631\u064a\u0631 \u0627\u0644\u0633\u0646\u0648\u064a 2024', en: 'Annual Report 2024' }, type: 'PDF' },
    { title: { fr: 'Rapport annuel 2023', ar: '\u0627\u0644\u062a\u0642\u0631\u064a\u0631 \u0627\u0644\u0633\u0646\u0648\u064a 2023', en: 'Annual Report 2023' }, type: 'PDF' },
    { title: { fr: 'Charte de la Coalition', ar: '\u0645\u064a\u062b\u0627\u0642 \u0627\u0644\u062a\u062d\u0627\u0644\u0641', en: 'Coalition Charter' }, type: 'PDF' },
    { title: { fr: 'Plan strat\u00e9gique 2023-2027', ar: '\u0627\u0644\u0645\u062e\u0637\u0637 \u0627\u0644\u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a 2023-2027', en: 'Strategic Plan 2023-2027' }, type: 'PDF' },
];

export default function APropos() {
    return (
        <AppLayout>
            <Head title="\u00c0 propos" />
            <div className="bg-white/85 backdrop-blur-sm dark:bg-neutral-950/80">
                {/* Hero */}
                <section className="bg-[var(--color-alpha)] py-16 text-white md:py-24">
                    <div className="mx-auto max-w-6xl px-6 text-center">
                        <h1 className="text-3xl font-bold md:text-5xl">
                            <TransText fr="\u00c0 propos de la Coalition ISRAR" ar="\u062d\u0648\u0644 \u062a\u062d\u0627\u0644\u0641 \u0625\u0635\u0631\u0627\u0631" en="About the ISRAR Coalition" />
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
                            <TransText
                                fr="R\u00e9seau national de 19 associations, la Coalition ISRAR agit dans 8 r\u00e9gions du Maroc pour l'\u00e9limination des violences fond\u00e9es sur le genre."
                                ar="\u0634\u0628\u0643\u0629 \u0648\u0637\u0646\u064a\u0629 \u062a\u0636\u0645 19 \u062c\u0645\u0639\u064a\u0629\u060c \u064a\u0639\u0645\u0644 \u062a\u062d\u0627\u0644\u0641 \u0625\u0635\u0631\u0627\u0631 \u0641\u064a 8 \u062c\u0647\u0627\u062a \u0628\u0627\u0644\u0645\u063a\u0631\u0628 \u0645\u0646 \u0623\u062c\u0644 \u0627\u0644\u0642\u0636\u0627\u0621 \u0639\u0644\u0649 \u0627\u0644\u0639\u0646\u0641 \u0627\u0644\u0645\u0628\u0646\u064a \u0639\u0644\u0649 \u0627\u0644\u0646\u0648\u0639 \u0627\u0644\u0627\u062c\u062a\u0645\u0627\u0639\u064a."
                                en="A national network of 19 associations, the ISRAR Coalition operates across 8 regions of Morocco to eliminate gender-based violence."
                            />
                        </p>
                    </div>
                </section>

                {/* Timeline */}
                <section className="mx-auto max-w-4xl px-6 py-16">
                    <h2 className="mb-12 text-center text-2xl font-bold text-[var(--color-alpha)] md:text-3xl">
                        <TransText fr="Notre parcours" ar="\u0645\u0633\u0627\u0631\u0646\u0627" en="Our journey" />
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
                            <TransText fr="R\u00e9alisations majeures" ar="\u0627\u0644\u0625\u0646\u062c\u0627\u0632\u0627\u062a \u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629" en="Major achievements" />
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
                        <TransText fr="Gouvernance" ar="\u0627\u0644\u062d\u0643\u0627\u0645\u0629" en="Governance" />
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

                {/* Documents */}
                <section className="border-t border-neutral-200 bg-neutral-50 py-16 dark:border-neutral-700 dark:bg-neutral-900/40">
                    <div className="mx-auto max-w-4xl px-6">
                        <h2 className="mb-10 text-center text-2xl font-bold text-[var(--color-alpha)] md:text-3xl">
                            <TransText fr="Documents t\u00e9l\u00e9chargeables" ar="\u0648\u062b\u0627\u0626\u0642 \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u062a\u062d\u0645\u064a\u0644" en="Downloadable documents" />
                        </h2>
                        <div className="space-y-3">
                            {documents.map((doc, idx) => (
                                <div key={idx} className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm ring-1 ring-neutral-200 dark:bg-neutral-800 dark:ring-neutral-700">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                                            <FileText className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-[var(--color-alpha)]">
                                                <TransText fr={doc.title.fr} ar={doc.title.ar} en={doc.title.en} />
                                            </p>
                                            <p className="text-xs text-neutral-500">{doc.type}</p>
                                        </div>
                                    </div>
                                    <button className="flex items-center gap-1.5 rounded-lg border border-[var(--color-alpha)]/20 px-3 py-2 text-xs font-medium text-[var(--color-alpha)] transition hover:bg-[var(--color-alpha)]/5">
                                        <Download className="h-3.5 w-3.5" />
                                        <TransText fr="T\u00e9l\u00e9charger" ar="\u062a\u062d\u0645\u064a\u0644" en="Download" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
