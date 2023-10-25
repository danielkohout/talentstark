"use client";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { DashboardButton, LoginButton } from "./ui/authButtons";
import { ModeToggle } from "./DarkModeToggle";
import { useSession } from "next-auth/react";
import UserToggle from "./UserToggle";
import { redirect } from "next/navigation";

const Navbar = () => {
  const { status } = useSession();

  return (
    <nav className="sticky inset-x-0 top-0 z-30 h-14 w-full border-b bg-white/75 backdrop-blur-lg transition-all  dark:bg-gray-900/75">
      <MaxWidthWrapper>
        <div className="border-b- flex h-14 items-center justify-between border-zinc-200">
          <Link href="/" className="z-40 flex font-semibold">
            talentstark.
          </Link>
          {/* todo: mobile Navigation */}
          <div className="hidden items-center space-x-4 sm:flex">
            {status === "authenticated" ? (
              <>
                <DashboardButton />
                <UserToggle />
              </>
            ) : (
              <>
                <Link
                  href="/pricing"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Preise
                </Link>
              </>
            )}
            <ModeToggle />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
