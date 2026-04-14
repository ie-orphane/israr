import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: "Reponses d'aide",
        href: '/admin/aide-requests',
    },
];

export default function AideResponses({ aideRequests = [] }) {
    const total = aideRequests.length;
    const pending = aideRequests.filter((item) => item.status === 'pending').length;
    const latest = aideRequests[0];

    const formatDate = (value) => {
        if (!value) return '-';

        return new Date(value).toLocaleString('fr-FR', {
            dateStyle: 'medium',
            timeStyle: 'short',
        });
    };

    const statusLabel = (status) => {
        if (status === 'pending') return 'En attente';
        if (status === 'in_progress') return 'En cours';
        if (status === 'resolved') return 'Traitee';

        return status;
    };

    const statusVariant = (status) => {
        if (status === 'resolved') return 'default';
        if (status === 'in_progress') return 'secondary';

        return 'outline';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reponses aide" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-semibold text-[var(--color-alpha)]">Reponses du formulaire d'aide</h1>
                    <p className="text-sm text-muted-foreground">
                        Liste des reponses soumises via le formulaire d'aide juridique.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total (30 derniers)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-[var(--color-alpha)]">{total}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">En attente</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-[var(--color-beta)]">{pending}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Derniere soumission</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm font-semibold text-[var(--color-alpha)]">
                                {latest ? `#${latest.id} - ${latest.name}` : 'Aucune'}
                            </p>
                            <p className="text-xs text-muted-foreground">{latest ? formatDate(latest.created_at) : '-'}</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardContent>
                        {aideRequests.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Aucune reponse recue pour le moment.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[900px] border-separate border-spacing-0">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">ID</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Nom</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Region</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Type</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Contact</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Statut</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {aideRequests.map((item) => (
                                            <tr key={item.id} className="border-b last:border-b-0">
                                                <td className="px-3 py-3 text-sm font-medium text-[var(--color-alpha)]">#{item.id}</td>
                                                <td className="px-3 py-3 text-sm">{item.name}</td>
                                                <td className="px-3 py-3 text-sm">{item.region}</td>
                                                <td className="px-3 py-3 text-sm">{item.type_of_violence}</td>
                                                <td className="px-3 py-3 text-sm">{item.contact_method}</td>
                                                <td className="px-3 py-3 text-sm">
                                                    <Badge variant={statusVariant(item.status)}>{statusLabel(item.status)}</Badge>
                                                </td>
                                                <td className="px-3 py-3 text-sm">{formatDate(item.created_at)}</td>
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