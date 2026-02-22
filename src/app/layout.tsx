// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Twitter, Github, Linkedin, Rss } from "lucide-react";

// Initialize the Inter font. We recommend using variable fonts for the best performance and flexibility.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Blog. | Minimal Theme",
  description: "Thoughts, stories and ideas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-[#fafafa] text-gray-800 font-sans antialiased min-h-screen flex flex-col selection:bg-gray-200 selection:text-brand">
        {/* Navigation */}
        <nav className="max-w-3xl w-full mx-auto px-6 py-10 flex justify-between items-center">
          <Link
            href="/"
            className="font-bold text-2xl tracking-tighter text-brand hover:opacity-80 transition-opacity"
          >
            GBlog.
          </Link>
          <div className="flex items-center space-x-4 sm:space-x-6 text-sm font-medium text-gray-500">
            <Link
              href="/"
              className="hidden sm:inline-block hover:text-brand transition-colors"
            >
              Writings
            </Link>
            <Link
              href="/projects"
              className="hidden sm:inline-block hover:text-brand transition-colors"
            >
              Projects
            </Link>
            <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
            <Link href="/login" className="hover:text-brand transition-colors">
              Log in
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-full text-xs font-semibold bg-gray-800 text-white transition-colors shadow-sm"
            >
              Sign up
            </Link>
          </div>
        </nav>

        {/* Main Content Wrapper */}
        <main className="w-full flex-grow flex flex-col">{children}</main>

        {/* Footer */}
        <footer className="max-w-3xl w-full mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between items-center gap-6 pb-12 mt-auto">
          <p className="text-sm text-gray-400 font-medium">
            &copy; 2026 Blog. All rights reserved.
          </p>
          <div className="flex gap-5 text-gray-400">
            <a
              href="#"
              className="hover:text-brand transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="hover:text-brand transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="hover:text-brand transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="hover:text-brand transition-colors"
              aria-label="RSS Feed"
            >
              <Rss className="w-5 h-5" />
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
