"use client"
import React from 'react';
import { useCart } from '@/app/context/CartContext';
import { motion } from 'framer-motion';
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
import Link from 'next/link';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="h-24 w-24 rounded-full bg-surface flex items-center justify-center text-muted mb-6 shadow-sm">
                    <FiShoppingBag size={48} />
                </div>
                <h2 className="text-2xl font-black mb-2 text-foreground tracking-tight">Your cart is empty</h2>
                <p className="text-muted mb-8 max-w-md">Looks like you haven't added any items to your cart yet.</p>
                <Link href="/">
                    <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-primary/30 transition-all">
                        <FiArrowLeft /> Continue Shopping
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-black text-foreground tracking-tighter uppercase">Your Cart</h1>
                <button 
                    onClick={clearCart}
                    className="text-sm font-bold text-red-500 hover:text-red-600 hover:underline"
                >
                    Clear All
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.map((item, index) => (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            key={item.id} 
                            className="flex flex-col sm:flex-row gap-4 bg-surface p-4 rounded-2xl border border-border shadow-sm"
                        >
                            {/* Product Image */}
                            <div className="h-24 w-24 rounded-xl bg-surface-alt flex-shrink-0 overflow-hidden relative border border-border">
                                {item.images && item.images[0] ? (
                                    <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted text-xs">No img</div>
                                )}
                            </div>

                            {/* Product Details */}
                            <div className="flex flex-1 flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-foreground line-clamp-1">{item.title}</h3>
                                        <p className="text-sm text-primary font-black mt-1">${item.price}</p>
                                    </div>
                                    <button 
                                        onClick={() => removeFromCart(item.id)}
                                        className="h-8 w-8 rounded-lg flex items-center justify-center text-muted hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center gap-3 mt-4 sm:mt-0">
                                    <div className="flex items-center border border-border rounded-lg bg-surface-alt">
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            className="h-8 w-8 flex items-center justify-center text-foreground disabled:text-muted disabled:opacity-50 hover:bg-border/50 rounded-l-lg transition-colors"
                                        >
                                            <FiMinus size={14} />
                                        </button>
                                        <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="h-8 w-8 flex items-center justify-center text-foreground hover:bg-border/50 rounded-r-lg transition-colors"
                                        >
                                            <FiPlus size={14} />
                                        </button>
                                    </div>
                                    <div className="ml-auto font-black text-foreground">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-surface border border-border rounded-[2rem] p-6 shadow-xl sticky top-24">
                        <h2 className="text-xl font-black mb-6 tracking-tight uppercase">Order Summary</h2>
                        
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-muted">
                                <span>Subtotal</span>
                                <span className="text-foreground font-bold">${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-muted">
                                <span>Shipping</span>
                                <span className="text-foreground font-bold">Free</span>
                            </div>
                            <div className="flex justify-between text-muted">
                                <span>Tax</span>
                                <span className="text-foreground font-bold">$0.00</span>
                            </div>
                        </div>
                        
                        <div className="border-t border-border pt-4 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-foreground">Total</span>
                                <span className="text-2xl font-black text-primary">${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        <Link href="/checkout">
                            <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-[#ff8a6a] text-white font-black uppercase tracking-widest shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all transform hover:-translate-y-1">
                                Checkout Now
                            </button>
                        </Link>
                        
                        <div className="mt-4 text-center">
                            <Link href="/">
                                <span className="text-xs font-bold text-muted hover:text-foreground transition-colors cursor-pointer uppercase tracking-widest">
                                    Continue Shopping
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
