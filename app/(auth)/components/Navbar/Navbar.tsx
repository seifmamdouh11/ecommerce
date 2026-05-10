"use client"
import { useLang } from '@/app/hooks/useLang';
import { useTheme } from '@/app/hooks/useTheme';
import { NavbarTranslations } from '@/app/translations/main-translations';
import React, { useState } from 'react';
import { IoEarth } from 'react-icons/io5';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { HiSun, HiMoon } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const NAV_KEYS = ["Home", "About", "Categories", "Faq"] as const;
const NAV_PATHS: Record<string, string> = {
    Home: "/",
    About: "/about",
    Categories: "/categories",
    Faq: "/faq"
};

export default function Navbar() {
    const { lang, toggleLanguage } = useLang();
    const { theme, toggleTheme } = useTheme();
    const t = NavbarTranslations[lang];
    const isRtl = lang === "ar";
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between gap-8">

                    {/* ── Logo ── */}
                    <Link href="/">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-2.5 shrink-0 group cursor-pointer"
                        >
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
                        </motion.div>
                    </Link>

                    {/* ── Desktop Nav ── */}
                    <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
                        {NAV_KEYS.map((key) => (
                            <Link key={key} href={NAV_PATHS[key]}>
                                <div className="relative px-4 py-2 text-sm font-medium text-muted rounded-lg transition-colors duration-150 hover:text-foreground hover:bg-surface-alt group cursor-pointer">
                                    {t[key] ?? key}
                                    <motion.span
                                        className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-primary"
                                        initial={{ scaleX: 0 }}
                                        whileHover={{ scaleX: 1 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                </div>
                            </Link>
                        ))}
                    </nav>

                    {/* ── Right Controls ── */}
                    <div className="flex items-center gap-3 shrink-0">
                        {/* Auth buttons — desktop */}
                        <Link href="/login">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="rounded-xl border border-border px-4 py-2 text-sm font-semibold text-muted transition-all duration-150 hover:border-primary/40 hover:text-primary hover:bg-primary/5 cursor-pointer"
                            >
                                {t["Login"]}
                            </motion.div>
                        </Link>
                        <Link href="/register">
                            <motion.div
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="rounded-xl bg-gradient-to-r from-primary to-[#ff8a6a] px-4 py-2 text-sm font-semibold text-white shadow-[0_3px_10px_rgba(255,86,86,0.35)] transition-all duration-150 hover:shadow-[0_4px_16px_rgba(255,86,86,0.5)] cursor-pointer"
                            >
                                {t["Register"]}
                            </motion.div>
                        </Link>

                        {/* Theme toggle */}
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleTheme}
                            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                            className="flex items-center justify-center h-9 w-9 rounded-xl border border-border text-muted transition-all duration-150 hover:border-primary/40 hover:text-primary hover:bg-primary/5"
                        >
                            {theme === "dark"
                                ? <HiSun className="size-5 text-yellow-400" />
                                : <HiMoon className="size-5" />}
                        </motion.button>

                        {/* Language toggle */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleLanguage}
                            title="Toggle language"
                            className="flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs font-bold text-muted transition-all duration-150 hover:border-secondary/40 hover:text-secondary hover:bg-secondary/5"
                        >
                            <IoEarth className="size-4" />
                            <span>{isRtl ? "EN" : "ع"}</span>
                        </motion.button>

                        {/* Mobile hamburger */}
                        <button
                            className="flex md:hidden items-center justify-center h-9 w-9 rounded-xl border border-border text-muted transition-colors hover:bg-surface-alt"
                            onClick={() => setMobileOpen((v) => !v)}
                            aria-label="Toggle menu"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={mobileOpen ? "close" : "open"}
                                    initial={{ opacity: 0, rotate: -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {mobileOpen ? <HiX className="size-5" /> : <HiMenuAlt3 className="size-5" />}
                                </motion.div>
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </div>


            {/* ── Mobile Menu ── */ }
    <AnimatePresence>
        {mobileOpen && (
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden overflow-hidden border-t border-border bg-surface"
            >
                <nav className="flex flex-col gap-1 px-4 py-3">
                    {NAV_KEYS.map((key) => (
                        <Link key={key} href={NAV_PATHS[key]}>
                            <div
                                onClick={() => setMobileOpen(false)}
                                className="rounded-xl px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface-alt hover:text-foreground cursor-pointer"
                            >
                                {t[key] ?? key}
                            </div>
                        </Link>
                    ))}
                    <div className="mt-2 flex gap-2 border-t border-border pt-3 pb-2">
                        <Link href="/login" className="flex-1">
                            <div onClick={() => setMobileOpen(false)} className="rounded-xl border border-border px-4 py-2.5 text-center text-sm font-semibold text-muted hover:border-primary/40 hover:text-primary cursor-pointer">
                                {t["Login"]}
                            </div>
                        </Link>
                        <Link href="/register" className="flex-1">
                            <div onClick={() => setMobileOpen(false)} className="rounded-xl bg-gradient-to-r from-primary to-[#ff8a6a] px-4 py-2.5 text-center text-sm font-semibold text-white shadow-[0_3px_10px_rgba(255,86,86,0.3)] cursor-pointer">
                                {t["Register"]}
                            </div>
                        </Link>
                    </div>
                </nav>
            </motion.div>
        )}
    </AnimatePresence>
        </motion.header>
    );
}
