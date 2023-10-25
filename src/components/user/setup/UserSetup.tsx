"use client";

import { trpc } from "@/app/_trpc/client";
import { buttonVariants } from "@/components/ui/button";
import { UserCog2 } from "lucide-react";
import Link from "next/link";

const UserSetup = () => {
  const { data: user } = trpc.userRouter.getUser.useQuery();
  return (
    <div className="mx-auto mt-10 max-w-7xl px-6 lg:px-8">
      {/* Begrüßung zum Setup */}
      <div className="flex flex-col items-center justify-center text-center">
        <div className="rounded-full bg-white px-8 py-2 text-sm text-gray-600 shadow ring-1 ring-inset ring-gray-200">
          Angemeldet mit: {user?.email}
        </div>
        <UserCog2 className="mt-8 h-10 w-10 text-gray-900" />
        <h1 className="text-center text-2xl font-bold lg:text-3xl">
          Hey, aktuell haben wir nur deine E-Mail.
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-gray-600">
          Damit du mit talentstark durchstarten kannst benötigen wir noch ein
          paar Informationen von dir.
        </p>
        <Link
          className={buttonVariants({
            className: "mt-5",
          })}
          href={"/user/details"}
        >
          Weiter
        </Link>
      </div>
    </div>
  );
};

export default UserSetup;
