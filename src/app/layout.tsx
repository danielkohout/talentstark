import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/lib/auth/AuthProvider";
import Providers from "@/lib/Providers";
import "react-loading-skeleton/dist/skeleton.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/lib/theme-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
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
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
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
export const dynamic = "force-dynamic";
export const revalidate = 0;
