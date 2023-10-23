import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import getUser from "@/lib/auth/getUser";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = getServerSession(authOptions);
  const user = await getUser();
  if (!user || !user.id) redirect("/api/auth/signin");
  return <div className="">{user?.email}</div>;
};

export default Page;
