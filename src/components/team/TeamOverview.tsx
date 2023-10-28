"use client";
import { trpc } from "@/app/_trpc/client";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { ArrowRight, Trash } from "lucide-react";
import Link from "next/link";
import AddTeam from "../team/AddTeam";
import { Button, buttonVariants } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const TeamOverview = () => {
  const { data: user, isLoading } = trpc.userRouter.getUser.useQuery();
  return (
    <>
      <div className="">
        <div className="border-b ">
          <h1 className="mx-auto max-w-7xl px-6 py-8 text-xl font-bold md:px-8 md:text-2xl">
            Teams
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
                  Was sind Teams
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
              <li>
                <AddTeam />
              </li>
            </ul>
          </div>
          <div className="mt-10 md:col-span-8 md:mr-4">
            <ul className="space-y-8">
              {user?.teams
                .sort(
                  (a, b) =>
                    new Date(b.team.updatedAt).getTime() -
                    new Date(a.team.updatedAt).getTime()
                )

                .map((teamRelation) => (
                  <li className="" key={teamRelation.team.id}>
                    <Card className="">
                      <CardHeader>
                        <CardTitle>{teamRelation.team.name}</CardTitle>
                        <CardDescription>
                          Zuletzt aktualisiert:{" "}
                          {format(
                            new Date(teamRelation.team.updatedAt),
                            "dd MMM yyy",
                            {
                              locale: de,
                            }
                          )}{" "}
                        </CardDescription>
                      </CardHeader>
                      <CardContent></CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline">
                          Löschen
                          <Trash className="ml-2 h-4 w-4" />
                        </Button>
                        <Link
                          href={`/team/${teamRelation.teamId}`}
                          className={buttonVariants({
                            variant: "default",
                          })}
                        >
                          Team ansehen
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </CardFooter>
                    </Card>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamOverview;
