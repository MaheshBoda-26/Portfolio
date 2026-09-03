import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Libre_Baskerville, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mahesh Boda | Full Stack Developer & AI Engineer",
    template: "%s | Mahesh Boda",
  },
  description: "Full Stack Developer & AI Engineer building intelligent, scalable applications. Specializing in Next.js, Python, AI/ML, and Cloud Architecture.",
  keywords: [
    "Full Stack Developer",
    "AI Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "Machine Learning",
    "RAG",
    "LLM",
    "Cloud Architecture",
  ],
  authors: [{ name: "Mahesh Boda" }],
  creator: "Mahesh Boda",
  publisher: "Mahesh Boda",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://maheshboda.dev",
    title: "Mahesh Boda | Full Stack Developer & AI Engineer",
    description: "Building intelligent, scalable applications with modern tech",
    siteName: "Mahesh Boda Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahesh Boda | Full Stack Developer & AI Engineer",
    description: "Building intelligent, scalable applications with modern tech",
    creator: "@maheshboda",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0a192f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} ${libreBaskerville.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <meta name="color-scheme" content="dark" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}