import { Link } from '@inertiajs/react';
import TransText from '@components/TransText';
import { ArrowRight, CalendarDays, ImageOff } from 'lucide-react';

export default function BlogCard({ blog }) {
    const preview = blog.excerpt || blog.body_preview;

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[var(--color-alpha)]/25 hover:shadow-lg">
            <Link href={blog.url} className="relative block aspect-[16/10] overflow-hidden bg-neutral-100">
                {blog.image_url ? (
                    <img
                        src={blog.image_url}
                        alt={blog.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--color-alpha)]/12 via-[var(--color-beta)]/14 to-neutral-100 text-[var(--color-alpha)]">
                        <ImageOff className="h-10 w-10" />
                    </div>
                )}
                <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-white/70 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-alpha)] backdrop-blur">
                        {blog.category}
                    </span>
                </div>
            </Link>

            <div className="flex flex-1 flex-col gap-4 p-5">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    {blog.published_at && (
                        <>
                            <CalendarDays className="h-3.5 w-3.5" />
                            <span>{blog.published_at}</span>
                        </>
                    )}
                    {blog.author && (
                        <>
                            {blog.published_at && <span className="text-neutral-300">|</span>}
                            <span>{blog.author}</span>
                        </>
                    )}
                </div>

                <div className="space-y-2">
                    <h3 className="text-xl font-bold leading-tight text-[var(--color-alpha)] transition group-hover:text-[var(--color-beta)]">
                        <Link href={blog.url}>{blog.title}</Link>
                    </h3>
                    {preview && (
                        <p className="line-clamp-3 text-sm leading-6 text-neutral-600">
                            {preview}
                        </p>
                    )}
                </div>

                <div className="mt-auto">
                    <Link href={blog.url} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-alpha)] transition hover:gap-3 hover:text-[var(--color-beta)]">
                        <TransText fr="Lire l'article" ar="اقرأ المقال" />
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
