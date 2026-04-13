import AppLayout from '@/layouts/app-layout';
import { Form, Head, usePage, router } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Documents telechargeables', href: '/admin/about-documents' },
];

export default function AboutDocuments({ documents = [] }) {
    const { flash, errors: pageErrors = {} } = usePage().props;
    const hasCreateErrors = Boolean(pageErrors.title_fr || pageErrors.title_ar || pageErrors.title_en || pageErrors.document || pageErrors.is_published);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(hasCreateErrors);
    const [openEditDocumentId, setOpenEditDocumentId] = useState(null);
    const [documentToDelete, setDocumentToDelete] = useState(null);
    const [isDeletingDocument, setIsDeletingDocument] = useState(false);

    useEffect(() => {
        if (hasCreateErrors) {
            setIsCreateModalOpen(true);
        }
    }, [hasCreateErrors]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Documents telechargeables" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold text-[var(--color-alpha)]">Documents telechargeables</h1>
                        <p className="text-sm text-muted-foreground">Gerez les documents affiches dans la section /a-propos.</p>
                    </div>

                    <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90">
                                <Plus className="mr-2 h-4 w-4" />
                                Ajouter un document
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Ajouter un document</DialogTitle>
                                <DialogDescription>Les titres en FR/AR/EN et le fichier sont obligatoires.</DialogDescription>
                            </DialogHeader>

                            <Form method="post" action="/admin/about-documents" encType="multipart/form-data" className="grid gap-4 md:grid-cols-2" onSuccess={() => setIsCreateModalOpen(false)}>
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
                                            <Label htmlFor="title_en">Titre (EN)</Label>
                                            <Input id="title_en" name="title_en" required />
                                            <InputError message={errors.title_en} />
                                        </div>
                                        <div className="grid gap-2 md:col-span-2">
                                            <Label htmlFor="document">Fichier</Label>
                                            <Input id="document" name="document" type="file" required className="cursor-pointer" />
                                            <InputError message={errors.document} />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label htmlFor="is_published" className="block w-full cursor-pointer rounded-xl border border-[var(--color-alpha)]/20 bg-[var(--color-alpha)]/5 p-4 transition hover:border-[var(--color-alpha)]/35 hover:bg-[var(--color-alpha)]/10">
                                                <input type="hidden" name="is_published" value="0" />
                                                <div className="flex items-start gap-3">
                                                    <input id="is_published" name="is_published" type="checkbox" value="1" defaultChecked className="mt-0.5 h-5 w-5 rounded border-[var(--color-alpha)]/40 accent-[var(--color-alpha)]" />
                                                    <div>
                                                        <p className="text-base font-semibold text-[var(--color-alpha)]">Publie sur /a-propos</p>
                                                        <p className="text-sm text-muted-foreground">Decochez pour conserver ce document en brouillon.</p>
                                                    </div>
                                                </div>
                                            </label>
                                            <InputError message={errors.is_published} />
                                        </div>
                                        <div className="md:col-span-2">
                                            <Button type="submit" disabled={processing} className="w-full bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90">
                                                {processing ? 'Ajout en cours...' : 'Ajouter le document'}
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>

                {flash?.success && <p className="rounded-md border border-green-300 bg-green-50 px-3 py-2 text-sm text-green-700">{flash.success}</p>}

                <Card>
                    <CardContent>
                        {documents.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Aucun document enregistre pour le moment.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[900px] border-separate border-spacing-0">
                                    <thead>
                                        <tr>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Titre (FR)</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Statut</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Fichier</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {documents.map((document) => (
                                            <tr key={document.id} className="border-b last:border-b-0">
                                                <td className="px-3 py-3 text-sm font-medium text-[var(--color-alpha)]">{document.title_fr}</td>
                                                <td className="px-3 py-3 text-sm">
                                                    {document.is_published ? <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">Publie</span> : <span className="rounded bg-neutral-200 px-2 py-1 text-xs font-medium text-neutral-700">Brouillon</span>}
                                                </td>
                                                <td className="px-3 py-3 text-sm">
                                                    <a href={document.file_url} target="_blank" rel="noreferrer" className="text-[var(--color-beta)] underline underline-offset-2">Ouvrir</a>
                                                </td>
                                                <td className="px-3 py-3 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <Dialog open={openEditDocumentId === document.id} onOpenChange={(open) => setOpenEditDocumentId(open ? document.id : null)}>
                                                            <DialogTrigger asChild>
                                                                <Button variant="outline" size="sm" className="gap-2"><Pencil className="h-4 w-4" />Modifier</Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                                                                <DialogHeader>
                                                                    <DialogTitle>Modifier le document</DialogTitle>
                                                                    <DialogDescription>Mettez a jour les titres, remplacez le fichier si besoin, et choisissez la publication.</DialogDescription>
                                                                </DialogHeader>
                                                                <Form method="post" action={`/admin/about-documents/${document.id}`} encType="multipart/form-data" className="grid gap-4 md:grid-cols-2" onSuccess={() => setOpenEditDocumentId(null)}>
                                                                    {({ processing, errors }) => (
                                                                        <>
                                                                            <input type="hidden" name="_method" value="PUT" />
                                                                            <div className="grid gap-2">
                                                                                <Label htmlFor={`edit-title-fr-${document.id}`}>Titre (FR)</Label>
                                                                                <Input id={`edit-title-fr-${document.id}`} name="title_fr" required defaultValue={document.title_fr} />
                                                                                <InputError message={errors.title_fr} />
                                                                            </div>
                                                                            <div className="grid gap-2">
                                                                                <Label htmlFor={`edit-title-ar-${document.id}`}>Titre (AR)</Label>
                                                                                <Input id={`edit-title-ar-${document.id}`} name="title_ar" required defaultValue={document.title_ar} />
                                                                                <InputError message={errors.title_ar} />
                                                                            </div>
                                                                            <div className="grid gap-2 md:col-span-2">
                                                                                <Label htmlFor={`edit-title-en-${document.id}`}>Titre (EN)</Label>
                                                                                <Input id={`edit-title-en-${document.id}`} name="title_en" required defaultValue={document.title_en} />
                                                                                <InputError message={errors.title_en} />
                                                                            </div>
                                                                            <div className="grid gap-2 md:col-span-2">
                                                                                <Label htmlFor={`edit-document-${document.id}`}>Remplacer le fichier (optionnel)</Label>
                                                                                <Input id={`edit-document-${document.id}`} name="document" type="file" className="cursor-pointer" />
                                                                                <InputError message={errors.document} />
                                                                            </div>
                                                                            <div className="md:col-span-2">
                                                                                <label htmlFor={`edit-published-${document.id}`} className="block w-full cursor-pointer rounded-xl border border-[var(--color-alpha)]/20 bg-[var(--color-alpha)]/5 p-4 transition hover:border-[var(--color-alpha)]/35 hover:bg-[var(--color-alpha)]/10">
                                                                                    <input type="hidden" name="is_published" value="0" />
                                                                                    <div className="flex items-start gap-3">
                                                                                        <input id={`edit-published-${document.id}`} name="is_published" type="checkbox" value="1" defaultChecked={Boolean(document.is_published)} className="mt-0.5 h-5 w-5 rounded border-[var(--color-alpha)]/40 accent-[var(--color-alpha)]" />
                                                                                        <div>
                                                                                            <p className="text-base font-semibold text-[var(--color-alpha)]">Publie sur /a-propos</p>
                                                                                            <p className="text-sm text-muted-foreground">Decochez pour masquer ce document de la page publique.</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </label>
                                                                                <InputError message={errors.is_published} />
                                                                            </div>
                                                                            <div className="md:col-span-2">
                                                                                <Button type="submit" disabled={processing} className="w-full bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90">{processing ? 'Mise a jour...' : 'Enregistrer les modifications'}</Button>
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                </Form>
                                                            </DialogContent>
                                                        </Dialog>

                                                        <Button type="button" variant="destructive" size="sm" className="gap-2" onClick={() => setDocumentToDelete(document)}>
                                                            <Trash2 className="h-4 w-4" />Supprimer
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

                <Dialog open={Boolean(documentToDelete)} onOpenChange={(open) => !open && setDocumentToDelete(null)}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Confirmer la suppression</DialogTitle>
                            <DialogDescription>
                                {documentToDelete ? `Voulez-vous supprimer le document "${documentToDelete.title_fr}" ? Cette action est irreversible.` : 'Cette action est irreversible.'}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => setDocumentToDelete(null)} disabled={isDeletingDocument}>Annuler</Button>
                            <Button type="button" variant="destructive" disabled={!documentToDelete || isDeletingDocument} onClick={() => {
                                if (!documentToDelete) return;
                                setIsDeletingDocument(true);
                                router.delete(`/admin/about-documents/${documentToDelete.id}`, {
                                    preserveScroll: true,
                                    onFinish: () => setIsDeletingDocument(false),
                                    onSuccess: () => setDocumentToDelete(null),
                                });
                            }}>
                                {isDeletingDocument ? 'Suppression...' : 'Supprimer'}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}