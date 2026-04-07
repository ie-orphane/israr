import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: "/",
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div>
                    <h1 className="text-2xl font-semibold text-[var(--color-alpha)]">Dashboard</h1>
                    <p className="text-sm text-muted-foreground">
                        Vue d'ensemble des espaces internes.
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Demandes d'aide</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-sm text-muted-foreground">
                            Les reponses du formulaire d'aide sont maintenant disponibles sur une page dediee.
                        </p>
                        <Button asChild className="bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90">
                            <Link href="/dashboard/aide-requests">Ouvrir les reponses d'aide</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
