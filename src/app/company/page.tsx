import AddCompany from "@/components/company/AddCompany";
import EditCompany from "@/components/company/EditCompany";
import getUser from "@/lib/auth/getUser";

const page = async () => {
  const user = await getUser();
  // if (!user?.companyId) {
    return <AddCompany />;
  // }
  // return <EditCompany />;
};

export default page;
