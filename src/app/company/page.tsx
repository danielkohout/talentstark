import AddCompany from "@/components/company/AddCompany";
import EditCompany from "@/components/company/EditCompany";
import getUser from "@/lib/auth/getUser";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getUser();
  if (!user?.companyId) {
    return <AddCompany />;
  }
  redirect("/account");
};

export default page;
