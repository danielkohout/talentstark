import AddDetails from "@/components/user/details/AddDetails";
import EditDetails from "@/components/user/details/EditDetails";
import { serverTrpc } from "@/routers/trpc-caller";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await serverTrpc.userRouter.getUser();

  const updateUser = async (formData: FormData) => {
    "use server";
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const path = formData.get("path") as string;
    console.log("formData", formData);
    await serverTrpc.userRouter
      .updateUser({
        firstName: firstName,
        lastName: lastName,
      })
      .then(() => {
        if (path === "0") {
          return;
        }
        if (path === "1") {
          redirect("/user/company");
        }
      });
  };

  if (user?.firstName || user?.lastName) {
    return <EditDetails />;
  }

  return <AddDetails updateUser={updateUser} />;
};

export default page;
