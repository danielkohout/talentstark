import EditTeam from "@/components/team/EditTeam";
import TeamSetup from "@/components/team/TeamSetup";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import getUser from "@/lib/auth/getUser";
import prisma from "@/lib/db/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

interface TeamProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: TeamProps) => {
  const user = await getUser();
  // Prüfen, ob der Benutzer mit dem Team verknüpft ist
  const userTeamRelation = await prisma.userTeam.findFirst({
    where: {
      userId: user?.id!,
      teamId: params.id,
    },
  });

  if (!userTeamRelation) {
    // Benutzer ist nicht mit dem Team verknüpft, also umleiten
    redirect("/team");
  }

  const team = await prisma.team.findFirst({
    where: {
      id: params.id,
    },
  });

  return (
    <>
      <div className="border-b ">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8 md:px-8">
          <h1 className="text-xl font-bold  md:text-2xl">
            {team?.name || <Skeleton className="h-10 w-60" />}
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
      <div className="mx-auto max-w-7xl px-8 py-8">
        {team ? <EditTeam team={team} /> : <Skeleton className="h-10 w-full" />}
      </div>
    </>
  );
};

export default page;
