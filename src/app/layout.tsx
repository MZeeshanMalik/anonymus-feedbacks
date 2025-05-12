import type { Metadata } from "next";

import AuthProvider from "@/context/authProvider";
import { Toaster } from "@/components/ui/toaster";
// import Navbar from "@/components/Navbar";
import "./globals.css";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
// import Navbar from "@/components/sections/Navbar";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// Dynamically import with SSR disabled
const Navbar = dynamic(() => import("@/components/sections/Navbar"), {
  ssr: false,
});
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
          {/* <Navbar /> */}
          <Navbar />

          {children}
          <Toaster />
          {/* <Footer /> */}
        </body>
      </AuthProvider>
      <Footer />
    </html>
  );
}
