import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | POLT-STORE",
  description: "Browse the latest fashion and electronics at POLT-STORE.",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
