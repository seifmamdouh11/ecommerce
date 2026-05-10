"use client"
import React from 'react'
import { Props } from '../types/types'
import Navbar from './components/Navbar/Navbar'
import ProtectedNavbar from '@/app/(protected)/components/ProtectedNavbar'
import Footer from './components/Footer/Footer'
import { motion } from 'framer-motion'
import { useAuth } from '@/app/context/AuthContext'

export default function Authlayout({ children }: Props) {
    const { isLoggedIn } = useAuth();
    
    return (
        <div className="min-h-screen flex flex-col">
            {isLoggedIn ? <ProtectedNavbar /> : <Navbar />}
            <motion.main 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
                {children}
            </motion.main>
            <Footer />
        </div>
    )
}
