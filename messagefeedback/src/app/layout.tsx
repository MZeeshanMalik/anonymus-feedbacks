import type { Metadata } from "next";

import AuthProvider from "@/context/authProvider";
import { Toaster } from "@/components/ui/toaster";
// import Navbar from "@/components/Navbar";
import "./globals.css";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// Dynamically import with SSR disabled

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
          {children}
          <Toaster />
          {/* <Footer /> */}
        </body>
      </AuthProvider>
    </html>
  );
}
