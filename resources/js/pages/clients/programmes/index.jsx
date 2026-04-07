import React, { useEffect, useState } from "react";
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import Hero from "./partials/Hero";
import Filters from "./partials/Filters";
import Main from "./partials/Main";
import Cta from "./partials/Cta";

const mockProgrammes = [
    {
        id: 1,
        title_ar: "برنامج سَمّى",
        title_fr: "Programme SaMMa",
        summary_ar:
            "مشروع جهوي لمحاربة العنف القائم على النوع الاجتماعي وتعزيز حقوق النساء.",
        summary_fr:
            "Projet régional pour la lutte contre les violences basées sur le genre et la promotion des droits des femmes.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop",
        status: "active",
        beneficiaires: 4500,
        region_ar: "متعدد الجهات",
        region: "Multi-régional",
        partenaires: ["AFD", "ONU Femmes"],
        budget: "2.5M MAD",
    },
    {
        id: 2,
        title_ar: "برنامج المساواة والإدماج",
        title_fr: "Programme Égalité & Inclusion",
        summary_ar:
            "تعزيز قدرات الجمعيات المحلية للنهوض بالمساواة والإدماج الاجتماعي.",
        summary_fr:
            "Renforcement des capacités des associations locales pour la promotion de l'égalité et l'inclusion sociale.",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
        status: "closed",
        beneficiaires: 3200,
        region_ar: "الدار البيضاء - سطات",
        region: "Casablanca-Settat",
        partenaires: ["UNFPA", "Union Européenne"],
        budget: "1.8M MAD",
    },
    {
        id: 3,
        title_ar: "برنامج القيادة النسائية",
        title_fr: "Programme Leadership Féminin",
        summary_ar:
            "تشجيع مشاركة النساء في مواقع القرار وتعزيز قدراتهن القيادية.",
        summary_fr:
            "Encourager la participation des femmes aux instances décisionnelles et renforcer leur leadership.",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop",
        status: "active",
        beneficiaires: 1800,
        region_ar: "الرباط - سلا - القنيطرة",
        region: "Rabat-Salé-Kénitra",
        partenaires: ["GIZ"],
        budget: "900K MAD",
    },
    {
        id: 4,
        title_ar: "برنامج التمكين الاقتصادي",
        title_fr: "Programme Autonomisation Économique",
        summary_ar:
            "دعم ريادة الأعمال النسائية وتيسير الولوج إلى الموارد الاقتصادية.",
        summary_fr:
            "Soutenir l'entrepreneuriat féminin et l'accès aux ressources économiques pour les femmes.",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
        status: "active",
        beneficiaires: 2100,
        region_ar: "مراكش - آسفي",
        region: "Marrakech-Safi",
        partenaires: ["Oxfam", "USAID"],
        budget: "1.2M MAD",
    },
    {
        id: 5,
        title_ar: "برنامج التعليم والتحسيس",
        title_fr: "Programme Éducation & Sensibilisation",
        summary_ar:
            "برامج تربوية للتحسيس بالحقوق وتعزيز المساواة بين الجنسين داخل المجتمع.",
        summary_fr:
            "Programmes éducatifs pour sensibiliser sur les droits et l'égalité des genres dans la société.",
        image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=400&fit=crop",
        status: "closed",
        beneficiaires: 5600,
        region_ar: "فاس - مكناس",
        region: "Fès-Meknès",
        partenaires: ["UNICEF"],
        budget: "750K MAD",
    },
    {
        id: 6,
        title_ar: "برنامج الصحة والرفاه",
        title_fr: "Programme Santé & Bien-être",
        summary_ar:
            "مبادرات لتحسين الولوج إلى خدمات الصحة وتعزيز رفاه النساء.",
        summary_fr:
            "Initiatives pour améliorer l'accès aux soins de santé et promouvoir le bien-être des femmes.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
        status: "active",
        beneficiaires: 3400,
        region_ar: "سوس - ماسة",
        region: "Souss-Massa",
        partenaires: ["OMS", "Fondation Friedrich Ebert"],
        budget: "1.5M MAD",
    },
];

const Programmes = () => {
    const [programmes, setProgrammes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        setTimeout(() => {
            setProgrammes(mockProgrammes);
            setLoading(false);
        }, 800);
    }, []);

    const filters = [
        { key: 'all', label: { fr: 'Tous', ar: 'الكل', en: 'All' } },
        { key: 'active', label: { fr: 'En cours', ar: 'جاري', en: 'Active' } },
        { key: 'closed', label: { fr: 'Clôturé', ar: 'مختتم', en: 'Closed' } },
    ];

    const filteredProgrammes = filter === 'all'
        ? programmes
        : programmes.filter((p) => p.status === filter);

    return (
        <AppLayout>
            <Head title="Programmes" />
            <div className="min-h-screen w-full bg-white/85 backdrop-blur-sm dark:bg-neutral-950/80">
                <Hero />
                <Filters activeFilter={filter} onFilterChange={setFilter} onFilters={filters} />
                <Main onLoading={loading} onFilteredProgrammes={filteredProgrammes} onProgramme={programmes} />
                <Cta onLoading={loading} onFilteredProgrammes={filteredProgrammes} />
            </div>
        </AppLayout>
    );
};

export default Programmes;
