"use client"
import api from '@/app/libs/api'
import { count } from 'console'
import React from 'react'
import Hero from './components/Hero'
import Categories from './components/categories'
import Products from './components/Products'

export default function page() {
  return (
    <div>
      <Hero />
      <Categories />
      <Products />
    </div>
  )
}
