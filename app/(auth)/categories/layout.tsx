import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories | POLT-STORE",
  description: "Explore our wide range of product categories, from fashion to technology.",
};

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
