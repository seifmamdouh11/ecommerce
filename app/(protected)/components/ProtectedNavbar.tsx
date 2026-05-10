"use client"
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '@/app/context/AuthContext';
import { useCart } from '@/app/context/CartContext';
import { useTheme } from '@/app/hooks/useTheme';
import { useLang } from '@/app/hooks/useLang';
import { NavbarTranslations } from '@/app/translations/main-translations';
import { HiSun, HiMoon } from 'react-icons/hi2';
import { HiX, HiMenuAlt3 } from 'react-icons/hi';
import { IoEarth } from 'react-icons/io5';
import { AnimatePresence } from 'framer-motion';

const NAV_KEYS = ["Home", "About", "Categories", "Faq"] as const;
const NAV_PATHS: Record<string, string> = {
    Home: "/",
    About: "/about",
    Categories: "/categories",
    Faq: "/faq"
};

export default function ProtectedNavbar() {
    const { user, logout } = useAuth();
    const { totalItems } = useCart();
    const { theme, toggleTheme } = useTheme();
    const { lang, toggleLanguage } = useLang();
    const t = NavbarTranslations[lang];
    const isRtl = lang === "ar";
    const [mobileOpen, setMobileOpen] = React.useState(false);

    return (
        <motion.header 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between gap-8">
                    
                    {/* Logo */}
                    <Link href="/dashboard">
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
                            <span className="text-[17px] font-bold tracking-tight text-foreground hidden sm:block">
                                POLT-<span className="text-primary">DASHBOARD</span>
                            </span>
                        </motion.div>
                    </Link>

                    {/* Navigation Links */}
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

                    {/* Right Controls */}
                    <div className="flex items-center gap-4 shrink-0">
                        {/* Cart */}
                        <Link href="/cart">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="relative flex items-center justify-center h-10 w-10 rounded-xl border border-border text-muted hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer"
                            >
                                <FiShoppingCart className="size-5" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm">
                                        {totalItems}
                                    </span>
                                )}
                            </motion.div>
                        </Link>

                        {/* Theme Toggle */}
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleTheme}
                            className="flex items-center justify-center h-10 w-10 rounded-xl border border-border text-muted transition-all hover:border-primary/40 hover:text-primary hover:bg-primary/5"
                        >
                            {theme === "dark" ? <HiSun className="size-5 text-yellow-400" /> : <HiMoon className="size-5" />}
                        </motion.button>

                        {/* Language Toggle */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleLanguage}
                            className="hidden sm:flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs font-bold text-muted transition-all duration-150 hover:border-secondary/40 hover:text-secondary hover:bg-secondary/5"
                        >
                            <IoEarth className="size-4" />
                            <span>{isRtl ? "EN" : "ع"}</span>
                        </motion.button>

                        {/* User Profile */}
                        <div className="hidden md:flex items-center gap-3 pl-4 border-l border-border">
                            <Link href="/profile">
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-alt border border-border cursor-pointer hover:border-primary/30 transition-colors"
                                >
                                    <div className="h-7 w-7 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                                        <FiUser size={14} />
                                    </div>
                                    <span className="text-sm font-bold text-foreground truncate max-w-[120px]">{user?.name}</span>
                                </motion.div>
                            </Link>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={logout}
                                className="h-10 w-10 flex items-center justify-center rounded-xl border border-border text-muted hover:text-red-500 hover:border-red-500/40 hover:bg-red-500/5 transition-all"
                                title="Logout"
                            >
                                <FiLogOut size={18} />
                            </motion.button>
                        </div>

                        {/* Mobile hamburger */}
                        <button
                            className="flex md:hidden items-center justify-center h-10 w-10 rounded-xl border border-border text-muted transition-colors hover:bg-surface-alt"
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
                                    {mobileOpen ? <HiX className="size-6" /> : <HiMenuAlt3 className="size-6" />}
                                </motion.div>
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
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
                            {/* Profile Section in Mobile Menu */}
                            <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-2xl bg-surface-alt border border-border">
                                <div className="h-10 w-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                                    <FiUser size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-foreground truncate">{user?.name}</p>
                                    <p className="text-xs text-muted truncate">{user?.email}</p>
                                </div>
                            </div>

                            {NAV_KEYS.map((key) => (
                                <Link key={key} href={NAV_PATHS[key]}>
                                    <div
                                        onClick={() => setMobileOpen(false)}
                                        className="rounded-xl px-4 py-3 text-sm font-medium text-muted transition-colors hover:bg-surface-alt hover:text-foreground cursor-pointer"
                                    >
                                        {t[key] ?? key}
                                    </div>
                                </Link>
                            ))}

                            <div className="mt-2 pt-3 border-t border-border flex flex-col gap-2">
                                <Link href="/profile" className="w-full">
                                    <div onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted hover:bg-surface-alt hover:text-foreground cursor-pointer">
                                        <FiUser size={18} />
                                        <span>{lang === 'ar' ? 'الملف الشخصي' : 'My Profile'}</span>
                                    </div>
                                </Link>
                                
                                <button 
                                    onClick={toggleLanguage}
                                    className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-sm font-medium text-muted hover:bg-surface-alt hover:text-foreground"
                                >
                                    <IoEarth size={18} />
                                    <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
                                </button>

                                <button 
                                    onClick={() => {
                                        setMobileOpen(false);
                                        logout();
                                    }}
                                    className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-500/5"
                                >
                                    <FiLogOut size={18} />
                                    <span>{lang === 'ar' ? 'تسجيل الخروج' : 'Logout'}</span>
                                </button>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
