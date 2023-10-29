import EditCompany from "@/components/company/EditCompany";
import { buttonVariants } from "@/components/ui/button";
import EditUserNames from "@/components/user/EditUserNames";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="">
      <div className="border-b ">
        <h1 className="mx-auto max-w-7xl px-6 py-8 text-xl font-bold md:px-8 md:text-2xl">
          Account Einstellungen
        </h1>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-12">
        <div className="mt-8 md:col-span-4">
          <ul className="space-y-3">
            <li>
              <Link
                className={buttonVariants({
                  variant: "ghost",
                })}
                href={"/user"}
              >
                Allgemeine Einstellungen
              </Link>
            </li>
            <li>
              <Link
                className={buttonVariants({
                  variant: "ghost",
                })}
                href={"/user"}
              >
                Support und Hilfe
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-10 space-y-8 md:col-span-8 md:mr-4">
          <EditUserNames />
          <EditCompany />
        </div>
      </div>
    </div>
  );
};

export default page;
