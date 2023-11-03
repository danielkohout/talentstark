import TeamOverview from "@/components/team/TeamOverview";
import TeamSetup from "@/components/team/TeamSetup";
import getUser from "@/lib/auth/getUser";
import prisma from "@/lib/db/prisma";

const page = async () => {
  const user = await getUser();
  const userTeams = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
    include: {
      teams: true,
    },
  }).teams;
  if (userTeams && userTeams.length <= 0) {
    return <TeamSetup />;
  }
  return <TeamOverview />;
};

export default page;
