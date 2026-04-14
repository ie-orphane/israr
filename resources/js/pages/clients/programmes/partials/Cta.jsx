import React from 'react';
import { Link } from '@inertiajs/react';
import TransText from '@components/TransText';

const Cta = ({ onLoading, onFilteredProgrammes }) => {
    return (
        !onLoading && onFilteredProgrammes.length > 0 && (
            <section className="mx-auto max-w-6xl px-6 pb-16">
                <div className="flex flex-col justify-between rounded-2xl bg-[var(--color-alpha)]/90 p-6 text-white shadow-lg md:flex-row md:items-center md:gap-6">
                    <div>
                        <h2 className="text-xl font-semibold md:text-2xl">
                            <TransText fr="Participez à nos programmes" ar="انخرطوا في برامجنا" />
                        </h2>
                        <p className="mt-3 max-w-2xl text-sm text-white/90 md:text-base">
                            <TransText fr="Rejoignez-nous et contribuez à construire une société plus juste et égalitaire pour toutes et tous." ar="انضموا إلينا وساهموا في بناء مجتمع أكثر عدالة ومساواة للجميع." />
                        </p>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3 md:mt-0">
                        <Link
                            href="/contact"
                            className="rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-alpha)] transition hover:bg-white/90"
                        >
                            <TransText fr="Nous contacter" ar="اتصلوا بنا" />
                        </Link>
                        <Link
                            href="/aide/formulaire"
                            className="rounded-lg border border-white/60 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white hover:text-[var(--color-alpha)]"
                        >
                            <TransText fr="Demander de l'aide" ar="طلب المساعدة" />
                        </Link>
                    </div>
                </div>
            </section>
        )
    );
};

export default Cta;