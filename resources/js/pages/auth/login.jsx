import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import TransText from '@components/TransText';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';



export default function Login({ status, canResetPassword }) {
    return (
        <AuthLayout
            title={<TransText fr="Connexion à votre espace" ar="تسجيل الدخول إلى فضائكم" en="Log in to your account" />}
            description={
                <TransText
                    fr="Entrez vos identifiants pour accéder à votre compte."
                    ar="أدخلوا بياناتكم للولوج إلى الحساب."
                    en="Enter your credentials to access your account."
                />
            }
        >
            <Head title="Log in" />

            <Form {...AuthenticatedSessionController.store.form()} resetOnSuccess={['password']} className="flex flex-col gap-6">
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">
                                    <TransText fr="Adresse email" ar="البريد الإلكتروني" en="Email address" />
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">
                                        <TransText fr="Mot de passe" ar="كلمة المرور" en="Password" />
                                    </Label>
                                    {canResetPassword && (
                                        <TextLink href={request()} className="ml-auto text-sm" tabIndex={5}>
                                            <TransText fr="Mot de passe oublié ?" ar="نسيت كلمة المرور؟" en="Forgot password?" />
                                        </TextLink>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox id="remember" name="remember" tabIndex={3} />
                                <Label htmlFor="remember">
                                    <TransText fr="Se souvenir de moi" ar="تذكرني" en="Remember me" />
                                </Label>
                            </div>

                            <Button type="submit" className="mt-4 w-full bg-[var(--color-alpha)] text-white hover:bg-[var(--color-alpha)]/90" tabIndex={4} disabled={processing} data-test="login-button">
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                <TransText fr="Se connecter" ar="تسجيل الدخول" en="Log in" />
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            <TransText fr="Vous n'avez pas de compte ?" ar="ليس لديكم حساب؟" en="Don't have an account?" />{' '}
                            <TextLink href="/register" tabIndex={5}>
                                <TransText fr="Créer un compte" ar="إنشاء حساب" en="Sign up" />
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
