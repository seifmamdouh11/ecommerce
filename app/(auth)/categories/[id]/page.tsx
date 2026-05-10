"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { ProductsContext } from '@/app/context/ProductsContext/ProductsContext'
import { CategoriesContext } from '@/app/context/CategoriesContext/CategoriesContext'
import { ProductsContextType, CategoriesContextType, Product, Category } from '@/app/types/types'
import { useLang } from '@/app/hooks/useLang'
import { HomeTranslations } from '@/app/translations/home-translations'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function CategoryDetailPage() {
    const { id } = useParams();
    const { products, setFilters, filters } = React.useContext<ProductsContextType>(ProductsContext);
    const { categories } = React.useContext<CategoriesContextType>(CategoriesContext);
    const { lang } = useLang();
    const t = HomeTranslations[lang];
    const isRtl = lang === "ar";

    const currentCategory = categories?.find((c: Category) => c.id.toString() === id);

    React.useEffect(() => {
        if (id) {
            setFilters(prev => ({ ...prev, categoryId: id as string }));
        }
        return () => {
            setFilters(prev => ({ ...prev, categoryId: "" }));
        }
    }, [id, setFilters]);

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
                className="max-w-7xl mx-auto"
            >
                {/* Breadcrumbs */}
                <motion.nav variants={itemVariants} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted mb-12">
                    <Link href="/" className="hover:text-primary transition-colors">
                        {lang === 'ar' ? 'الرئيسية' : 'Home'}
                    </Link>
                    <span className="text-border">/</span>
                    <Link href="/categories" className="hover:text-primary transition-colors">
                        {lang === 'ar' ? 'الفئات' : 'Categories'}
                    </Link>
                    <span className="text-border">/</span>
                    <span className="text-foreground">{currentCategory?.name}</span>
                </motion.nav>

                {/* Category Header */}
                <motion.div variants={itemVariants} className="text-center mb-16">
                    {currentCategory && (
                        <div className="relative h-24 w-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-surface shadow-lg">
                            <Image 
                                src={currentCategory.image} 
                                alt={currentCategory.name} 
                                fill 
                                className="object-cover"
                            />
                        </div>
                    )}
                    <h1 className="text-4xl lg:text-6xl font-black text-foreground tracking-tighter mb-4">
                        {currentCategory?.name}
                    </h1>
                    <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-12" />
                </motion.div>

                {/* ── Filters Bar ── */}
                <motion.div 
                    variants={itemVariants}
                    className="flex flex-col lg:flex-row gap-6 mb-16 items-end justify-between bg-surface p-8 rounded-[2.5rem] border border-border shadow-sm"
                >
                    {/* Search */}
                    <div className="w-full lg:flex-1">
                        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-muted-subtle">{t.search}</p>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔍</span>
                            <input
                                type="text"
                                placeholder={t.searchPlaceholder}
                                value={filters.title}
                                onChange={(e) => setFilters({ ...filters, title: e.target.value })}
                                className="w-full rounded-2xl border border-border bg-surface-alt py-3.5 pl-12 pr-4 text-sm focus:border-primary outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="w-full lg:w-72">
                        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-muted-subtle">
                            {t.priceRange} <span className="text-primary font-bold ml-2">${filters.price_min} - ${filters.price_max}</span>
                        </p>
                        <div className="flex gap-3">
                            <input
                                type="number"
                                placeholder={t.minPrice}
                                value={filters.price_min || ''}
                                onChange={(e) => setFilters({ ...filters, price_min: Number(e.target.value) })}
                                className="w-1/2 rounded-2xl border border-border bg-surface-alt py-3.5 px-4 text-sm focus:border-primary outline-none transition-all"
                            />
                            <input
                                type="number"
                                placeholder={t.maxPrice}
                                value={filters.price_max || ''}
                                onChange={(e) => setFilters({ ...filters, price_max: Number(e.target.value) })}
                                className="w-1/2 rounded-2xl border border-border bg-surface-alt py-3.5 px-4 text-sm focus:border-primary outline-none transition-all"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Products Grid */}
                <motion.div 
                    variants={containerVariants}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {products?.map((product: Product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="group bg-surface border border-border rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                <div className="relative aspect-square overflow-hidden bg-surface-alt">
                                    <Image 
                                        src={product.images[0]} 
                                        alt={product.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-black text-sm font-bold shadow-sm">
                                        ${product.price}
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                                        {product.title}
                                    </h3>
                                    <p className="text-sm text-muted line-clamp-2 mb-6 h-10">
                                        {product.description}
                                    </p>
                                    <Link href={`/products/${product.id}`}>
                                        <button className="w-full py-4 rounded-2xl bg-surface-alt border border-border text-foreground font-bold hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                                            {isRtl ? 'عرض التفاصيل' : 'View Details'}
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {(!products || products.length === 0) && (
                    <div className="text-center py-32">
                        <p className="text-xl text-muted">{t.noProductsFound}</p>
                    </div>
                )}
            </motion.div>
        </div>
    )
}
