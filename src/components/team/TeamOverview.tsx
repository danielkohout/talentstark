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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "../ui/skeleton";
import { badgeVariants } from "../ui/badge";

const TeamOverview = () => {
  const utils = trpc.useUtils();
  const { data: teams } = trpc.teamRouter.getTeams.useQuery();
  const { mutate: deleteTeam } = trpc.teamRouter.deleteTeam.useMutation({
    onSuccess: () => {
      utils.teamRouter.invalidate();
      utils.companyRouter.invalidate();
    },
  });
  const { data: company } = trpc.companyRouter.getCompany.useQuery();
  return (
    <>
      <div className="w-full">
        <div className="border-b">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8 md:px-8">
            <h1 className=" text-xl font-bold md:text-2xl">Teams</h1>
            <div>
              {company?.subscription === 0 ? (
                <div>0</div>
              ) : (
                <div>
                  {company?.teams ? (
                    <div className={badgeVariants({ variant: "outline" })}>
                      <div>
                        Freie Teams: {2 - (company?.teams?.length ?? 0)}
                      </div>
                    </div>
                  ) : (
                    <Skeleton className="h-6 w-10" />
                  )}
                </div>
              )}
            </div>
          </div>
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
              {teams?.map((team) => (
                <li className="" key={team.id}>
                  <Card className="">
                    <CardHeader>
                      <CardTitle>{team.name}</CardTitle>
                      <CardDescription>
                        Zuletzt aktualisiert:{" "}
                        {format(new Date(team.updatedAt), "dd MMM yyy", {
                          locale: de,
                        })}{" "}
                      </CardDescription>
                    </CardHeader>
                    <CardContent></CardContent>
                    <CardFooter className="flex justify-between">
                      <Dialog>
                        <DialogTrigger>
                          <Button variant="outline">
                            Löschen
                            <Trash className="ml-2 h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{team.name} löschen?</DialogTitle>
                            <DialogDescription>
                              Zu diesem Team gehört aktuell:{" "}
                              <b>{team.jobs.length}</b> Job. Du kannst das Team
                              nur löschen, wenn du vorher den Job löschst.
                              <ul>
                                {team.jobs.map((job) => (
                                  <li key={job.id} className="mt-2 font-bold">
                                    <Link href={`/job/${job.id}`}>
                                      {job.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </DialogDescription>
                            <DialogFooter>
                              {team.jobs.length <= 0 ? (
                                <DialogClose>
                                  <Button
                                    onClick={() => {
                                      deleteTeam({ id: team.id });
                                    }}
                                    variant={"destructive"}
                                  >
                                    Löschen
                                  </Button>
                                </DialogClose>
                              ) : (
                                <DialogClose>
                                  <Button>Schließen</Button>
                                </DialogClose>
                              )}
                            </DialogFooter>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                      <Link
                        href={`/team/${team.id}`}
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
