"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ModeToggle } from "./DarkModeToggle";
import MaxWidthWrapper from "./MaxWidthWrapper";
import UserToggle from "./UserToggle";
import { buttonVariants } from "./ui/button";

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
          <div className="hidden items-center space-x-2 sm:flex">
            {status === "authenticated" ? (
              <>
                <Link
                  className={buttonVariants({
                    variant: "ghost",
                  })}
                  href={"/"}
                >
                  Dashboard
                </Link>
                <Link
                  className={buttonVariants({
                    variant: "ghost",
                  })}
                  href={"/"}
                >
                  Teams
                </Link>
                <Link
                  className={buttonVariants({
                    variant: "ghost",
                  })}
                  href={"/"}
                >
                  Jobs
                </Link>
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
