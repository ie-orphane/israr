import React, { useEffect, useState } from "react";
import AppLayout from '@/layouts/app-layout';
import Hero from "./partials/Hero";
import Filters from "./partials/Filters";
import Main from "./partials/Main";
import Cta from "./partials/Cta";

const mockProgrammes = [
    {
        id: 1,
        title_fr: "Programme SaMMa",
        summary_fr:
            "Projet r\u00e9gional pour la lutte contre les violences bas\u00e9es sur le genre et la promotion des droits des femmes.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop",
        status: "En cours",
        beneficiaires: 4500,
        region: "Multi-r\u00e9gional",
        partenaires: ["AFD", "ONU Femmes"],
        budget: "2.5M MAD",
    },
    {
        id: 2,
        title_fr: "Programme \u00c9galit\u00e9 & Inclusion",
        summary_fr:
            "Renforcement des capacit\u00e9s des associations locales pour la promotion de l'\u00e9galit\u00e9 et l'inclusion sociale.",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
        status: "Cl\u00f4tur\u00e9",
        beneficiaires: 3200,
        region: "Casablanca-Settat",
        partenaires: ["UNFPA", "Union Europ\u00e9enne"],
        budget: "1.8M MAD",
    },
    {
        id: 3,
        title_fr: "Programme Leadership F\u00e9minin",
        summary_fr:
            "Encourager la participation des femmes aux instances d\u00e9cisionnelles et renforcer leur leadership.",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop",
        status: "En cours",
        beneficiaires: 1800,
        region: "Rabat-Sal\u00e9-K\u00e9nitra",
        partenaires: ["GIZ"],
        budget: "900K MAD",
    },
    {
        id: 4,
        title_fr: "Programme Autonomisation \u00c9conomique",
        summary_fr:
            "Soutenir l'entrepreneuriat f\u00e9minin et l'acc\u00e8s aux ressources \u00e9conomiques pour les femmes.",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
        status: "En cours",
        beneficiaires: 2100,
        region: "Marrakech-Safi",
        partenaires: ["Oxfam", "USAID"],
        budget: "1.2M MAD",
    },
    {
        id: 5,
        title_fr: "Programme \u00c9ducation & Sensibilisation",
        summary_fr:
            "Programmes \u00e9ducatifs pour sensibiliser sur les droits et l'\u00e9galit\u00e9 des genres dans la soci\u00e9t\u00e9.",
        image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=400&fit=crop",
        status: "Cl\u00f4tur\u00e9",
        beneficiaires: 5600,
        region: "F\u00e8s-Mekn\u00e8s",
        partenaires: ["UNICEF"],
        budget: "750K MAD",
    },
    {
        id: 6,
        title_fr: "Programme Sant\u00e9 & Bien-\u00eatre",
        summary_fr:
            "Initiatives pour am\u00e9liorer l'acc\u00e8s aux soins de sant\u00e9 et promouvoir le bien-\u00eatre des femmes.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
        status: "En cours",
        beneficiaires: 3400,
        region: "Souss-Massa",
        partenaires: ["OMS", "Fondation Friedrich Ebert"],
        budget: "1.5M MAD",
    },
];

const Programmes = () => {
    const [programmes, setProgrammes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("Tous");

    useEffect(() => {
        setTimeout(() => {
            setProgrammes(mockProgrammes);
            setLoading(false);
        }, 800);
    }, []);

    const filters = ["Tous", "En cours", "Cl\u00f4tur\u00e9"];

    const filteredProgrammes = filter === "Tous"
        ? programmes
        : programmes.filter(p => p.status === filter);

    return (
        <AppLayout>
            <div className="min-h-screen w-full bg-light_gray">
                <Hero />
                <Filters onFilterChange={setFilter} onFilters={filters} />
                <Main onLoading={loading} onFilteredProgrammes={filteredProgrammes} onProgramme={programmes} />
                <Cta onLoading={loading} onFilteredProgrammes={filteredProgrammes} />
            </div>
        </AppLayout>
    );
};

export default Programmes;
