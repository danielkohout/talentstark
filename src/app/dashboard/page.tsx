import Dashboard from "@/components/dashboard/Dashboard";
import getUser from "@/lib/auth/getUser";

const Page = async () => {
  const user = await getUser();
  return <Dashboard />;
};

export default Page;
