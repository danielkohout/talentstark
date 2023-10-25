"use client";
import { trpc } from "@/app/_trpc/client";
import { buttonVariants } from "@/components/ui/button";
import { UserCog2 } from "lucide-react";
import Link from "next/link";
const UserCompany = () => {
  const { data: user } = trpc.userRouter.getUser.useQuery();

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-10">
      {/* Begrüßung zum Setup */}
      <div className="flex flex-col justify-center items-center text-center">
        <div className="shadow text-sm px-8 py-2 bg-white ring-1 ring-inset ring-gray-200 rounded-full text-gray-600">
          Angemeldet mit: {user?.email}
        </div>
        <UserCog2 className="w-10 h-10 text-gray-900 mt-8" />
        <h1 className="text-2xl lg:text-3xl font-bold text-center">
          Hey, aktuell haben wir nur deine E-Mail.
        </h1>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Damit du mit talentstark durchstarten kannst benötigen wir noch ein
          paar Informationen von dir.
        </p>
        <Link
          className={buttonVariants({
            className: "mt-5",
          })}
          href={"/user/company"}
        >
          Weiter
        </Link>
      </div>
    </div>
  );
};

export default UserCompany;
