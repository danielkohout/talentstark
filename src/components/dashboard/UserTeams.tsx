"use client";
import { trpc } from "@/app/_trpc/client";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { ArrowRight, LayoutGrid } from "lucide-react";
import AddTeam from "../team/AddTeam";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";

const UserTeams = () => {
  const { data: user, isLoading } = trpc.userRouter.getUser.useQuery();
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Deine Teams
        </h2>
        <AddTeam />
      </div>
      <ul className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {user?.teams.slice(0, 3).map((teamRelation) => (
          <li
            className="divide-y divide-gray-200 rounded-lg border shadow-sm"
            key={teamRelation.team.id}
          >
            <div className="flex items-center justify-between px-6 pb-4 pt-6">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-blue-500 font-bold text-white">
                  {teamRelation.team.name[0]}
                </div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                  {teamRelation.team.name}
                </h3>
              </div>
              <Link
                href={`/team/${teamRelation.teamId}`}
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                Team ansehen
                <ArrowRight className="ml-1 h-4 w-4 text-gray-900" />
              </Link>
            </div>
            <div className="mt-2 px-6 pb-2 pt-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Zuletzt aktualisiert:{" "}
                {format(new Date(teamRelation.team.updatedAt), "dd MMM yyy", {
                  locale: de,
                })}
              </p>
            </div>
          </li>
        ))}
      </ul>
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
