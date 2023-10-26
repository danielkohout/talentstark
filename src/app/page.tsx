import Dashboard from "@/components/dashboard/Dashboard";
import UserTeams from "@/components/dashboard/UserTeams";
import getUser from "@/lib/auth/getUser";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await getUser();
  if (!user?.firstName) {
    redirect("/user");
  }

  return (
    <>
      <Dashboard />
      <UserTeams />
    </>
  );
};

export default Page;
