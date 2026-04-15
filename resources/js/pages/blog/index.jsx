import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import TransText from '@components/TransText';
import BlogCard from './partials/BlogCard';
import Pagination from './partials/Pagination';

export default function BlogIndex({ blogs = [], pagination, categories = [], activeCategory = 'all' }) {
    const chips = ['all', ...categories];

    return (
        <AppLayout>
            <Head title="Blog" />
            <div className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f7f4fb_45%,#ffffff_100%)]">
                <section className="mx-auto max-w-6xl px-4 pb-4 pt-8 sm:px-6 lg:px-8 lg:pt-12">
                    <div className="overflow-hidden rounded-3xl border border-[var(--color-alpha)]/15 bg-white shadow-sm">
                        <div className="relative p-7 sm:p-10">
                            <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[var(--color-beta)]/15 blur-2xl" />
                            <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-[var(--color-alpha)]/15 blur-2xl" />
                            <div className="relative">
                                <span className="inline-flex items-center rounded-full border border-[var(--color-alpha)]/20 bg-[var(--color-alpha)]/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-alpha)]">
                                    <TransText fr="Actualités ISRAR" ar="أخبار إصرار" />
                                </span>
                                <h1 className="mt-4 text-3xl font-bold tracking-tight text-[var(--color-alpha)] md:text-4xl">
                                    <TransText fr="Blog" ar="المدونة" />
                                </h1>
                                <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-600 md:text-base">
                                    <TransText
                                        fr="Découvrez nos articles, nos analyses de terrain et nos éclairages juridiques en français et en arabe."
                                        ar="اكتشفوا مقالاتنا وقراءاتنا الميدانية وتوضيحاتنا القانونية بالفرنسية والعربية."
                                    />
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                    {chips.length > 1 && (
                        <div className="mb-7 flex flex-wrap items-center gap-2">
                            {chips.map((category) => {
                                const isAll = category === 'all';
                                const isActive = activeCategory === category;
                                const href = isAll ? '/blogs' : `/blogs?category=${encodeURIComponent(category)}`;

                                return (
                                    <Link
                                        key={category}
                                        href={href}
                                        preserveScroll
                                        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                                            isActive
                                                ? 'border-[var(--color-alpha)] bg-[var(--color-alpha)] text-white shadow-sm'
                                                : 'border-neutral-200 bg-white text-neutral-700 hover:border-[var(--color-alpha)]/40 hover:bg-[var(--color-alpha)]/5 hover:text-[var(--color-alpha)]'
                                        }`}
                                    >
                                        {isAll ? <TransText fr="Tous" ar="الكل" /> : category}
                                    </Link>
                                );
                            })}
                        </div>
                    )}

                    {blogs.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-neutral-300 bg-white px-6 py-16 text-center">
                            <h2 className="text-xl font-semibold text-[var(--color-alpha)]">
                                <TransText fr="Aucun article pour le moment" ar="لا توجد مقالات حالياً" />
                            </h2>
                            <p className="mx-auto mt-2 max-w-2xl text-sm text-neutral-600">
                                <TransText fr="Revenez bientôt pour découvrir nos dernières publications." ar="عودوا قريباً لاكتشاف آخر منشوراتنا." />
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                {blogs.map((blog) => (
                                    <BlogCard key={blog.id} blog={blog} />
                                ))}
                            </div>
                            <Pagination pagination={pagination} />
                        </>
                    )}
                </section>
            </div>
        </AppLayout>
    );
}
