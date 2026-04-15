import React from 'react';
import TransText from '@components/TransText';

const Hero = () => {
    return (
        <section className="mx-auto max-w-6xl px-4 pb-4 pt-8 sm:px-6 lg:px-8 lg:pt-12">
            <div className="overflow-hidden rounded-3xl border border-[var(--color-alpha)]/15 bg-white shadow-sm">
                <div className="relative p-7 sm:p-10">
                    <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[var(--color-beta)]/15 blur-2xl" />
                    <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-[var(--color-alpha)]/15 blur-2xl" />
                    <div className="relative">
                        <span className="inline-flex items-center rounded-full border border-[var(--color-alpha)]/20 bg-[var(--color-alpha)]/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-alpha)]">
                            <TransText fr="Programmes ISRAR" ar="برامج إصرار" />
                        </span>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[var(--color-alpha)] md:text-4xl">
                            <TransText fr="Nos Programmes" ar="برامجنا" />
                        </h1>
                        <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-600 md:text-base">
                            <TransText fr="Découvrez les initiatives de la Coalition ISRAR pour l'égalité, l'empowerment et la promotion des droits des femmes." ar="اكتشفوا مبادرات تحالف إصرار من أجل المساواة والتمكين وتعزيز حقوق النساء." />
                        </p>
                        <p className="mt-2 max-w-3xl text-sm text-neutral-500 md:text-base">
                            <TransText fr="Des projets en cours et clôturés, avec des indicateurs d'impact concrets par région." ar="مشاريع جارية ومختتمة مع مؤشرات أثر ملموسة حسب الجهات." />
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
