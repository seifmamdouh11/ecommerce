"use client"
import { CategoriesContext } from '@/app/context/CategoriesContext/CategoriesContext';
import { useLang } from '@/app/hooks/useLang';
import { HomeTranslations } from '@/app/translations/home-translations';
import { CategoriesContextType, Category } from '@/app/types/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { motion, Variants } from 'framer-motion';

export default function Categories() {
    const { categories } = React.useContext<CategoriesContextType>(CategoriesContext);
    const { lang } = useLang();
    const isRtl = lang === "ar";
    const ArrowIcon = isRtl ? BiLeftArrowAlt : BiRightArrowAlt;
    const arrowHover = isRtl ? "group-hover:-translate-x-1" : "group-hover:translate-x-1";
    const t = HomeTranslations[lang];
    const filteredCategories = categories?.slice(0, 4) || [];

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
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <section className="w-full py-16 px-4 max-w-7xl mx-auto">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
            >
                <div>
                    <h2 className="text-4xl font-extrabold uppercase tracking-wide text-secondary leading-none">
                        {t.browseByCategory}
                    </h2>
                </div>
                <Link
                    href="/categories"
                    className="relative view-all-categories-link group w-fit flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-muted border-b-2 border-border pb-2 transition-colors duration-300 hover:text-foreground"
                >
                    {t.viewAllCategories}
                    <ArrowIcon className={`${arrowHover} transition-transform duration-300`} size={20} />
                </Link>
            </motion.div>

            {/* Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8"
            >
                {filteredCategories?.map((category: Category) => (
                    <motion.div
                        key={category.id}
                        variants={itemVariants}
                        whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <Link
                            href={`/categories/${category.id}`}
                            className="group relative flex flex-col items-center justify-between overflow-hidden p-5 md:p-8 rounded-2xl bg-surface border border-border h-full"
                        >
                            <motion.div
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.3 }}
                                className="mb-5"
                            >
                                <Image src={category.image} alt={category.name} width={120} height={120} className='rounded-full object-cover' />
                            </motion.div>
                            <h3 className="text-xl font-bold uppercase tracking-tighter text-foreground leading-none text-center group-hover:-translate-y-3 transition-all duration-300">{category.name}</h3>
                            <span className="flex items-center justify-center absolute font-bold text-muted left-[-100%] md:left-[-50%] bottom-4 group-hover:left-[50%] group-hover:translate-x-[-50%] transition-all duration-500 text-xs md:text-sm whitespace-nowrap cursor-pointer">
                                {t.viewProducts}
                                <ArrowIcon className={`${arrowHover} transition-transform duration-300`} size={20} />
                            </span>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    )
}