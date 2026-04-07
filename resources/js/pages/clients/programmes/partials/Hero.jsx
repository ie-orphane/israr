import React from 'react';
import TransText from '@components/TransText';

const Hero = () => {
    return (
        <section className="bg-[var(--color-alpha)] py-16 text-white md:py-24">
            <div className="mx-auto max-w-6xl px-6 text-center">
                <h1 className="text-3xl font-bold md:text-5xl">
                    <TransText
                        fr="Nos Programmes"
                        ar="برامجنا"
                        en="Our Programs"
                    />
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
                    <TransText
                        fr="Découvrez les initiatives de la Coalition ISRAR pour l'égalité, l'empowerment et la promotion des droits des femmes."
                        ar="اكتشفوا مبادرات تحالف إصرار من أجل المساواة والتمكين وتعزيز حقوق النساء."
                        en="Discover ISRAR Coalition initiatives for equality, empowerment, and the promotion of women's rights."
                    />
                </p>
                <p className="mx-auto mt-2 max-w-3xl text-sm text-white/70 md:text-base">
                    <TransText
                        fr="Des projets en cours et clôturés, avec des indicateurs d'impact concrets par région."
                        ar="مشاريع جارية ومختتمة مع مؤشرات أثر ملموسة حسب الجهات."
                        en="Active and completed projects with concrete impact indicators by region."
                    />
                </p>
            </div>
        </section>
    );
};

export default Hero;
