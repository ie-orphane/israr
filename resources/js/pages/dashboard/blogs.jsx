import AppLayout from '@/layouts/app-layout';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, Head, Link, router, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import TipTapEditor from '@/components/TipTapEditor';
import { Pencil, Plus, Trash2, ImageOff } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Blogs', href: '/admin/blogs' },
];

function BlogFields({ blog = {}, errors = {}, prefix = '' }) {
    const id = (name) => (prefix ? `${prefix}-${name}` : name);
    const [activeContentLocale, setActiveContentLocale] = useState('fr');
    const [contentByLocale, setContentByLocale] = useState({
        fr: blog.body_fr ?? '',
        ar: blog.body_ar ?? '',
    });

    useEffect(() => {
        setContentByLocale({
            fr: blog.body_fr ?? '',
            ar: blog.body_ar ?? '',
        });
        setActiveContentLocale('fr');
    }, [blog.body_fr, blog.body_ar, blog.id]);

    const updateContent = (locale, value) => {
        setContentByLocale((current) => ({ ...current, [locale]: value }));
    };

    return (
        <>
            <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor={id('slug')}>Slug</Label>
                    <Input id={id('slug')} name="slug" defaultValue={blog.slug ?? ''} placeholder="Auto-generé si vide" />
                    <InputError message={errors.slug} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor={id('author')}>Auteur</Label>
                    <Input id={id('author')} name="author" defaultValue={blog.author ?? ''} placeholder="ISRAR" />
                    <InputError message={errors.author} />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor={id('title_fr')}>Titre (FR)</Label>
                    <Input id={id('title_fr')} name="title_fr" defaultValue={blog.title_fr ?? ''} required />
                    <InputError message={errors.title_fr} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor={id('title_ar')}>Titre (AR)</Label>
                    <Input id={id('title_ar')} name="title_ar" defaultValue={blog.title_ar ?? ''} required dir="rtl" />
                    <InputError message={errors.title_ar} />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor={id('category_fr')}>Catégorie (FR)</Label>
                    <Input id={id('category_fr')} name="category_fr" defaultValue={blog.category_fr ?? ''} required />
                    <InputError message={errors.category_fr} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor={id('category_ar')}>Catégorie (AR)</Label>
                    <Input id={id('category_ar')} name="category_ar" defaultValue={blog.category_ar ?? ''} required dir="rtl" />
                    <InputError message={errors.category_ar} />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor={id('excerpt_fr')}>Résumé (FR)</Label>
                    <Textarea id={id('excerpt_fr')} name="excerpt_fr" defaultValue={blog.excerpt_fr ?? ''} className="min-h-28" />
                    <InputError message={errors.excerpt_fr} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor={id('excerpt_ar')}>Résumé (AR)</Label>
                    <Textarea id={id('excerpt_ar')} name="excerpt_ar" defaultValue={blog.excerpt_ar ?? ''} className="min-h-28" dir="rtl" />
                    <InputError message={errors.excerpt_ar} />
                </div>
            </div>

            <div className="grid gap-2">
                <p className="text-sm font-medium">Contenu</p>
                <div className="flex flex-wrap gap-2">
                    <Button
                        type="button"
                        variant={activeContentLocale === 'fr' ? 'default' : 'outline'}
                        className={activeContentLocale === 'fr' ? 'rounded-lg bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90' : 'rounded-lg'}
                        onClick={() => setActiveContentLocale('fr')}
                    >
                        Français
                    </Button>
                    <Button
                        type="button"
                        variant={activeContentLocale === 'ar' ? 'default' : 'outline'}
                        className={activeContentLocale === 'ar' ? 'rounded-lg bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90' : 'rounded-lg'}
                        onClick={() => setActiveContentLocale('ar')}
                    >
                        العربية
                    </Button>
                </div>

                <input type="hidden" name="body_fr" value={contentByLocale.fr} />
                <input type="hidden" name="body_ar" value={contentByLocale.ar} />

                <div className="grid gap-2">
                    <Label htmlFor={id(`body_${activeContentLocale}`)}>
                        {activeContentLocale === 'fr' ? 'Contenu (FR)' : 'Contenu (AR)'}
                    </Label>
                    <TipTapEditor
                        key={`${id('body')}-${activeContentLocale}`}
                        id={id(`body_${activeContentLocale}`)}
                        value={contentByLocale[activeContentLocale]}
                        onChange={(html) => updateContent(activeContentLocale, html)}
                        placeholder={activeContentLocale === 'fr' ? 'Ecrivez le contenu en francais...' : 'اكتب المحتوى باللغة العربية...'}
                        dir={activeContentLocale === 'ar' ? 'rtl' : 'ltr'}
                    />
                    <p className="text-xs text-neutral-500">
                        {activeContentLocale === 'fr'
                            ? 'Vous pouvez coller du HTML simple si nécessaire.'
                            : 'يمكنك لصق HTML بسيط إذا لزم الأمر.'}
                    </p>
                </div>

                <InputError message={activeContentLocale === 'fr' ? errors.body_fr : errors.body_ar} />
                {errors.body_fr && activeContentLocale !== 'fr' ? <InputError message={errors.body_fr} /> : null}
                {errors.body_ar && activeContentLocale !== 'ar' ? <InputError message={errors.body_ar} /> : null}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor={id('published_at')}>Date de publication</Label>
                    <Input id={id('published_at')} name="published_at" type="date" defaultValue={blog.published_at ?? ''} />
                    <InputError message={errors.published_at} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor={id('image')}>Image</Label>
                    <Input id={id('image')} name="image" type="file" accept="image/png,image/jpeg,image/webp" className="cursor-pointer" />
                    <InputError message={errors.image} />
                </div>
            </div>

            <div className="grid gap-2">
                <label className="flex items-center gap-2">
                    <input type="hidden" name="is_published" value="0" />
                    <input id={id('is_published')} name="is_published" type="checkbox" value="1" defaultChecked={Boolean(blog.is_published)} className="h-4 w-4 rounded border-neutral-300 accent-[var(--color-alpha)]" />
                    <span className="text-sm">Publié sur le site</span>
                </label>
                <InputError message={errors.is_published} />
            </div>
        </>
    );
}

export default function DashboardBlogs({ blogs = [], createOpen = false, editingBlog = null }) {
    const { flash, errors: pageErrors = {} } = usePage().props;
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(Boolean(createOpen));
    const [openEditBlogId, setOpenEditBlogId] = useState(editingBlog?.id ?? null);
    const [blogToDelete, setBlogToDelete] = useState(null);
    const [isDeletingBlog, setIsDeletingBlog] = useState(false);

    const createFormHasErrors = Boolean(
        pageErrors.slug ||
            pageErrors.title_fr ||
            pageErrors.title_ar ||
            pageErrors.excerpt_fr ||
            pageErrors.excerpt_ar ||
            pageErrors.body_fr ||
            pageErrors.body_ar ||
            pageErrors.category_fr ||
            pageErrors.category_ar ||
            pageErrors.author ||
            pageErrors.image ||
            pageErrors.published_at ||
            pageErrors.is_published,
    );

    useEffect(() => {
        if (createOpen || createFormHasErrors) {
            setIsCreateModalOpen(true);
        }
    }, [createOpen, createFormHasErrors]);

    useEffect(() => {
        setOpenEditBlogId(editingBlog?.id ?? null);
    }, [editingBlog?.id]);

    const deleteBlog = () => {
        if (!blogToDelete) {
            return;
        }

        setIsDeletingBlog(true);
        router.delete(`/admin/blogs/${blogToDelete.id}`, {
            preserveScroll: true,
            onFinish: () => setIsDeletingBlog(false),
            onSuccess: () => setBlogToDelete(null),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des blogs" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold text-[var(--color-alpha)]">Gestion des blogs</h1>
                        <p className="text-sm text-muted-foreground">Publiez des articles bilingues avec image, catégorie, extrait et contenu complet.</p>
                    </div>
                    <Button
                        type="button"
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Nouvel article
                    </Button>
                </div>

                {flash?.success && (
                    <p className="rounded-md border border-green-300 bg-green-50 px-3 py-2 text-sm text-green-700">{flash.success}</p>
                )}

                <Card>
                    <CardContent className="p-0">
                        {blogs.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <ImageOff className="mb-3 h-10 w-10 text-neutral-400" />
                                <p className="font-medium text-neutral-800">Aucun article pour le moment</p>
                                <p className="mt-1 text-sm text-neutral-500">Créez votre premier article pour alimenter la page publique.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[980px] border-separate border-spacing-0">
                                    <thead>
                                        <tr>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Image</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Titre</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Catégorie</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Date</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Statut</th>
                                            <th className="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {blogs.map((blog) => (
                                            <tr key={blog.id} className="border-b last:border-b-0">
                                                <td className="px-3 py-4 align-top">
                                                    <div className="h-16 w-24 overflow-hidden rounded-lg bg-neutral-100">
                                                        {blog.image_url ? (
                                                            <img src={blog.image_url} alt={blog.title_fr} className="h-full w-full object-cover" />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center text-neutral-400">
                                                                <ImageOff className="h-5 w-5" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-3 py-4 align-top">
                                                    <div className="space-y-1">
                                                        <p className="font-semibold text-[var(--color-alpha)]">{blog.title_fr}</p>
                                                        <p className="text-xs text-neutral-500" dir="rtl">{blog.title_ar}</p>
                                                    </div>
                                                </td>
                                                <td className="px-3 py-4 align-top">
                                                    <div className="space-y-1">
                                                        <Badge variant="secondary">{blog.category_fr}</Badge>
                                                        <p className="text-xs text-neutral-500" dir="rtl">{blog.category_ar}</p>
                                                    </div>
                                                </td>
                                                <td className="px-3 py-4 align-top text-sm text-neutral-600">{blog.published_at ?? '-'}</td>
                                                <td className="px-3 py-4 align-top">
                                                    {blog.is_published ? (
                                                        <Badge className="bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]">Publié</Badge>
                                                    ) : (
                                                        <Badge variant="outline">Brouillon</Badge>
                                                    )}
                                                </td>
                                                <td className="px-3 py-4 align-top">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button variant="outline" size="sm" asChild>
                                                            <Link href={`/admin/blogs/${blog.id}/edit`}>
                                                                <Pencil className="mr-1.5 h-3.5 w-3.5" />
                                                                Modifier
                                                            </Link>
                                                        </Button>
                                                        <Button variant="destructive" size="sm" onClick={() => setBlogToDelete(blog)}>
                                                            <Trash2 className="mr-1 h-3.5 w-3.5" />
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

                <Dialog
                    open={isCreateModalOpen}
                    onOpenChange={(open) => {
                        setIsCreateModalOpen(open);
                        if (!open) {
                            router.get('/admin/blogs');
                        }
                    }}
                >
                    <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
                        <DialogHeader>
                            <DialogTitle>Créer un article</DialogTitle>
                            <DialogDescription>Le slug peut être laissé vide, il sera généré automatiquement à partir du titre FR.</DialogDescription>
                        </DialogHeader>
                        <Form
                            method="post"
                            action="/admin/blogs"
                            className="grid gap-4"
                            encType="multipart/form-data"
                            onSuccess={() => router.get('/admin/blogs')}
                        >
                            {({ processing, errors }) => (
                                <>
                                    <BlogFields errors={errors} />
                                    <div className="flex justify-end gap-2">
                                        <Button type="button" variant="outline" onClick={() => router.get('/admin/blogs')}>
                                            Annuler
                                        </Button>
                                        <Button type="submit" className="bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90" disabled={processing}>
                                            {processing ? 'Création...' : 'Créer l’article'}
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </DialogContent>
                </Dialog>

                <Dialog
                    open={Boolean(openEditBlogId)}
                    onOpenChange={(open) => {
                        setOpenEditBlogId(open && editingBlog ? editingBlog.id : null);
                        if (!open) {
                            router.get('/admin/blogs');
                        }
                    }}
                >
                    <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
                        <DialogHeader>
                            <DialogTitle>Modifier un article</DialogTitle>
                            <DialogDescription>Mettez à jour les contenus FR/AR, l’image et la visibilité.</DialogDescription>
                        </DialogHeader>
                        <Form
                            method="post"
                            action={editingBlog ? `/admin/blogs/${editingBlog.id}` : '/admin/blogs'}
                            className="grid gap-4"
                            encType="multipart/form-data"
                            onSuccess={() => router.get('/admin/blogs')}
                        >
                            {({ processing, errors }) => (
                                <>
                                    <input type="hidden" name="_method" value="PUT" />
                                    <BlogFields blog={editingBlog ?? {}} errors={errors} prefix={`edit-${editingBlog?.id ?? 'blog'}`} />
                                    <div className="flex justify-end gap-2">
                                        <Button type="button" variant="outline" onClick={() => router.get('/admin/blogs')}>
                                            Annuler
                                        </Button>
                                        <Button type="submit" className="bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90" disabled={processing}>
                                            {processing ? 'Mise à jour...' : 'Enregistrer les modifications'}
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </DialogContent>
                </Dialog>

                <Dialog open={Boolean(blogToDelete)} onOpenChange={(open) => !open && setBlogToDelete(null)}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Confirmer la suppression</DialogTitle>
                            <DialogDescription>
                                {blogToDelete ? `Voulez-vous supprimer l'article "${blogToDelete.title_fr}" ? Cette action est irréversible.` : 'Cette action est irréversible.'}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => setBlogToDelete(null)} disabled={isDeletingBlog}>
                                Annuler
                            </Button>
                            <Button type="button" variant="destructive" disabled={!blogToDelete || isDeletingBlog} onClick={deleteBlog}>
                                {isDeletingBlog ? 'Suppression...' : 'Supprimer'}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
