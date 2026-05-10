"use client"
import { useLang } from '@/app/hooks/useLang';
import { HomeTranslations } from '@/app/translations/home-translations';
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image';

export default function Hero() {
    const { lang } = useLang();
    const t = HomeTranslations[lang];
    const isRtl = lang === "ar";

    return (
        <section className=" relative bg-background text-foreground overflow-hidden flex items-center pt-16">
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-0 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`text-center ${isRtl ? 'lg:text-right' : 'lg:text-left'}`}
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-block px-4 py-1.5 rounded-full bg-surface border border-border text-primary text-xs font-bold uppercase tracking-wider mb-6"
                        >
                            ✨ {t.newArrival}
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                            className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-7xl leading-[1.1]"
                        >
                            {t.heroHeading}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                            className="mt-8 text-lg leading-relaxed text-muted max-w-xl mx-auto lg:mx-0"
                        >
                            {t.heroSubtitle}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                            className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-2xl bg-primary text-white font-bold text-lg shadow-sm"
                            >
                                {t.shopNow}
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: "var(--color-surface-hover)", color: "var(--color-foreground)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-2xl bg-surface border border-border text-foreground font-bold text-lg"
                            >
                                {t.explore}
                            </motion.button>
                        </motion.div>

                    </motion.div>

                    {/* Visual Side - New Composite Graphic */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative w-full aspect-[4/3] max-w-[600px] mx-auto bg-primary/5 rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] shadow-[inset_0_0_40px_rgba(255,86,86,0.05)] overflow-hidden">
                            <Image
                                src="/hero-new.png"
                                alt="Store Experience"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
