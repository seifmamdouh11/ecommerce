"use client";
import api from "@/app/libs/api";
import { CategoriesContextType, Props, Category } from "@/app/types/types";
import React from "react";
const CategoriesContext = React.createContext<CategoriesContextType>(null as unknown as CategoriesContextType);

export default function CategoriesProvider({ children }: Props) {
    const [categories, setCategories] = React.useState<Category[]>([]);

    const getCategories = React.useCallback(async() => {
        try {
            const resp = await api.get("/categories");
            setCategories(resp.data);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    }, []);

    React.useEffect(() => {
        getCategories();
    }, [getCategories]);
    return (
        <CategoriesContext.Provider value={{ categories, setCategories }}>
            {children}
        </CategoriesContext.Provider>
    );
}

export { CategoriesContext };