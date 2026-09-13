import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Catalyst Influence | Architecting Growth",
  description: "Boutique digital agency specializing in neuro-marketing, behavioral funnels, and ethical influence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative overflow-x-hidden antialiased selection:bg-brand-accent selection:text-white">
        {children}
      </body>
    </html>
  );
}
