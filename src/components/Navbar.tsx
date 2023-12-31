"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ModeToggle } from "./DarkModeToggle";
import MaxWidthWrapper from "./MaxWidthWrapper";
import UserToggle from "./UserToggle";
import { buttonVariants } from "./ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { status } = useSession();

  return (
    <nav
      className={cn(
        "sticky inset-x-0 top-0 z-30 h-14 w-full border-b bg-white/75 backdrop-blur-lg transition-all  dark:bg-gray-900/75"
      )}
    >
      <MaxWidthWrapper>
        <div className="border-b- flex h-14 items-center justify-between border-zinc-200">
          <Link href="/" className="z-40 flex font-semibold">
            talentstark.
          </Link>
          {/* todo: mobile Navigation */}
          <div
            className={cn("hidden items-center sm:flex lg:flex gap-2", {})}
          >
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
                href={"/team"}
              >
                Teams
              </Link>
              <Link
                className={buttonVariants({
                  variant: "ghost",
                })}
                href={"/job"}
              >
                Jobs
              </Link>
              {/* <UserToggle /> */}
              <ModeToggle />
              <UserToggle />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
