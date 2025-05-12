import Footer from "@/components/sections/Footer";
import Navbar from "@/components/sections/Navbar";

export const metadata = {
  title: "Anonymously Feedback",
  description: "Provide feedback anonymously",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
