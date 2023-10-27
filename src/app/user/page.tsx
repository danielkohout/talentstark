import AddUserDetails from "@/components/user/AddUserDetails";
import EditUserDetails from "@/components/user/EditUserDetails";
import getUser from "@/lib/auth/getUser";

const page = async () => {
  const user = await getUser();
  if (user?.firstName) {
    return <AddUserDetails />;
  }

  return <EditUserDetails />;
};

export default page;
