"use client";
import { trpc } from "@/app/_trpc/client";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { ArrowRight, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import AddTeam from "./AddTeam";

const UserTeams = () => {
  const { data: user, isLoading } = trpc.userRouter.getUser.useQuery();
  const { data: teams } = trpc.teamRouter.getTeams.useQuery();
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Deine Teams
        </h2>
        <AddTeam />
      </div>
      {teams ? (
        <ul className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {teams.map((team) => (
            <li className="" key={team.id}>
              <Link
                className="block divide-y divide-gray-200 rounded-lg border shadow-sm transition hover:shadow-lg"
                href={`/team/${team.id}`}
              >
                <div className="px-6 pb-4 pt-6">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-blue-500 font-bold text-white">
                      {team.name[0]}
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      {team.name}
                    </h3>
                  </div>
                </div>
                <div className="mt-2 px-6 pb-2 pt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Zuletzt aktualisiert:{" "}
                    {format(new Date(team.updatedAt), "dd MMM yyy", {
                      locale: de,
                    })}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>Loading</div>
      )}
      <div className="flex justify-end">
        <Link
          href="/team"
          className={buttonVariants({
            variant: "ghost",
            className: "mt-4",
          })}
        >
          Alle Teams ansehen
          <LayoutGrid className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default UserTeams;
