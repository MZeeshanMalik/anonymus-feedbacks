import type { Metadata } from "next";

import AuthProvider from "@/context/authProvider";
import { Toaster } from "@/components/ui/toaster";
// import Navbar from "@/components/Navbar";
import "./globals.css";
import dynamic from "next/dynamic";

// Dynamically import with SSR disabled
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });

export const metadata: Metadata = {
  title: "Annonymus Feedback",
  description: "Annonymus app for feedback",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`antialiased`}>
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
