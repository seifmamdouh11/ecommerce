"use client"
import React, { useState, useEffect } from 'react';
import { useCart } from '@/app/context/CartContext';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiCreditCard, FiMapPin, FiTruck } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Link from 'next/link';

export default function CheckoutPage() {
    const { cart, totalPrice, clearCart } = useCart();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        document.title = "Checkout | POLT-STORE";
    }, []);

    // If cart is empty, redirect back to cart
    useEffect(() => {
        if (cart.length === 0 && !isProcessing) {
            router.push('/cart');
        }
    }, [cart, isProcessing, router]);

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API call
        setTimeout(() => {
            clearCart();
            Swal.fire({
                icon: 'success',
                title: 'Order Placed Successfully!',
                text: 'Thank you for your purchase. Your order is being processed.',
                confirmButtonColor: '#000',
                background: 'var(--surface)',
                color: 'var(--foreground)'
            }).then(() => {
                router.push('/');
            });
        }, 1500);
    };

    if (cart.length === 0 && !isProcessing) return null;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
            <h1 className="text-3xl font-black text-foreground tracking-tighter uppercase mb-8">Checkout</h1>

            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Details Form */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Shipping Address */}
                    <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm">
                        <div className="flex items-center gap-2 mb-4 text-lg font-bold text-foreground">
                            <FiMapPin className="text-primary" /> Shipping Address
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 sm:col-span-1">
                                <label className="block text-xs font-bold text-muted mb-2 uppercase">First Name</label>
                                <input required type="text" className="w-full bg-surface-alt border border-border rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-colors" placeholder="John" />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label className="block text-xs font-bold text-muted mb-2 uppercase">Last Name</label>
                                <input required type="text" className="w-full bg-surface-alt border border-border rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-colors" placeholder="Doe" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-muted mb-2 uppercase">Street Address</label>
                                <input required type="text" className="w-full bg-surface-alt border border-border rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-colors" placeholder="123 Main St" />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label className="block text-xs font-bold text-muted mb-2 uppercase">City</label>
                                <input required type="text" className="w-full bg-surface-alt border border-border rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-colors" placeholder="New York" />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label className="block text-xs font-bold text-muted mb-2 uppercase">ZIP Code</label>
                                <input required type="text" className="w-full bg-surface-alt border border-border rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-colors" placeholder="10001" />
                            </div>
                        </div>
                    </div>

                    {/* Payment Information */}
                    <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm">
                        <div className="flex items-center gap-2 mb-4 text-lg font-bold text-foreground">
                            <FiCreditCard className="text-primary" /> Payment Method
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-muted mb-2 uppercase">Card Number</label>
                                <input required type="text" className="w-full bg-surface-alt border border-border rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-colors" placeholder="0000 0000 0000 0000" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-muted mb-2 uppercase">Expiry Date</label>
                                    <input required type="text" className="w-full bg-surface-alt border border-border rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-colors" placeholder="MM/YY" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-muted mb-2 uppercase">CVC</label>
                                    <input required type="text" className="w-full bg-surface-alt border border-border rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-colors" placeholder="123" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Order Summary */}
                <div className="lg:col-span-5">
                    <div className="bg-surface border border-border rounded-2xl p-6 shadow-xl sticky top-24">
                        <h2 className="text-lg font-black mb-6 tracking-tight uppercase">Order Summary</h2>
                        
                        <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                            {cart.map(item => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="h-16 w-16 bg-surface-alt rounded-lg overflow-hidden border border-border shrink-0">
                                        <img src={item.images?.[0]} alt={item.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-sm text-foreground line-clamp-1">{item.title}</h3>
                                        <p className="text-xs text-muted">Qty: {item.quantity}</p>
                                        <p className="text-sm font-bold text-primary mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-border pt-4 mb-6 space-y-3">
                            <div className="flex justify-between text-sm text-muted">
                                <span>Subtotal</span>
                                <span className="text-foreground font-bold">${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-muted">
                                <span>Shipping</span>
                                <span className="text-foreground font-bold">Free</span>
                            </div>
                            <div className="flex justify-between items-center mt-2 pt-2 border-t border-border">
                                <span className="font-bold text-foreground">Total</span>
                                <span className="text-2xl font-black text-primary">${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isProcessing}
                            className="w-full py-4 rounded-xl bg-foreground text-background font-black uppercase tracking-widest hover:bg-foreground/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                        >
                            {isProcessing ? (
                                <div className="h-5 w-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>Place Order <FiCheckCircle /></>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
