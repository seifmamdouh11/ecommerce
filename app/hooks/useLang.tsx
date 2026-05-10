"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Lang, Props } from "../types/types";
const LangContext = createContext<Lang | null>(null);

export default function LangProvider({ children }: Props) {
    const [lang, setLang] = useState("en");
    const [isMounted, setIsMounted] = useState(false);

    const toggleLanguage = () => {
        setLang((prev) => {
            const nextLang = prev === "en" ? "ar" : "en";
            localStorage.setItem("lang", nextLang);
            return nextLang;
        });
    };
    useEffect(() => {
        const storedLang = localStorage.getItem("lang");
        if (storedLang) {
            Promise.resolve().then(() => setLang(storedLang));
        }
        Promise.resolve().then(() => setIsMounted(true));
    }, []);
    useEffect(() => {
        if (!isMounted) return;
        const dir = lang === "ar" ? "rtl" : "ltr";
        document.documentElement.dir = dir;
        document.documentElement.lang = lang;
    }, [lang, isMounted]);
if (!isMounted) {
        return null; 
    }


    return <LangContext.Provider value={{ lang, setLang, toggleLanguage }}>{children}</LangContext.Provider>;
}

export function useLang() {
    const context = useContext(LangContext);
    if (!context) {
        throw new Error("useLang must be used within a LangProvider");
    }
    return context;
}