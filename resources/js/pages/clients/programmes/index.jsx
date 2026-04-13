import React, { useState } from "react";
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import Hero from "./partials/Hero";
import Filters from "./partials/Filters";
import Main from "./partials/Main";
import Cta from "./partials/Cta";

const Programmes = ({ programmes = [] }) => {
    const [filter, setFilter] = useState('all');

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
                <Main onLoading={false} onFilteredProgrammes={filteredProgrammes} />
                <Cta onLoading={false} onFilteredProgrammes={filteredProgrammes} />
            </div>
        </AppLayout>
    );
};

export default Programmes;
