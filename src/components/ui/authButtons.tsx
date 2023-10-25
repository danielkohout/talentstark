"use client";
import { ArrowRight, LogOut } from "lucide-react";
import { Button } from "./button";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { buttonVariants } from "./button";
import { Skeleton } from "./skeleton";

export function LoginButton() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <Skeleton className="h-8 w-8" />;
  }

  if (status === "authenticated") {
    return <LogoutButton />;
  }

  return (
    <Button onClick={() => signIn()}>
      Anmelden <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  );
}

export function LogoutButton() {
  return (
    <Button variant={"ghost"} onClick={() => signOut()}>
      Abmelden <LogOut className="ml-2 h-4 w-4" />
    </Button>
  );
}

export function DashboardButton() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <Skeleton className="h-8 w-8" />;
  }

  if (status === "authenticated") {
    return (
      <Link
        href="/dashboard"
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
        })}
      >
        Dashboard
      </Link>
    );
  }

  return;
}
