"use client"
import { CategoriesContext } from '@/app/context/CategoriesContext/CategoriesContext';
import { useLang } from '@/app/hooks/useLang';
import { HomeTranslations } from '@/app/translations/home-translations';
import { CategoriesContextType, Category } from '@/app/types/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';

export default function CategoriesPage() {
    const { categories } = React.useContext<CategoriesContextType>(CategoriesContext);
    const { lang } = useLang();
    const isRtl = lang === "ar";
    const t = HomeTranslations[lang];
    const ArrowIcon = isRtl ? BiChevronLeft : BiChevronRight;

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <div className="py-20 lg:py-32 bg-background">
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-7xl mx-auto px-6"
            >
                {/* Breadcrumbs */}
                <motion.nav variants={itemVariants} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted mb-12">
                    <Link href="/" className="hover:text-primary transition-colors">
                        {lang === 'ar' ? 'الرئيسية' : 'Home'}
                    </Link>
                    <span className="text-border">/</span>
                    <span className="text-foreground">{lang === 'ar' ? 'الفئات' : 'Categories'}</span>
                </motion.nav>

                {/* Header */}
                <motion.div variants={itemVariants} className="mb-20 text-center">
                    <h1 className="text-5xl lg:text-7xl font-black text-foreground mb-6 tracking-tighter leading-none">
                        {t.browseByCategory}
                    </h1>
                    <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
                </motion.div>

                {/* Categories Grid */}
                <motion.div 
                    variants={containerVariants}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                    {categories?.map((category: Category) => (
                        <motion.div
                            key={category.id}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className="group"
                        >
                            <Link href={`/categories/${category.id}`}>
                                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-surface border border-border transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/10">
                                    <Image 
                                        src={category.image} 
                                        alt={category.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                                    
                                    <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
                                        <h3 className="text-3xl font-black text-white mb-2 tracking-tight group-hover:text-primary transition-colors">
                                            {category.name}
                                        </h3>
                                        <div className="flex items-center gap-2 text-white/80 text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                            {t.viewProducts}
                                            <ArrowIcon size={20} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Empty State */}
                {(!categories || categories.length === 0) && (
                    <div className="text-center py-20">
                        <p className="text-xl text-muted">{t.noProductsFound}</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
