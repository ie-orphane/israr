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
        { key: 'all', label: { fr: 'Tous', ar: 'الكل' } },
        { key: 'active', label: { fr: 'En cours', ar: 'جاري' } },
        { key: 'closed', label: { fr: 'Clôturé', ar: 'مختتم' } },
    ];

    const filteredProgrammes = filter === 'all'
        ? programmes
        : programmes.filter((p) => p.status === filter);

    return (
        <AppLayout>
            <Head title="Programmes" />
            <div className="min-h-screen w-full bg-[linear-gradient(180deg,#ffffff_0%,#f7f4fb_45%,#ffffff_100%)]">
                <Hero />
                <Filters activeFilter={filter} onFilterChange={setFilter} onFilters={filters} />
                <Main onLoading={false} onFilteredProgrammes={filteredProgrammes} />
                <Cta onLoading={false} onFilteredProgrammes={filteredProgrammes} />
            </div>
        </AppLayout>
    );
};

export default Programmes;
