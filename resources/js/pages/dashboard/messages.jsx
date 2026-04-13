import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Messages',
        href: '/admin/messages',
    },
];

export default function DashboardMessages({ messages = [] }) {
    const formatDate = (value) => {
        if (!value) return '-';

        return new Date(value).toLocaleString('fr-FR', {
            dateStyle: 'medium',
            timeStyle: 'short',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Messages de contact" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div>
                    <h1 className="text-2xl font-semibold text-[var(--color-alpha)]">Messages de contact</h1>
                    <p className="text-sm text-muted-foreground">
                        Liste centralisee des messages recus via le formulaire de contact.
                    </p>
                </div>

                <Card>
                    <CardContent>
                        {messages.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Aucun message recu pour le moment.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[980px] border-separate border-spacing-0">
                                    <thead>
                                        <tr>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Date</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Nom</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Email</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Sujet</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Message</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {messages.map((message) => (
                                            <tr key={message.id} className="border-b last:border-b-0">
                                                <td className="px-3 py-3 text-sm whitespace-nowrap">{formatDate(message.created_at)}</td>
                                                <td className="px-3 py-3 text-sm font-medium text-[var(--color-alpha)]">{message.name}</td>
                                                <td className="px-3 py-3 text-sm">
                                                    <a
                                                        href={`mailto:${message.email}`}
                                                        className="text-[var(--color-beta)] underline underline-offset-2"
                                                    >
                                                        {message.email}
                                                    </a>
                                                </td>
                                                <td className="px-3 py-3 text-sm">{message.subject}</td>
                                                <td className="px-3 py-3 text-sm max-w-[420px]">
                                                    <p className="line-clamp-4 whitespace-pre-wrap">{message.message}</p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
