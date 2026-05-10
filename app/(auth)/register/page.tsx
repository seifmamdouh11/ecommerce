"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { useLang } from '@/app/hooks/useLang'
import { AuthTranslations } from '@/app/translations/auth-translations'
import { useAuth } from '@/app/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiMail, FiLock, FiUser, FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import api from '@/app/libs/api'
import Swal from 'sweetalert2'

export default function RegisterPage() {
    const { lang } = useLang();
    const t = AuthTranslations[lang];
    const isRtl = lang === "ar";
    const { login } = useAuth();
    const router = useRouter();

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // 1. Create User
            await api.post(`/users`, {
                name,
                email,
                password,
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + name
            });
            
            // 2. Login immediately
            const loginRes = await api.post(`/auth/login`, {
                email,
                password
            });
            
            await login(loginRes.data.access_token);
            
            Swal.fire({
                icon: 'success',
                title: isRtl ? 'تم إنشاء الحساب' : 'Account Created',
                text: isRtl ? 'أهلاً بك في متجرنا!' : 'Welcome to our store!',
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
            let errorMessage = isRtl ? "فشل التسجيل. يرجى المحاولة مرة أخرى." : "Registration failed. Please try again.";
            
            if (Array.isArray(errorData)) {
                errorMessage = errorData[0];
            } else if (typeof errorData === "string") {
                errorMessage = errorData;
            }

            Swal.fire({
                icon: 'error',
                title: isRtl ? 'فشل التسجيل' : 'Registration Failed',
                text: errorMessage,
                confirmButtonColor: 'var(--secondary)',
                background: 'var(--surface)',
                color: 'var(--foreground)',
                customClass: {
                    popup: 'rounded-[2.5rem]',
                    confirmButton: 'rounded-xl px-8 py-3 font-bold uppercase tracking-widest text-xs'
                }
            });
            
            console.error("Registration failed:", errorData || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 py-20">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-10">
                    <Link href="/">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-white shadow-xl shadow-secondary/30 mb-6">
                            <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                    </Link>
                    <h1 className="text-3xl font-black text-foreground tracking-tighter uppercase mb-2">{t.registerTitle}</h1>
                    <p className="text-muted">{t.registerSubtitle}</p>
                </div>

                <div className="bg-surface border border-border rounded-[2.5rem] p-6 sm:p-10 shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-muted mb-3">{t.fullName}</label>
                            <div className="relative">
                                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-subtle" />
                                <input 
                                    type="text" 
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-surface-alt border border-border rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-secondary outline-none transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-muted mb-3">{t.email}</label>
                            <div className="relative">
                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-subtle" />
                                <input 
                                    type="email" 
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-surface-alt border border-border rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-secondary outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-muted mb-3">{t.password}</label>
                            <div className="relative">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-subtle" />
                                <input 
                                    type="password" 
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-surface-alt border border-border rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-secondary outline-none transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-secondary text-white font-black py-5 rounded-2xl shadow-xl shadow-secondary/30 hover:shadow-secondary/50 transition-all text-sm tracking-[0.2em] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    {t.signUp}
                                    {isRtl ? <FiArrowLeft /> : <FiArrowRight />}
                                </>
                            )}
                        </motion.button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-border text-center">
                        <p className="text-sm text-muted">
                            {t.alreadyHaveAccount} {' '}
                            <Link href="/login" className="text-secondary font-black hover:underline tracking-tight">
                                {t.signIn}
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
