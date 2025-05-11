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
      <body>{children}</body>
    </html>
  );
}
