import TeamSetup from "@/components/team/TeamSetup";
import getUser from "@/lib/auth/getUser";
import prisma from "@/lib/db/prisma";

const page = async () => {
  const user = await getUser();
  const userTeams = await prisma.userTeam.findMany({
    where: {
      userId: user!.id,
    },
  });
  if (userTeams && userTeams.length <= 0) {
    return <TeamSetup />;
  }
  return <div>{JSON.stringify(userTeams)}</div>;
};

export default page;
