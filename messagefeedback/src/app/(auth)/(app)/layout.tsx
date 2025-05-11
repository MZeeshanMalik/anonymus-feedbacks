import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ScrollToHashElement from "@/components/ui/scroll-to-hash";

// Use dynamic import for the navbar to prevent SSR issues with authentication
const Navbar = dynamic(() => import("@/components/sections/Navbar"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Mystery Message - Anonymous Feedback Platform",
  description:
    "Receive honest, anonymous feedback to help you grow personally and professionally. Mystery Message provides a secure platform for truthful insights from others.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ScrollToHashElement />
      {children}
    </div>
  );
}
