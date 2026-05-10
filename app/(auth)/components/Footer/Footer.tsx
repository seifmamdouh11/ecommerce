"use client"
import { useLang } from '@/app/hooks/useLang';
import { FooterTranslations } from '@/app/translations/footer-translations';
import { NavbarTranslations } from '@/app/translations/main-translations';
import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { motion, Variants } from 'framer-motion';

export default function Footer() {
    const { lang } = useLang();
    const t = FooterTranslations[lang];
    const navT = NavbarTranslations[lang];
    const isRtl = lang === "ar";
    
    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.1,
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <footer className="mt-20 border-t border-border bg-surface-alt overflow-hidden">
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
            >
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Brand & Description */}
                    <motion.div variants={itemVariants} className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2.5 shrink-0 group mb-6">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[#ff8a6a] text-white shadow-[0_4px_12px_rgba(255,86,86,0.4)] transition-transform duration-200 group-hover:scale-105">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <path d="M16 10a4 4 0 01-8 0" />
                                </svg>
                            </span>
                            <span className="text-[17px] font-bold tracking-tight text-foreground">
                                POLT-<span className="text-primary">STORE</span>
                            </span>
                        </Link>
                        <p className="text-sm text-muted leading-relaxed max-w-xs">
                            {t.description}
                        </p>
                        <div className="mt-6 flex gap-4">
                            {[FaFacebook, FaInstagram, FaTwitter, FaLinkedin].map((Icon, idx) => (
                                <motion.a 
                                    key={idx}
                                    whileHover={{ y: -3, color: "var(--color-primary)" }}
                                    href="#" 
                                    className="text-muted transition-colors duration-200"
                                >
                                    <Icon className="size-5" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-base font-bold text-foreground mb-6">{t.quickLinks}</h3>
                        <ul className="space-y-4 text-sm">
                            {[
                                { label: navT.Home, path: "/" },
                                { label: navT.About, path: "/about" },
                                { label: navT.Categories, path: "/categories" },
                                { label: navT.Faq, path: "/faq" }
                            ].map((link, idx) => (
                                <li key={idx}>
                                    <Link href={link.path}>
                                        <div className="text-muted transition-colors hover:text-primary inline-block cursor-pointer">
                                            {link.label}
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Customer Service */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-base font-bold text-foreground mb-6">{t.customerService}</h3>
                        <ul className="space-y-4 text-sm">
                            {[t.contactUs, t.shipping, t.returns, t.privacyPolicy, t.termsOfService].map((link, idx) => (
                                <li key={idx}>
                                    <a href="#" className="text-muted transition-colors hover:text-primary inline-block">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Newsletter */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-base font-bold text-foreground mb-6">{t.newsletter}</h3>
                        <p className="text-sm text-muted mb-4">{t.newsletterDesc}</p>
                        <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative">
                                <input 
                                    type="email" 
                                    placeholder={t.placeholder}
                                    className="w-full rounded-xl border border-border bg-surface py-2.5 px-4 text-sm text-foreground placeholder:text-muted-subtle outline-none transition-colors focus:border-primary"
                                />
                            </div>
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="rounded-xl bg-gradient-to-r from-primary to-[#ff8a6a] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_3px_10px_rgba(255,86,86,0.35)] transition-all duration-150 hover:shadow-[0_4px_16px_rgba(255,86,86,0.5)]"
                            >
                                {t.subscribe}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div 
                    variants={itemVariants}
                    className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4"
                >
                    <p className="text-xs text-muted">
                        &copy; {new Date().getFullYear()} POLT-STORE. {t.allRightsReserved}
                    </p>
                    <div className="flex items-center gap-2">
                        {/* Dummy payment icons */}
                        {['VISA', 'MC', 'PAY'].map((pay, idx) => (
                            <div key={idx} className="h-6 w-10 rounded bg-surface border border-border flex items-center justify-center text-[10px] font-bold text-muted">
                                {pay}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </footer>
    );
}
