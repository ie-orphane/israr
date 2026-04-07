import AppLayout from '@/layouts/app-layout';
import { Form, Head, usePage } from '@inertiajs/react';
import TransText from '@components/TransText';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShieldCheck, LoaderCircle, Database, FileText, Clock3 } from 'lucide-react';
import { useState } from 'react';

export default function Formulaire() {
    const { flash } = usePage().props;
    const [contactMethod, setContactMethod] = useState('email');
    const savedRequest = flash?.savedRequest;

    const lang =
        typeof window !== 'undefined'
            ? localStorage.getItem('lang') || 'fr'
            : 'fr';

    const locale = lang === 'ar' ? 'ar-MA' : lang === 'en' ? 'en-US' : 'fr-FR';
    const formattedSubmittedAt = savedRequest?.submitted_at
        ? new Date(savedRequest.submitted_at).toLocaleString(locale, {
              dateStyle: 'medium',
              timeStyle: 'short',
          })
        : null;

    const regions = [
        { value: 'casablanca', fr: 'Casablanca', ar: 'الدار البيضاء' },
        { value: 'rabat', fr: 'Rabat', ar: 'الرباط' },
        { value: 'fes', fr: 'Fès', ar: 'فاس' },
        { value: 'marrakech', fr: 'Marrakech', ar: 'مراكش' },
        { value: 'tanger', fr: 'Tanger', ar: 'طنجة' },
        { value: 'agadir', fr: 'Agadir', ar: 'أكادير' },
        { value: 'autre', fr: 'Autre', ar: 'أخرى' },
    ];

    const typesOfViolence = [
        { value: 'physique', fr: 'Violence physique', ar: 'عنف جسدي' },
        { value: 'psychologique', fr: 'Violence psychologique', ar: 'عنف نفسي' },
        { value: 'economique', fr: 'Violence économique', ar: 'عنف اقتصادي' },
        { value: 'sexuelle', fr: 'Violence sexuelle', ar: 'عنف جنسي' },
        { value: 'administrative', fr: 'Violence administrative', ar: 'عنف إداري' },
        { value: 'autre', fr: 'Autre', ar: 'أخرى' },
    ];

    return (
        <AppLayout>
            <Head title="Formulaire d'aide" />
            <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-12 xl:max-w-7xl">
                <section className="relative overflow-hidden rounded-2xl border border-[var(--color-alpha)]/20 bg-gradient-to-br from-[var(--color-alpha)] via-[var(--color-alpha)]/90 to-[var(--color-beta)] px-6 py-8 text-white md:px-8">
                    <div className="relative z-10 max-w-3xl space-y-3">
                        <p className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            <TransText fr="Espace securise" ar="مساحة آمنة" en="Secure space" />
                        </p>
                        <h1 className="text-2xl font-bold leading-tight md:text-3xl">
                            <TransText
                                fr="Demander une aide juridique en toute confidentialite"
                                ar="اطلبي المساعدة القانونية بسرية تامة"
                                en="Request legal support with full confidentiality"
                            />
                        </h1>
                        <p className="max-w-2xl text-sm text-white/90 md:text-base">
                            <TransText
                                fr="Ce formulaire nous permet de comprendre votre situation et de vous orienter rapidement vers l'accompagnement adapte."
                                ar="يساعدنا هذا النموذج على فهم وضعيتك وتوجيهك بسرعة نحو المواكبة المناسبة."
                                en="This form helps us understand your situation and connect you quickly with the right support."
                            />
                        </p>
                    </div>
                    <div className="pointer-events-none absolute -right-14 -top-14 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
                    <div className="pointer-events-none absolute -bottom-20 left-8 h-40 w-40 rounded-full bg-black/10 blur-3xl" />
                </section>

                <Card className="border-2 border-[var(--color-alpha)]/15 shadow-sm">
                    <CardHeader className="space-y-2">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-6 w-6 text-[var(--color-beta)]" />
                            <CardTitle className="text-2xl">
                                <TransText
                                    fr="Formulaire de demande d'aide"
                                    ar="نموذج طلب المساعدة"
                                    en="Help Request Form"
                                />
                            </CardTitle>
                        </div>
                        <CardDescription>
                            <TransText
                                fr="Votre demande est strictement confidentielle. Toutes les informations seront cryptées et protégées."
                                ar="طلبك سري للغاية. سيتم تشفير جميع المعلومات وحمايتها."
                                en="Your request is strictly confidential. All information will be encrypted and protected."
                            />
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {flash?.success && (
                            <Alert className="mb-6 border-green-500/60 bg-green-50">
                                <AlertDescription className="text-green-800">
                                    {flash.success}
                                </AlertDescription>
                            </Alert>
                        )}

                        {savedRequest && (
                            <Card className="mb-6 border border-[var(--color-beta)]/25 bg-[var(--color-beta)]/5">
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2 text-base text-[var(--color-alpha)]">
                                        <Database className="h-4 w-4" />
                                        <TransText
                                            fr="Reponse enregistree dans la base de donnees"
                                            ar="تم حفظ الطلب في قاعدة البيانات"
                                            en="Request saved in the database"
                                        />
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-lg border bg-white p-3">
                                        <p className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                            <FileText className="h-3.5 w-3.5" />
                                            <TransText fr="Reference" ar="المرجع" en="Reference" />
                                        </p>
                                        <p className="text-sm font-semibold text-[var(--color-alpha)]">
                                            #{savedRequest.id}
                                        </p>
                                    </div>
                                    <div className="rounded-lg border bg-white p-3">
                                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                            <TransText fr="Statut" ar="الحالة" en="Status" />
                                        </p>
                                        <p className="text-sm font-semibold text-[var(--color-alpha)]">
                                            {savedRequest.status === 'pending' ? (
                                                <TransText fr="En attente" ar="قيد المعالجة" en="Pending" />
                                            ) : (
                                                savedRequest.status
                                            )}
                                        </p>
                                    </div>
                                    <div className="rounded-lg border bg-white p-3">
                                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                            <TransText fr="Region" ar="المنطقة" en="Region" />
                                        </p>
                                        <p className="text-sm font-semibold text-[var(--color-alpha)]">
                                            {savedRequest.region}
                                        </p>
                                    </div>
                                    <div className="rounded-lg border bg-white p-3">
                                        <p className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                            <Clock3 className="h-3.5 w-3.5" />
                                            <TransText fr="Date d'enregistrement" ar="تاريخ التسجيل" en="Saved at" />
                                        </p>
                                        <p className="text-sm font-semibold text-[var(--color-alpha)]">
                                            {formattedSubmittedAt}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <Form
                            method="post"
                            action="/aide/formulaire"
                            className="space-y-6 xl:grid xl:grid-cols-2 xl:gap-6 xl:space-y-0"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">
                                            <TransText fr="Nom complet" ar="الاسم الكامل" en="Full name" />
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            required
                                            placeholder="Votre nom"
                                            className={errors.name ? 'border-red-500' : ''}
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="region">
                                            <TransText fr="Région" ar="المنطقة" en="Region" />
                                        </Label>
                                        <Select name="region" required>
                                            <SelectTrigger className={errors.region ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Sélectionnez votre région" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {regions.map((region) => (
                                                    <SelectItem key={region.value} value={region.value}>
                                                        <TransText fr={region.fr} ar={region.ar} en={region.fr} />
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.region} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="type_of_violence">
                                            <TransText fr="Type de violence" ar="نوع العنف" en="Type of violence" />
                                        </Label>
                                        <Select name="type_of_violence" required>
                                            <SelectTrigger className={errors.type_of_violence ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Sélectionnez le type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {typesOfViolence.map((type) => (
                                                    <SelectItem key={type.value} value={type.value}>
                                                        <TransText fr={type.fr} ar={type.ar} en={type.fr} />
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.type_of_violence} />
                                    </div>

                                    <div className="grid gap-2 xl:col-span-2">
                                        <Label htmlFor="description">
                                            <TransText
                                                fr="Description de la situation"
                                                ar="وصف الوضع"
                                                en="Description of the situation"
                                            />
                                        </Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            required
                                            rows={6}
                                            placeholder="Décrivez votre situation..."
                                            className={errors.description ? 'border-red-500' : ''}
                                        />
                                        <InputError message={errors.description} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="contact_method">
                                            <TransText
                                                fr="Méthode de contact préférée"
                                                ar="طريقة الاتصال المفضلة"
                                                en="Preferred contact method"
                                            />
                                        </Label>
                                        <Select
                                            name="contact_method"
                                            required
                                            value={contactMethod}
                                            onValueChange={setContactMethod}
                                        >
                                            <SelectTrigger className={errors.contact_method ? 'border-red-500' : ''}>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="email">
                                                    <TransText fr="Email" ar="البريد الإلكتروني" en="Email" />
                                                </SelectItem>
                                                <SelectItem value="phone">
                                                    <TransText fr="Téléphone" ar="الهاتف" en="Phone" />
                                                </SelectItem>
                                                <SelectItem value="other">
                                                    <TransText fr="Autre" ar="أخرى" en="Other" />
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.contact_method} />
                                    </div>

                                    {(contactMethod === 'email' || contactMethod === 'phone') && (
                                        <div className="grid gap-2">
                                            <Label htmlFor="contact_value">
                                                {contactMethod === 'email' ? (
                                                    <TransText fr="Email" ar="البريد الإلكتروني" en="Email" />
                                                ) : (
                                                    <TransText fr="Téléphone" ar="الهاتف" en="Phone" />
                                                )}
                                            </Label>
                                            <Input
                                                id="contact_value"
                                                name="contact_value"
                                                type={contactMethod === 'email' ? 'email' : 'tel'}
                                                required
                                                placeholder={
                                                    contactMethod === 'email'
                                                        ? 'votre@email.com'
                                                        : '+212 6XX XXX XXX'
                                                }
                                                className={errors.contact_value ? 'border-red-500' : ''}
                                            />
                                            <InputError message={errors.contact_value} />
                                        </div>
                                    )}

                                    <div className="xl:col-span-2">
                                        <div className="flex items-start gap-2">
                                            <Checkbox
                                                id="consent_given"
                                                name="consent_given"
                                                required
                                                className={errors.consent_given ? 'border-red-500' : ''}
                                            />
                                            <Label htmlFor="consent_given" className="text-sm font-normal leading-relaxed">
                                                <TransText
                                                    fr="J'accepte que mes informations soient utilisées de manière confidentielle pour me contacter et m'accompagner."
                                                    ar="أوافق على استخدام معلوماتي بشكل سري للاتصال بي ومرافقتي."
                                                    en="I accept that my information will be used confidentially to contact and support me."
                                                />
                                            </Label>
                                        </div>
                                        <InputError message={errors.consent_given} />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full rounded-lg bg-[var(--color-alpha)] py-3 text-base font-semibold text-white shadow-sm transition hover:bg-[var(--color-alpha)]/90 xl:col-span-2"
                                        disabled={processing}
                                    >
                                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                        <TransText
                                            fr="Envoyer la demande"
                                            ar="إرسال الطلب"
                                            en="Submit request"
                                        />
                                    </Button>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

