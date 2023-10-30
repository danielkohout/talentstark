import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import VerifyLogin from "@/components/user/VerifyLogin";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <VerifyLogin />;
  }
  redirect("/");
};

export default page;
