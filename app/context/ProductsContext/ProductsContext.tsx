"use client"
import api from "@/app/libs/api";
import { Product, ProductsContextType, Props } from "@/app/types/types";
import React from "react";

const ProductsContext = React.createContext<ProductsContextType>(null as any);

export default function ProductsProvider({ children }: Props) {
    const [products, setProducts] = React.useState<Product[]>([]);

    const [filters, setFilters] = React.useState({
        categoryId: "",
        title: "",
        price_min: 0,
        price_max: 2000
    });

    const getProducts = React.useCallback(async () => {
        try {
            const params = new URLSearchParams();

            if (filters.categoryId) params.append("categoryId", filters.categoryId);
            if (filters.title) params.append("title", filters.title);

            if (filters.price_min > 0 || filters.price_max < 2000) {
                params.append("price_min", filters.price_min.toString());
                params.append("price_max", filters.price_max.toString());
            }

            const res = await api.get(`/products/?${params.toString()}`);
            setProducts(res.data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    }, [filters]);

    React.useEffect(() => {
        getProducts();
    }, [getProducts]);

    return (
        <ProductsContext.Provider value={{ products, setProducts, filters, setFilters }}>
            {children}
        </ProductsContext.Provider>
    )
}

export { ProductsContext };