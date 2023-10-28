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
            {team?.team ? team.team.name : <Skeleton className="h-6 w-40" />}
            <EditTeam id={params.id} />
          </h1>
          <Link
            className={buttonVariants({
              variant: "outline",
            })}
            href={"/"}
          >
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
              <p className="text-2xl font-bold lg:text-3xl">8</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Bewerbungen</CardTitle>
              <CardDescription>Bewerbung zu diesem Team</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold lg:text-3xl">211</p>
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
              <p className="text-2xl font-bold lg:text-3xl">8.52/10</p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8">
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            Jobs für{" "}
            {team?.team ? team.team.name : <Skeleton className="h-6 w-60" />}
          </h2>
        </div>
      </div>
    </>
  );
};

export default Team;
