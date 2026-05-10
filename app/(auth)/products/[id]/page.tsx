"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import api from '@/app/libs/api'
import { Product } from '@/app/types/types'
import { useLang } from '@/app/hooks/useLang'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FiShoppingCart, FiHeart, FiShare2, FiArrowLeft, FiArrowRight, FiShield, FiTruck, FiRefreshCw } from 'react-icons/fi'
import { useAuth } from '@/app/context/AuthContext'
import { useRouter } from 'next/navigation'
import { showAuthAlert } from '@/app/libs/alerts'
import { useCart } from '@/app/context/CartContext'
import Swal from 'sweetalert2'
export default function ProductDetailPage() {
    const { id } = useParams();
    const { lang } = useLang();
    const isRtl = lang === "ar";
    const { isLoggedIn } = useAuth();
    const router = useRouter();
    const [product, setProduct] = React.useState<Product | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [quantity, setQuantity] = React.useState(1);
    const [activeImage, setActiveImage] = React.useState(0);
    const { addToCart } = useCart();

    const handleAction = (actionName: string) => {
        if (!isLoggedIn) {
            showAuthAlert(lang, () => router.push('/login'));
            return;
        }
        
        if (actionName === 'Add to Cart' || actionName === 'Buy Now') {
            if (product) {
                addToCart(product, quantity);
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
                
                if (actionName === 'Buy Now') {
                    router.push('/cart');
                }
            }
        }
    };

    React.useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${id}`);
                setProduct(res.data);
                // Update dynamic tab name
                if (res.data?.title) {
                    document.title = `${res.data.title} | POLT-STORE`;
                }
            } catch (err) {
                console.error("Failed to fetch product", err);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchProduct();

        // Cleanup: Reset title if needed, or leave it for next page
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">
                <h1 className="text-4xl font-black mb-4">{isRtl ? 'المنتج غير موجود' : 'Product Not Found'}</h1>
                <Link href="/" className="text-primary font-bold hover:underline">
                    {isRtl ? 'العودة للرئيسية' : 'Back to Home'}
                </Link>
            </div>
        );
    }

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
        }
    };

    return (
        <div className="min-h-screen bg-background py-12 lg:py-20 px-6">
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-7xl mx-auto"
            >
                {/* Back Button */}
                <motion.div variants={itemVariants} className="mb-12">
                    <button 
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors group"
                    >
                        {isRtl ? <FiArrowRight className="group-hover:translate-x-1 transition-transform" /> : <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />}
                        {isRtl ? 'العودة' : 'Go Back'}
                    </button>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left: Image Gallery */}
                    <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
                        <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-surface-alt border border-border">
                            <Image 
                                src={product.images[activeImage]} 
                                alt={product.title} 
                                fill 
                                className="object-cover"
                                priority
                            />
                        </div>
                        {product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((img, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-primary' : 'border-border opacity-60 hover:opacity-100'}`}
                                    >
                                        <Image src={img} alt={`${product.title} ${idx}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Right: Product Info */}
                    <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col">
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-6">
                                <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest">
                                    {product.category?.name || (isRtl ? 'فئة مميزة' : 'Premium Selection')}
                                </span>
                                <div className="flex gap-4">
                                    <button className="h-10 w-10 flex items-center justify-center rounded-full bg-surface border border-border text-muted hover:text-primary hover:border-primary transition-all">
                                        <FiHeart />
                                    </button>
                                    <button className="h-10 w-10 flex items-center justify-center rounded-full bg-surface border border-border text-muted hover:text-primary hover:border-primary transition-all">
                                        <FiShare2 />
                                    </button>
                                </div>
                            </div>

                            <h1 className="text-4xl lg:text-5xl font-black text-foreground mb-4 tracking-tighter leading-none uppercase">
                                {product.title}
                            </h1>

                            <div className="flex items-baseline gap-4 mb-8">
                                <span className="text-4xl font-black text-primary">${product.price}</span>
                                {product.price > 100 && (
                                    <span className="text-xl text-muted line-through">${(product.price * 1.2).toFixed(0)}</span>
                                )}
                            </div>

                            <p className="text-lg text-muted leading-relaxed mb-10">
                                {product.description}
                            </p>

                            {/* Features */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 py-8 border-y border-border/50">
                                <div className="flex items-center gap-3">
                                    <FiTruck className="text-primary text-xl" />
                                    <span className="text-xs font-bold uppercase tracking-wider">{isRtl ? 'شحن سريع' : 'Fast Shipping'}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FiShield className="text-primary text-xl" />
                                    <span className="text-xs font-bold uppercase tracking-wider">{isRtl ? 'ضمان أصلي' : 'Authentic'}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FiRefreshCw className="text-primary text-xl" />
                                    <span className="text-xs font-bold uppercase tracking-wider">{isRtl ? 'إرجاع سهل' : 'Easy Return'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="flex items-center border border-border rounded-2xl bg-surface-alt px-4">
                                    <button 
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="h-12 w-8 text-xl font-bold"
                                    >-</button>
                                    <span className="w-12 text-center font-bold">{quantity}</span>
                                    <button 
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="h-12 w-8 text-xl font-bold"
                                    >+</button>
                                </div>
                                <button 
                                    onClick={() => handleAction('Add to Cart')}
                                    className="flex-1 bg-foreground text-background font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-foreground/90 transition-all"
                                >
                                    <FiShoppingCart />
                                    {isRtl ? 'إضافة للسلة' : 'ADD TO CART'}
                                </button>
                            </div>
                            <button 
                                onClick={() => handleAction('Buy Now')}
                                className="w-full bg-primary text-white font-black py-5 rounded-2xl shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all text-lg tracking-widest"
                            >
                                {isRtl ? 'اشتري الآن' : 'BUY IT NOW'}
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Related Products Placeholder */}
                <motion.div variants={itemVariants} className="mt-32">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-[3/4] bg-surface-alt rounded-[2rem] border border-border animate-pulse" />
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
