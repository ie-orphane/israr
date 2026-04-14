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
        title: 'Publications',
        href: '/admin/publications',
    },
];

const categories = [
    { value: 'rapport', label: 'Rapport' },
    { value: 'plaidoyer', label: 'Plaidoyer' },
    { value: 'communique', label: 'Communique' },
    { value: 'guide', label: 'Guide' },
];

export default function DashboardPublications({ publications = [] }) {
    const { flash, errors: pageErrors = {} } = usePage().props;
    const hasCreateErrors = Boolean(
        pageErrors.title_fr || pageErrors.title_ar || pageErrors.description_fr || pageErrors.description_ar || pageErrors.category || pageErrors.published_at || pageErrors.document || pageErrors.is_published
    );

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(hasCreateErrors);
    const [openEditPublicationId, setOpenEditPublicationId] = useState(null);
    const [publicationToDelete, setPublicationToDelete] = useState(null);
    const [isDeletingPublication, setIsDeletingPublication] = useState(false);

    useEffect(() => {
        if (hasCreateErrors) {
            setIsCreateModalOpen(true);
        }
    }, [hasCreateErrors]);

    const categoryLabel = (category) => {
        const found = categories.find((item) => item.value === category);
        return found ? found.label : category;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des publications" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold text-[var(--color-alpha)]">Gestion des publications</h1>
                        <p className="text-sm text-muted-foreground">
                            Ajoutez des documents qui seront automatiquement affiches sur la page publique des publications.
                        </p>
                    </div>

                    <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90">
                                <Plus className="mr-2 h-4 w-4" />
                                Ajouter un document
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
                            <DialogHeader>
                                <DialogTitle>Ajouter un document</DialogTitle>
                                <DialogDescription>Les informations FR/AR sont obligatoires pour l'affichage bilingue.</DialogDescription>
                            </DialogHeader>

                            <Form
                                method="post"
                                action="/admin/publications"
                                className="grid gap-4 md:grid-cols-2"
                                encType="multipart/form-data"
                                onSuccess={() => setIsCreateModalOpen(false)}
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <div className="grid gap-2">
                                            <Label htmlFor="title_fr">Titre (FR)</Label>
                                            <Input id="title_fr" name="title_fr" required />
                                            <InputError message={errors.title_fr} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="title_ar">Titre (AR)</Label>
                                            <Input id="title_ar" name="title_ar" required />
                                            <InputError message={errors.title_ar} />
                                        </div>

                                        <div className="grid gap-2 md:col-span-2">
                                            <Label htmlFor="description_fr">Description (FR)</Label>
                                            <textarea id="description_fr" name="description_fr" required className="min-h-24 rounded-md border px-3 py-2 text-sm" />
                                            <InputError message={errors.description_fr} />
                                        </div>

                                        <div className="grid gap-2 md:col-span-2">
                                            <Label htmlFor="description_ar">Description (AR)</Label>
                                            <textarea id="description_ar" name="description_ar" required className="min-h-24 rounded-md border px-3 py-2 text-sm" />
                                            <InputError message={errors.description_ar} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="category">Categorie</Label>
                                            <select
                                                id="category"
                                                name="category"
                                                required
                                                defaultValue="rapport"
                                                className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
                                            >
                                                {categories.map((category) => (
                                                    <option key={category.value} value={category.value}>
                                                        {category.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <InputError message={errors.category} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="published_at">Date de publication</Label>
                                            <Input id="published_at" name="published_at" type="date" required />
                                            <InputError message={errors.published_at} />
                                        </div>

                                        <div className="grid gap-2 md:col-span-2">
                                            <Label htmlFor="document">Document</Label>
                                            <Input id="document" name="document" type="file" required className="cursor-pointer" />
                                            <p className="text-xs text-muted-foreground">PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX (max 10MB).</p>
                                            <InputError message={errors.document} />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label
                                                htmlFor="is_published"
                                                className="block w-full cursor-pointer rounded-xl border border-[var(--color-alpha)]/20 bg-[var(--color-alpha)]/5 p-4 transition hover:border-[var(--color-alpha)]/35 hover:bg-[var(--color-alpha)]/10"
                                            >
                                                <input type="hidden" name="is_published" value="0" />
                                                <div className="flex items-start gap-3">
                                                    <input
                                                        id="is_published"
                                                        name="is_published"
                                                        type="checkbox"
                                                        value="1"
                                                        defaultChecked
                                                        className="mt-0.5 h-5 w-5 rounded border-[var(--color-alpha)]/40 accent-[var(--color-alpha)]"
                                                    />
                                                    <div>
                                                        <p className="text-base font-semibold text-[var(--color-alpha)]">Publie sur la page publique</p>
                                                        <p className="text-sm text-muted-foreground">Decochez pour garder ce document en brouillon.</p>
                                                    </div>
                                                </div>
                                            </label>
                                            <InputError message={errors.is_published} />
                                        </div>

                                        <div className="md:col-span-2">
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                                className="w-full bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90"
                                            >
                                                {processing ? 'Ajout en cours...' : 'Ajouter le document'}
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
                        {publications.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Aucun document disponible.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[920px] border-separate border-spacing-0">
                                    <thead>
                                        <tr>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Titre (FR)</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Categorie</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Date</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Visibilite</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Fichier</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {publications.map((publication) => (
                                            <tr key={publication.id} className="border-b last:border-b-0">
                                                <td className="px-3 py-3 text-sm font-medium text-[var(--color-alpha)]">{publication.title_fr}</td>
                                                <td className="px-3 py-3 text-sm">{categoryLabel(publication.category)}</td>
                                                <td className="px-3 py-3 text-sm">{publication.date ?? '-'}</td>
                                                <td className="px-3 py-3 text-sm">
                                                    {publication.is_published ? (
                                                        <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">Publie</span>
                                                    ) : (
                                                        <span className="rounded bg-neutral-200 px-2 py-1 text-xs font-medium text-neutral-700">Brouillon</span>
                                                    )}
                                                </td>
                                                <td className="px-3 py-3 text-sm">
                                                    {publication.file_url ? (
                                                        <a
                                                            href={publication.file_url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-[var(--color-beta)] underline underline-offset-2"
                                                        >
                                                            Ouvrir
                                                        </a>
                                                    ) : (
                                                        '-'
                                                    )}
                                                </td>
                                                <td className="px-3 py-3 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <Dialog
                                                            open={openEditPublicationId === publication.id}
                                                            onOpenChange={(open) => setOpenEditPublicationId(open ? publication.id : null)}
                                                        >
                                                            <DialogTrigger asChild>
                                                                <Button variant="outline" size="sm" className="gap-2">
                                                                    <Pencil className="h-4 w-4" />
                                                                    Modifier
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
                                                            <DialogHeader>
                                                                <DialogTitle>Modifier un document</DialogTitle>
                                                                <DialogDescription>
                                                                    Mettez a jour les champs et remplacez le fichier si necessaire.
                                                                </DialogDescription>
                                                            </DialogHeader>

                                                            <Form
                                                                method="post"
                                                                action={`/admin/publications/${publication.id}`}
                                                                className="grid gap-4 md:grid-cols-2"
                                                                encType="multipart/form-data"
                                                                onSuccess={() => setOpenEditPublicationId(null)}
                                                            >
                                                                {({ processing, errors }) => (
                                                                    <>
                                                                        <input type="hidden" name="_method" value="PUT" />

                                                                        <div className="grid gap-2">
                                                                            <Label htmlFor={`edit-title-fr-${publication.id}`}>Titre (FR)</Label>
                                                                            <Input id={`edit-title-fr-${publication.id}`} name="title_fr" required defaultValue={publication.title_fr} />
                                                                            <InputError message={errors.title_fr} />
                                                                        </div>

                                                                        <div className="grid gap-2">
                                                                            <Label htmlFor={`edit-title-ar-${publication.id}`}>Titre (AR)</Label>
                                                                            <Input id={`edit-title-ar-${publication.id}`} name="title_ar" required defaultValue={publication.title_ar} />
                                                                            <InputError message={errors.title_ar} />
                                                                        </div>

                                                                        <div className="grid gap-2 md:col-span-2">
                                                                            <Label htmlFor={`edit-description-fr-${publication.id}`}>Description (FR)</Label>
                                                                            <textarea
                                                                                id={`edit-description-fr-${publication.id}`}
                                                                                name="description_fr"
                                                                                required
                                                                                defaultValue={publication.description_fr}
                                                                                className="min-h-24 rounded-md border px-3 py-2 text-sm"
                                                                            />
                                                                            <InputError message={errors.description_fr} />
                                                                        </div>

                                                                        <div className="grid gap-2 md:col-span-2">
                                                                            <Label htmlFor={`edit-description-ar-${publication.id}`}>Description (AR)</Label>
                                                                            <textarea
                                                                                id={`edit-description-ar-${publication.id}`}
                                                                                name="description_ar"
                                                                                required
                                                                                defaultValue={publication.description_ar}
                                                                                className="min-h-24 rounded-md border px-3 py-2 text-sm"
                                                                            />
                                                                            <InputError message={errors.description_ar} />
                                                                        </div>

                                                                        <div className="grid gap-2">
                                                                            <Label htmlFor={`edit-category-${publication.id}`}>Categorie</Label>
                                                                            <select
                                                                                id={`edit-category-${publication.id}`}
                                                                                name="category"
                                                                                required
                                                                                defaultValue={publication.category}
                                                                                className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
                                                                            >
                                                                                {categories.map((category) => (
                                                                                    <option key={category.value} value={category.value}>
                                                                                        {category.label}
                                                                                    </option>
                                                                                ))}
                                                                            </select>
                                                                            <InputError message={errors.category} />
                                                                        </div>

                                                                        <div className="grid gap-2">
                                                                            <Label htmlFor={`edit-date-${publication.id}`}>Date de publication</Label>
                                                                            <Input
                                                                                id={`edit-date-${publication.id}`}
                                                                                name="published_at"
                                                                                type="date"
                                                                                required
                                                                                defaultValue={publication.date ?? ''}
                                                                            />
                                                                            <InputError message={errors.published_at} />
                                                                        </div>

                                                                        <div className="grid gap-2 md:col-span-2">
                                                                            <Label htmlFor={`edit-document-${publication.id}`}>Remplacer le document (optionnel)</Label>
                                                                            <Input id={`edit-document-${publication.id}`} name="document" type="file" className="cursor-pointer" />
                                                                            <p className="text-xs text-muted-foreground">Laissez vide pour conserver le document actuel.</p>
                                                                            <InputError message={errors.document} />
                                                                        </div>

                                                                        <div className="md:col-span-2">
                                                                            <label
                                                                                htmlFor={`edit-published-${publication.id}`}
                                                                                className="block w-full cursor-pointer rounded-xl border border-[var(--color-alpha)]/20 bg-[var(--color-alpha)]/5 p-4 transition hover:border-[var(--color-alpha)]/35 hover:bg-[var(--color-alpha)]/10"
                                                                            >
                                                                                <input type="hidden" name="is_published" value="0" />
                                                                                <div className="flex items-start gap-3">
                                                                                    <input
                                                                                        id={`edit-published-${publication.id}`}
                                                                                        name="is_published"
                                                                                        type="checkbox"
                                                                                        value="1"
                                                                                        defaultChecked={Boolean(publication.is_published)}
                                                                                        className="mt-0.5 h-5 w-5 rounded border-[var(--color-alpha)]/40 accent-[var(--color-alpha)]"
                                                                                    />
                                                                                    <div>
                                                                                        <p className="text-base font-semibold text-[var(--color-alpha)]">Publie sur la page publique</p>
                                                                                        <p className="text-sm text-muted-foreground">Decochez pour masquer ce document de /publications.</p>
                                                                                    </div>
                                                                                </div>
                                                                            </label>
                                                                            <InputError message={errors.is_published} />
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
                                                            onClick={() => setPublicationToDelete(publication)}
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

                <Dialog open={Boolean(publicationToDelete)} onOpenChange={(open) => !open && setPublicationToDelete(null)}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Confirmer la suppression</DialogTitle>
                            <DialogDescription>
                                {publicationToDelete
                                    ? `Voulez-vous supprimer le document "${publicationToDelete.title_fr}" ? Cette action est irreversible.`
                                    : 'Cette action est irreversible.'}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => setPublicationToDelete(null)} disabled={isDeletingPublication}>
                                Annuler
                            </Button>
                            <Button
                                type="button"
                                variant="destructive"
                                disabled={!publicationToDelete || isDeletingPublication}
                                onClick={() => {
                                    if (!publicationToDelete) return;

                                    setIsDeletingPublication(true);
                                    router.delete(`/admin/publications/${publicationToDelete.id}`, {
                                        preserveScroll: true,
                                        onFinish: () => setIsDeletingPublication(false),
                                        onSuccess: () => setPublicationToDelete(null),
                                    });
                                }}
                            >
                                {isDeletingPublication ? 'Suppression...' : 'Supprimer'}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
