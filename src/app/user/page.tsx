import AddUserDetails from "@/components/user/AddUserDetails";
import EditUserDetails from "@/components/user/EditUserDetails";
import getUser from "@/lib/auth/getUser";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getUser();
  if (!user?.firstName) {
    return <AddUserDetails />;
  }

  redirect("/account");
};

export default page;
