import { serverClient } from "@/app/_trpc/serverClient";
import TeamOverview from "@/components/team/TeamOverview";
import TeamSetup from "@/components/team/TeamSetup";

const page = async () => {
  const teams = await serverClient.teamRouter.getTeams();

  if (!teams || teams.length === 0) {
    return <TeamSetup />;
  }
  return <TeamOverview />;
};

export default page;
