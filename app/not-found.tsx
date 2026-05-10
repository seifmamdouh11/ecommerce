"use client"
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLang } from '@/app/hooks/useLang';
import { FiHome, FiArrowLeft, FiSearch, FiShoppingBag, FiInfo, FiHelpCircle } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const { lang } = useLang();
    const router = useRouter();
    const isRtl = lang === 'ar';

    React.useEffect(() => {
        document.title = isRtl ? "الصفحة غير موجودة | POLT-STORE" : "Page Not Found | POLT-STORE";
    }, [isRtl]);

    const translations = {
        en: {
            title: "404",
            subtitle: "Page Not Found",
            description: "Oops! It seems you've wandered into an unknown aisle. The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
            backToHome: "Back to Home",
            goBack: "Go Back",
            popularLinks: "Popular Destinations:",
            home: "Home",
            categories: "Categories",
            faq: "FAQ",
            about: "About Us"
        },
        ar: {
            title: "404",
            subtitle: "الصفحة غير موجودة",
            description: "عفواً! يبدو أنك دخلت في ممر مجهول. الصفحة التي تبحث عنها ربما تمت إزالتها، أو تم تغيير اسمها، أو غير متاحة مؤقتًا.",
            backToHome: "العودة للرئيسية",
            goBack: "الرجوع",
            popularLinks: "وجهات شائعة:",
            home: "الرئيسية",
            categories: "الفئات",
            faq: "الأسئلة الشائعة",
            about: "من نحن"
        }
    };

    const t = translations[lang as 'en' | 'ar'] || translations.en;

    const quickLinks = [
        { name: t.home, path: '/', icon: FiHome },
        { name: t.categories, path: '/categories', icon: FiShoppingBag },
        { name: t.about, path: '/about', icon: FiInfo },
        { name: t.faq, path: '/faq', icon: FiHelpCircle },
    ];

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-background px-6 py-20 overflow-hidden relative">
            {/* Background decorative elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="max-w-3xl w-full mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary to-[#ff8a6a] select-none">
                        {t.title}
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="space-y-6"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-foreground uppercase tracking-tight">
                        {t.subtitle}
                    </h2>
                    
                    <p className="text-lg text-muted max-w-xl mx-auto leading-relaxed">
                        {t.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                        <button 
                            onClick={() => router.back()}
                            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-surface border border-border text-foreground font-bold hover:bg-surface-alt hover:border-primary/30 transition-all flex items-center justify-center gap-2 group"
                        >
                            {isRtl ? <FiArrowLeft className="group-hover:translate-x-1 transition-transform" /> : <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />}
                            {t.goBack}
                        </button>
                        <Link href="/" className="w-full sm:w-auto">
                            <button className="w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-[#ff8a6a] text-white font-black uppercase tracking-widest shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                                <FiHome />
                                {t.backToHome}
                            </button>
                        </Link>
                    </div>
                </motion.div>

                {/* Popular Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="mt-20 pt-10 border-t border-border"
                >
                    <p className="text-sm font-bold text-muted uppercase tracking-widest mb-6">{t.popularLinks}</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {quickLinks.map((link, idx) => (
                            <Link key={idx} href={link.path}>
                                <motion.div 
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-surface border border-border text-muted hover:text-primary hover:border-primary/40 hover:shadow-md transition-all cursor-pointer"
                                >
                                    <link.icon className="text-lg" />
                                    <span className="font-semibold text-sm">{link.name}</span>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
