import type { Metadata } from "next";
import ScrollToHashElement from "@/components/ui/scroll-to-hash";

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
      <ScrollToHashElement />
      {children}
    </div>
  );
}
