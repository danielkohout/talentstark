"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { buttonVariants } from "../ui/button";
import EditTeam from "./EditTeam";
import { trpc } from "@/app/_trpc/client";
import { Eye } from "lucide-react";
import TeamJobs from "./TeamJobs";

interface TeamProps {
  params: {
    id: string;
  };
}
const Team = ({ params }: TeamProps) => {
  const { data: team } = trpc.teamRouter.getTeam.useQuery({ id: params.id });
  return (
    <>
      <div className="border-b ">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8 md:px-8">
          <h1 className="flex items-center gap-2 text-xl font-bold md:text-2xl">
            {team?.name ? team.name : <Skeleton className="h-6 w-40" />}
            <EditTeam id={params.id} />
          </h1>
          <Link
            className={buttonVariants({
              variant: "outline",
            })}
            href={"/"}
          >
            <Eye className="w4 h4 mr-2" />
            Teamseite
          </Link>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Jobs</CardTitle>
              <CardDescription>Jobs zu diesem Team</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold lg:text-3xl">
                {team?.jobs.length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Bewerbungen</CardTitle>
              <CardDescription>Bewerbung zu diesem Team</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold lg:text-3xl">
                {team?.applications.length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Beliebtheitsindikator</CardTitle>
              <CardDescription>
                So kommt das Team bei Bewerbern an
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold lg:text-xl">Bald verfügbar</p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8">
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            Jobs im {team ? team.name : <Skeleton className="h-6 w-60" />}-Team
          </h2>
          <div className="mt-8">
            {!team?.jobs ? (
              <Skeleton className="h-20 w-full" />
            ) : (
              <TeamJobs params={params} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
