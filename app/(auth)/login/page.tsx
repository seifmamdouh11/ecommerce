"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { useLang } from '@/app/hooks/useLang'
import { AuthTranslations } from '@/app/translations/auth-translations'
import { useAuth } from '@/app/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiMail, FiLock, FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import api from '@/app/libs/api'
import Swal from 'sweetalert2'

export default function LoginPage() {
    const { lang } = useLang();
    const t = AuthTranslations[lang];
    const isRtl = lang === "ar";
    const { login } = useAuth();
    const router = useRouter();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await api.post(`/auth/login`, {
                email,
                password,
            });
            await login(response.data.access_token);
            
            Swal.fire({
                icon: 'success',
                title: isRtl ? 'تم تسجيل الدخول' : 'Success',
                text: isRtl ? 'مرحباً بعودتك!' : 'Welcome back!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                background: 'var(--surface)',
                color: 'var(--foreground)'
            });

            router.push("/");
        } catch (error: any) {
            const errorData = error.response?.data?.message;
            let errorMessage = isRtl ? "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى." : "Login failed. Please check your credentials.";
            
            if (error.response?.status === 401) {
                errorMessage = isRtl ? "البريد الإلكتروني أو كلمة المرور غير صحيحة." : "Invalid email or password.";
            } else if (Array.isArray(errorData)) {
                errorMessage = errorData[0];
            } else if (typeof errorData === "string") {
                errorMessage = errorData;
            }

            Swal.fire({
                icon: 'error',
                title: isRtl ? 'فشل الدخول' : 'Login Failed',
                text: errorMessage,
                confirmButtonColor: 'var(--primary)',
                background: 'var(--surface)',
                color: 'var(--foreground)',
                customClass: {
                    popup: 'rounded-[2rem]',
                    confirmButton: 'rounded-xl px-8 py-3 font-bold uppercase tracking-widest text-xs'
                }
            });
            
            console.error("Login failed:", errorData || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                {/* Logo / Home Link */}
                <div className="text-center mb-10">
                    <Link href="/">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-xl shadow-primary/30 mb-6">
                            <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                                <path d="M3 6h18M16 10a4 4 0 01-8 0" />
                            </svg>
                        </div>
                    </Link>
                    <h1 className="text-3xl font-black text-foreground tracking-tighter uppercase mb-2">{t.loginTitle}</h1>
                    <p className="text-muted">{t.loginSubtitle}</p>
                </div>

                <div className="bg-surface border border-border rounded-[2.5rem] p-10 shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-muted mb-3">{t.email}</label>
                            <div className="relative">
                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-subtle" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-surface-alt border border-border rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-primary outline-none transition-all"
                                    placeholder="demo@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-xs font-black uppercase tracking-widest text-muted">{t.password}</label>
                                <button type="button" className="text-[10px] font-bold text-primary hover:underline">{t.forgotPassword}</button>
                            </div>
                            <div className="relative">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-subtle" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-surface-alt border border-border rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-primary outline-none transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                            <input type="checkbox" id="remember" className="rounded border-border text-primary focus:ring-primary h-4 w-4" />
                            <label htmlFor="remember" className="text-xs font-bold text-muted cursor-pointer">{t.stayLoggedIn}</label>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary text-white font-black py-5 rounded-2xl shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all text-sm tracking-[0.2em] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    {t.signIn}
                                    {isRtl ? <FiArrowLeft /> : <FiArrowRight />}
                                </>
                            )}
                        </motion.button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-border text-center">
                        <p className="text-sm text-muted">
                            {t.noAccount} {' '}
                            <Link href="/register" className="text-primary font-black hover:underline tracking-tight">
                                {t.signUp}
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-8">
                    <Link href="/" className="text-xs font-bold text-muted hover:text-foreground transition-colors uppercase tracking-widest">
                        {isRtl ? 'العودة للمتجر' : 'Back to Store'}
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}
