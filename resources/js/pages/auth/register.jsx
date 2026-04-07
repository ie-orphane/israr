import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import TransText from '@components/TransText';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
    return (
        <AuthLayout
            title={<TransText fr="Créer un compte" ar="إنشاء حساب" en="Create an account" />}
            description={
                <TransText
                    fr="Renseignez vos informations pour ouvrir votre espace sécurisé."
                    ar="املؤوا معلوماتكم لإنشاء فضائكم الآمن."
                    en="Fill in your details to create your secure space."
                />
            }
        >
            <Head title="Register" />
            <Form
                {...RegisteredUserController.store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">
                                    <TransText fr="Nom complet" ar="الاسم الكامل" en="Name" />
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Full name"
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">
                                    <TransText fr="Adresse email" ar="البريد الإلكتروني" en="Email address" />
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">
                                    <TransText fr="Mot de passe" ar="كلمة المرور" en="Password" />
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    <TransText fr="Confirmer le mot de passe" ar="تأكيد كلمة المرور" en="Confirm password" />
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Confirm password"
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>

                            <Button type="submit" className="mt-2 w-full bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90" tabIndex={5} data-test="register-user-button">
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                <TransText fr="Créer un compte" ar="إنشاء الحساب" en="Create account" />
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            <TransText fr="Vous avez déjà un compte ?" ar="لديكم حساب بالفعل؟" en="Already have an account?" />{' '}
                            <TextLink href={login()} tabIndex={6}>
                                <TransText fr="Se connecter" ar="تسجيل الدخول" en="Log in" />
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
