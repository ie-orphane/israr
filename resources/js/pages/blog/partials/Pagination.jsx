import { Link } from '@inertiajs/react';

export default function Pagination({ pagination }) {
    if (!pagination || !pagination.links || pagination.last_page <= 1) {
        return null;
    }

    return (
        <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
            {pagination.links.map((link, index) => {
                const isSpacer = !link.url && !link.active;
                if (isSpacer) {
                    return (
                        <span key={index} className="px-3 py-2 text-sm text-neutral-400">
                            ...
                        </span>
                    );
                }

                const className = link.active
                    ? 'border-[var(--color-alpha)] bg-[var(--color-alpha)] text-white shadow-sm'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-[var(--color-alpha)]/40 hover:bg-[var(--color-alpha)]/5 hover:text-[var(--color-alpha)]';

                return (
                    <Link
                        key={index}
                        href={link.url ?? '#'}
                        preserveScroll
                        className={`min-w-10 rounded-full border px-4 py-2 text-sm font-medium transition ${className}`}
                    >
                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                    </Link>
                );
            })}
        </nav>
    );
}
