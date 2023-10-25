import AddCompany from "@/components/user/company/AddCompany";
import UserCompany from "@/components/user/company/UserCompany";
import { serverTrpc } from "@/routers/trpc-caller";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await serverTrpc.userRouter.getUser();

  const addCompany = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    const street = formData.get("street") as string;
    const city = formData.get("city") as string;
    const postcode = Number(formData.get("postcode"));
    const path = Number(formData.get("path"));
    await serverTrpc.companyRouter
      .addCompany({
        name,
        city,
        street,
        postcode,
      })
      .then(() => {
        if (path === 1) {
          redirect("/user/team");
        }
        revalidatePath("/user/company");
      });
  };

  if (user?.companyId) {
    return <UserCompany />;
  }

  return <AddCompany addCompany={addCompany} />;
};

export default page;
