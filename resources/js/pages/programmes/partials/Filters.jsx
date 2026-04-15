import React from 'react';
import TransText from '@components/TransText';

const Filters = ({ activeFilter, onFilterChange, onFilters }) => {
    return (
        <section className="sticky top-0 z-20 pb-2">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                    <span className="mr-2 hidden text-sm text-neutral-500 sm:inline">
                        <TransText fr="Filtrer par" ar="تصفية حسب" />
                    </span>
                    {onFilters.map((f) => (
                        <button
                            key={f.key}
                            onClick={() => onFilterChange(f.key)}
                            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                                activeFilter === f.key
                                    ? 'bg-[var(--color-alpha)] text-white shadow-md'
                                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                            }`}
                        >
                            <TransText fr={f.label.fr} ar={f.label.ar} />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Filters;