import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/app/_trpc/Provider";
import AuthProvider from "@/lib/auth/AuthProvider";
import { ThemeProvider } from "@/lib/theme-provider";
import { cn, constructMetaData } from "@/lib/utils";
import { Inter } from "next/font/google";
import "react-loading-skeleton/dist/skeleton.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import Head from "next/head";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
