import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/content/site";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Catalyst Influence | Predictable Customer Acquisition",
    template: "%s | Catalyst Influence",
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Catalyst Influence | Predictable Customer Acquisition",
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.defaultOgImage,
        width: 1200,
        height: 630,
        alt: "Catalyst Influence customer acquisition architecture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Catalyst Influence | Predictable Customer Acquisition",
    description: siteConfig.description,
    images: [siteConfig.defaultOgImage],
  },
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
        <Footer />
      </body>
    </html>
  );
}
