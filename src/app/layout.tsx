import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/common/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}