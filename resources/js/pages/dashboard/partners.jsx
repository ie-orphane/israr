import AppLayout from '@/layouts/app-layout';
import { Form, Head, router, usePage } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Partenaires',
        href: '/admin/partners',
    },
];

export default function PartnersDashboard({ partners = [] }) {
    const { flash } = usePage().props;
    const { errors: pageErrors = {} } = usePage().props;
    const hasPartnerFormErrors = Boolean(
        pageErrors.name || pageErrors.website_url || pageErrors.logo || pageErrors.sort_order || pageErrors.is_active
    );
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(hasPartnerFormErrors);
    const [openEditPartnerId, setOpenEditPartnerId] = useState(null);
    const [partnerToDelete, setPartnerToDelete] = useState(null);
    const [isDeletingPartner, setIsDeletingPartner] = useState(false);

    useEffect(() => {
        if (hasPartnerFormErrors) {
            setIsCreateModalOpen(true);
        }
    }, [hasPartnerFormErrors]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des partenaires" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold text-[var(--color-alpha)]">Gestion des partenaires</h1>
                        <p className="text-sm text-muted-foreground">
                            Ajoutez des partenaires et pilotez leur affichage sur la page publique.
                        </p>
                    </div>
                    <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90">
                                <Plus className="mr-2 h-4 w-4" />
                                Ajouter un partenaire
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Ajouter un partenaire</DialogTitle>
                                <DialogDescription>
                                    Renseignez les informations du partenaire. Le logo est obligatoire.
                                </DialogDescription>
                            </DialogHeader>

                            <Form method="post" action="/admin/partners" className="grid gap-4 md:grid-cols-2" encType="multipart/form-data">
                                {({ processing, errors }) => (
                                    <>
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Nom du partenaire</Label>
                                            <Input id="name" name="name" required placeholder="Ex: ONU Femmes" />
                                            <InputError message={errors.name} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="website_url">Site web (optionnel)</Label>
                                            <Input id="website_url" name="website_url" type="url" placeholder="https://..." />
                                            <InputError message={errors.website_url} />
                                        </div>

                                        <div className="grid gap-2 md:col-span-2">
                                            <Label htmlFor="logo">Logo du partenaire</Label>
                                            <Input id="logo" name="logo" type="file" accept="image/*" required className="cursor-pointer" />
                                            <p className="text-xs text-muted-foreground">Image requise. Formats acceptes: JPG, PNG, WEBP, SVG (max 2MB).</p>
                                            <InputError message={errors.logo} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="sort_order">Ordre d'affichage</Label>
                                            <Input id="sort_order" name="sort_order" type="number" min="0" defaultValue="0" />
                                            <InputError message={errors.sort_order} />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label
                                                htmlFor="is_active"
                                                className="block w-full cursor-pointer rounded-xl border border-[var(--color-alpha)]/20 bg-[var(--color-alpha)]/5 p-4 transition hover:border-[var(--color-alpha)]/35 hover:bg-[var(--color-alpha)]/10"
                                            >
                                                <input type="hidden" name="is_active" value="0" />
                                                <div className="flex items-start gap-3">
                                                    <input
                                                        id="is_active"
                                                        name="is_active"
                                                        type="checkbox"
                                                        value="1"
                                                        defaultChecked
                                                        className="mt-0.5 h-5 w-5 rounded border-[var(--color-alpha)]/40 accent-[var(--color-alpha)]"
                                                    />
                                                    <div>
                                                        <p className="text-base font-semibold text-[var(--color-alpha)]">Activer pour affichage public</p>
                                                        <p className="text-sm text-muted-foreground">Ce partenaire sera visible immediatement sur la page d'accueil.</p>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>

                                        <div className="md:col-span-2">
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                                className="w-full bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90"
                                            >
                                                {processing ? 'Ajout en cours...' : 'Ajouter le partenaire'}
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>

                {flash?.success && (
                    <p className="rounded-md border border-green-300 bg-green-50 px-3 py-2 text-sm text-green-700">
                        {flash.success}
                    </p>
                )}

                <Card>
                    <CardContent>
                        {partners.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Aucun partenaire enregistre pour le moment.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[720px] border-separate border-spacing-0">
                                    <thead>
                                        <tr>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Logo</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Nom</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Site</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Ordre</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Statut</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {partners.map((partner) => (
                                            <tr key={partner.id} className="border-b last:border-b-0">
                                                <td className="px-3 py-3">
                                                    {partner.logo_url ? (
                                                        <img
                                                            src={partner.logo_url}
                                                            alt={partner.name}
                                                            className="h-10 w-20 rounded-md border bg-white object-contain p-1"
                                                        />
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground">-</span>
                                                    )}
                                                </td>
                                                <td className="px-3 py-3 text-sm font-medium text-[var(--color-alpha)]">{partner.name}</td>
                                                <td className="px-3 py-3 text-sm text-muted-foreground">
                                                    {partner.website_url ? (
                                                        <a
                                                            href={partner.website_url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-[var(--color-beta)] underline underline-offset-2"
                                                        >
                                                            {partner.website_url}
                                                        </a>
                                                    ) : (
                                                        '-'
                                                    )}
                                                </td>
                                                <td className="px-3 py-3 text-sm">{partner.sort_order}</td>
                                                <td className="px-3 py-3 text-sm">
                                                    {partner.is_active ? (
                                                        <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">Actif</span>
                                                    ) : (
                                                        <span className="rounded bg-neutral-200 px-2 py-1 text-xs font-medium text-neutral-700">Inactif</span>
                                                    )}
                                                </td>
                                                <td className="px-3 py-3 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <Dialog
                                                            open={openEditPartnerId === partner.id}
                                                            onOpenChange={(open) => setOpenEditPartnerId(open ? partner.id : null)}
                                                        >
                                                            <DialogTrigger asChild>
                                                                <Button variant="outline" size="sm" className="gap-2">
                                                                    <Pencil className="h-4 w-4" />
                                                                    Modifier
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                                                            <DialogHeader>
                                                                <DialogTitle>Modifier le partenaire</DialogTitle>
                                                                <DialogDescription>
                                                                    Mettez a jour les informations du partenaire.
                                                                </DialogDescription>
                                                            </DialogHeader>

                                                            <Form
                                                                method="post"
                                                                action={`/admin/partners/${partner.id}`}
                                                                className="grid gap-4 md:grid-cols-2"
                                                                encType="multipart/form-data"
                                                                onSuccess={() => setOpenEditPartnerId(null)}
                                                            >
                                                                {({ processing, errors }) => (
                                                                    <>
                                                                        <input type="hidden" name="_method" value="PUT" />

                                                                        <div className="grid gap-2">
                                                                            <Label htmlFor={`edit-name-${partner.id}`}>Nom du partenaire</Label>
                                                                            <Input
                                                                                id={`edit-name-${partner.id}`}
                                                                                name="name"
                                                                                required
                                                                                defaultValue={partner.name}
                                                                            />
                                                                            <InputError message={errors.name} />
                                                                        </div>

                                                                        <div className="grid gap-2">
                                                                            <Label htmlFor={`edit-website-${partner.id}`}>Site web (optionnel)</Label>
                                                                            <Input
                                                                                id={`edit-website-${partner.id}`}
                                                                                name="website_url"
                                                                                type="url"
                                                                                defaultValue={partner.website_url ?? ''}
                                                                                placeholder="https://..."
                                                                            />
                                                                            <InputError message={errors.website_url} />
                                                                        </div>

                                                                        <div className="grid gap-2 md:col-span-2">
                                                                            <Label htmlFor={`edit-logo-${partner.id}`}>Remplacer le logo (optionnel)</Label>
                                                                            <Input id={`edit-logo-${partner.id}`} name="logo" type="file" accept="image/*" className="cursor-pointer" />
                                                                            {partner.logo_url && (
                                                                                <img
                                                                                    src={partner.logo_url}
                                                                                    alt={partner.name}
                                                                                    className="h-12 w-24 rounded-md border bg-white object-contain p-1"
                                                                                />
                                                                            )}
                                                                            <InputError message={errors.logo} />
                                                                        </div>

                                                                        <div className="grid gap-2">
                                                                            <Label htmlFor={`edit-order-${partner.id}`}>Ordre d'affichage</Label>
                                                                            <Input
                                                                                id={`edit-order-${partner.id}`}
                                                                                name="sort_order"
                                                                                type="number"
                                                                                min="0"
                                                                                defaultValue={partner.sort_order}
                                                                            />
                                                                            <InputError message={errors.sort_order} />
                                                                        </div>

                                                                        <div className="md:col-span-2">
                                                                            <label
                                                                                htmlFor={`edit-active-${partner.id}`}
                                                                                className="block w-full cursor-pointer rounded-xl border border-[var(--color-alpha)]/20 bg-[var(--color-alpha)]/5 p-4 transition hover:border-[var(--color-alpha)]/35 hover:bg-[var(--color-alpha)]/10"
                                                                            >
                                                                                <input type="hidden" name="is_active" value="0" />
                                                                                <div className="flex items-start gap-3">
                                                                                    <input
                                                                                        id={`edit-active-${partner.id}`}
                                                                                        name="is_active"
                                                                                        type="checkbox"
                                                                                        value="1"
                                                                                        defaultChecked={Boolean(partner.is_active)}
                                                                                        className="mt-0.5 h-5 w-5 rounded border-[var(--color-alpha)]/40 accent-[var(--color-alpha)]"
                                                                                    />
                                                                                    <div>
                                                                                        <p className="text-base font-semibold text-[var(--color-alpha)]">Activer pour affichage public</p>
                                                                                        <p className="text-sm text-muted-foreground">Ce partenaire sera visible sur la page d'accueil.</p>
                                                                                    </div>
                                                                                </div>
                                                                            </label>
                                                                        </div>

                                                                        <div className="md:col-span-2">
                                                                            <Button
                                                                                type="submit"
                                                                                disabled={processing}
                                                                                className="w-full bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90"
                                                                            >
                                                                                {processing ? 'Mise a jour...' : 'Enregistrer les modifications'}
                                                                            </Button>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </Form>
                                                            </DialogContent>
                                                        </Dialog>

                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="sm"
                                                            className="gap-2"
                                                            onClick={() => setPartnerToDelete(partner)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            Supprimer
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Dialog open={Boolean(partnerToDelete)} onOpenChange={(open) => !open && setPartnerToDelete(null)}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Confirmer la suppression</DialogTitle>
                            <DialogDescription>
                                {partnerToDelete
                                    ? `Voulez-vous supprimer le partenaire "${partnerToDelete.name}" ? Cette action est irreversible.`
                                    : 'Cette action est irreversible.'}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => setPartnerToDelete(null)} disabled={isDeletingPartner}>
                                Annuler
                            </Button>
                            <Button
                                type="button"
                                variant="destructive"
                                disabled={!partnerToDelete || isDeletingPartner}
                                onClick={() => {
                                    if (!partnerToDelete) return;

                                    setIsDeletingPartner(true);
                                    router.delete(`/admin/partners/${partnerToDelete.id}`, {
                                        preserveScroll: true,
                                        onFinish: () => setIsDeletingPartner(false),
                                        onSuccess: () => setPartnerToDelete(null),
                                    });
                                }}
                            >
                                {isDeletingPartner ? 'Suppression...' : 'Supprimer'}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
