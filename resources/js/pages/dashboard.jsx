import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
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

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Demandes d'aide</CardTitle>
                        </CardHeader>
                        <CardContent className='justify-between flex flex-col items-start h-full'>
                            <p className="mb-4 text-sm text-muted-foreground">
                                Les reponses du formulaire d'aide sont maintenant disponibles sur une page dediee.
                            </p>
                            <Button asChild className="bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90">
                                <Link href="/admin/aide-requests">Ouvrir les reponses d'aide</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Gestion des partenaires</CardTitle>
                        </CardHeader>
                        <CardContent className='justify-between flex flex-col items-start h-full'>
                            <p className="mb-4 text-sm text-muted-foreground">
                                Ajoutez et visualisez les partenaires depuis une page dediee.
                            </p>
                            <Button asChild className="bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90">
                                <Link href="/admin/partners">Ouvrir la gestion des partenaires</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Gestion des publications</CardTitle>
                        </CardHeader>
                        <CardContent className='justify-between flex flex-col items-start h-full'>
                            <p className="mb-4 text-sm text-muted-foreground">
                                Ajoutez des documents qui seront affiches automatiquement sur la page publique /publications.
                            </p>
                            <Button asChild className="bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90">
                                <Link href="/admin/publications">Ouvrir la gestion des publications</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Gestion des programmes</CardTitle>
                        </CardHeader>
                        <CardContent className='justify-between flex flex-col items-start h-full'>
                            <p className="mb-4 text-sm text-muted-foreground">
                                Ajoutez, modifiez et publiez les programmes affiches sur la page publique /programmes.
                            </p>
                            <Button asChild className="bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90">
                                <Link href="/admin/programmes">Ouvrir la gestion des programmes</Link>
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Gestion des blogs</CardTitle>
                        </CardHeader>
                        <CardContent className='justify-between flex flex-col items-start h-full'>
                            <p className="mb-4 text-sm text-muted-foreground">
                                Publiez et organisez les articles bilingues affichés sur la page /blogs.
                            </p>
                            <Button asChild className="bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90">
                                <Link href="/admin/blogs">Ouvrir la gestion des blogs</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Messages de contact</CardTitle>
                        </CardHeader>
                        <CardContent className='justify-between flex flex-col items-start h-full'>
                            <p className="mb-4 text-sm text-muted-foreground">
                                Consultez tous les messages recus depuis le formulaire de contact public.
                            </p>
                            <Button asChild className="bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90">
                                <Link href="/admin/messages">Ouvrir les messages</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Documents telechargeables</CardTitle>
                        </CardHeader>
                        <CardContent className='justify-between flex flex-col items-start h-full'>
                            <p className="mb-4 text-sm text-muted-foreground">
                                Gere les documents affiches dans la section Documents telechargeables de la page A propos.
                            </p>
                            <Button asChild className="bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90">
                                <Link href="/admin/about-documents">Ouvrir la gestion des documents</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
