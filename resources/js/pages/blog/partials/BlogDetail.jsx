import TransText from '@components/TransText';
import { CalendarDays, UserRound, Tag, ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';

export default function BlogDetail({ blog }) {
    if (!blog) {
        return null;
    }

    return (
        <article className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-8">
                <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-alpha)] transition hover:gap-3 hover:text-[var(--color-beta)]">
                    <ArrowLeft className="h-4 w-4" />
                    <TransText fr="Retour aux articles" ar="العودة إلى المقالات" />
                </Link>
            </div>

            <div className="mb-8 overflow-hidden rounded-3xl border border-[var(--color-alpha)]/15 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    {blog.category && (
                        <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-alpha)]/10 px-3 py-1 text-[var(--color-alpha)]">
                            <Tag className="h-3.5 w-3.5" />
                            {blog.category}
                        </span>
                    )}
                    {blog.published_at && (
                        <span className="inline-flex items-center gap-2">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {blog.published_at}
                        </span>
                    )}
                    {blog.author && (
                        <span className="inline-flex items-center gap-2">
                            <UserRound className="h-3.5 w-3.5" />
                            {blog.author}
                        </span>
                    )}
                </div>

                <h1 className="mt-4 text-3xl font-bold tracking-tight text-[var(--color-alpha)] sm:text-4xl">
                    {blog.title}
                </h1>

                {blog.excerpt && <p className="mt-3 text-base leading-7 text-neutral-600">{blog.excerpt}</p>}
            </div>

            {blog.image_url && (
                <div className="mb-8 overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 shadow-sm">
                    <img src={blog.image_url} alt={blog.title} className="h-[320px] w-full object-cover sm:h-[420px]" loading="lazy" />
                </div>
            )}

            <Card className={`border-neutral-200 bg-white shadow-sm ${blog.image_url ? '' : 'min-h-[52vh]'}`}>
                <CardContent className={`p-6 sm:p-8 ${blog.image_url ? '' : 'sm:p-10'}`}>
                    <div
                        className="blog-content max-w-none text-neutral-700"
                        dir={blog.body && /[\u0600-\u06FF]/.test(blog.body) ? 'rtl' : 'ltr'}
                        dangerouslySetInnerHTML={{ __html: blog.body || '<p>Aucun contenu disponible.</p>' }}
                    />
                </CardContent>
            </Card>
        </article>
    );
}
