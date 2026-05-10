"use client"
import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiEdit3, FiSave, FiMapPin, FiPhone, FiPackage, FiHeart } from 'react-icons/fi';
import Image from 'next/image';

export default function ProfilePage() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    
    // Fallback/mock states for the form if user doesn't have these fields
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '+1 (555) 123-4567',
        address: '123 Fashion Street, NY 10001'
    });

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsEditing(false);
        // In a real app, you would make an API call here to update the profile
        const Swal = require('sweetalert2').default;
        Swal.fire({
            icon: 'success',
            title: 'Profile Updated',
            text: 'Your changes have been saved successfully.',
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            background: 'var(--surface)',
            color: 'var(--foreground)'
        });
    };

    if (!user) return null;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
            <h1 className="text-3xl font-black text-foreground tracking-tighter uppercase mb-8">My Profile</h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Avatar & Quick Links */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-surface p-8 rounded-3xl border border-border shadow-sm flex flex-col items-center text-center">
                        <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-surface-alt mb-4 shadow-xl">
                            {user.avatar ? (
                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-primary/10 text-primary flex items-center justify-center">
                                    <FiUser size={48} />
                                </div>
                            )}
                            {isEditing && (
                                <button className="absolute inset-0 bg-black/40 flex items-center justify-center text-white backdrop-blur-sm transition-all hover:bg-black/50">
                                    <FiEdit3 size={24} />
                                </button>
                            )}
                        </div>
                        <h2 className="text-xl font-black text-foreground">{user.name}</h2>
                        <p className="text-sm text-muted">{user.email}</p>
                        
                        <div className="w-full mt-8 flex flex-col gap-3">
                            <button className="flex items-center gap-3 w-full p-4 rounded-xl bg-primary text-white font-bold tracking-widest shadow-lg shadow-primary/30 transition-all hover:-translate-y-1">
                                <FiUser /> Personal Info
                            </button>
                            <button className="flex items-center gap-3 w-full p-4 rounded-xl bg-surface-alt text-muted hover:text-foreground font-bold tracking-widest border border-border transition-all hover:border-primary/50">
                                <FiPackage /> My Orders
                            </button>
                            <button className="flex items-center gap-3 w-full p-4 rounded-xl bg-surface-alt text-muted hover:text-foreground font-bold tracking-widest border border-border transition-all hover:border-primary/50">
                                <FiHeart /> Wishlist
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side: Profile Details Form */}
                <div className="lg:col-span-8">
                    <div className="bg-surface p-8 rounded-3xl border border-border shadow-sm">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
                            <h2 className="text-xl font-black tracking-tight uppercase">Personal Information</h2>
                            {!isEditing ? (
                                <button 
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                                >
                                    <FiEdit3 /> Edit Profile
                                </button>
                            ) : (
                                <button 
                                    onClick={() => setIsEditing(false)}
                                    className="text-sm font-bold text-muted hover:text-foreground transition-colors"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-muted mb-2 uppercase flex items-center gap-2">
                                        <FiUser className="text-primary" /> Full Name
                                    </label>
                                    <input 
                                        type="text" 
                                        disabled={!isEditing}
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                        className="w-full bg-surface-alt border border-border rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-colors disabled:opacity-70 disabled:bg-surface-alt/50" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-muted mb-2 uppercase flex items-center gap-2">
                                        <FiMail className="text-primary" /> Email Address
                                    </label>
                                    <input 
                                        type="email" 
                                        disabled={!isEditing}
                                        value={formData.email}
                                        onChange={e => setFormData({...formData, email: e.target.value})}
                                        className="w-full bg-surface-alt border border-border rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-colors disabled:opacity-70 disabled:bg-surface-alt/50" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-muted mb-2 uppercase flex items-center gap-2">
                                        <FiPhone className="text-primary" /> Phone Number
                                    </label>
                                    <input 
                                        type="tel" 
                                        disabled={!isEditing}
                                        value={formData.phone}
                                        onChange={e => setFormData({...formData, phone: e.target.value})}
                                        className="w-full bg-surface-alt border border-border rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-colors disabled:opacity-70 disabled:bg-surface-alt/50" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-muted mb-2 uppercase flex items-center gap-2">
                                        <FiMapPin className="text-primary" /> Address
                                    </label>
                                    <input 
                                        type="text" 
                                        disabled={!isEditing}
                                        value={formData.address}
                                        onChange={e => setFormData({...formData, address: e.target.value})}
                                        className="w-full bg-surface-alt border border-border rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-colors disabled:opacity-70 disabled:bg-surface-alt/50" 
                                    />
                                </div>
                            </div>

                            {isEditing && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="pt-4 border-t border-border flex justify-end"
                                >
                                    <button 
                                        type="submit"
                                        className="flex items-center gap-2 bg-foreground text-background font-black px-8 py-4 rounded-xl shadow-lg hover:bg-foreground/90 transition-all uppercase tracking-widest"
                                    >
                                        <FiSave /> Save Changes
                                    </button>
                                </motion.div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
