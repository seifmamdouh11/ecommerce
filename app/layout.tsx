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
  title: {
    default: "POLT-STORE | Premium Fashion & Electronics",
  },
  description: "Discover a curated collection of premium fashion and cutting-edge electronics at POLT-STORE. Experience seamless shopping with bi-lingual support and global shipping.",
  keywords: ["e-commerce", "fashion", "electronics", "premium store", "online shopping", "POLT-STORE"],
  authors: [{ name: "POLT-STORE Team" }],
  creator: "POLT-STORE",
  publisher: "POLT-STORE",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "POLT-STORE | Premium Store",
    description: "Shop the latest trends in fashion and tech with POLT-STORE.",
    url: "https://polt-store.com",
    siteName: "POLT-STORE",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
  twitter: {
    card: "summary_large_image",
    title: "POLT-STORE | Premium Store",
    description: "Shop the latest trends in fashion and tech with POLT-STORE.",
    creator: "@poltstore",
  },
  robots: {
    index: true,
    follow: true,
  },
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
