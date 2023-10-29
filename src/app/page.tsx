import Navbar from "@/components/Navbar";
import TodoList from "@/components/TodoList";
import Dashboard from "@/components/dashboard/Dashboard";
import UserTeams from "@/components/team/UserTeams";
import getUser from "@/lib/auth/getUser";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await getUser();
  if (!user?.firstName) {
    redirect("/user");
  }

  return (
    <>
      <Navbar />
      <Dashboard />
      <UserTeams />
    </>
  );
};

export default Page;
