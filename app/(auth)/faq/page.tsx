"use client"
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/app/hooks/useLang'
import { FaqTranslations } from '@/app/translations/faq-translations'
import { FiPlus, FiMinus, FiSearch } from 'react-icons/fi'

export default function FaqPage() {
    const { lang } = useLang();
    const t = FaqTranslations[lang];
    const isRtl = lang === "ar";
    const [searchQuery, setSearchQuery] = React.useState("");
    const [activeCategory, setActiveCategory] = React.useState("all");
    const [openIndex, setOpenIndex] = React.useState<number | null>(0);

    const filteredQuestions = t.questions.filter((item: any) => {
        const matchesSearch = item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             item.a.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === "all" || item.cat === activeCategory;
        return matchesSearch && matchesCategory;
    });

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
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="min-h-screen bg-background py-16 lg:py-24 px-6">
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-4xl mx-auto"
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-foreground mb-6 tracking-tighter leading-none">
                        {t.title}
                    </h1>
                    <p className="text-xl text-muted max-w-2xl mx-auto">
                        {t.subtitle}
                    </p>
                </motion.div>

                {/* Search & Categories */}
                <motion.div variants={itemVariants} className="mb-12 space-y-6">
                    <div className="relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-xl" />
                        <input 
                            type="text" 
                            placeholder={isRtl ? 'ابحث عن سؤال...' : 'Search for a question...'}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-surface border border-border rounded-2xl py-4 pl-12 pr-4 text-lg focus:border-primary outline-none transition-all shadow-sm"
                        />
                    </div>
                    
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                        <button 
                            onClick={() => setActiveCategory("all")}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === "all" ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface border border-border text-muted hover:text-foreground'}`}
                        >
                            {isRtl ? 'الكل' : 'All'}
                        </button>
                        {Object.entries(t.categories).map(([key, label]: [string, any]) => (
                            <button 
                                key={key}
                                onClick={() => setActiveCategory(key)}
                                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === key ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface border border-border text-muted hover:text-foreground'}`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Accordion List */}
                <motion.div variants={itemVariants} className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {filteredQuestions.map((item: any, idx: number) => {
                            const isOpen = openIndex === idx;
                            return (
                                <motion.div 
                                    key={idx}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className={`rounded-3xl border transition-all duration-300 ${isOpen ? 'bg-surface border-primary shadow-xl shadow-primary/5' : 'bg-surface border-border hover:border-primary/50'}`}
                                >
                                    <button 
                                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                                        className="w-full flex items-center justify-between p-6 lg:p-8 text-left focus:outline-none"
                                        dir={isRtl ? 'rtl' : 'ltr'}
                                    >
                                        <span className={`text-lg lg:text-xl font-bold transition-colors ${isOpen ? 'text-primary' : 'text-foreground'}`}>
                                            {item.q}
                                        </span>
                                        <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-primary text-white rotate-180' : 'bg-surface-alt text-muted'}`}>
                                            {isOpen ? <FiMinus /> : <FiPlus />}
                                        </div>
                                    </button>
                                    
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div 
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-6 lg:px-8 pb-8 text-muted leading-relaxed text-lg" dir={isRtl ? 'rtl' : 'ltr'}>
                                                    {item.a}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {filteredQuestions.length === 0 && (
                        <div className="text-center py-20 text-muted font-bold">
                            {isRtl ? 'لم يتم العثور على نتائج' : 'No questions found'}
                        </div>
                    )}
                </motion.div>

                {/* Footer Help Card */}
                <motion.div 
                    variants={itemVariants}
                    className="mt-20 p-8 sm:p-10 lg:p-16 rounded-[3rem] bg-foreground text-background text-center relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <h2 className="text-3xl lg:text-4xl font-black mb-6 tracking-tight">
                            {isRtl ? 'هل لديك أسئلة أخرى؟' : 'Still have questions?'}
                        </h2>
                        <p className="text-lg opacity-70 mb-10 max-w-lg mx-auto">
                            {isRtl ? 'فريق الدعم لدينا متاح دائماً لمساعدتك في أي استفسارات قد تكون لديك.' : 'Our support team is always available to help you with any inquiries you might have.'}
                        </p>
                        <button className="bg-primary text-white px-10 py-4 rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 hover:scale-105 transition-all">
                            {isRtl ? 'اتصل بنا' : 'CONTACT US'}
                        </button>
                    </div>
                    {/* Abstract background pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -translate-y-1/2 translate-x-1/2" />
                </motion.div>
            </motion.div>
        </div>
    );
}
