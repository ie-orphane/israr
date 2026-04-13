import AppLayout from '@/layouts/app-layout';
import { Form, Head, router, usePage } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Card, CardContent } from '@/components/ui/card';
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
        title: 'Programmes',
        href: '/admin/programmes',
    },
];

const statuses = [
    { value: 'active', label: 'En cours' },
    { value: 'closed', label: 'Cloture' },
];

export default function DashboardProgrammes({ programmes = [] }) {
    const { flash, errors: pageErrors = {} } = usePage().props;
    const hasCreateErrors = Boolean(
        pageErrors.title_fr ||
            pageErrors.title_ar ||
            pageErrors.title_en ||
            pageErrors.summary_fr ||
            pageErrors.summary_ar ||
            pageErrors.summary_en ||
                pageErrors.image ||
            pageErrors.status ||
            pageErrors.beneficiaires ||
            pageErrors.region_fr ||
            pageErrors.region_ar ||
            pageErrors.region_en ||
            pageErrors.partners ||
            pageErrors.budget ||
                pageErrors.project_file ||
            pageErrors.is_published
    );

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(hasCreateErrors);
    const [openEditProgrammeId, setOpenEditProgrammeId] = useState(null);
    const [programmeToDelete, setProgrammeToDelete] = useState(null);
    const [isDeletingProgramme, setIsDeletingProgramme] = useState(false);

    useEffect(() => {
        if (hasCreateErrors) {
            setIsCreateModalOpen(true);
        }
    }, [hasCreateErrors]);

    const statusLabel = (status) => statuses.find((item) => item.value === status)?.label ?? status;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des programmes" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold text-[var(--color-alpha)]">Gestion des programmes</h1>
                        <p className="text-sm text-muted-foreground">Administrez les programmes affiches sur la page publique /programmes.</p>
                    </div>

                    <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90">
                                <Plus className="mr-2 h-4 w-4" />
                                Ajouter un programme
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
                            <DialogHeader>
                                <DialogTitle>Ajouter un programme</DialogTitle>
                                <DialogDescription>Remplissez les champs FR/AR/EN et les informations d'impact.</DialogDescription>
                            </DialogHeader>

                            <Form method="post" action="/admin/programmes" className="grid gap-4 md:grid-cols-2" encType="multipart/form-data" onSuccess={() => setIsCreateModalOpen(false)}>
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
                                            <Label htmlFor="summary_fr">Description (FR)</Label>
                                            <textarea id="summary_fr" name="summary_fr" required className="min-h-24 rounded-md border px-3 py-2 text-sm" />
                                            <InputError message={errors.summary_fr} />
                                        </div>
                                        <div className="grid gap-2 md:col-span-2">
                                            <Label htmlFor="summary_ar">Description (AR)</Label>
                                            <textarea id="summary_ar" name="summary_ar" required className="min-h-24 rounded-md border px-3 py-2 text-sm" />
                                            <InputError message={errors.summary_ar} />
                                        </div>
                                        <div className="grid gap-2 md:col-span-2">
                                            <Label htmlFor="summary_en">Description (EN)</Label>
                                            <textarea id="summary_en" name="summary_en" required className="min-h-24 rounded-md border px-3 py-2 text-sm" />
                                            <InputError message={errors.summary_en} />
                                        </div>

                                        <div className="grid gap-2 md:col-span-2">
                                            <Label htmlFor="image">Image du programme</Label>
                                            <Input id="image" name="image" type="file" accept="image/png,image/jpeg,image/webp" required className="cursor-pointer" />
                                            <p className="text-xs text-muted-foreground">PNG, JPG, JPEG ou WEBP (max 5MB).</p>
                                            <InputError message={errors.image} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="status">Statut</Label>
                                            <select id="status" name="status" defaultValue="active" className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm">
                                                {statuses.map((status) => (
                                                    <option key={status.value} value={status.value}>
                                                        {status.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <InputError message={errors.status} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="beneficiaires">Beneficiaires</Label>
                                            <Input id="beneficiaires" name="beneficiaires" type="number" min="0" />
                                            <InputError message={errors.beneficiaires} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="region_fr">Region (FR)</Label>
                                            <Input id="region_fr" name="region_fr" />
                                            <InputError message={errors.region_fr} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="region_ar">Region (AR)</Label>
                                            <Input id="region_ar" name="region_ar" />
                                            <InputError message={errors.region_ar} />
                                        </div>
                                        <div className="grid gap-2 md:col-span-2">
                                            <Label htmlFor="region_en">Region (EN)</Label>
                                            <Input id="region_en" name="region_en" />
                                            <InputError message={errors.region_en} />
                                        </div>

                                        <div className="grid gap-2 md:col-span-2">
                                            <Label htmlFor="partners">Partenaires (separes par des virgules)</Label>
                                            <Input id="partners" name="partners" placeholder="AFD, ONU Femmes" />
                                            <InputError message={errors.partners} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="budget">Budget</Label>
                                            <Input id="budget" name="budget" placeholder="1.2M MAD" />
                                            <InputError message={errors.budget} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="project_file">Fiche projet PDF (optionnel)</Label>
                                            <Input id="project_file" name="project_file" type="file" accept="application/pdf" className="cursor-pointer" />
                                            <InputError message={errors.project_file} />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="is_published" className="block w-full cursor-pointer rounded-xl border border-[var(--color-alpha)]/20 bg-[var(--color-alpha)]/5 p-4 transition hover:border-[var(--color-alpha)]/35 hover:bg-[var(--color-alpha)]/10">
                                                <input type="hidden" name="is_published" value="0" />
                                                <div className="flex items-start gap-3">
                                                    <input id="is_published" name="is_published" type="checkbox" value="1" defaultChecked className="mt-0.5 h-5 w-5 rounded border-[var(--color-alpha)]/40 accent-[var(--color-alpha)]" />
                                                    <div>
                                                        <p className="text-base font-semibold text-[var(--color-alpha)]">Publie sur la page publique</p>
                                                        <p className="text-sm text-muted-foreground">Decochez pour conserver ce programme en brouillon.</p>
                                                    </div>
                                                </div>
                                            </label>
                                            <InputError message={errors.is_published} />
                                        </div>

                                        <div className="md:col-span-2">
                                            <Button type="submit" disabled={processing} className="w-full bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90">
                                                {processing ? 'Ajout en cours...' : 'Ajouter le programme'}
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
                        {programmes.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Aucun programme disponible.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[980px] border-separate border-spacing-0">
                                    <thead>
                                        <tr>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Titre (FR)</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Statut</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Region</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Beneficiaires</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Visibilite</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {programmes.map((programme) => (
                                            <tr key={programme.id} className="border-b last:border-b-0">
                                                <td className="px-3 py-3 text-sm font-medium text-[var(--color-alpha)]">{programme.title_fr}</td>
                                                <td className="px-3 py-3 text-sm">{statusLabel(programme.status)}</td>
                                                <td className="px-3 py-3 text-sm">{programme.region_fr ?? '-'}</td>
                                                <td className="px-3 py-3 text-sm">{programme.beneficiaires ?? '-'}</td>
                                                <td className="px-3 py-3 text-sm">
                                                    {programme.is_published ? (
                                                        <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">Publie</span>
                                                    ) : (
                                                        <span className="rounded bg-neutral-200 px-2 py-1 text-xs font-medium text-neutral-700">Brouillon</span>
                                                    )}
                                                </td>
                                                <td className="px-3 py-3 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <Dialog open={openEditProgrammeId === programme.id} onOpenChange={(open) => setOpenEditProgrammeId(open ? programme.id : null)}>
                                                            <DialogTrigger asChild>
                                                                <Button variant="outline" size="sm" className="gap-2">
                                                                    <Pencil className="h-4 w-4" />
                                                                    Modifier
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
                                                                <DialogHeader>
                                                                    <DialogTitle>Modifier le programme</DialogTitle>
                                                                    <DialogDescription>Mettez a jour les informations du programme.</DialogDescription>
                                                                </DialogHeader>

                                                                <Form method="post" action={`/admin/programmes/${programme.id}`} className="grid gap-4 md:grid-cols-2" encType="multipart/form-data" onSuccess={() => setOpenEditProgrammeId(null)}>
                                                                    {({ processing, errors }) => (
                                                                        <>
                                                                            <input type="hidden" name="_method" value="PUT" />

                                                                            <div className="grid gap-2">
                                                                                <Label htmlFor={`edit-title-fr-${programme.id}`}>Titre (FR)</Label>
                                                                                <Input id={`edit-title-fr-${programme.id}`} name="title_fr" required defaultValue={programme.title_fr} />
                                                                                <InputError message={errors.title_fr} />
                                                                            </div>
                                                                            <div className="grid gap-2">
                                                                                <Label htmlFor={`edit-title-ar-${programme.id}`}>Titre (AR)</Label>
                                                                                <Input id={`edit-title-ar-${programme.id}`} name="title_ar" required defaultValue={programme.title_ar} />
                                                                                <InputError message={errors.title_ar} />
                                                                            </div>
                                                                            <div className="grid gap-2 md:col-span-2">
                                                                                <Label htmlFor={`edit-title-en-${programme.id}`}>Titre (EN)</Label>
                                                                                <Input id={`edit-title-en-${programme.id}`} name="title_en" required defaultValue={programme.title_en} />
                                                                                <InputError message={errors.title_en} />
                                                                            </div>

                                                                            <div className="grid gap-2 md:col-span-2">
                                                                                <Label htmlFor={`edit-summary-fr-${programme.id}`}>Description (FR)</Label>
                                                                                <textarea id={`edit-summary-fr-${programme.id}`} name="summary_fr" required defaultValue={programme.summary_fr} className="min-h-24 rounded-md border px-3 py-2 text-sm" />
                                                                                <InputError message={errors.summary_fr} />
                                                                            </div>
                                                                            <div className="grid gap-2 md:col-span-2">
                                                                                <Label htmlFor={`edit-summary-ar-${programme.id}`}>Description (AR)</Label>
                                                                                <textarea id={`edit-summary-ar-${programme.id}`} name="summary_ar" required defaultValue={programme.summary_ar} className="min-h-24 rounded-md border px-3 py-2 text-sm" />
                                                                                <InputError message={errors.summary_ar} />
                                                                            </div>
                                                                            <div className="grid gap-2 md:col-span-2">
                                                                                <Label htmlFor={`edit-summary-en-${programme.id}`}>Description (EN)</Label>
                                                                                <textarea id={`edit-summary-en-${programme.id}`} name="summary_en" required defaultValue={programme.summary_en} className="min-h-24 rounded-md border px-3 py-2 text-sm" />
                                                                                <InputError message={errors.summary_en} />
                                                                            </div>

                                                                            <div className="grid gap-2 md:col-span-2">
                                                                                <Label htmlFor={`edit-image-${programme.id}`}>Remplacer l'image (optionnel)</Label>
                                                                                <Input id={`edit-image-${programme.id}`} name="image" type="file" accept="image/png,image/jpeg,image/webp" className="cursor-pointer" />
                                                                                {programme.image_url && (
                                                                                    <a href={programme.image_url} target="_blank" rel="noreferrer" className="text-xs text-[var(--color-beta)] underline underline-offset-2">
                                                                                        Voir l'image actuelle
                                                                                    </a>
                                                                                )}
                                                                                <InputError message={errors.image} />
                                                                            </div>

                                                                            <div className="grid gap-2">
                                                                                <Label htmlFor={`edit-status-${programme.id}`}>Statut</Label>
                                                                                <select id={`edit-status-${programme.id}`} name="status" defaultValue={programme.status} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm">
                                                                                    {statuses.map((status) => (
                                                                                        <option key={status.value} value={status.value}>{status.label}</option>
                                                                                    ))}
                                                                                </select>
                                                                                <InputError message={errors.status} />
                                                                            </div>
                                                                            <div className="grid gap-2">
                                                                                <Label htmlFor={`edit-beneficiaires-${programme.id}`}>Beneficiaires</Label>
                                                                                <Input id={`edit-beneficiaires-${programme.id}`} name="beneficiaires" type="number" min="0" defaultValue={programme.beneficiaires ?? ''} />
                                                                                <InputError message={errors.beneficiaires} />
                                                                            </div>

                                                                            <div className="grid gap-2">
                                                                                <Label htmlFor={`edit-region-fr-${programme.id}`}>Region (FR)</Label>
                                                                                <Input id={`edit-region-fr-${programme.id}`} name="region_fr" defaultValue={programme.region_fr ?? ''} />
                                                                                <InputError message={errors.region_fr} />
                                                                            </div>
                                                                            <div className="grid gap-2">
                                                                                <Label htmlFor={`edit-region-ar-${programme.id}`}>Region (AR)</Label>
                                                                                <Input id={`edit-region-ar-${programme.id}`} name="region_ar" defaultValue={programme.region_ar ?? ''} />
                                                                                <InputError message={errors.region_ar} />
                                                                            </div>
                                                                            <div className="grid gap-2 md:col-span-2">
                                                                                <Label htmlFor={`edit-region-en-${programme.id}`}>Region (EN)</Label>
                                                                                <Input id={`edit-region-en-${programme.id}`} name="region_en" defaultValue={programme.region_en ?? ''} />
                                                                                <InputError message={errors.region_en} />
                                                                            </div>

                                                                            <div className="grid gap-2 md:col-span-2">
                                                                                <Label htmlFor={`edit-partners-${programme.id}`}>Partenaires (separes par des virgules)</Label>
                                                                                <Input id={`edit-partners-${programme.id}`} name="partners" defaultValue={(programme.partners ?? []).join(', ')} />
                                                                                <InputError message={errors.partners} />
                                                                            </div>

                                                                            <div className="grid gap-2">
                                                                                <Label htmlFor={`edit-budget-${programme.id}`}>Budget</Label>
                                                                                <Input id={`edit-budget-${programme.id}`} name="budget" defaultValue={programme.budget ?? ''} />
                                                                                <InputError message={errors.budget} />
                                                                            </div>
                                                                            <div className="grid gap-2">
                                                                                <Label htmlFor={`edit-project-file-${programme.id}`}>Remplacer la fiche PDF (optionnel)</Label>
                                                                                <Input id={`edit-project-file-${programme.id}`} name="project_file" type="file" accept="application/pdf" className="cursor-pointer" />
                                                                                {programme.project_file_url && (
                                                                                    <a href={programme.project_file_url} target="_blank" rel="noreferrer" className="text-xs text-[var(--color-beta)] underline underline-offset-2">
                                                                                        Voir la fiche actuelle
                                                                                    </a>
                                                                                )}
                                                                                <InputError message={errors.project_file} />
                                                                            </div>

                                                                            <div className="md:col-span-2">
                                                                                <label htmlFor={`edit-published-${programme.id}`} className="block w-full cursor-pointer rounded-xl border border-[var(--color-alpha)]/20 bg-[var(--color-alpha)]/5 p-4 transition hover:border-[var(--color-alpha)]/35 hover:bg-[var(--color-alpha)]/10">
                                                                                    <input type="hidden" name="is_published" value="0" />
                                                                                    <div className="flex items-start gap-3">
                                                                                        <input id={`edit-published-${programme.id}`} name="is_published" type="checkbox" value="1" defaultChecked={Boolean(programme.is_published)} className="mt-0.5 h-5 w-5 rounded border-[var(--color-alpha)]/40 accent-[var(--color-alpha)]" />
                                                                                        <div>
                                                                                            <p className="text-base font-semibold text-[var(--color-alpha)]">Publie sur la page publique</p>
                                                                                            <p className="text-sm text-muted-foreground">Decochez pour masquer ce programme.</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </label>
                                                                                <InputError message={errors.is_published} />
                                                                            </div>

                                                                            <div className="md:col-span-2">
                                                                                <Button type="submit" disabled={processing} className="w-full bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90">
                                                                                    {processing ? 'Mise a jour...' : 'Enregistrer les modifications'}
                                                                                </Button>
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                </Form>
                                                            </DialogContent>
                                                        </Dialog>

                                                        <Button type="button" variant="destructive" size="sm" className="gap-2" onClick={() => setProgrammeToDelete(programme)}>
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

                <Dialog open={Boolean(programmeToDelete)} onOpenChange={(open) => !open && setProgrammeToDelete(null)}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Confirmer la suppression</DialogTitle>
                            <DialogDescription>
                                {programmeToDelete ? `Voulez-vous supprimer le programme "${programmeToDelete.title_fr}" ? Cette action est irreversible.` : 'Cette action est irreversible.'}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => setProgrammeToDelete(null)} disabled={isDeletingProgramme}>
                                Annuler
                            </Button>
                            <Button
                                type="button"
                                variant="destructive"
                                disabled={!programmeToDelete || isDeletingProgramme}
                                onClick={() => {
                                    if (!programmeToDelete) return;

                                    setIsDeletingProgramme(true);
                                    router.delete(`/admin/programmes/${programmeToDelete.id}`, {
                                        preserveScroll: true,
                                        onFinish: () => setIsDeletingProgramme(false),
                                        onSuccess: () => setProgrammeToDelete(null),
                                    });
                                }}
                            >
                                {isDeletingProgramme ? 'Suppression...' : 'Supprimer'}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
