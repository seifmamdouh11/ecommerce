"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Props, Theme } from "../types/types";

const ThemeContext = createContext<Theme | null>(null);

export default function ThemeProvider({ children }: Props) {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [isMounted, setIsMounted] = useState(false);

    const toggleTheme = () => {
        setTheme((prev) => {
            const next = prev === "light" ? "dark" : "light";
            localStorage.setItem("theme", next);
            return next;
        });
    };

    // Read persisted preference on first mount
    useEffect(() => {
        const stored = localStorage.getItem("theme") as "light" | "dark" | null;
        if (stored) {
            Promise.resolve().then(() => setTheme(stored));
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            Promise.resolve().then(() => setTheme("dark"));
        }
        Promise.resolve().then(() => setIsMounted(true));
    }, []);

    // Apply / remove the `dark` class on <html>
    useEffect(() => {
        if (!isMounted) return;
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [theme, isMounted]);

    if (!isMounted) return null;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
