"use client"
import { ProductsContext } from '@/app/context/ProductsContext/ProductsContext';
import { useLang } from '@/app/hooks/useLang';
import { HomeTranslations } from '@/app/translations/home-translations';
import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import Swal from 'sweetalert2';

export default function ProductFilters() {
    const { filters, setFilters, products } = useContext(ProductsContext);
    const { addToCart } = useCart();
    const { lang } = useLang();
    const t = HomeTranslations[lang];
    const isRtl = lang === "ar";
    const productsDisplay = products.slice(0, 6);

    const CATEGORIES = [
        { value: "", label: t.catAll },
        { value: "1", label: t.catClothes },
        { value: "2", label: t.catElectronics },
        { value: "3", label: t.catFurniture },
        { value: "4", label: t.catShoes },
        { value: "5", label: t.catOthers },
    ];

    return (
        <div className="flex flex-col gap-6">

            {/* ── Filter Bar ── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-wrap items-end gap-5 rounded-2xl bg-surface p-5 shadow-[0_4px_24px_rgba(0,0,0,0.07)]"
            >
                {/* Search */}
                <div className="min-w-[220px] flex-1">
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-subtle">{t.search}</p>
                    <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base">🔍</span>
                        <input
                            type="text"
                            placeholder={t.searchPlaceholder}
                            value={filters.title}
                            onChange={(e) => setFilters({ ...filters, title: e.target.value })}
                            className="w-full rounded-xl border border-border bg-surface-alt py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-subtle outline-none transition-colors focus:border-primary"
                        />
                    </div>
                </div>

                {/* Price Range */}
                <div className="w-[260px] shrink-0">
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-subtle">
                        {t.priceRange}{" "}
                        <span className="text-xs font-semibold text-primary">
                            ${filters.price_min} – ${filters.price_max}
                        </span>
                    </p>
                    <div className="flex gap-2">
                        {([
                            { key: "price_min" as const, placeholder: t.minPrice },
                            { key: "price_max" as const, placeholder: t.maxPrice },
                        ]).map(({ key, placeholder }) => (
                            <input
                                key={key}
                                type="number"
                                placeholder={placeholder}
                                value={filters[key]}
                                onChange={(e) => setFilters({ ...filters, [key]: Number(e.target.value) })}
                                className="w-1/2 rounded-xl border border-border bg-surface-alt px-3 py-2.5 text-sm text-foreground placeholder:text-muted-subtle outline-none transition-colors focus:border-secondary"
                            />
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* ── Category Chips ── */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex flex-wrap gap-2.5"
            >
                {CATEGORIES.map((cat, idx) => {
                    const active = filters.categoryId === cat.value;
                    return (
                        <motion.button
                            key={cat.value}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setFilters({ ...filters, categoryId: cat.value })}
                            className={[
                                "cursor-pointer rounded-full border-none px-[18px] py-2 text-[13px] font-semibold transition-all duration-200",
                                active
                                    ? "scale-105 bg-gradient-to-br from-primary to-[#ff8a6a] text-white shadow-[0_4px_14px_rgba(255,86,86,0.35)]"
                                    : "bg-surface text-muted shadow-[0_2px_8px_rgba(0,0,0,0.07)] hover:text-foreground",
                            ].join(" ")}
                        >
                            {cat.label}
                        </motion.button>
                    );
                })}
            </motion.div>

            {/* ── Product Grid ── */}
            <motion.div
                layout
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-h-[400px]"
            >
                <AnimatePresence mode="popLayout">
                    {productsDisplay.length === 0 && (
                        <motion.p
                            key="no-results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="col-span-full py-20 text-center text-sm text-muted"
                        >
                            {t.noProductsFound}
                        </motion.p>
                    )}
                    {productsDisplay.map((product) => (
                        <Link key={product.id} href={`/products/${product.id}`}>
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="group cursor-pointer overflow-hidden rounded-2xl bg-surface border border-transparent hover:border-border h-full"
                            >
                                {/* Product Image */}
                                <div className="relative h-44 overflow-hidden bg-surface-alt">
                                    <motion.img
                                        src={product?.images?.[0]}
                                        alt={product.title}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.4 }}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                {/* Info */}
                                <div className="p-3.5">
                                    <h3 className="mb-1 truncate text-[13px] font-bold text-foreground">
                                        {product.title}
                                    </h3>
                                    <p className="mb-2 truncate text-xs text-muted">
                                        {product.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="inline-block rounded-full bg-gradient-to-r from-primary to-[#ff8a6a] px-2.5 py-1 text-xs font-bold text-white">
                                            ${product.price}
                                        </span>
                                        <button 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                addToCart(product);
                                                Swal.fire({
                                                    icon: 'success',
                                                    title: isRtl ? 'تمت الإضافة' : 'Added to Cart',
                                                    text: isRtl ? 'تمت إضافة المنتج إلى السلة بنجاح' : `${product.title} added to your cart.`,
                                                    toast: true,
                                                    position: 'bottom-end',
                                                    showConfirmButton: false,
                                                    timer: 3000,
                                                    timerProgressBar: true,
                                                    background: 'var(--surface)',
                                                    color: 'var(--foreground)'
                                                });
                                            }}
                                            className="h-8 w-8 bg-surface-alt rounded-lg flex items-center justify-center text-muted hover:text-primary hover:bg-primary/10 transition-colors shadow-sm"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}

                    <motion.div
                        layout
                        key="view-all"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="col-span-1 flex items-center justify-center rounded-2xl border-2 border-dashed border-primary/30 bg-surface"
                    >
                        <button className="flex flex-col items-center gap-2 p-8 text-center">
                            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#ff8a6a] text-xl text-white shadow-[0_4px_14px_rgba(255,86,86,0.35)]">{isRtl ? "←" : "→"}</span>
                            <span className="text-sm font-bold text-primary">{t.viewAllProducts}</span>
                            <span className="text-xs text-muted">{t.browseFullCatalog}</span>
                        </button>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
