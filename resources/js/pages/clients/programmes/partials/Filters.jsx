import React from 'react';
import TransText from '@components/TransText';

const Filters = ({ activeFilter, onFilterChange, onFilters }) => {
    return (
        <section className="sticky top-0 z-20 border-b border-neutral-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2 px-6 py-4">
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
        </section>
    );
};

export default Filters;