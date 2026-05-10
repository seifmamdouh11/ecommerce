import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LangProvider from "./hooks/useLang";
import ThemeProvider from "./hooks/useTheme";
import CategoriesProvider from "./context/CategoriesContext/CategoriesContext";
import ProductsProvider from "./context/ProductsContext/ProductsContext";
import { AuthProvider } from "./context/AuthContext";

import { CartProvider } from "./context/CartContext";
import LoadingScreen from "./components/LoadingScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "POLT STORE",
  description: "Premium Fashion & Electronics Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <LoadingScreen />
          <ThemeProvider>
            <LangProvider>
              <CategoriesProvider>
                <ProductsProvider>
                  <CartProvider>
                    {children}
                  </CartProvider>
                </ProductsProvider>
              </CategoriesProvider>
            </LangProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
