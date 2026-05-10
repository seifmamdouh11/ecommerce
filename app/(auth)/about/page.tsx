"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { useLang } from '@/app/hooks/useLang'
import { AboutTranslations } from '@/app/translations/about-translations'
import { FiArrowUpRight, FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi'

export default function AboutPage() {
    const { lang } = useLang();
    const t = AboutTranslations[lang];
    const isRtl = lang === "ar";

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <div className="relative min-h-screen bg-background text-foreground">
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-6xl mx-auto px-6 py-20 lg:py-32"
            >
                {/* ── Header ── */}
                <motion.div variants={itemVariants} className="text-center mb-24">
                    <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
                        {t.title}
                    </h1>
                    <p className="text-lg lg:text-xl text-muted max-w-2xl mx-auto">
                        {t.subtitle}
                    </p>
                </motion.div>

                {/* ── Mission & Vision ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-40">
                    {[
                        { title: t.missionTitle, desc: t.missionDesc, icon: "🎯" },
                        { title: t.visionTitle, desc: t.visionDesc, icon: "👁️" }
                    ].map((card, idx) => (
                        <motion.div 
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className="p-10 rounded-3xl bg-surface border border-border shadow-sm"
                        >
                            <span className="text-4xl mb-6 block">{card.icon}</span>
                            <h2 className="text-2xl font-bold mb-4">{card.title}</h2>
                            <p className="text-muted leading-relaxed">{card.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* ── Our Values (Timeline Design) ── */}
                <motion.div variants={itemVariants} className="mb-40 relative">
                    <h2 className="text-4xl font-bold text-center mb-20">{t.valuesTitle}</h2>
                    
                    {/* Timeline Vertical Line */}
                    <div className="absolute left-1/2 top-[120px] bottom-0 w-px bg-border hidden md:block" />

                    <div className="space-y-12 relative">
                        {t.values.map((value: string, idx: number) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                {/* Content Side */}
                                <div className={`flex-1 w-full ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                    <div className="p-8 rounded-[2rem] bg-surface border border-border shadow-sm hover:border-primary transition-colors group">
                                        <span className="text-4xl font-black text-primary/10 group-hover:text-primary transition-colors block mb-2">0{idx + 1}</span>
                                        <h3 className="text-2xl font-extrabold">{value}</h3>
                                    </div>
                                </div>

                                {/* Center Dot */}
                                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-background border-4 border-primary shadow-xl">
                                    <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
                                </div>

                                {/* Empty Side for Balance */}
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* ── Team (Small Circles) ── */}
                <motion.div variants={itemVariants} className="mb-40 text-center">
                    <h2 className="text-4xl font-bold mb-6">{t.teamTitle}</h2>
                    <p className="text-muted mb-16 max-w-xl mx-auto">{t.teamDesc}</p>
                    
                    <div className="flex flex-wrap justify-center gap-12">
                        {t.team.map((member: any, idx: number) => (
                            <motion.div 
                                key={idx}
                                variants={itemVariants}
                                whileHover={{ y: -10 }}
                                className="flex flex-col items-center w-40 group"
                            >
                                <div className="relative h-32 w-32 rounded-full overflow-hidden border-2 border-border p-1 mb-6 transition-colors group-hover:border-primary">
                                    <div className="h-full w-full rounded-full overflow-hidden bg-surface-alt">
                                        <img 
                                            src={member.image} 
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold leading-tight">{member.name}</h3>
                                <p className="text-xs font-semibold text-muted uppercase tracking-wider mt-1">{member.role}</p>
                                
                                <div className="flex gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <FiTwitter className="w-4 h-4 text-muted hover:text-primary cursor-pointer" />
                                    <FiLinkedin className="w-4 h-4 text-muted hover:text-primary cursor-pointer" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* ── Simple CTA ── */}
                <motion.div 
                    variants={itemVariants}
                    className="rounded-[3rem] bg-surface border border-border p-12 lg:p-20 text-center"
                >
                    <h2 className="text-3xl lg:text-5xl font-bold mb-8 tracking-tight">
                        {lang === 'ar' ? 'كن جزءاً من رحلتنا' : 'Join our journey.'}
                    </h2>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 transition-all"
                    >
                        {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                        <FiArrowUpRight className="w-6 h-6" />
                    </motion.button>
                </motion.div>

            </motion.div>
        </div>
    )
}
