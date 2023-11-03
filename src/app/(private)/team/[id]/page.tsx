import AccessDenied from "@/components/AccessDenied";
import Team from "@/components/team/Team";
import getUser from "@/lib/auth/getUser";
import prisma from "@/lib/db/prisma";

interface TeamProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: TeamProps) => {
  const user = await getUser();
  const userTeamRelation = await prisma.team.findFirst({
    where: {
      users: {
        some: {
          id: user?.id,
        },
      },
    },
  });
  if (!userTeamRelation) {
    return <AccessDenied />;
  }

  return <Team params={params} />;
};

export default page;
