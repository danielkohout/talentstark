"use client";
import { trpc } from "@/app/_trpc/client";
import { makeUrlFriendly } from "@/lib/urlFriendlyName";
import { Eye, Mail } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import EditTeam from "./EditTeam";
import TeamJobs from "./TeamJobs";

import TeamLink from "./TeamLink";

interface TeamProps {
  params: {
    id: string;
  };
}
const Team = ({ params }: TeamProps) => {
  const { data: team } = trpc.teamRouter.getTeam.useQuery({ id: params.id });
  const whatsappShare = `https://wa.me/?text=Entdecke%20die%20aktuellen%20Jobangebote%20in%20unserem%20Team%20${encodeURIComponent(
    team?.name ?? "unserem Team"
  )}%20unter%20www.talentstark.de/${encodeURIComponent(
    team?.slug ?? "team-slug"
  )}`;
  const emailShare = `mailto:?subject=Entdecke%20unser%20Team%20${encodeURIComponent(
    team?.name ?? "unserem Team"
  )}&body=${encodeURIComponent(
    `Entdecke unser Team ${team?.name ?? "unserem Team"}
  
  Wir haben spannende Jobangebote für dich! Werde Teil unseres großartigen Teams und arbeite mit uns an spannenden Projekten.

  Klicke hier, um die Jobangebote anzusehen: www.talentstark.de/${
    team?.slug ?? "team-slug"
  }

  Wir freuen uns darauf, von dir zu hören!
`
  )}`;

  return (
    <>
      <div className="border-b ">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8 md:px-8">
          <div className="">
            <h1 className="flex items-center gap-2 text-xl font-bold md:text-2xl">
              {team?.name ? team.name : <Skeleton className="h-6 w-40" />}
              <EditTeam id={params.id} />
            </h1>
          </div>
          {team?.slug ? (
            <div className="flex items-center gap-2">
              <Link
                target="_blank"
                className={buttonVariants({
                  variant: "ghost",
                })}
                href={`/${team.slug}`}
              >
                <Eye className="mr-2 h-4 w-4" />
                Teamseite
              </Link>
              <TeamLink params={params} />
              <div className="flex items-center">
                <Link
                  target="_blank"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "icon",
                  })}
                  href={whatsappShare}
                >
                  <svg viewBox="0 0 32 32" className="h-6 w-6 fill-green-600">
                    <path d=" M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.337a8.955 8.955 0 0 1-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.2 10.845 25.2 15.8c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.92a10.807 10.807 0 0 0 16.03-9.455c0-5.958-4.842-10.8-10.802-10.8z"></path>
                  </svg>
                </Link>
                <Link
                  target="_blank"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "icon",
                  })}
                  href={emailShare}
                >
                  <Mail className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : (
            <TeamLink params={params} />
          )}
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
          <h2 className="flex items-center gap-2 text-xl font-bold">
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
