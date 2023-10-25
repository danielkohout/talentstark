"use client";
import { ArrowRight, LogOut } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./button";
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
    <Button variant={"destructive"} onClick={() => signOut()}>
      Abmelden <LogOut className="ml-2 h-4 w-4" />
    </Button>
  );
}
