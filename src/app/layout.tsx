import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/lib/Providers";
import AuthProvider from "@/lib/auth/AuthProvider";
import { ThemeProvider } from "@/lib/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "react-loading-skeleton/dist/skeleton.css";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "talentstark",
  description: "Moderne HR & Recruiting Lösungen",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="de" suppressHydrationWarning>
        <Providers>
          <body
            className={cn(
              "min-h-screen font-sans antialiased",
              inter.className
            )}
          >
            <ThemeProvider attribute="class" defaultTheme="system">
              <Navbar />
              {children}
              <Toaster />
            </ThemeProvider>
          </body>
        </Providers>
      </html>
    </AuthProvider>
  );
}
